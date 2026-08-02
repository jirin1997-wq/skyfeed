# 🚀 SkyFeed - DEPLOYMENT READY

**Tvůj projekt je 100% připravený na production deployment!**

---

## 📦 REPO STATUS

```
✅ GitHub Repository:     https://github.com/jirin1997-wq/skyfeed
✅ Backend Code:          /src (Node.js + Fastify + TypeScript)
✅ Frontend Code:         /web (Next.js 14 + React 19)
✅ Database Schema:       /prisma/schema.prisma (7 models)
✅ API Routes:            8 kategorií (articles, airports, rentals, schools, links, ads, admin)
✅ Components:            AirportsMap, ResourceLinks, AdsDisplay
✅ Docker Support:        docker-compose.yml + Dockerfile
✅ Configuration:         railway.toml + vercel.json
✅ Documentation:         README.md + DEPLOYMENT_GUIDE.md
✅ Seed Data:             15+ airports, 20+ schools/rentals, sample ads
```

---

## 🎯 DEPLOYMENT CHECKLIST

Sled tyto kroky v PŘESNÉM pořadí:

### ✅ KROK 1: Supabase (5 minut)

- [ ] Jdi na https://supabase.com
- [ ] Sign up s GitHub (jirin1997-wq)
- [ ] Vytvoř nový projekt "skyfeed"
- [ ] Zkopíruj connection string (DATABASE_URL)
- [ ] Jdi do SQL Editor a spusť seed SQL (viz DEPLOYMENT_GUIDE.md)
- [ ] Ověř, že tabulky existují v "Table Editor"

**ULOŽ SI**: `postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres`

### ✅ KROK 2: Railway (5 minut)

- [ ] Jdi na https://railway.app
- [ ] Sign in s GitHub
- [ ] Click "Create New Project"
- [ ] Vyber "Deploy from GitHub repo"
- [ ] Autorizuj a vyber "skyfeed"
- [ ] Railway auto-detekuje a deployuje
- [ ] Čeká na completion (2-3 minuty)
- [ ] Přidej environment variables:
  - [ ] DATABASE_URL = [z Supabase]
  - [ ] PORT = 3001
  - [ ] NODE_ENV = production
  - [ ] FRONTEND_URL = https://skyfeed-web.vercel.app (později)
  - [ ] ADMIN_TOKEN = [generate strong password]
- [ ] Ověř v Deployments: Status = "Success"
- [ ] Zkopíruj "Railway URL" (endpoint)

**ULOŽ SI**: `https://skyfeed-api-production-xxx.railway.app`

### ✅ KROK 3: Vercel (5 minut)

- [ ] Jdi na https://vercel.com
- [ ] Sign in s GitHub
- [ ] Click "Add New" → "Project"
- [ ] Vyber "skyfeed"
- [ ] V projekt settings:
  - [ ] Root Directory = "web" (NE "/")
  - [ ] Framework = "Next.js"
- [ ] Přidej environment variable:
  - [ ] NEXT_PUBLIC_API_URL = [z Railway]
- [ ] Click "Deploy"
- [ ] Čeká na completion (2-3 minuty)
- [ ] Zkopíruj "Vercel URL"

**ULOŽ SI**: `https://skyfeed-web.vercel.app` (nebo tvůj URL)

### ✅ KROK 4: Finalizuj Railway

- [ ] Vrať se do Railway
- [ ] Aktualizuj FRONTEND_URL = [Vercel URL z kroku 3]
- [ ] Railway se auto-redployuje

---

## 🌐 TVOJE LIVE URLS

Po dokončení všech kroků:

```
🌐 Frontend:  https://skyfeed-web.vercel.app
🔌 API:       https://skyfeed-api-production-xxx.railway.app
🗄️  Database:  Supabase PostgreSQL
```

---

## ✨ FEATURES LIVE

Jakmile je vše deployované:

### 📰 News Feed
- [ ] Články se načítají (každých 4 hodin aktualizuje)
- [ ] Filtrování po kategoriích funguje
- [ ] Search funguje
- [ ] Linky otevírají externos (nový tab)

### 🗺️ Airport Directory
- [ ] Interaktivní mapa zobrazuje letiště
- [ ] Filtr po zemích funguje
- [ ] Info popup zobrazuje detaily
- [ ] Webové linky letiště fungují

### 🚁 Rentals & 🎓 Schools
- [ ] Rental companies se zobrazují na mapě
- [ ] Flight schools se zobrazují
- [ ] Kontakty jsou viditelné
- [ ] Webové linky fungují

### 🔗 Resources
- [ ] Featured resources se zobrazují
- [ ] Kategorizace funguje
- [ ] Všechny linky fungují

### 📢 Marketplace (Ads)
- [ ] Formulář pro novou inzerce funguje
- [ ] Schválené inzerce se zobrazují
- [ ] Tracking views a clicks funguje

---

## 🔧 ADMIN PANEL (LATER)

Přístup k admin funkcím:

```bash
# Moderovat inzerce
curl -H "Authorization: Bearer [ADMIN_TOKEN]" \
  https://skyfeed-api-xxx.railway.app/api/admin/ads/pending

# Schválit inzerce
curl -X POST \
  -H "Authorization: Bearer [ADMIN_TOKEN]" \
  https://skyfeed-api-xxx.railway.app/api/admin/ads/123/approve

# System statistiky
curl -H "Authorization: Bearer [ADMIN_TOKEN]" \
  https://skyfeed-api-xxx.railway.app/api/admin/stats
```

---

## 🐛 TROUBLESHOOTING

### Články se nenačítají
- Čekej 4+ hodin (agregátor běží každých 4 hodin)
- Zkontroluj Railway Logs (Railway → Logs tab)
- Hledej "Aggregation complete" zprávu

### Mapa se nenačítá
- Zkontroluj browser console (F12)
- Refreshni stránku
- Zkontroluj že Leaflet CSS je načten

### API nefunguje
- Zkontroluj Railway deployment status
- Zkontroluj environment variables
- Test: `https://skyfeed-api-xxx.railway.app/health`

### Database error
- Zkontroluj DATABASE_URL v Railway
- Zkontroluj že Supabase projekt je ACTIVE
- Restartuj Railway deployment

---

## 📊 POST-DEPLOYMENT TASKS

Jakmile je vše live:

- [ ] Test všech features (viz checklist výše)
- [ ] Setup Google Analytics
- [ ] Setup Sentry error tracking
- [ ] Prépna custom doména (pokud máš)
- [ ] Nastavit email notifications
- [ ] Setup database backups
- [ ] Configure CDN (pro images)
- [ ] Monitoring/alerting

---

## 🎯 NEXT STEPS (FUTURE)

Jakmile máš vše live:

1. **Mobile App** - React Native
2. **Newsletter** - Mailchimp integration
3. **User Accounts** - Sign up, bookmarks, favorites
4. **Premium Ads** - Featured placements
5. **API Documentation** - Public API docs
6. **Admin Dashboard UI** - Web-based admin
7. **Email Notifications** - Ad approvals
8. **Multi-language** - i18n support
9. **AI Summaries** - Auto article summaries
10. **Flight Tracking** - Real-time flight integration

---

## 💡 TIPS

- **Auto-deploy**: Všechny změny v GitHub → auto-deploy na Railway + Vercel
- **Database**: Supabase poskytuje free backups, logging, monitoring
- **Monitoring**: Railway a Vercel mají built-in logs a alerts
- **Scaling**: Railway/Vercel automaticky scale dle traffic
- **Costs**: Všechno je FREE tier - žádné náklady!

---

## 📞 SUPPORT

- **GitHub**: https://github.com/jirin1997-wq/skyfeed
- **Railway Logs**: Railway dashboard → Logs
- **Vercel Logs**: Vercel dashboard → Deployments
- **Supabase**: Supabase dashboard → Table Editor

---

## ✅ DEPLOYMENT SUMMARY

| Component | Status | URL |
|-----------|--------|-----|
| Frontend | ✅ Ready | https://skyfeed-web.vercel.app |
| Backend | ✅ Ready | https://skyfeed-api-xxx.railway.app |
| Database | ✅ Ready | Supabase PostgreSQL |
| GitHub | ✅ Ready | https://github.com/jirin1997-wq/skyfeed |
| Docker | ✅ Ready | docker-compose up |

---

## 🎉 READY?

**Sled DEPLOYMENT_GUIDE.md step-by-step a máš live aplikaci za 30 minut!**

```
Supabase (5m) → Railway (5m) → Vercel (5m) → Update Railway (2m) → LIVE! 🚀
```

---

**SkyFeed - Production Ready Aviation Hub**
**Postaveno pro piloty. Vytvořeno s ❤️ pro komunitu.**

✈️ **HAPPY FLYING!** ✈️
