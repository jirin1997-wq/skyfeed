import { FastifyInstance } from 'fastify';
import { prisma } from '../db';

export async function adsRoutes(app: FastifyInstance) {
  // GET /api/ads - aktivní schválené inzerce
  app.get<{ Querystring: { category?: string; limit?: string; page?: string } }>('/ads', async (request, reply) => {
    const { category, limit = '10', page = '1' } = request.query;
    const take = Math.min(parseInt(limit), 50);
    const skip = (parseInt(page) - 1) * take;

    const where: any = {
      active: true,
      approved: true,
      startDate: { lte: new Date() },
      endDate: { gte: new Date() },
    };

    if (category) {
      where.category = category;
    }

    const [ads, total] = await Promise.all([
      prisma.advertisement.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.advertisement.count({ where }),
    ]);

    // Track impressions
    for (const ad of ads) {
      await prisma.advertisement.update({
        where: { id: ad.id },
        data: { impressions: { increment: 1 } },
      });
    }

    return {
      data: ads,
      pagination: {
        page: parseInt(page),
        limit: take,
        total,
        pages: Math.ceil(total / take),
      },
    };
  });

  // GET /api/ads/categories - kategorie inzerce
  app.get('/ads/categories', async (request, reply) => {
    return [
      { name: 'aircraft', label: 'Aircraft Sales' },
      { name: 'services', label: 'Services' },
      { name: 'products', label: 'Products' },
      { name: 'events', label: 'Events' },
    ];
  });

  // POST /api/ads - vytvoření nové inzerce
  app.post<{ Body: any }>('/ads', async (request, reply) => {
    const {
      title,
      description,
      imageUrl,
      link,
      category,
      authorName,
      authorEmail,
      authorPhone,
      startDate,
      endDate,
    } = request.body;

    // Validace
    if (!title || !description || !category || !authorEmail) {
      return reply.code(400).send({
        error: 'Missing required fields',
      });
    }

    // Email validace
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail)) {
      return reply.code(400).send({
        error: 'Invalid email address',
      });
    }

    const ad = await prisma.advertisement.create({
      data: {
        title,
        description,
        imageUrl: imageUrl || null,
        link,
        category,
        authorName,
        authorEmail,
        authorPhone: authorPhone || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return reply.code(201).send({
      id: ad.id,
      message: 'Advertisement created successfully. It will appear after moderation approval.',
      status: 'pending_approval',
    });
  });

  // GET /api/ads/:id - detaily inzerce
  app.get<{ Params: { id: string } }>('/ads/:id', async (request, reply) => {
    const ad = await prisma.advertisement.findUnique({
      where: { id: parseInt(request.params.id) },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        link: true,
        category: true,
        startDate: true,
        endDate: true,
        impressions: true,
        clicks: true,
      },
    });

    if (!ad) {
      return reply.code(404).send({ error: 'Advertisement not found' });
    }

    return ad;
  });

  // POST /api/ads/:id/click - track click
  app.post<{ Params: { id: string } }>('/ads/:id/click', async (request, reply) => {
    const ad = await prisma.advertisement.findUnique({
      where: { id: parseInt(request.params.id) },
    });

    if (!ad) {
      return reply.code(404).send({ error: 'Advertisement not found' });
    }

    await prisma.advertisement.update({
      where: { id: ad.id },
      data: { clicks: { increment: 1 } },
    });

    return { success: true };
  });

  // GET /api/ads/stats/pending - čekající na schválení (admin)
  app.get('/ads/stats/pending', async (request, reply) => {
    const pending = await prisma.advertisement.count({
      where: { approved: false },
    });

    return { pending };
  });
}
