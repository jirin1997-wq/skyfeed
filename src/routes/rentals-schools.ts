import { FastifyInstance } from 'fastify';
import { prisma } from '../db';

export async function rentalRoutes(app: FastifyInstance) {
  // GET /api/rentals - seznam půjčoven
  app.get<{ Querystring: { city?: string; country?: string; limit?: string } }>(
    '/rentals',
    async (request, reply) => {
      const { city, country, limit = '50' } = request.query;

      const where: any = {};
      if (city) where.city = { contains: city, mode: 'insensitive' };
      if (country) where.country = country;

      const rentals = await prisma.aircraftRental.findMany({
        where,
        take: Math.min(parseInt(limit), 500),
        orderBy: { name: 'asc' },
      });

      return { data: rentals, count: rentals.length };
    }
  );

  // GET /api/rentals/:id - detaily půjčovny
  app.get<{ Params: { id: string } }>('/rentals/:id', async (request, reply) => {
    const rental = await prisma.aircraftRental.findUnique({
      where: { id: parseInt(request.params.id) },
    });

    if (!rental) {
      return reply.code(404).send({ error: 'Rental company not found' });
    }

    return rental;
  });

  // GET /api/rentals/map/geojson - GeoJSON pro mapy
  app.get('/rentals/map/geojson', async (request, reply) => {
    const rentals = await prisma.aircraftRental.findMany({
      where: {
        latitude: { not: null },
        longitude: { not: null },
      },
    });

    return {
      type: 'FeatureCollection',
      features: rentals.map((rental) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [rental.longitude, rental.latitude],
        },
        properties: {
          id: rental.id,
          name: rental.name,
          city: rental.city,
          country: rental.country,
          website: rental.website,
          phone: rental.phone,
          email: rental.email,
          aircraftTypes: rental.aircraftTypes ? JSON.parse(rental.aircraftTypes) : [],
          type: 'rental',
        },
      })),
    };
  });

  // GET /api/rentals/countries - seznam zemí s půjčovnami
  app.get('/rentals/countries', async (request, reply) => {
    const countries = await prisma.aircraftRental.groupBy({
      by: ['country'],
      _count: true,
    });

    return countries
      .map((c: any) => ({ name: c.country, count: c._count }))
      .sort((a: any, b: any) => b.count - a.count);
  });
}

export async function schoolRoutes(app: FastifyInstance) {
  // GET /api/schools - seznam flight schools
  app.get<{ Querystring: { city?: string; country?: string; limit?: string } }>(
    '/schools',
    async (request, reply) => {
      const { city, country, limit = '50' } = request.query;

      const where: any = {};
      if (city) where.city = { contains: city, mode: 'insensitive' };
      if (country) where.country = country;

      const schools = await prisma.flightSchool.findMany({
        where,
        take: Math.min(parseInt(limit), 500),
        orderBy: { name: 'asc' },
      });

      return { data: schools, count: schools.length };
    }
  );

  // GET /api/schools/:id - detaily školy
  app.get<{ Params: { id: string } }>('/schools/:id', async (request, reply) => {
    const school = await prisma.flightSchool.findUnique({
      where: { id: parseInt(request.params.id) },
    });

    if (!school) {
      return reply.code(404).send({ error: 'Flight school not found' });
    }

    return school;
  });

  // GET /api/schools/map/geojson - GeoJSON pro mapy
  app.get('/schools/map/geojson', async (request, reply) => {
    const schools = await prisma.flightSchool.findMany({
      where: {
        latitude: { not: null },
        longitude: { not: null },
      },
    });

    return {
      type: 'FeatureCollection',
      features: schools.map((school) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [school.longitude, school.latitude],
        },
        properties: {
          id: school.id,
          name: school.name,
          city: school.city,
          country: school.country,
          website: school.website,
          phone: school.phone,
          email: school.email,
          certifications: school.certifications ? JSON.parse(school.certifications) : [],
          type: 'school',
        },
      })),
    };
  });

  // GET /api/schools/countries - seznam zemí se školami
  app.get('/schools/countries', async (request, reply) => {
    const countries = await prisma.flightSchool.groupBy({
      by: ['country'],
      _count: true,
    });

    return countries
      .map((c: any) => ({ name: c.country, count: c._count }))
      .sort((a: any, b: any) => b.count - a.count);
  });
}
