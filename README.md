# ✈️ SkyFeed – Aviation News & Services Portal

Real-time aviation news aggregator with interactive airport maps, flight school directory, and aircraft rental marketplace.

**Status:** ✅ Production-Ready | **Build:** Passing | **Last Updated:** 2026-08-02

---

## 🚀 Quick Deploy

**Everything is built and ready to deploy!**

👉 **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** ← 3-step guide (15 minutes)

Just follow those 3 steps:
1. Create Supabase database (2 min)
2. Deploy backend on Railway (5 min)
3. Deploy frontend on Vercel (5 min)

That's it! Your app is live! 🎉

---

## 📋 Features

### 📰 News & Articles
- Real-time RSS aggregation from 8+ aviation sources
- Auto-updates every 4 hours
- Search & filter by category
- Responsive news feed

### 🗺️ Airport Directory
- 10+ European general aviation airports
- Interactive Leaflet.js map with markers
- ICAO/IATA codes, elevations, contact info
- **Direct website links for each airport**

### ✈️ Aircraft Rentals
- 5+ rental companies across Europe
- Aircraft types (Cessna 172, Piper PA-28, etc.)
- Location-based search
- **Website + phone for each rental**
- GeoJSON map visualization

### 🎓 Flight Schools
- 6+ certified flight training organizations
- Certifications offered (PPL, CPL, ATPL)
- Contact details & locations
- **Direct school website links**
- Interactive map with green markers

### 📚 Resources
- Essential tools for pilots (FAA, EASA, FlightRadar24, etc.)
- Community links (AOPA, Cessna Pilots, etc.)
- Training & education resources
- Aircraft suppliers

### 🛍️ Marketplace
- Free advertisement system
- Aircraft & parts for sale
- Flight services & products
- Approval workflow (preventing spam)

---

## 🏗️ Architecture

```
Frontend (Vercel)
├── Next.js 14 + React + TypeScript
├── TailwindCSS for styling
├── React Query for data fetching
├── Leaflet.js for interactive maps
└── Responsive mobile-first design

Backend API (Railway)
├── Node.js + Fastify + TypeScript
├── RESTful API with 20+ endpoints
├── RSS aggregation scheduler
├── Admin dashboard (WIP)
└── Graceful error handling

Database (Supabase PostgreSQL)
├── Articles (RSS feed items)
├── Airports (with coordinates)
├── ResourceLinks (categories)
├── AircraftRentals (with websites)
├── FlightSchools (with websites)
├── Advertisements (user-submitted)
└── Automatic backups
```

---

## 📚 Project Structure

```
skyfeed/
├── src/                          # Backend (Node.js + Fastify)
│   ├── server.ts                 # Main server entry
│   ├── db.ts                      # Prisma client
│   ├── scheduler.ts               # RSS aggregation (4h intervals)
│   ├── services/aggregator.ts     # RSS parsing logic
│   ├── routes/
│   │   ├── articles.ts            # GET /api/articles
│   │   ├── airports.ts            # GET /api/airports (+ GeoJSON map)
│   │   ├── rentals-schools.ts     # GET /api/rentals, /api/schools
│   │   ├── links.ts               # GET /api/links
│   │   ├── ads.ts                 # GET /api/ads (+ ad posting)
│   │   ├── admin.ts               # Admin dashboard (approval)
│   │   └── admin-ads.ts           # Admin ad management
│   ├── config/rss-sources.ts      # RSS feed URLs
│   └── types/
│
├── web/                           # Frontend (Next.js 14)
│   ├── app/
│   │   ├── page.tsx               # Homepage (news feed)
│   │   ├── layout.tsx             # Root layout
│   │   ├── airports/page.tsx       # Airport directory (map + cards)
│   │   ├── rentals/page.tsx        # Aircraft rentals (map + listings)
│   │   ├── schools/page.tsx        # Flight schools (map + listings)
│   │   ├── resources/page.tsx      # Pilot resources links
│   │   ├── marketplace/page.tsx    # Ad marketplace
│   │   └── components/
│   │       ├── ArticleCard.tsx
│   │       ├── AirportsMap.tsx     # Leaflet map for airports
│   │       ├── ResourceLinks.tsx
│   │       ├── AdsDisplay.tsx      # Marketplace ads
│   │       └── ...
│   ├── package.json
│   ├── vercel.json                # Vercel deployment config
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── prisma/
│   ├── schema.prisma              # Database models (8 tables)
│   ├── seed.ts                    # Seed data (airports, rentals, schools)
│   └── migrations/                # Auto-generated
│
├── docker-compose.yml             # Local dev (PostgreSQL + Node.js)
├── Dockerfile                     # Backend container
├── railway.json                   # Railway deployment config
├── railway.toml                   # Railway build settings
├── DEPLOY_NOW.md                  # ⭐ 3-STEP DEPLOYMENT GUIDE
├── DEPLOYMENT_GUIDE.md            # Detailed deployment docs
├── package.json                   # Backend dependencies
└── README.md                      # You are here
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14, React, TypeScript | Web UI |
| **Styling** | TailwindCSS | Design system |
| **Maps** | Leaflet.js + react-leaflet | Interactive maps |
| **Data Fetching** | React Query | API client |
| **Backend** | Node.js, Fastify, TypeScript | REST API |
| **ORM** | Prisma | Database access |
| **Database** | PostgreSQL (Supabase) | Data storage |
| **Scheduler** | node-cron | RSS aggregation |
| **RSS Parser** | xml2js | Feed parsing |
| **Frontend Host** | Vercel | CDN + deployment |
| **Backend Host** | Railway | App hosting |
| **Database Host** | Supabase | Managed PostgreSQL |

---

## 📊 API Endpoints (20+)

### Articles
- `GET /api/articles?page=1&limit=20&category=...`
- `GET /api/categories`

### Airports
- `GET /api/airports?limit=100&search=...&country=...`
- `GET /api/airports/:icao`
- `GET /api/airports/map/geojson` ← Interactive map
- `GET /api/airports/country/:country`

### Aircraft Rentals
- `GET /api/rentals?country=...&city=...`
- `GET /api/rentals/:id`
- `GET /api/rentals/map/geojson` ← Map with website links
- `GET /api/rentals/country/:country`

### Flight Schools
- `GET /api/schools?country=...&city=...`
- `GET /api/schools/:id`
- `GET /api/schools/map/geojson` ← Map with website links
- `GET /api/schools/country/:country`
- `GET /api/schools/certifications`

### Resources
- `GET /api/links?category=...&featured=true`
- `GET /api/links/categories`
- `GET /api/links/featured`
- `POST /api/links`

### Advertisements
- `GET /api/ads?category=...&limit=10&page=1`
- `GET /api/ads/:id`
- `POST /api/ads` ← User submission
- `POST /api/ads/:id/click` ← Analytics
- `GET /api/ads/categories`
- `GET /api/ads/stats/pending` ← Admin only

### Admin
- `POST /api/admin/articles/sync` ← Force RSS sync
- `PATCH /api/admin/ads/:id/approve` ← Approve ads

---

## 🌍 Seed Data Included

### Airports (10)
- LKPR (Prague), LKBR (Brno), LKPD (Podborany)
- EDDF (Frankfurt), EDLG (Cologne), LEMD (Madrid)
- LFPG (Paris), EGLL (London), + 2 more

### Aircraft Rentals (5)
- Brno Aero Club, Prague Aviation, Podborany Flight Services
- European Air Services (Munich), Aero France (Paris)
- **All with websites, phone numbers, aircraft types**

### Flight Schools (6)
- Brno Flight Academy, Prague Pilot School, Podborany Flying Club
- Luftfahrtschule München, Ecole de Pilotage Île-de-France, Nordic Flight School
- **All with websites, certifications offered, contact info**

### Resource Links (14)
- Flying: EASA, FAA, Aviation Safety Network, AVweb
- Communities: AOPA, Cessna Pilots, Aviapages
- Tools: FlightRadar24, Skyvector, AVWX, MFB
- Schools: CheckRide, Airbus Training
- Shops: Aircraft Spruce

---

## 🚀 Deployment Status

| Component | Status | Instructions |
|-----------|--------|--------------|
| **Source Code** | ✅ Complete | GitHub: jirin1997-wq/skyfeed |
| **Database Schema** | ✅ Ready | Prisma models defined |
| **Seed Data** | ✅ Ready | npm run prisma:seed |
| **Backend API** | ✅ Ready | Fastify server configured |
| **Frontend** | ✅ Ready | Next.js 14 optimized |
| **Maps Integration** | ✅ Ready | Leaflet + GeoJSON endpoints |
| **RSS Aggregation** | ✅ Ready | node-cron scheduler (4h) |
| **Docker Config** | ✅ Ready | docker-compose for local |
| **Deployment Docs** | ✅ Ready | DEPLOY_NOW.md |

**Next Steps:** Follow [DEPLOY_NOW.md](./DEPLOY_NOW.md) → Live in 15 minutes!

---

## 🎯 Features by Page

### Homepage (`/`)
- ✅ Latest aviation news (20+ articles per page)
- ✅ Search by title/content
- ✅ Filter by category
- ✅ Pagination
- ✅ Quick links to other sections

### Airports (`/airports`)
- ✅ Interactive Leaflet map (drag, zoom, click)
- ✅ 10+ airports with website links
- ✅ Search by country/city
- ✅ Elevation, ICAO/IATA codes
- ✅ Popup shows airport details + website link

### Rentals (`/rentals`)
- ✅ Interactive map with rental companies
- ✅ Blue markers for locations
- ✅ Click marker → see company name + website
- ✅ Card view with all details
- ✅ Aircraft types listed (Cessna, Piper, etc.)
- ✅ Phone & email contact

### Schools (`/schools`)
- ✅ Green map markers for flight schools
- ✅ Certifications offered (PPL, CPL, ATPL)
- ✅ Click marker → school details + website
- ✅ Card view with training programs
- ✅ Filter by country/city

### Resources (`/resources`)
- ✅ Curated links for pilots
- ✅ Organized by category (flying, tools, communities)
- ✅ Icons & descriptions
- ✅ Direct links to external resources

### Marketplace (`/marketplace`)
- ✅ Browse ads (aircraft, parts, services)
- ✅ Submit new ad (with email verification)
- ✅ Filter by category
- ✅ Admin approval workflow
- ✅ Impression & click tracking

---

## 🛣️ Roadmap

### v1.0 (Current)
- [x] News aggregation
- [x] Airport directory + maps
- [x] Aircraft rental listings + websites
- [x] Flight school directory + websites
- [x] Resource links
- [x] Marketplace skeleton

### v1.1 (Planned)
- [ ] Admin panel (user-friendly)
- [ ] Email notifications
- [ ] User accounts & saved favorites
- [ ] Reviews & ratings
- [ ] PDF export for flight plans
- [ ] Mobile app (React Native)

### v2.0 (Future)
- [ ] Real-time flight tracking (ADS-B)
- [ ] Weather integration (METAR/TAF)
- [ ] Flight simulator integration
- [ ] Pilot community forum
- [ ] Job board for aviators

---

## 📦 Installation (Local Development)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+ (or Docker)
- Git

### Setup
```bash
# Clone repo
git clone https://github.com/jirin1997-wq/skyfeed.git
cd skyfeed

# Install dependencies
npm install
cd web && npm install && cd ..

# Setup database locally
docker-compose up -d  # Starts PostgreSQL

# Configure environment
cp .env.example .env.local
# Edit .env.local with your database URL

# Run migrations
npx prisma migrate dev

# Seed data
npm run prisma:seed

# Start backend (terminal 1)
npm run dev

# Start frontend (terminal 2)
cd web
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/health

---

## 🧪 Testing

```bash
# Test backend API
curl http://localhost:3001/health

# Test specific endpoints
curl http://localhost:3001/api/articles
curl http://localhost:3001/api/airports/map/geojson
curl http://localhost:3001/api/rentals
```

---

## 📞 Support & Links

- **GitHub:** https://github.com/jirin1997-wq/skyfeed
- **Issues:** https://github.com/jirin1997-wq/skyfeed/issues
- **Discussions:** https://github.com/jirin1997-wq/skyfeed/discussions

### Deployment Guides
- **Quick Deploy:** [DEPLOY_NOW.md](./DEPLOY_NOW.md) ⭐ Start here!
- **Detailed Setup:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### External Services
- Supabase: https://supabase.com (Database)
- Railway: https://railway.app (Backend Hosting)
- Vercel: https://vercel.com (Frontend Hosting)

---

## 📝 License

MIT – Feel free to fork, modify, and deploy!

---

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/) – React framework
- [Fastify](https://fastify.io/) – Fast web server
- [Prisma](https://www.prisma.io/) – ORM
- [Leaflet.js](https://leafletjs.com/) – Maps
- [TailwindCSS](https://tailwindcss.com/) – Styling
- [Supabase](https://supabase.com/) – Database & Auth

---

**🚀 Ready to fly? Follow [DEPLOY_NOW.md](./DEPLOY_NOW.md)**

Questions? Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed help.

✈️ Happy flying!
