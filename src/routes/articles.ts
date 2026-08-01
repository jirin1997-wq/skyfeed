import { FastifyInstance } from 'fastify';
import { prisma } from '../db';

export async function articlesRoutes(app: FastifyInstance) {
  // GET /api/articles?limit=20&page=1&category=News&search=text
  app.get<{ Querystring: { limit?: string; page?: string; category?: string; search?: string } }>(
    '/articles',
    async (request, reply) => {
      const limit = Math.min(parseInt(request.query.limit || '20'), 100);
      const page = Math.max(parseInt(request.query.page || '1'), 1);
      const { category, search } = request.query;
      const skip = (page - 1) * limit;

      const whereClause: any = {};

      if (category && category !== 'all') {
        whereClause.category = category;
      }

      if (search) {
        whereClause.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ];
      }

      const [articles, total] = await Promise.all([
        prisma.article.findMany({
          where: whereClause,
          include: { source: true },
          orderBy: { published: 'desc' },
          take: limit,
          skip,
        }),
        prisma.article.count({ where: whereClause }),
      ]);

      return {
        data: articles,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    }
  );

  // GET /api/articles/:id
  app.get<{ Params: { id: string } }>('/articles/:id', async (request, reply) => {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(request.params.id) },
      include: { source: true },
    });

    if (!article) {
      return reply.code(404).send({ error: 'Article not found' });
    }

    return article;
  });

  // GET /api/categories
  app.get('/categories', async (request, reply) => {
    const categories = await prisma.article.groupBy({
      by: ['category'],
      _count: true,
      orderBy: { _count: { category: 'desc' } },
    });

    return categories
      .map((cat: any) => ({
        name: cat.category,
        count: cat._count,
      }))
      .sort((a: any, b: any) => b.count - a.count);
  });

  // GET /api/sources
  app.get('/sources', async (request, reply) => {
    const sources = await prisma.rSSSource.findMany({
      orderBy: { title: 'asc' },
      select: {
        id: true,
        title: true,
        category: true,
        lastFetch: true,
        _count: { select: { articles: true } },
      },
    });

    return sources;
  });

  // GET /api/stats
  app.get('/stats', async (request, reply) => {
    const [totalArticles, totalSources, categoryCounts] = await Promise.all([
      prisma.article.count(),
      prisma.rSSSource.count(),
      prisma.article.groupBy({
        by: ['category'],
        _count: true,
      }),
    ]);

    return {
      totalArticles,
      totalSources,
      categories: categoryCounts.map((c: any) => ({
        name: c.category,
        count: c._count,
      })),
      lastUpdate: new Date(),
    };
  });
}
