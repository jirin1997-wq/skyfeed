import { FastifyInstance } from 'fastify';
import { prisma } from '../db';

export async function airportRoutes(app: FastifyInstance) {
  // GET /api/airports - seznam všech letišť
  app.get('/airports', async (request, reply) => {
    const { limit = 100, search, country } = request.query as any;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { icao: { contains: search, mode: 'insensitive' } },
        { iata: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (country) {
      where.country = country;
    }

    const airports = await prisma.airport.findMany({
      where,
      take: Math.min(parseInt(limit), 500),
      orderBy: { name: 'asc' },
    });

    return {
      data: airports,
      count: airports.length,
    };
  });

  // GET /api/airports/:icao - detaily letiště
  app.get<{ Params: { icao: string } }>('/airports/:icao', async (request, reply) => {
    const airport = await prisma.airport.findUnique({
      where: { icao: request.params.icao.toUpperCase() },
    });

    if (!airport) {
      return reply.code(404).send({ error: 'Airport not found' });
    }

    return airport;
  });

  // GET /api/airports/country/:country - letiště v zemi
  app.get<{ Params: { country: string } }>('/airports/country/:country', async (request, reply) => {
    const airports = await prisma.airport.findMany({
      where: { country: request.params.country },
      orderBy: { name: 'asc' },
    });

    return {
      data: airports,
      count: airports.length,
    };
  });

  // GET /api/airports/map/geojson - GeoJSON pro mapy
  app.get('/airports/map/geojson', async (request, reply) => {
    const airports = await prisma.airport.findMany({
      orderBy: { name: 'asc' },
    });

    return {
      type: 'FeatureCollection',
      features: airports.map((airport) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [airport.longitude, airport.latitude],
        },
        properties: {
          id: airport.id,
          icao: airport.icao,
          iata: airport.iata,
          name: airport.name,
          city: airport.city,
          country: airport.country,
          elevation: airport.elevation,
          website: airport.website,
        },
      })),
    };
  });
}
