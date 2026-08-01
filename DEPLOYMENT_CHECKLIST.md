# 🚀 SkyFeed - Production Deployment Checklist

## Pre-Deployment (Complete BEFORE deploying)

### ✅ GitHub Repository
- [x] Repository created: https://github.com/jirin1997-wq/skyfeed
- [x] All code committed and pushed
- [x] README.md updated with features
- [x] .gitignore configured

### ✅ Backend Code
- [x] RSS aggregator implemented (8 sources)
- [x] API endpoints created
- [x] Airport directory API
- [x] Resource links API
- [x] Advertisement system
- [x] Admin moderation endpoints
- [x] Scheduler configured (4-hour intervals)
- [x] Prisma schema defined
- [x] Error handling implemented
- [x] CORS configured

### ✅ Frontend Code
- [x] Next.js project setup
- [x] Navigation menu implemented
- [x] News hub page
- [x] Airport directory with Leaflet map
- [x] Resources page with categories
- [x] Marketplace page with ads
- [x] Ad submission form
- [x] Mobile responsive design
- [x] Dark mode UI
- [x] React Query integration

### ✅ Database
- [x] Prisma schema created
- [x] Database migrations ready
- [x] Seed script created (airports + links)
- [x] Indexes defined for performance

### ✅ Infrastructure
- [x] Dockerfile created
- [x] railway.json configured
- [x] vercel.json configured
- [x] docker-compose.yml for local dev
- [x] .env.example created

---

## Deployment Steps

### Step 1: Supabase Database (5 min)

```bash
1. Go to: https://supabase.com
2. Create new project "skyfeed"
3. Save password & connection string
4. Copy CONNECTION STRING (URI format)

Expected: postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres
```

### Step 2: Railway Backend (5 min)

```bash
1. Go to: https://railway.app
2. Create new project from GitHub
3. Select repository: jirin1997-wq/skyfeed
4. Add environment variable:
   - Name: DATABASE_URL
   - Value: [Supabase connection string]
5. Deploy (auto-triggered)

Expected: Service deploys in 2-3 minutes
```

### Step 3: Seed Database (2 min)

After Railway is live:

```bash
1. Go to Railway dashboard
2. Click on skyfeed service
3. Go to Logs
4. Wait for scheduler message or trigger manually:
   - SSH into Railway: railway shell
   - Run: npm run prisma:seed
   - Should see: ✨ Database seeded successfully!
```

### Step 4: Vercel Frontend (5 min)

```bash
1. Go to: https://vercel.com
2. Create new project from GitHub
3. Select repository: jirin1997-wq/skyfeed
4. In settings:
   - Framework: Next.js
   - Root Directory: web
5. Add environment variable:
   - Name: NEXT_PUBLIC_API_URL
   - Value: [Railway API URL from Step 2]
6. Deploy (auto-triggered)

Expected: Deploys in 2-3 minutes
```

### Step 5: Verify Live (5 min)

```bash
Frontend Checks:
✓ Navigate to https://skyfeed-web.vercel.app
✓ See homepage with news articles
✓ Click "Airports" → See map
✓ Click "Resources" → See links
✓ Click "Marketplace" → See ads

Backend Checks:
✓ Visit https://[railway-url]/health
✓ Should return: {"status":"ok"...}
✓ Visit https://[railway-url]/api/articles
✓ Should return articles JSON

Database Checks:
✓ Supabase dashboard → SQL Editor
✓ Run: SELECT COUNT(*) FROM "Article";
✓ Should see: 0 (becomes populated after 4 hours)
```

---

## After Deployment

### Day 1: Monitor
- Watch logs for errors
- Check if aggregator runs at 4-hour mark
- Verify RSS feeds are being fetched

### Week 1: Optimization
- Add monitoring (Sentry)
- Setup email alerts
- Monitor database performance
- Check browser compatibility

### Ongoing
- Add new RSS sources
- Moderate ads
- Add new resource links
- Monitor performance metrics

---

## Production URLs

```
🌐 Frontend: https://skyfeed-web.vercel.app
🔌 API: https://skyfeed-api-production-xxx.railway.app
🗄️  Database: Supabase PostgreSQL
📊 GitHub: https://github.com/jirin1997-wq/skyfeed
```

---

## Troubleshooting

### "Cannot connect to API"
- Verify NEXT_PUBLIC_API_URL is set correctly in Vercel
- Check Railway service is running (green status)
- Verify DATABASE_URL in Railway

### "No articles loading"
- Wait 4 hours for first aggregation
- Check Railway logs for RSS fetch errors
- Verify internet connection in Railway

### "Map not loading"
- Check browser console for errors
- Verify Leaflet.js is loaded
- Check if geo-data API works

### "Ads not showing"
- Verify DATABASE_URL is correct
- Check if articles table exists
- See admin panel: /api/admin/ads/pending

---

## Success Criteria

✅ Homepage loads with news articles
✅ Airport map displays with markers
✅ Resources page shows curated links
✅ Marketplace shows submitted ads
✅ Search functionality works
✅ Category filtering works
✅ Mobile responsive on all pages
✅ Dark mode works correctly
✅ No console errors
✅ API endpoints respond correctly

---

## 🎉 Production Ready!

If all checks pass, your SkyFeed is production-ready and live! 🚀

Next steps:
- [ ] Add custom domain
- [ ] Setup analytics
- [ ] Configure email for ad notifications
- [ ] Add admin dashboard for moderation
- [ ] Monitor performance
- [ ] Plan monetization strategy

---

**Created:** August 2026
**Status:** ✅ Production Ready
**Last Updated:** 2026-08-02

---

For questions or issues: Open GitHub Issues
For feature requests: GitHub Discussions
