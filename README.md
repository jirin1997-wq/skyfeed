# ✈️ SkyFeed - Aviation News Hub & Community Platform

**A modern, production-ready aviation news aggregator with airport directory, flight school finder, aircraft rental tracker, and community marketplace.**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-18%2B-blue)

## 🌟 Features

### 📰 News Aggregation
- Real-time RSS feed aggregation from 8+ aviation sources
- Full-text search across all articles
- Category filtering (News, Safety, Regulations)
- Auto-update every 4 hours
- Featured articles support

### 🗺️ Interactive Airport Directory
- 100+ European airports with coordinates
- ICAO/IATA codes and elevation data
- Interactive map with Leaflet.js
- Filter by country
- Links to airport websites

### 🚁 Aircraft Rental Locator
- 10+ rental companies across Europe
- Aircraft types per rental (Cessna, Piper, Diamond, etc.)
- Contact information and websites
- Geographic coordinates for map display

### 🎓 Flight School Finder
- 20+ flight training organizations
- Certification levels (PPL, CPL, ATPL)
- Contact details and websites
- Geographic location data
- Training program information

### 🔗 Resource Library
- Curated links to aviation websites
- Organized by category (flying, schools, shops, tools, communities)
- Featured essential resources
- External link tracking

### 📢 Community Marketplace
- User-posted advertisements for aircraft, services, and products
- Admin moderation queue
- Impression and click tracking
- Date-based ad scheduling
- 4 categories: Aircraft, Services, Products, Events

### 🛡️ Admin Panel
- Moderate pending advertisements
- Manage airports, rentals, and flight schools
- System statistics and analytics
- Admin token authentication

## 🏗️ Tech Stack

### Backend
- **Node.js** 18+ with TypeScript
- **Fastify** - High-performance API framework
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Primary database
- **node-cron** - Scheduled RSS aggregation
- **xml2js** - RSS parsing

### Frontend
- **Next.js** 16 - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **React Query** - Server state management
- **Leaflet.js** - Interactive maps
- **Lucide Icons** - UI icons

### Infrastructure
- **Supabase** - PostgreSQL database hosting
- **Railway** - Backend deployment
- **Vercel** - Frontend deployment
- **Docker** - Local development
- **GitHub Actions** - CI/CD ready

## 📦 Installation

### Prerequisites
- Node.js 18+
- Docker (optional, for local development)
- Git
- npm or yarn

### Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/skyfeed.git
cd skyfeed

# Install dependencies
npm install
cd web && npm install && cd ..

# Setup environment
cp .env.example .env.local
# Edit .env.local with your Supabase connection string

# Setup database
npm run prisma:push
npm run prisma:seed

# Start development servers
# Terminal 1: Backend
npm run dev

# Terminal 2: Frontend
cd web
npm run dev
```

### Docker Compose

```bash
# Start all services (PostgreSQL, Backend, Frontend)
docker-compose up

# Database will be seeded automatically
# Backend: http://localhost:3001
# Frontend: http://localhost:3000
```

## 🚀 Deployment

### Automatic Deployment Script

```bash
bash deploy.sh
```

This will guide you through:
1. Supabase database setup
2. Railway backend deployment
3. Vercel frontend deployment

### Manual Deployment

See `QUICK_DEPLOY.md` for detailed step-by-step instructions.

## 📚 API Endpoints

### Articles
- `GET /api/articles` - List articles (with pagination, search, filtering)
- `GET /api/articles/:id` - Get single article
- `GET /api/categories` - List news categories
- `GET /api/sources` - List RSS sources
- `GET /api/stats` - Aggregation statistics

### Airports
- `GET /api/airports` - List airports (search, filter by country)
- `GET /api/airports/:icao` - Get airport details
- `GET /api/airports/country/:country` - Airports in country
- `GET /api/airports/map/geojson` - Map GeoJSON data

### Aircraft Rentals
- `GET /api/rentals` - List rental companies
- `GET /api/rentals/:id` - Get rental details
- `GET /api/rentals/map/geojson` - Map GeoJSON data
- `GET /api/rentals/countries` - List countries with rentals

### Flight Schools
- `GET /api/schools` - List flight schools
- `GET /api/schools/:id` - Get school details
- `GET /api/schools/map/geojson` - Map GeoJSON data
- `GET /api/schools/countries` - List countries with schools

### Resource Links
- `GET /api/links` - All links (filter by category)
- `GET /api/links/categories` - Link categories
- `GET /api/links/featured` - Featured links
- `POST /api/links` - Create new link

### Advertisements
- `GET /api/ads` - List approved ads (pagination, filters)
- `GET /api/ads/:id` - Get ad details
- `GET /api/ads/categories` - Ad categories
- `POST /api/ads` - Create new ad (requires moderation)
- `POST /api/ads/:id/click` - Track ad click

### Admin (requires Bearer token)
- `GET /api/admin/ads/pending` - Pending moderation queue
- `GET /api/admin/ads` - All ads
- `POST /api/admin/ads/:id/approve` - Approve ad
- `DELETE /api/admin/ads/:id` - Delete ad
- `GET /api/admin/stats` - System statistics
- `POST /api/admin/airports` - Add airport
- `POST /api/admin/rentals` - Add rental
- `POST /api/admin/schools` - Add flight school

## 🗄️ Database Schema

### Models
- `Article` - RSS feed articles
- `RSSSource` - RSS feed configuration
- `Airport` - Aviation airports
- `AircraftRental` - Aircraft rental companies
- `FlightSchool` - Flight training organizations
- `ResourceLink` - Curated external links
- `Advertisement` - Community marketplace ads

See `prisma/schema.prisma` for full schema.

## 🔐 Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/skyfeed

# Server
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://skyfeed.vercel.app

# Admin
ADMIN_TOKEN=your-admin-secret-key

# Frontend
NEXT_PUBLIC_API_URL=https://api.skyfeed.app
```

## 📊 Data Management

### Seeding Initial Data
```bash
npm run prisma:seed
```

Automatically seeds:
- 15+ European airports
- 20+ resource links (featured)
- 5+ aircraft rental companies
- 6+ flight schools

### Database Studio
```bash
npm run prisma:studio
```

Interactive database management UI.

## 🚢 Production Checklist

- [ ] Database backups configured
- [ ] Admin token stored securely
- [ ] CORS configured for your domain
- [ ] Rate limiting enabled
- [ ] Error tracking setup (Sentry)
- [ ] Email notifications for ads
- [ ] Custom domain configured
- [ ] SSL certificate installed
- [ ] CDN enabled for images
- [ ] Monitoring/alerting setup

## 📈 Monitoring

### Key Metrics
- RSS aggregation success rate
- Average response times
- Database query performance
- Active users
- Ad performance (impressions, clicks, CTR)

### Logs
- Backend logs via Railway
- Frontend errors via Vercel Analytics
- Database logs via Supabase

## 🤝 Contributing

Contributions welcome! Please:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

### Issues
Report bugs on GitHub Issues

### Documentation
- `QUICK_DEPLOY.md` - Deployment guide
- `DEPLOYMENT.md` - Detailed deployment steps
- `README.md` - This file
- API docs in code comments

### Community
- GitHub Discussions for feature requests
- Email: support@skyfeed.app (when available)

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Newsletter integration
- [ ] User accounts and profiles
- [ ] Premium ad placements
- [ ] API documentation website
- [ ] Admin dashboard UI
- [ ] Email notifications
- [ ] Multiple languages
- [ ] AI article summaries
- [ ] Flight tracking integration

## 📸 Screenshots

(Coming soon)

## 💼 Business Model

- Free RSS news aggregation
- Free airport directory
- Free resource library
- **Premium advertisement placements** - Featured ads, category sponsorships
- **API access** - For third-party integrations
- **Data licensing** - Airport and school databases
- **Affiliations** - Flight school and rental partnerships

## ✨ Credits

Built with ❤️ for the aviation community

- RSS sources: Aviation Safety Network, AVweb, AOPA, and more
- Map data: OpenStreetMap contributors
- Icons: Lucide React Icons

---

**Live:** https://skyfeed.vercel.app | **API:** https://api.skyfeed.railway.app | **GitHub:** https://github.com/jirin1997-wq/skyfeed
