# 🚀 SkyFeed - Complete Deployment Guide

**Tvůj projekt je připravený. Teď ho nasadíme live!**

Čas na dokončení: **15-20 minut**
Náklady: **$0/měsíc** (všechny free tiery)

---

## 📋 Co budeš dělat:

```
1. Vytvořit Supabase projekt (5 min)
2. Nasadit backend na Railway (5 min)
3. Nasadit frontend na Vercel (5 min)
4. Ověřit že to funguje (5 min)
```

---

## ✅ STEP 1: SUPABASE DATABÁZE (5 minut)

### 1.1 Vytvoř projekt

```
Jdi na: https://supabase.com
Klikni: Sign Up → GitHub (jirin1997-wq)
```

### 1.2 Vytvoř nový projekt

```
Click: "Create a new project" nebo "+ New project"

Vyplň:
- Project name: skyfeed
- Database password: [klikni Generate - ulož si to!]
- Region: [vyber blíž Česku - EU Central nebo West]
- Click: "Create new project"

⏳ Čekej 2-3 minuty až se vytvoří...
```

### 1.3 Najdi Connection String

```
Dashboard → Settings (vlevo dole) → Database

Pod "Connection strings" vyber: "URI"

Bude to vypadat takhle:
postgresql://postgres:password@db.PROJECT.supabase.co:5432/postgres

⚠️ ULOŽ SI TO! Budeš to potřebovat!
```

### 1.4 Vytvoř tabulky

```
V Supabase dashboardu:
1. Jdi na "SQL Editor" (vlevo)
2. Klikni "+ New Query"
3. Kopíruj tenhle SQL a spusť:
```

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

-- Create indexes
CREATE INDEX "idx_Article_published" ON "Article"("published");
CREATE INDEX "idx_Article_category" ON "Article"("category");
CREATE INDEX "idx_Article_sourceId" ON "Article"("sourceId");

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
```

```
Klikni: "Run" (nebo Ctrl+Enter)
✅ Mělo by to skončit s "Success"
```

---

## ✅ STEP 2: RAILWAY BACKEND (5 minut)

### 2.1 Vytvoř Railway projekt

```
Jdi na: https://railway.app
Klikni: "Create New Project"
Vyber: "Deploy from GitHub repo"
Autorizuj GitHub (jirin1997-wq)
Vyber: "skyfeed" repository
```

### 2.2 Konfiguruj projekt

```
Railway auto-detekuje, že to je Node.js projekt.

Klikni na "skyfeed" service
Jdi na: "Variables" tab

Přidej proměnnou:
- Name: DATABASE_URL
- Value: [zkopíruj connection string z Supabase kroku 1.3]
- Click: "Add"

✅ Railway by měl automaticky deployovat
```

### 2.3 Počkej na deploy

```
Jdi na: "Deployments" tab
Měl by vidět "Building..." → "Deploying..." → "Success"

⏳ Čeká 2-3 minuty
```

### 2.4 Najdi API URL

```
Po úspěšném deployi:
1. Klikni na latest deployment
2. U "Railway URL" by mělo být něco jako:

https://skyfeed-api-production-abc123.up.railway.app

⚠️ ULOŽ SI TUHLE URL! Budeš ji potřebovat pro Vercel!
```

### 2.5 Ověř API

```
Otevři v prohlížeči:
https://skyfeed-api-production-abc123.up.railway.app/health

Mělo by vrátit:
{
  "status": "ok",
  "timestamp": "2026-08-01T22:00:00.000Z",
  "environment": "production"
}

✅ Pokud vidíš to - backend funguje!
```

---

## ✅ STEP 3: VERCEL FRONTEND (5 minut)

### 3.1 Přidej projekt

```
Jdi na: https://vercel.com
Klikni: "Add New" → "Project"
Vyber: "skyfeed" repository (měl by být v seznamu)
```

### 3.2 Konfiguruj projekt

```
Vercel zobrazí:
- "Project Name": skyfeed-web (ok)
- "Framework Preset": Next.js (mělo by být auto-detectnuto)

DŮLEŽITÉ - dole přidej ROOT DIRECTORY:
Vyber: "web" (ne "/")

Click: "Continue"
```

### 3.3 Přidej environment variables

```
Zobrazí se sekce "Environment Variables"

Přidej:
- Name: NEXT_PUBLIC_API_URL
- Value: [Zkopíruj z Railway kroku 2.4]
  Např: https://skyfeed-api-production-abc123.up.railway.app

Click: "Deploy"
```

### 3.4 Čekej na deployment

```
Vercel začne s "Cloning..." → "Building..." → "Deploying..."

⏳ Čeká 2-3 minuty

Až bude hotové, zobrazí se ti URL:
https://skyfeed-web.vercel.app (nebo jiné)

⚠️ ULOŽ SI TUTO URL!
```

### 3.5 Ověř web

```
Otevři v prohlížeči:
https://skyfeed-web.vercel.app

Měls vidět:
✈️ SkyFeed - Aviation News Hub
+ tlačítko "Search"
+ kategorie (All Articles, Safety, News, etc.)

✅ Pokud vidíš toto - frontend funguje!
```

---

## 🎉 KROK 4: OVĚŘENÍ (5 minut)

### 4.1 Načítají se články?

```
Na https://skyfeed-web.vercel.app:

1. Měli bys vidět články v gridu
2. Pokud ne, čekej 4+ hodiny (agregátor běží každých 4 hodin)
3. Nebo ověř Railway logs:
   - Railway dashboard → Logs
   - Hledej "✅ Aggregation complete"
```

### 4.2 Ověř filtrování

```
1. Klikni na kategorie (Safety, News, Regulations)
2. Měly by se filtrovat články
3. Zkus hledat (Search box)
```

### 4.3 Klikni na článek

```
1. Klikni na libovolný článek
2. Měl by se otevřít v novém tabu (externí odkaz)
3. Měl bys vidět originální článek ze zdroje
```

---

## 📊 TVOJE LIVE URLS

```
🌐 Frontend: https://skyfeed-web.vercel.app
🔌 API: https://skyfeed-api-production-xxx.up.railway.app
🗄️  Database: Supabase PostgreSQL

✅ LIVE! 🎉
```

---

## 🔄 Auto-Deploy nastaveno!

```
Teď když pushuješ do GitHub → ALL aplikace se auto-deployují:

GitHub main branch
    ↓
Railway auto-deploy (backend)
    ↓
Vercel auto-deploy (frontend)
    ↓
Živá změna!

Příklad:
1. Přidáš nový RSS zdroj v src/config/rss-sources.ts
2. git push
3. Za 2 minuty je změna live!
```

---

## 🐛 Co když to nefunguje?

### "Failed to load articles"

```
1. Ověř Railway logs (Railway → Logs tab)
2. Hledej chyby v DATABASE_URL
3. Ověř že Supabase databáze má tabulky (kroku 1.4)
4. Restart Railway deployment
```

### "Cannot connect to API"

```
1. Ověř že Railway URL je správná v Vercel env vars
2. Ověř že Railway URL není ended s / (mělo by být bez)
3. Ověř že /health endpoint vrací ok
4. Restart Vercel deployment
```

### "No articles found"

```
1. RSS agregátor běží jen každých 4 hodiny
2. Čekej 4+ hodiny od nasazení
3. Nebo manual trigger (later):
   - Railway → Logs
   - Hledej "aggregation" zprávy
```

### "Database connection failed"

```
1. Ověř CONNECTION STRING v Railway
2. Zkontroluj heslo (nemělo by mít speciální znaky bez escape)
3. Ověř že Supabase projekt je ACTIVE
4. Pokud ne, dupluj kroku 1.1-1.4
```

---

## 🎯 CHECKLIST

```
✅ Supabase projekt vytvořen
✅ Tabulky vytvořeny (SQL query spuštěn)
✅ Connection string uložen
✅ Railway connected a deployován
✅ DATABASE_URL přidán v Railway
✅ Railway /health endpoint vrací ok
✅ Vercel connected a deployován
✅ NEXT_PUBLIC_API_URL přidán v Vercel
✅ Frontend se otevírá
✅ Články se načítají
✅ Filtrování funguje
✅ Search funguje
✅ Auto-deploy z GitHub funguje
```

---

## 📞 SUPPORT

Pokud něco nefunguje:

1. **Ověř všechny environment variables** - Nejčastější problém
2. **Zrestartuj deployments** - Railway/Vercel
3. **Ověř GitHub push** - Ujisti se že je všechno pushnuté
4. **Check logs** - Railway & Vercel mají detailní logs
5. **Počkej 5 minut** - Propagace může trvat

---

## 🚀 HOTOVO!

Máš svůj **live, moderní, production-ready SkyFeed** nasazený! 🎉

Co dál:
- Přidat custom doménu
- Nastavit monitoring
- Přidat newsletter
- Rozšířit RSS zdroje
- Tvořit vlastní obsah

Potřebueš help? Řekni co chceš dělat! 👇
