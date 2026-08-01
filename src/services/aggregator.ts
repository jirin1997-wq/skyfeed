import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { prisma } from '../db';
import { RSS_SOURCES } from '../config/rss-sources';

export interface ParsedArticle {
  title: string;
  content: string;
  link: string;
  author?: string;
  imageUrl?: string;
  published: Date;
  sourceCategory: string;
}

async function fetchAndParseFeed(sourceUrl: string): Promise<ParsedArticle[]> {
  try {
    const response = await axios.get(sourceUrl, {
      timeout: 10000,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const feed = await parseStringPromise(response.data);
    const items = feed.rss?.channel?.[0]?.item || feed.feed?.entry || [];

    return items.slice(0, 15).map((item: any) => {
      const link =
        item.link?.[0]?.$ && item.link[0]?.$.href
          ? item.link[0].$.href
          : item.link?.[0];

      const imageUrl =
        item['media:thumbnail']?.[0]?.$ && item['media:thumbnail'][0]?.$.url
          ? item['media:thumbnail'][0].$.url
          : null;

      return {
        title: (item.title?.[0] || 'No title').substring(0, 500),
        content: (item.description?.[0] || item.summary?.[0] || '').substring(
          0,
          5000
        ),
        link: String(link || ''),
        author: (item.author?.[0]?.name?.[0] || item.creator?.[0] || '')
          .toString()
          .substring(0, 200),
        imageUrl: imageUrl?.toString() || null,
        published: new Date(
          item.pubDate?.[0] || item.published?.[0] || Date.now()
        ),
        sourceCategory: '',
      };
    });
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : String(error);
    console.error(`❌ Error fetching ${sourceUrl}: ${errorMsg}`);
    return [];
  }
}

export async function aggregateAllFeeds() {
  console.log(`\n🔄 [${new Date().toISOString()}] Starting RSS aggregation...`);

  let totalProcessed = 0;
  let totalAdded = 0;

  for (const source of RSS_SOURCES) {
    try {
      // Get or create source
      let dbSource = await prisma.rSSSource.findUnique({
        where: { url: source.url },
      });

      if (!dbSource) {
        dbSource = await prisma.rSSSource.create({
          data: {
            url: source.url,
            title: source.title,
            category: source.category,
          },
        });
      }

      const articles = await fetchAndParseFeed(source.url);

      for (const article of articles) {
        try {
          await prisma.article.create({
            data: {
              title: article.title,
              content: article.content,
              link: article.link,
              author: article.author,
              imageUrl: article.imageUrl,
              category: source.category,
              published: article.published,
              sourceId: dbSource.id,
            },
          });

          totalAdded++;
        } catch (e) {
          // Article already exists (unique constraint), skip
        }
      }

      // Update lastFetch
      await prisma.rSSSource.update({
        where: { id: dbSource.id },
        data: { lastFetch: new Date() },
      });

      totalProcessed += articles.length;
      console.log(`✅ ${source.title}: ${articles.length} articles processed`);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : String(error);
      console.error(`❌ Failed for ${source.title}: ${errorMsg}`);
    }
  }

  console.log(
    `\n✨ Aggregation complete: ${totalAdded}/${totalProcessed} articles added\n`
  );
}
