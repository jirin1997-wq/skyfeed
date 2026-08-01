import { FastifyInstance } from 'fastify';
import { prisma } from '../db';

export async function linksRoutes(app: FastifyInstance) {
  // GET /api/links - všechny důležité linky
  app.get<{ Querystring: { category?: string; featured?: string } }>('/links', async (request, reply) => {
    const { category, featured } = request.query;

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const links = await prisma.resourceLink.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { title: 'asc' }],
    });

    return {
      data: links,
      count: links.length,
    };
  });

  // GET /api/links/categories - seznam kategorií
  app.get('/links/categories', async (request, reply) => {
    const categories = await prisma.resourceLink.groupBy({
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

  // GET /api/links/featured - featured linky
  app.get('/links/featured', async (request, reply) => {
    const links = await prisma.resourceLink.findMany({
      where: { featured: true },
      orderBy: { title: 'asc' },
    });

    return {
      data: links,
      count: links.length,
    };
  });

  // POST /api/links - přidání nového linku (přesuneme do admin později)
  app.post<{ Body: any }>('/links', async (request, reply) => {
    const { title, url, description, category, icon } = request.body;

    if (!title || !url || !category) {
      return reply.code(400).send({
        error: 'Missing required fields: title, url, category',
      });
    }

    const link = await prisma.resourceLink.create({
      data: {
        title,
        url,
        description: description || '',
        category,
        icon,
      },
    });

    return reply.code(201).send(link);
  });
}
