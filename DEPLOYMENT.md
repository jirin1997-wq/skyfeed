# SkyFeed Deployment Guide

Complete step-by-step guide to deploy SkyFeed to production.

## 📋 Prerequisites

- GitHub account (✅ already done)
- Supabase account (free) - https://supabase.com
- Railway account (free tier) - https://railway.app
- Vercel account (free) - https://vercel.com

---

## 1️⃣ Database Setup (Supabase)

### Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up
2. Click "Create new project"
3. Fill in project details:
   - Name: `skyfeed`
   - Database password: (generate strong password)
   - Region: Pick closest to your location
4. Wait for project to be created (2-3 minutes)

### Step 2: Get Connection String

1. In Supabase dashboard, go to **Settings → Database**
2. Copy the "Connection string" (make sure URI format is selected)
3. It will look like: `postgresql://postgres:password@host:5432/postgres`
4. **Save this for later!**

### Step 3: Initialize Database Schema

In your terminal:

```bash
# Clone the repo locally (if not already)
git clone https://github.com/jirin1997-wq/skyfeed.git
cd skyfeed

# Install dependencies
npm install

# Create .env with your database URL
echo "DATABASE_URL=postgresql://postgres:PASSWORD@host:5432/postgres" > .env

# Replace PASSWORD and host with your Supabase values

# Run migrations
npm run prisma:push

# Done! Your database schema is now live
```

---

## 2️⃣ Backend Deployment (Railway)

### Step 1: Connect Railway to GitHub

1. Go to https://railway.app and sign in
2. Click "Create New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway with GitHub
5. Select your `skyfeed` repo
6. Railway will auto-detect and ask for root directory

### Step 2: Configure Environment Variables

In Railway dashboard:
1. Go to Variables tab
2. Add these variables:
   ```
   DATABASE_URL = [Your Supabase connection string]
   PORT = 3001
   NODE_ENV = production
   FRONTEND_URL = https://skyfeed-web.vercel.app
   ```
3. Click "Deploy"

### Step 3: Get Your API URL

1. After deploy completes, go to "Deployments"
2. Click the latest deployment
3. Copy the URL (will be like `https://skyfeed-api-production.up.railway.app`)
4. **Save this - you'll need it for the frontend!**

---

## 3️⃣ Frontend Deployment (Vercel)

### Step 1: Connect Vercel to GitHub

1. Go to https://vercel.com and sign in
2. Click "Add New → Project"
3. Import your `skyfeed` GitHub repo
4. Vercel will auto-detect it's a Next.js project

### Step 2: Configure Project Settings

1. **Root Directory**: Select `web` (where the Next.js app is)
2. **Framework**: Next.js (should be auto-detected)
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`

### Step 3: Add Environment Variables

1. In Environment Variables section, add:
   ```
   NEXT_PUBLIC_API_URL = https://skyfeed-api-production.up.railway.app
   ```
   (Use your Railway API URL from Step 2)

2. Click "Deploy"

---

## ✅ Verification

### Backend Health Check

```bash
curl https://skyfeed-api-production.up.railway.app/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Frontend

Visit: `https://skyfeed-web.vercel.app`

You should see the SkyFeed interface with news articles loading.

---

## 🔄 Automatic Updates

Once deployed:
- **Backend**: Railway watches your `main` branch. Push to GitHub → Auto-deploys
- **Frontend**: Vercel watches your `main` branch. Push to GitHub → Auto-deploys
- **Database**: Migrations run automatically on deploy

---

## 🐛 Troubleshooting

### "Failed to load articles"
1. Check that Railway deployment is successful
2. Verify `NEXT_PUBLIC_API_URL` in Vercel matches Railway URL
3. Check Railway logs for API errors

### "Database connection failed"
1. Verify `DATABASE_URL` is correct in Railway
2. Test with: `psql <your-connection-string>`
3. Check Supabase is active

### Articles not updating
1. RSS feeds need 4+ hours to first run
2. Check Railway logs for aggregator status
3. Manually trigger: (coming in admin panel)

---

## 📊 Monitoring

### Railway Logs
- Go to Railway dashboard → Logs tab
- Monitor RSS aggregation runs

### Vercel Analytics
- Go to Vercel dashboard → Analytics
- Monitor website traffic

### Supabase Monitoring
- Go to Supabase dashboard → Database
- Monitor connections and queries

---

## 🚀 Next Steps

1. **Custom Domain** (optional)
   - In Vercel: Settings → Domains
   - Add your custom domain

2. **Monitoring** (recommended)
   - Set up Sentry for error tracking
   - Set up LogRocket for session replay

3. **SEO** (recommended)
   - Submit sitemap to Google Search Console
   - Add social meta tags

---

## 📞 Support

If deployment fails, check:
1. GitHub Actions logs
2. Railway deployment logs
3. Vercel deployment logs
4. Supabase status page

Each has detailed error messages!

Good luck! 🚀
