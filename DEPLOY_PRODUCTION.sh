#!/usr/bin/env bash

# 🚀 SkyFeed - Complete Deployment Guide
# Author: Claude
# Purpose: Deploy SkyFeed to production (Supabase, Railway, Vercel)
# Time: ~20 minutes
# Cost: €0 (all free tiers!)

set -e

clear

cat << "EOF"
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║    ✈️  SKYFEED - Aviation News Hub                                   ║
║    Production Deployment Guide                                       ║
║                                                                      ║
║    Time: 15-20 minutes                                               ║
║    Cost: €0/month (all free tier services)                           ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
EOF

echo ""
echo "📋 What you need:"
echo "  ✅ GitHub account (jirin1997-wq)"
echo "  ✅ Web browser"
echo "  ✅ Internet connection"
echo ""
echo "🎯 What you'll get:"
echo "  🌐 Live frontend at https://skyfeed-web.vercel.app"
echo "  🔌 Live API at https://skyfeed-api-xxx.railway.app"
echo "  🗄️  Live database on Supabase"
echo ""
echo "⏱️  Ready? Let's go!"
echo ""

read -p "Press Enter to start deployment..." -t 5

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 1️⃣  SUPABASE DATABASE (5 minutes)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔗 Open in browser: https://supabase.com"
echo ""
echo "1️⃣  Sign up with GitHub (jirin1997-wq)"
echo "2️⃣  Click 'Create new project'"
echo "3️⃣  Fill in:"
echo "    • Project name: skyfeed"
echo "    • Database password: [click Generate button]"
echo "    • Region: Pick closest to you (e.g., eu-central-1)"
echo "4️⃣  Click 'Create new project'"
echo "5️⃣  ⏳ Wait 2-3 minutes for project to initialize..."
echo ""
echo "6️⃣  After project created:"
echo "    • Go to: Settings (⚙️) → Database"
echo "    • Find: 'Connection Strings' section"
echo "    • Copy: The 'URI' connection string"
echo "    • ⚠️  Save it somewhere - you'll need it next!"
echo ""
echo "Example connection string:"
echo "postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres"
echo ""

read -p "When you have the connection string, paste it here: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
    echo "❌ No connection string provided. Exiting."
    exit 1
fi

echo ""
echo "✅ Connection string saved!"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 2️⃣  RAILWAY BACKEND (5 minutes)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔗 Open in browser: https://railway.app"
echo ""
echo "1️⃣  Sign in with GitHub (jirin1997-wq)"
echo "2️⃣  Click 'Create New Project'"
echo "3️⃣  Select: 'Deploy from GitHub repo'"
echo "4️⃣  Authorize Railway with GitHub (follow prompts)"
echo "5️⃣  Select repository: 'skyfeed' from the list"
echo "6️⃣  ⏳ Wait for project detection..."
echo ""
echo "7️⃣  After detection completes:"
echo "    • Click on 'skyfeed' service"
echo "    • Go to: 'Variables' tab"
echo "    • Add new variable:"
echo "      - Name: DATABASE_URL"
echo "      - Value: [PASTE the connection string from Step 1]"
echo "    • Click 'Add Variable'"
echo "8️⃣  Railway auto-starts deployment"
echo "9️⃣  ⏳ Wait 2-3 minutes for deployment to complete"
echo "    • You'll see: 'Building...' → 'Deploying...' → 'Success ✅'"
echo ""
echo "🔟 Get your Railway URL:"
echo "   • Go to: 'Deployments' tab"
echo "   • Click latest deployment"
echo "   • Copy: 'Railway URL' (looks like: https://...railway.app)"
echo ""

read -p "Paste your Railway API URL here: " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
    echo "❌ No Railway URL provided. Exiting."
    exit 1
fi

# Clean trailing slash
RAILWAY_URL="${RAILWAY_URL%/}"

echo ""
echo "✅ Railway URL saved: $RAILWAY_URL"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 3️⃣  VERCEL FRONTEND (5 minutes)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔗 Open in browser: https://vercel.com"
echo ""
echo "1️⃣  Sign in with GitHub (jirin1997-wq)"
echo "2️⃣  Click 'Add New' → 'Project'"
echo "3️⃣  Select: 'skyfeed' repository from list"
echo ""
echo "4️⃣  Project Settings:"
echo "    • Framework Preset: Next.js (auto-detected)"
echo "    • Root Directory: SELECT 'web' (very important!)"
echo ""
echo "5️⃣  Add Environment Variable:"
echo "    • Name: NEXT_PUBLIC_API_URL"
echo "    • Value: $RAILWAY_URL"
echo "    (This tells the frontend where your API lives)"
echo ""
echo "6️⃣  Click 'Deploy'"
echo "7️⃣  ⏳ Wait 2-3 minutes for deployment"
echo "    • You'll see: 'Cloning...' → 'Building...' → 'Success ✅'"
echo ""
echo "8️⃣  After deployment completes:"
echo "    • Vercel will show your live URL"
echo "    • It looks like: https://skyfeed-web.vercel.app"
echo "    (or your custom domain if configured)"
echo ""

read -p "Paste your Vercel Frontend URL here: " VERCEL_URL

if [ -z "$VERCEL_URL" ]; then
    echo "❌ No Vercel URL provided. Exiting."
    exit 1
fi

# Clean trailing slash
VERCEL_URL="${VERCEL_URL%/}"

echo ""
echo "✅ Vercel URL saved: $VERCEL_URL"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "STEP 4️⃣  VERIFY DEPLOYMENT (5 minutes)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔗 Open in browser: $VERCEL_URL"
echo ""
echo "You should see:"
echo "  ✅ SkyFeed homepage with news articles"
echo "  ✅ Navigation menu (News, Airports, Resources, Marketplace)"
echo "  ✅ Article cards in a grid"
echo "  ✅ Search bar"
echo "  ✅ Category filters"
echo ""
echo "🔗 Test the API:"
echo "curl $RAILWAY_URL/health"
echo ""
echo "Expected response:"
echo '{"status":"ok","timestamp":"...","environment":"production"}'
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 DEPLOYMENT COMPLETE!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 YOUR LIVE URLS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Frontend:  $VERCEL_URL"
echo "🔌 API:       $RAILWAY_URL"
echo "🗄️  Database:  Supabase PostgreSQL (private)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📈 KEY FEATURES:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📰 NEWS HUB"
echo "   • Real-time RSS aggregation (8 sources)"
echo "   • Auto-updates every 4 hours"
echo "   • Search & category filtering"
echo ""
echo "🗺️  AIRPORTS"
echo "   • Interactive Leaflet.js map"
echo "   • 10+ European airports"
echo "   • ICAO/IATA codes, elevations"
echo ""
echo "🔗 RESOURCES"
echo "   • Curated aviation links (15+)"
echo "   • Categories: Flying, Schools, Tools, Communities"
echo "   • Featured resources"
echo ""
echo "📢 MARKETPLACE"
echo "   • User ads (Aircraft, Services, Products, Events)"
echo "   • Free to post (moderation required)"
echo "   • Click tracking & analytics"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⏰ IMPORTANT TIMING:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "❗ First articles will appear in 4 hours"
echo "   (RSS aggregator runs on 4-hour schedule)"
echo ""
echo "To speed it up (optional):"
echo "1. SSH into Railway: railway shell"
echo "2. Run: npm run prisma:seed"
echo "3. Articles populate immediately"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔄 AUTO-DEPLOYMENT:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "From now on:"
echo "1. Make changes to code"
echo "2. git push (to GitHub)"
echo "3. Both Railway & Vercel auto-deploy! 🚀"
echo "4. Changes live in 2-3 minutes"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📚 DOCUMENTATION:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🔗 https://github.com/jirin1997-wq/skyfeed"
echo "   • README.md - Features & tech stack"
echo "   • QUICK_DEPLOY.md - Detailed setup guide"
echo "   • DEPLOYMENT_CHECKLIST.md - Verification steps"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Recommended:"
echo "  1. Test all features on your live site"
echo "  2. Add custom domain (optional)"
echo "  3. Setup analytics"
echo "  4. Plan monetization"
echo "  5. Add more RSS sources"
echo "  6. Promote to aviation community!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✈️  SkyFeed is LIVE! Welcome to your aviation platform! 🎉"
echo ""
echo "Need help? Check GitHub Issues or QUICK_DEPLOY.md"
echo ""
