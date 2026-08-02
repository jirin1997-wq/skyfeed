import Fastify from 'fastify';
import cors from '@fastify/cors';
import { prisma } from './db';
import { initializeScheduler } from './scheduler';
import { articlesRoutes } from './routes/articles';
import { airportRoutes } from './routes/airports';
import { linksRoutes } from './routes/links';
import { adsRoutes } from './routes/ads';
import { rentalRoutes, schoolRoutes } from './routes/rentals-schools';
import { adminRoutes } from './routes/admin';
import { adminAdsRoutes } from './routes/admin-ads';

const app = Fastify({
  logger: true,
});

// Register CORS
app.register(cors, {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});

// Register routes
app.register(articlesRoutes, { prefix: '/api' });
app.register(airportRoutes, { prefix: '/api' });
app.register(linksRoutes, { prefix: '/api' });
app.register(adsRoutes, { prefix: '/api' });
app.register(rentalRoutes, { prefix: '/api' });
app.register(schoolRoutes, { prefix: '/api' });
app.register(adminRoutes, { prefix: '/api' });
app.register(adminAdsRoutes, { prefix: '/api' });

// Health check
app.get('/health', async () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  };
});

// Root
app.get('/', async () => {
  return {
    name: 'SkyFeed API',
    version: '1.0.0',
    documentation: '/api/docs',
    status: 'running',
  };
});

// Error handler
app.setErrorHandler((error, request, reply) => {
  console.error(error);
  reply.code(500).send({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined,
  });
});

// Graceful shutdown
const gracefulShutdown = async () => {
  console.log('\n⚠️  Shutting down gracefully...');
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
const start = async () => {
  try {
    // Initialize RSS aggregation scheduler
    initializeScheduler();

    const port = parseInt(process.env.PORT || '3001');
    const host = '0.0.0.0';

    await app.listen({ port, host });
    console.log(`\n✅ Server running on http://${host}:${port}`);
    console.log(`📊 Health check: http://${host}:${port}/health`);
    console.log(`📰 API: http://${host}:${port}/api/articles\n`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export default app;
