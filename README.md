# SkyFeed - Aviation News Aggregator

Real-time aviation news aggregated from trusted sources worldwide.

![License](https://img.shields.io/badge/license-MIT-blue)
![Node Version](https://img.shields.io/badge/node-18%2B-green)
![Next.js](https://img.shields.io/badge/next.js-14%2B-black)

## 🌟 Features

- 🔄 **Automatic RSS Aggregation** - Fetches news every 4 hours from 8+ sources
- 📰 **Modern UI** - Beautiful, responsive dark-mode interface
- 🏷️ **Category Filtering** - Organize by News, Safety, Regulations
- 🔍 **Full-Text Search** - Find articles quickly
- ⚡ **Fast & Scalable** - Built with Next.js + Fastify + PostgreSQL
- 📱 **Mobile Ready** - Works perfect on all devices
- 🌐 **SEO Optimized** - Proper metadata and structured data

## 📦 Project Structure

```
skyfeed/
├── src/                          # Backend (Node.js + Fastify)
│   ├── config/                   # RSS sources configuration
│   ├── services/                 # Business logic (aggregator)
│   ├── routes/                   # API endpoints
│   ├── server.ts                 # Main server file
│   └── scheduler.ts              # Cron scheduler
├── web/                          # Frontend (Next.js)
│   ├── app/                      # Pages & components
│   ├── components/               # React components
│   └── public/                   # Static files
├── prisma/                       # Database schema
├── DEPLOYMENT.md                 # Deployment guide
└── README.md                     # This file
```

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- PostgreSQL (or Supabase)

### Installation

```bash
# Clone repository
git clone https://github.com/jirin1997-wq/skyfeed.git
cd skyfeed

# Install backend dependencies
npm install

# Setup database
cp .env.example .env
# Edit .env with your PostgreSQL connection string

# Initialize database
npm run prisma:push

# Start backend (Terminal 1)
npm run dev

# In another terminal, start frontend
cd web
npm install
npm run dev
```

Backend: http://localhost:3001
Frontend: http://localhost:3000

## 📡 API Endpoints

### Articles
```
GET /api/articles
  ?limit=20&page=1&category=News&search=pilot

GET /api/articles/:id

GET /api/categories

GET /api/sources

GET /api/stats
```

### Health
```
GET /health
```

## 🌐 Live Demo

> 🚀 Coming soon! Follow deployment guide below.

## 📖 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step guide to deploy on:
- **Database**: Supabase (free)
- **Backend**: Railway (free tier)
- **Frontend**: Vercel (free)

**Total deployment cost**: $0/month (free tier)

## 📰 RSS Sources

Currently aggregating from:
- Aviation Safety Network
- AVweb
- General Aviation News
- AOPA
- Flight Global
- AIN Online
- FAA News
- EASA

Add more in `src/config/rss-sources.ts`

## 🔧 Tech Stack

### Backend
- Node.js + TypeScript
- Fastify (web framework)
- Prisma (ORM)
- PostgreSQL (database)
- node-cron (scheduling)
- xml2js (RSS parsing)

### Frontend
- Next.js 14
- React 19
- TailwindCSS
- React Query (data fetching)
- TypeScript

### DevOps
- Docker (containerization)
- Railway (deployment)
- Vercel (frontend hosting)
- Supabase (database)

## 📊 Architecture

```
┌─────────────────────────────┐
│      Frontend (Vercel)      │
│   SkyFeed Web Interface     │
└────────────┬────────────────┘
             │ HTTP/REST
┌────────────▼────────────────┐
│   Backend API (Railway)     │
│  Fastify Server + RSS       │
│  Aggregator + Scheduler     │
└────────────┬────────────────┘
             │ SQL
┌────────────▼────────────────┐
│ Database (Supabase)         │
│    PostgreSQL + Prisma      │
└─────────────────────────────┘
```

## ⚙️ Aggregation Schedule

- **Automatic runs**: Every 4 hours
- **Initial run**: 5 seconds after server start
- **Error handling**: Automatic retry with exponential backoff
- **Deduplication**: Prevents duplicate articles

## 🛡️ Security

- Environment variables for sensitive data
- CORS protection on API
- SQL injection prevention (Prisma)
- XSS protection (React)
- HTTPS enforcement (production)

## 📈 Performance

- **Frontend**: Optimized Next.js with ISR
- **API**: Response caching (5 minute stale time)
- **Database**: Indexed queries on common fields
- **Aggregator**: Parallel feed fetching
- **Assets**: Minified CSS/JS

## 🔐 Environment Variables

Backend:
```
DATABASE_URL=postgresql://...
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://skyfeed.app
```

Frontend:
```
NEXT_PUBLIC_API_URL=https://api.skyfeed.app
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📝 Roadmap

- [ ] Admin dashboard for RSS source management
- [ ] Newsletter subscription
- [ ] Article bookmarking/saving
- [ ] Advanced search with filters
- [ ] Social sharing buttons
- [ ] Dark/light mode toggle
- [ ] Mobile app (React Native)
- [ ] AI-powered summarization
- [ ] Trending articles algorithm

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

Built by SkyFeed Team

## 📞 Contact & Support

- **Issues**: GitHub Issues
- **Email**: support@skyfeed.app
- **Twitter**: @skyfeedapp

---

**Made with ✈️ for aviation enthusiasts worldwide**
