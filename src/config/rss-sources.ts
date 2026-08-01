export interface RSSSourceConfig {
  url: string;
  category: string;
  title: string;
}

export const RSS_SOURCES: RSSSourceConfig[] = [
  // AVIATION SAFETY
  {
    url: 'https://feeds.aviation-safety.net/news.xml',
    category: 'Safety',
    title: 'Aviation Safety Network',
  },
  
  // GENERAL AVIATION NEWS
  {
    url: 'https://www.avweb.com/feed',
    category: 'News',
    title: 'AVweb',
  },
  {
    url: 'https://generalaviationnews.com/feed/',
    category: 'News',
    title: 'General Aviation News',
  },
  {
    url: 'https://www.aopa.org/news-and-media/all-news/rss.xml',
    category: 'News',
    title: 'AOPA',
  },
  
  // INTERNATIONAL
  {
    url: 'https://www.flightglobal.com/rss/news',
    category: 'News',
    title: 'Flight Global',
  },
  {
    url: 'https://www.ainonline.com/rss/news',
    category: 'News',
    title: 'AIN Online',
  },
  
  // REGULATIONS
  {
    url: 'https://www.faa.gov/news/feed.xml',
    category: 'Regulations',
    title: 'FAA News',
  },
  {
    url: 'https://www.easa.europa.eu/feed',
    category: 'Regulations',
    title: 'EASA',
  },
];
