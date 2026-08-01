# SkyFeed API

Real-time aviation news aggregator powered by RSS feeds.

## Features

- 🔄 Automatic RSS feed aggregation every 4 hours
- 📰 Multiple aviation news sources
- 🏷️ Category-based filtering
- 🔍 Full-text search
- 📊 REST API
- 🗄️ PostgreSQL database
- 🚀 Scalable architecture

## Tech Stack

- Node.js + TypeScript
- Fastify (web framework)
- Prisma (ORM)
- PostgreSQL
- node-cron (scheduling)

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env
# Edit .env with your database URL
```

### Database Setup

```bash
npm run prisma:push
npm run generate
```

### Development

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Articles

```
GET /api/articles
  ?limit=20
  &page=1
  &category=News
  &search=pilot

GET /api/articles/:id

GET /api/categories

GET /api/sources

GET /api/stats
```

### Health

```
GET /health
```

## RSS Sources

The aggregator automatically fetches from:

- Aviation Safety Network
- AVweb
- General Aviation News
- AOPA
- Flight Global
- AIN Online
- FAA News
- EASA

Add more sources in `src/config/rss-sources.ts`

## Aggregation Schedule

- Automatic run every 4 hours
- Initial run 5 seconds after server start
- Manual trigger via admin endpoints (coming soon)

## Deployment

### Railway

```bash
git push
# Railway auto-deploys with GitHub connection
```

### Environment Variables (Production)

- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - Frontend domain for CORS
- `NODE_ENV` - Set to `production`
- `PORT` - Server port (default: 3001)

## License

MIT
