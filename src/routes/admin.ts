import { FastifyInstance } from 'fastify';
import { prisma } from '../db';

// Simple admin token verification
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin-secret-key';

const verifyAdmin = (token: string | undefined): boolean => {
  return token === ADMIN_TOKEN;
};

export async function adminRoutes(app: FastifyInstance) {
  // GET /api/admin/ads/pending - seznam čekajících inzerce
  app.get<{ Headers: { authorization?: string } }>(
    '/admin/ads/pending',
    async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!verifyAdmin(token)) {
        return reply.code(401).send({ error: 'Unauthorized' });
      }

      const pending = await prisma.advertisement.findMany({
        where: { approved: false },
        orderBy: { createdAt: 'desc' },
      });

      return { data: pending, count: pending.length };
    }
  );

  // GET /api/admin/ads - všechny inzerce
  app.get<{ Headers: { authorization?: string } }>(
    '/admin/ads',
    async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!verifyAdmin(token)) {
        return reply.code(401).send({ error: 'Unauthorized' });
      }

      const ads = await prisma.advertisement.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return { data: ads, count: ads.length };
    }
  );

  // POST /api/admin/ads/:id/approve - schválení inzerce
  app.post<{ Params: { id: string }; Headers: { authorization?: string } }>(
    '/admin/ads/:id/approve',
    async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!verifyAdmin(token)) {
        return reply.code(401).send({ error: 'Unauthorized' });
      }

      const ad = await prisma.advertisement.update({
        where: { id: parseInt(request.params.id) },
        data: { approved: true },
      });

      return { success: true, ad };
    }
  );

  // DELETE /api/admin/ads/:id - smazání inzerce
  app.delete<{ Params: { id: string }; Headers: { authorization?: string } }>(
    '/admin/ads/:id',
    async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!verifyAdmin(token)) {
        return reply.code(401).send({ error: 'Unauthorized' });
      }

      await prisma.advertisement.delete({
        where: { id: parseInt(request.params.id) },
      });

      return { success: true };
    }
  );

  // POST /api/admin/airports - přidání letiště
  app.post<{ Body: any; Headers: { authorization?: string } }>(
    '/admin/airports',
    async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!verifyAdmin(token)) {
        return reply.code(401).send({ error: 'Unauthorized' });
      }

      const airport = await prisma.airport.create({
        data: request.body,
      });

      return reply.code(201).send(airport);
    }
  );

  // POST /api/admin/rentals - přidání půjčovny
  app.post<{ Body: any; Headers: { authorization?: string } }>(
    '/admin/rentals',
    async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!verifyAdmin(token)) {
        return reply.code(401).send({ error: 'Unauthorized' });
      }

      const rental = await prisma.aircraftRental.create({
        data: request.body,
      });

      return reply.code(201).send(rental);
    }
  );

  // POST /api/admin/schools - přidání školy
  app.post<{ Body: any; Headers: { authorization?: string } }>(
    '/admin/schools',
    async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!verifyAdmin(token)) {
        return reply.code(401).send({ error: 'Unauthorized' });
      }

      const school = await prisma.flightSchool.create({
        data: request.body,
      });

      return reply.code(201).send(school);
    }
  );

  // GET /api/admin/stats - statistiky
  app.get<{ Headers: { authorization?: string } }>(
    '/admin/stats',
    async (request, reply) => {
      const token = request.headers.authorization?.replace('Bearer ', '');

      if (!verifyAdmin(token)) {
        return reply.code(401).send({ error: 'Unauthorized' });
      }

      const [
        totalAds,
        pendingAds,
        approvedAds,
        totalAirports,
        totalRentals,
        totalSchools,
        totalArticles,
      ] = await Promise.all([
        prisma.advertisement.count(),
        prisma.advertisement.count({ where: { approved: false } }),
        prisma.advertisement.count({ where: { approved: true } }),
        prisma.airport.count(),
        prisma.aircraftRental.count(),
        prisma.flightSchool.count(),
        prisma.article.count(),
      ]);

      return {
        ads: { total: totalAds, pending: pendingAds, approved: approvedAds },
        airports: totalAirports,
        rentals: totalRentals,
        schools: totalSchools,
        articles: totalArticles,
      };
    }
  );
}
