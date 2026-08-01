# ✈️ SkyFeed - Aviation News Hub

The modern, comprehensive platform for aviation enthusiasts. Real-time news, airport directory, essential resources, and community marketplace.

## 🎯 Features

### 📰 News Hub
- **Real-time RSS Aggregation**: 8 curated aviation news sources
- **Smart Categorization**: News, Safety, Regulations
- **Full-Text Search**: Find articles by keywords
- **Category Filtering**: Browse by topic
- **Mobile Responsive**: Works on all devices
- **Auto-updates**: New content every 4 hours

### 🗺️ Airport Directory
- **Interactive Leaflet Map**: Explore 10+ European airports
- **Detailed Information**: ICAO, IATA, elevation, websites
- **Country Filtering**: Browse by region
- **Airport Cards**: Quick info view
- **GeoJSON API**: For custom integrations

### 🔗 Essential Resources
- **Curated Links**: 15+ aviation tools and websites
- **Category Organization**: Flying, Training, Products, Tools, Communities
- **Featured Resources**: Top recommendations
- **External Links**: Direct access to tools

### 📢 Marketplace
- **User Advertisements**: Post for free
- **Categories**: Aircraft Sales, Services, Products, Events
- **Moderation System**: Admin approval workflow
- **Click/Impression Tracking**: Analytics
- **Date-Based Display**: Automatic expiration

### 👨‍💼 Admin Panel
- **Moderation Dashboard**: Review pending ads
- **Approval/Rejection**: Manage submissions
- **Statistics**: Track active listings
- **Analytics**: Impressions and clicks

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 + React 19 + TypeScript
- **Styling**: TailwindCSS
- **Backend**: Node.js + Fastify
- **Database**: PostgreSQL + Prisma ORM
- **Maps**: Leaflet.js
- **State**: React Query
- **Hosting**: Railway (Backend), Vercel (Frontend), Supabase (Database)

## 🚀 Live Demo

- Frontend: https://skyfeed-web.vercel.app
- API: https://skyfeed-api-xxx.railway.app
- GitHub: https://github.com/jirin1997-wq/skyfeed

## 📡 API Endpoints

```
News:
GET /api/articles - List articles
GET /api/categories - Categories

Airports:
GET /api/airports - All airports
GET /api/airports/:icao - Airport details
GET /api/airports/map/geojson - Map data

Resources:
GET /api/links - All links
GET /api/links/featured - Featured links

Marketplace:
GET /api/ads - Active ads
POST /api/ads - Submit ad
POST /api/ads/:id/click - Track click

Admin:
GET /api/admin/ads/pending - Pending ads
POST /api/admin/ads/:id/approve - Approve
POST /api/admin/ads/:id/reject - Reject
```

## 🛠️ Local Development

```bash
# Setup
docker-compose up

# In new terminal
npm install
npm run prisma:seed

# Dev
npm run dev
```

Backend: http://localhost:3001
Frontend: http://localhost:3000

## 📝 Environment Variables

```
# .env (Backend)
DATABASE_URL=postgresql://...
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://...

# .env.local (Frontend)
NEXT_PUBLIC_API_URL=https://...
```

## 📚 Documentation

- [Quick Deploy Guide](./QUICK_DEPLOY.md)
- [Deployment Instructions](./DEPLOYMENT.md)
- [Start Here](./START_HERE.md)

## 🎯 Features in Development

- User authentication
- Comments & reviews
- Newsletter
- Mobile app
- Video content
- User profiles
- Flight tracking

## 📝 License

Open source - Use freely

## 📞 Support

GitHub Issues & Discussions for support

---

**SkyFeed** - Where Aviation Meets Community ✈️
