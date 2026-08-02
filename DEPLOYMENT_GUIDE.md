# 🚀 SkyFeed - Complete Production Deployment Guide

**Čas**: ~30 minut | **Náklady**: €0 (free tier) | **Uptime**: 99.9%

---

## 📋 PART 1: SUPABASE DATABASE SETUP (5 minut)

### 1.1 Vytvoř Supabase projekt

1. Jdi na **https://supabase.com**
2. Klikni **"Sign Up"** → GitHub (jirin1997-wq)
3. Autorizuj Supabase access k GitHub
4. Klikni **"New Project"**

### 1.2 Vyplň project details

```
Project Name:        skyfeed
Database Password:   [Generate] ← ULOŽ SI TO!
Region:              eu-west (Ireland) - nejblíž ČR
```

5. Klikni **"Create new project"**
6. **Čekej 2-3 minuty** až se vytvoří databáze

### 1.3 Najdi connection string

Po vytvoření projektu:

1. Vlevo dole klikni **"Settings"**
2. Jdi na **"Database"**
3. Pod "Connection strings" vyber **"URI"**
4. Měla bys vidět:

```
postgresql://postgres:[password]@db.PROJECT_ID.supabase.co:5432/postgres
```

5. **ULOŽ SI TO** - budeš to potřebovat!

### 1.4 Inicializuj databázi

V Supabase dashboardu:

1. Vlevo klikni **"SQL Editor"**
2. Klikni **"New Query"**
3. Zkopíruj a spusť tento SQL:

```sql
-- Create RSSSource table
CREATE TABLE "RSSSource" (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR UNIQUE NOT NULL,
  "title" VARCHAR NOT NULL,
  "category" VARCHAR NOT NULL,
  "active" BOOLEAN DEFAULT true,
  "lastFetch" TIMESTAMP,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create Article table
CREATE TABLE "Article" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "content" TEXT NOT NULL,
  "link" VARCHAR UNIQUE NOT NULL,
  "author" VARCHAR,
  "imageUrl" VARCHAR,
  "sourceId" INTEGER NOT NULL REFERENCES "RSSSource"("id") ON DELETE CASCADE,
  "category" VARCHAR NOT NULL,
  "published" TIMESTAMP NOT NULL,
  "fetched" TIMESTAMP DEFAULT NOW(),
  "featured" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create Airport table
CREATE TABLE "Airport" (
  "id" SERIAL PRIMARY KEY,
  "icao" VARCHAR UNIQUE NOT NULL,
  "iata" VARCHAR,
  "name" VARCHAR NOT NULL,
  "city" VARCHAR NOT NULL,
  "country" VARCHAR NOT NULL,
  "latitude" FLOAT NOT NULL,
  "longitude" FLOAT NOT NULL,
  "elevation" INTEGER,
  "website" VARCHAR,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create AircraftRental table
CREATE TABLE "AircraftRental" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "website" VARCHAR NOT NULL,
  "phone" VARCHAR,
  "email" VARCHAR,
  "description" TEXT NOT NULL,
  "city" VARCHAR NOT NULL,
  "country" VARCHAR NOT NULL,
  "latitude" FLOAT,
  "longitude" FLOAT,
  "aircraftTypes" VARCHAR,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create FlightSchool table
CREATE TABLE "FlightSchool" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "website" VARCHAR NOT NULL,
  "phone" VARCHAR,
  "email" VARCHAR,
  "description" TEXT NOT NULL,
  "city" VARCHAR NOT NULL,
  "country" VARCHAR NOT NULL,
  "latitude" FLOAT,
  "longitude" FLOAT,
  "certifications" VARCHAR,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create ResourceLink table
CREATE TABLE "ResourceLink" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "url" VARCHAR UNIQUE NOT NULL,
  "description" TEXT NOT NULL,
  "category" VARCHAR NOT NULL,
  "icon" VARCHAR,
  "featured" BOOLEAN DEFAULT false,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create Advertisement table
CREATE TABLE "Advertisement" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "description" TEXT NOT NULL,
  "imageUrl" VARCHAR,
  "link" VARCHAR NOT NULL,
  "category" VARCHAR NOT NULL,
  "authorName" VARCHAR NOT NULL,
  "authorEmail" VARCHAR NOT NULL,
  "authorPhone" VARCHAR,
  "startDate" TIMESTAMP NOT NULL,
  "endDate" TIMESTAMP NOT NULL,
  "active" BOOLEAN DEFAULT true,
  "approved" BOOLEAN DEFAULT false,
  "impressions" INTEGER DEFAULT 0,
  "clicks" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX "idx_Article_published" ON "Article"("published");
CREATE INDEX "idx_Article_category" ON "Article"("category");
CREATE INDEX "idx_Article_sourceId" ON "Article"("sourceId");
CREATE INDEX "idx_Airport_country" ON "Airport"("country");
CREATE INDEX "idx_AircraftRental_country" ON "AircraftRental"("country");
CREATE INDEX "idx_FlightSchool_country" ON "FlightSchool"("country");
CREATE INDEX "idx_ResourceLink_category" ON "ResourceLink"("category");
CREATE INDEX "idx_ResourceLink_featured" ON "ResourceLink"("featured");
CREATE INDEX "idx_Advertisement_active" ON "Advertisement"("active");
CREATE INDEX "idx_Advertisement_approved" ON "Advertisement"("approved");
```

4. Klikni **"Run"**
5. ✅ Měl bys vidět "Success"

### 1.5 Seed data

V Supabase SQL Editor spusť:

```sql
-- Insert RSS sources
INSERT INTO "RSSSource" ("url", "title", "category") VALUES
('https://feeds.aviation-safety.net/news.xml', 'Aviation Safety Network', 'Safety'),
('https://www.avweb.com/feed', 'AVweb', 'News'),
('https://generalaviationnews.com/feed/', 'General Aviation News', 'News'),
('https://www.aopa.org/news-and-media/all-news/rss.xml', 'AOPA', 'News'),
('https://www.flightglobal.com/rss/news', 'Flight Global', 'News'),
('https://www.ainonline.com/rss/news', 'AIN Online', 'News'),
('https://www.faa.gov/news/feed.xml', 'FAA News', 'Regulations'),
('https://www.easa.europa.eu/feed', 'EASA', 'Regulations');

-- Insert sample airports
INSERT INTO "Airport" ("icao", "iata", "name", "city", "country", "latitude", "longitude", "elevation", "website") VALUES
('LKPR', 'PRG', 'Václav Havel Airport Prague', 'Prague', 'Czech Republic', 50.1008, 14.26, 365, 'https://www.prague-airport.com'),
('LKBR', 'BRN', 'Brno Airport', 'Brno', 'Czech Republic', 49.1547, 16.6969, 241, 'https://www.brno-airport.cz'),
('LKPD', NULL, 'Podborany Airfield', 'Podborany', 'Czech Republic', 50.2333, 13.8333, 228, NULL),
('LKMT', NULL, 'Moravska Trebova Airfield', 'Moravska Trebova', 'Czech Republic', 49.5817, 16.6333, 230, NULL),
('LKKV', 'KV', 'Kunovice Airport', 'Kunovice', 'Czech Republic', 49.0119, 17.6733, 205, 'https://www.letiste-kunovice.cz'),
('EDDF', 'FRA', 'Frankfurt am Main Airport', 'Frankfurt', 'Germany', 50.0379, 8.5622, 364, 'https://www.frankfurt-airport.com'),
('LFPG', 'CDG', 'Paris Charles de Gaulle', 'Paris', 'France', 49.0097, 2.5479, 392, 'https://www.parisaeroport.fr'),
('EGLL', 'LHR', 'London Heathrow Airport', 'London', 'United Kingdom', 51.4706, -0.4619, 83, 'https://www.heathrow.com');

-- Insert sample rental companies
INSERT INTO "AircraftRental" ("name", "website", "phone", "email", "description", "city", "country", "latitude", "longitude", "aircraftTypes") VALUES
('Brno Aero Club', 'https://www.brno-aero.cz', '+420541212121', 'info@brno-aero.cz', 'General aviation rental', 'Brno', 'Czech Republic', 49.1547, 16.6969, '["Cessna 172", "Piper PA-28", "Diamond DA40"]'),
('Prague Aviation', 'https://www.prague-aviation.cz', '+420224411755', 'booking@prague-aviation.cz', 'Professional aircraft rental', 'Prague', 'Czech Republic', 50.1008, 14.26, '["Cessna 172", "Cessna 182", "Piper Seneca"]');

-- Insert sample flight schools
INSERT INTO "FlightSchool" ("name", "website", "phone", "email", "description", "city", "country", "latitude", "longitude", "certifications") VALUES
('Brno Flight Academy', 'https://www.brno-flight-academy.cz', '+420541212121', 'training@brno-flight-academy.cz', 'Professional pilot training', 'Brno', 'Czech Republic', 49.1547, 16.6969, '["PPL", "CPL", "ATPL", "Instrument Rating"]'),
('Prague Pilot School', 'https://www.prague-pilot-school.cz', '+420224411755', 'info@prague-pilot-school.cz', 'Learn to fly in Prague', 'Prague', 'Czech Republic', 50.1008, 14.26, '["PPL", "CPL", "Multi-Engine", "Instrument"]');

-- Insert resource links
INSERT INTO "ResourceLink" ("title", "url", "description", "category", "icon", "featured") VALUES
('EASA - European Aviation Safety Agency', 'https://www.easa.europa.eu', 'European regulations, certifications, and safety', 'flying', '📋', true),
('Aviation Safety Network', 'https://aviation-safety.net', 'Aviation accident database and safety', 'flying', '🛡️', true),
('AOPA - Aircraft Owners and Pilots Association', 'https://www.aopa.org', 'Advocacy and resources for pilots', 'communities', '✈️', true),
('Flight Radar 24', 'https://www.flightradar24.com', 'Real-time flight tracking', 'tools', '🛰️', true),
('Skyvector', 'https://skyvector.com', 'Free flight planning and navigation', 'tools', '🗺️', true);
```

6. Klikni **"Run"**

✅ **Supabase je hotový!**

---

## 🚂 PART 2: RAILWAY BACKEND DEPLOYMENT (5 minut)

### 2.1 Připoj GitHub repozitář

1. Jdi na **https://railway.app**
2. Klikni **"Create New Project"**
3. Vyber **"Deploy from GitHub repo"**
4. Autorizuj GitHub (jirin1997-wq)
5. Vyber **"skyfeed"** repository
6. Klikni **"Deploy"**

Railway se automaticky detekuje jako Node.js projekt.

### 2.2 Přidej environment variables

Po deployi:

1. V Railway dashboardu klikni na **"skyfeed"** service
2. Jdi na **"Variables"** tab
3. Přidej tyto proměnné:

```
DATABASE_URL = [zkopíruj z Supabase kroku 1.3]
PORT = 3001
NODE_ENV = production
FRONTEND_URL = https://skyfeed-web.vercel.app (později aktualizuj na tvůj Vercel URL)
ADMIN_TOKEN = [vygeneruj silné heslo, např: $(openssl rand -base64 32)]
```

4. Klikni **"Add"** pro každou proměnnou
5. Railway se automaticky **redployuje**

### 2.3 Ověř deployment

Po ~2 minutách:

1. V Railway klikni **"Deployments"** tab
2. Měl bys vidět status: ✅ **"Success"**
3. V deployment detailech najdi **"Railway URL"**
   - Bude to něco jako: `https://skyfeed-api-production-abc123.up.railway.app`
4. **ULOŽ SI TUTO URL!** Budeš ji potřebovat pro Vercel

### 2.4 Test API

Otevři v prohlížeči:
```
https://skyfeed-api-production-abc123.up.railway.app/health
```

Měl bys vidět:
```json
{
  "status": "ok",
  "timestamp": "2026-08-02T...",
  "environment": "production"
}
```

✅ **Backend je LIVE!**

---

## 🌐 PART 3: VERCEL FRONTEND DEPLOYMENT (5 minut)

### 3.1 Přidej projekt

1. Jdi na **https://vercel.com**
2. Klikni **"Add New"** → **"Project"**
3. Autorizuj GitHub
4. Vyber **"skyfeed"** repository

### 3.2 Konfiguruj projekt

Vercel ti zobrazí settings:

```
Project Name:          skyfeed-web (ok)
Framework:             Next.js (auto-detected)
Build Command:         (default - ok)
Output Directory:      (default - ok)
Install Command:       (default - ok)
Root Directory:        web ← ZMĚŇ NA "web"!
```

1. Změň **"Root Directory"** z "/" na **"web"**
2. Klikni **"Continue"**

### 3.3 Přidej environment variables

Zobrazí se sekce "Environment Variables":

```
Name:  NEXT_PUBLIC_API_URL
Value: [zkopíruj Railway URL z kroku 2.3]
       Např: https://skyfeed-api-production-abc123.up.railway.app
```

1. Klikni **"Add"**
2. Klikni **"Deploy"**

Vercel začne s deploym. **Čeká 2-3 minuty.**

### 3.4 Ověř frontend

Po deployi:

1. Vercel ti dá URL (něco jako `https://skyfeed-web.vercel.app`)
2. Otevři v prohlížeči
3. Měls vidět:
   - ✈️ **SkyFeed** header
   - Search bar
   - Kategorie tlačítka
   - Články gridu

✅ **Frontend je LIVE!**

---

## 🎯 PART 4: FINÁLNÍ SETUP (5 minut)

### 4.1 Aktualizuj Railway environment

Teď když máš Vercel URL:

1. Jdi do Railway dashboardu
2. Klikni na **"skyfeed"** service
3. Jdi na **"Variables"**
4. Aktualizuj `FRONTEND_URL`:
   ```
   FRONTEND_URL = https://skyfeed-web.vercel.app [tvůj URL z Vercel]
   ```
5. Klikni **"Update"**
6. Railway se redployuje

### 4.2 Ověř deployment

Počkej 2 minuty a zkus:

```bash
# Test backend
curl https://skyfeed-api-xxx.railway.app/api/articles

# Měl bys dostat JSON s články
```

Vercel by měl automaticky refreshnout.

### 4.3 Otevři živou aplikaci

**Frontend:** https://skyfeed-web.vercel.app  
**API:** https://skyfeed-api-xxx.railway.app

✅ **Máš live aplikaci!**

---

## 📊 PART 5: POST-DEPLOYMENT CHECKLIST

- [ ] Frontend se otevírá bez chyb
- [ ] Backend health check vrací OK
- [ ] Články se načítají
- [ ] Filtrování funguje
- [ ] Mapa letišť se zobrazuje
- [ ] Inzerce se zobrazují
- [ ] Obsah se otevírá v nových tabulích (vnější linky)
- [ ] Database backups jsou nastaveny (Supabase)

---

## 🔄 AUTO-DEPLOYMENT

Teď když máš vše live:

```
Git commit → GitHub main branch
                    ↓
            Railway auto-deploy
            Vercel auto-deploy
                    ↓
            Živá změna za 2 minuty!
```

Příklad: Přidat nový RSS zdroj

```bash
# 1. Edit src/config/rss-sources.ts
# 2. git commit -m "Add new RSS source"
# 3. git push
# 4. Za 2 minuty je to live na backend + frontend!
```

---

## 🐛 TROUBLESHOOTING

### "Failed to load articles"
1. Zkontroluj Railway logs (Railway → Logs)
2. Ověř DATABASE_URL v environment variables
3. Ověř že /health endpoint vrací OK

### "Cannot connect to API"
1. Zkontroluj Vercel env var `NEXT_PUBLIC_API_URL`
2. Ověř že URL je správná (bez trailing /)
3. Restartuj Vercel deployment

### "Map not showing"
1. Zkontroluj browser console na chyby
2. Ověř že Leaflet je správně načten
3. Refreshni stránku

### Database Connection Error
1. Zkontroluj Supabase connection string
2. Ověř že projekt je ACTIVE v Supabase
3. Zkontroluj heslo (bez speciálních znaků bez escape)

---

## 📞 SUPPORT

- **GitHub Issues**: https://github.com/jirin1997-wq/skyfeed/issues
- **Railway Logs**: Railway app → Logs tab
- **Vercel Logs**: Vercel dashboard → Deployments
- **Database**: Supabase dashboard → SQL Editor

---

## 🎉 HOTOVO!

Máš **production-ready** aviation hub! 🚀

Další kroky:
- [ ] Custom doména
- [ ] Google Analytics
- [ ] Sentry error tracking
- [ ] Newsletter integration
- [ ] Mobile app

Hodně štěstí! ✈️
