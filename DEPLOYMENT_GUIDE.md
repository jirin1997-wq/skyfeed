# 🚀 SkyFeed Production Deployment

**Status:** ✅ Ready to deploy  
**Last Updated:** 2026-08-02  
**Features:** Articles + Airports + Rentals + Schools + Marketplace

## Quick Deploy (5 minutes)

### Prerequisites
- GitHub account (already have it: `jirin1997-wq`)
- Supabase account (free)
- Railway account (free)
- Vercel account (free)

---

## 1️⃣ DATABASE: Supabase Setup

### Create Project
1. Go to **https://supabase.com**
2. Click "New Project"
3. Fill in:
   - Name: `skyfeed-production`
   - Database Password: (save it!)
   - Region: eu-west-1
4. Click "Create"

### Get Connection String
1. **Settings → Database → Connection Strings**
2. Choose **Nodejs**
3. Copy the string (format: `postgresql://user:password@host:5432/postgres`)
4. Replace `[YOUR-PASSWORD]` with your actual password

### Save This String!
You'll need it in Railway. Format:
```
postgresql://postgres:YOUR_PASSWORD@your-project.supabase.co:5432/postgres
```

---

## 2️⃣ BACKEND: Railway Deployment

### Connect Repository
1. Go to **https://railway.app**
2. Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose `jirin1997-wq/skyfeed`
6. Click "Deploy Now"

### Wait for Build
Railway will build automatically. Takes ~3 minutes.

### Set Environment Variables
1. **Railway Dashboard → Your Project**
2. **Variables** tab
3. Add these 4 variables:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@your-project.supabase.co:5432/postgres
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://skyfeed-xxx.vercel.app
```

(Replace DATABASE_URL with your Supabase string)

### Get Your Backend URL
1. Click on the Deployment (green checkmark ✅)
2. You'll see a URL like: `https://skyfeed-api-abc123.railway.app`
3. **Copy this URL** – you need it for Vercel!

---

## 3️⃣ FRONTEND: Vercel Deployment

### Import Repository
1. Go to **https://vercel.com**
2. Click "Import Project"
3. Paste: `https://github.com/jirin1997-wq/skyfeed`
4. Click "Continue"

### Set Environment Variables
**Before clicking Deploy**, add:
```
NEXT_PUBLIC_API_URL=https://skyfeed-api-abc123.railway.app
```

(Replace with your Railway URL from step 2)

### Deploy
1. Click "Deploy"
2. Wait 5 minutes for build
3. Get your URL: `https://skyfeed-xxx.vercel.app`

---

## ✅ Verify Everything Works

### Test Frontend
- [ ] Visit your Vercel URL
- [ ] See news articles on homepage
- [ ] Click "Airports" → see map with location names
- [ ] Click "Rentals" → see rental companies with website links
- [ ] Click "Schools" → see flight schools
- [ ] Click a marker → website opens

### Test Backend API
```bash
# Replace with your Railway URL
curl https://skyfeed-api-xxx.railway.app/health

# Should return: {"status":"ok",...}
```

---

## 🔗 YOUR LIVE URLS

Frontend: `https://skyfeed-xxx.vercel.app`  
Backend: `https://skyfeed-api-xxx.railway.app`  
Database: Supabase (managed, no public URL needed)

**Share the Frontend URL!**

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Frontend shows API errors | Check `NEXT_PUBLIC_API_URL` in Vercel env vars |
| No articles loading | Ensure Railway backend is running (green ✅) |
| Maps not showing | Clear browser cache + check if markers appear in console |
| Database errors | Verify `DATABASE_URL` is correct + check Supabase status |

---

**Total Cost:** Free tier works for 1000+ daily users!  
**Maintenance:** Push to GitHub → auto-deploys to Vercel & Railway  

🚀 **Live!**
