# ⚡ SkyFeed Live Deployment  
## 3-Step Deploy to Production

**Estimated Time:** 15 minutes  
**Cost:** Free (first year)

---

## Step 1️⃣: Database (Supabase) — 2 minutes

### 1a) Create Supabase Project
- Go: https://supabase.com
- Click: "New Project"
- Fill:
  - Name: `skyfeed-prod`
  - Password: (create & save!)
  - Region: EU (recommended)
- Click: "Create"
- ⏳ Wait 2 minutes

### 1b) Get Connection String
- In Supabase: **Settings → Database → Connection Strings**
- Choose: **Nodejs** 
- Copy the string (has `[YOUR-PASSWORD]` placeholder)
- Replace `[YOUR-PASSWORD]` with your actual password
- **Save this entire string!** You need it in the next step.

Example:
```
postgresql://postgres:MySecurePass123!@ref_xxxx.supabase.co:5432/postgres
```

---

## Step 2️⃣: Backend (Railway) — 5 minutes

### 2a) Deploy Backend
- Go: https://railway.app
- Login: with GitHub (use jirin1997-wq)
- Click: "New Project"
- Select: "Deploy from GitHub repo"
- Choose: `jirin1997-wq/skyfeed`
- Click: "Deploy Now"
- ⏳ Wait for green ✅ (3-5 min)

### 2b) Add Database Connection
Once deployed:
1. Click your Deployment (green checkmark)
2. Go to: **Variables** tab
3. Click: **Add Variable**
4. Add these 4:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your Supabase string from Step 1b |
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `FRONTEND_URL` | `https://skyfeed-xxx.vercel.app` ← you'll get this in next step |

5. Save & Railway auto-restarts

### 2c) Get Your Backend URL
1. Click on deployment (green ✅)
2. Look for "Public URL" (looks like: `https://skyfeed-api-xyz.railway.app`)
3. **COPY THIS** – you need it for Vercel!

---

## Step 3️⃣: Frontend (Vercel) — 5 minutes

### 3a) Deploy Frontend
- Go: https://vercel.com
- Click: "Import Project"
- Paste: `https://github.com/jirin1997-wq/skyfeed`
- Vercel detects "Next.js" → great!
- Click: "Continue"

### 3b) Add Environment Variable
**BEFORE** clicking "Deploy":
1. Click: "Environment Variables"
2. Add:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: Your Railway URL from Step 2c
   - Example: `https://skyfeed-api-xyz.railway.app`

### 3c) Deploy
1. Click: "Deploy"
2. ⏳ Wait ~5 minutes (builds Next.js)
3. Once done → You get a live URL!
4. Example: `https://skyfeed-xyz.vercel.app`

---

## ✅ Test Everything Works

| Test | Expected | How to Check |
|------|----------|--------------|
| Frontend loads | Homepage visible | Visit your Vercel URL |
| News loads | Article cards show | Scroll down |
| Airports page | Map + markers | Click "Airport Directory" |
| Rentals page | Rental companies + websites | Click "Rentals" |
| Schools page | Flight schools + websites | Click "Schools" |
| Map popups | Click marker → website opens | Click any marker |

---

## 🎉 YOU'RE LIVE!

### Your URLs:
- **Frontend:** `https://skyfeed-xyz.vercel.app` ← Share this!
- **Backend API:** `https://skyfeed-api-xyz.railway.app`
- **Database:** Supabase (managed)

### Updates from now on:
Just push to GitHub:
```bash
git add -A
git commit -m "new feature"
git push origin main
```
→ Automatically deploys to Vercel & Railway! 🚀

---

## Troubleshooting

**Frontend shows "API Error"**
- ✅ Check Vercel env var `NEXT_PUBLIC_API_URL` is set
- ✅ Verify it has `https://` (not http)
- ✅ Railway deployment is green ✅

**No articles appear**
- ✅ Backend might still be starting (takes 1-2 min)
- ✅ Check Railway logs: Deployments → click one → Logs

**Maps don't show**
- ✅ Browser cache might be stale (Ctrl+Shift+Del)
- ✅ Check browser console (F12) for JavaScript errors

**Website links don't work**
- ✅ Make sure marker popup has the website link
- ✅ Click the actual "Visit Website" button in the card

---

**Questions?** Check DEPLOYMENT_GUIDE.md for detailed setup

🚀 Happy flying!
