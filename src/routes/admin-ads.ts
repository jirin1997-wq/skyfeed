import { FastifyInstance } from 'fastify';
import { prisma } from '../db';

export async function adminAdsRoutes(app: FastifyInstance) {
  // GET /api/admin/ads/pending - čekající inzerce
  app.get<{ Querystring: { limit?: string; page?: string } }>('/admin/ads/pending', async (request, reply) => {
    const { limit = '10', page = '1' } = request.query;
    const take = Math.min(parseInt(limit), 50);
    const skip = (parseInt(page) - 1) * take;

    const [ads, total] = await Promise.all([
      prisma.advertisement.findMany({
        where: { approved: false },
        take,
        skip,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.advertisement.count({ where: { approved: false } }),
    ]);

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

  // POST /api/admin/ads/:id/approve - schvál inzerci
  app.post<{ Params: { id: string } }>('/admin/ads/:id/approve', async (request, reply) => {
    const ad = await prisma.advertisement.update({
      where: { id: parseInt(request.params.id) },
      data: { approved: true },
    });

    return { success: true, ad };
  });

  // POST /api/admin/ads/:id/reject - zamítni inzerci
  app.post<{ Params: { id: string } }>('/admin/ads/:id/reject', async (request, reply) => {
    await prisma.advertisement.delete({
      where: { id: parseInt(request.params.id) },
    });

    return { success: true, message: 'Advertisement rejected and deleted' };
  });

  // GET /api/admin/ads/stats - statistika inzerce
  app.get('/admin/ads/stats', async (request, reply) => {
    const [total, active, pending, expired] = await Promise.all([
      prisma.advertisement.count(),
      prisma.advertisement.count({ where: { active: true, approved: true } }),
      prisma.advertisement.count({ where: { approved: false } }),
      prisma.advertisement.count({
        where: { endDate: { lt: new Date() } },
      }),
    ]);

    return {
      total,
      active,
      pending,
      expired,
    };
  });
}
