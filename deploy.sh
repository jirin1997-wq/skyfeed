#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

clear

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                  🚀 SkyFeed Deployment                    ║"
echo "║                  Aviation News Aggregator                 ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo ""
echo -e "${YELLOW}⏱️  This will take about 15-20 minutes${NC}"
echo -e "${YELLOW}💰 Total cost: €0 (all free tiers)${NC}"
echo ""
echo -e "${BLUE}What you need before starting:${NC}"
echo "  ✅ GitHub account (jirin1997-wq) - already set up"
echo "  ✅ A web browser"
echo ""

read -p "Are you ready to deploy? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}STEP 1: SUPABASE DATABASE SETUP${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "1. Open browser: ${YELLOW}https://supabase.com${NC}"
echo "2. Sign up with GitHub (jirin1997-wq)"
echo "3. Click 'Create new project'"
echo "4. Fill in:"
echo "   • Project name: ${YELLOW}skyfeed${NC}"
echo "   • Database password: ${YELLOW}Generate${NC} (save it!)"
echo "   • Region: Pick closest to you"
echo "5. Wait 2-3 minutes for project creation"
echo ""
echo "Once project is created:"
echo "6. Go to Settings → Database → Connection Strings"
echo "7. Copy the ${YELLOW}URI${NC} connection string"
echo "8. Keep the page open"
echo ""

read -p "Ready? Press Enter when Supabase project is created..."

echo ""
read -p "Paste your DATABASE_URL here: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ No DATABASE_URL provided${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Database URL saved${NC}"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}STEP 2: RAILWAY BACKEND DEPLOYMENT${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "1. Open browser: ${YELLOW}https://railway.app${NC}"
echo "2. Sign in with GitHub (jirin1997-wq)"
echo "3. Click 'Create New Project' → 'Deploy from GitHub repo'"
echo "4. Authorize Railway with GitHub"
echo "5. Select ${YELLOW}skyfeed${NC} repository"
echo "6. Wait for detection..."
echo ""
echo "When detected:"
echo "7. Click on the 'skyfeed' service"
echo "8. Go to 'Variables' tab"
echo "9. Add variable:"
echo "   • Name: ${YELLOW}DATABASE_URL${NC}"
echo "   • Value: ${YELLOW}[paste from above]${NC}"
echo "10. Click 'Deploy'"
echo "11. Wait 2-3 minutes for deployment to complete"
echo ""

read -p "Ready? Press Enter when Railway deployment is complete..."

echo ""
echo "Getting your Railway API URL..."
echo "In Railway dashboard:"
echo "1. Go to 'Deployments' tab"
echo "2. Click latest deployment"
echo "3. Copy the 'Railway URL' (looks like https://...railway.app)"
echo ""

read -p "Paste your Railway API URL: " RAILWAY_URL

if [ -z "$RAILWAY_URL" ]; then
    echo -e "${RED}❌ No Railway URL provided${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Railway URL saved${NC}"

# Remove trailing slash if present
RAILWAY_URL="${RAILWAY_URL%/}"

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}STEP 3: VERCEL FRONTEND DEPLOYMENT${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "1. Open browser: ${YELLOW}https://vercel.com${NC}"
echo "2. Sign in with GitHub"
echo "3. Click 'Add New' → 'Project'"
echo "4. Select ${YELLOW}skyfeed${NC} repository"
echo ""
echo "In project settings:"
echo "5. Set Root Directory to: ${YELLOW}web${NC}"
echo "6. Framework: ${YELLOW}Next.js${NC} (auto-detected)"
echo "7. Add Environment Variable:"
echo "   • Name: ${YELLOW}NEXT_PUBLIC_API_URL${NC}"
echo "   • Value: ${YELLOW}${RAILWAY_URL}${NC}"
echo "8. Click 'Deploy'"
echo "9. Wait 2-3 minutes for deployment"
echo ""

read -p "Ready? Press Enter when Vercel deployment is complete..."

echo ""
echo "Getting your Vercel URL..."
echo "In Vercel dashboard, copy the URL (looks like https://skyfeed-web.vercel.app)"
echo ""

read -p "Paste your Vercel Frontend URL: " VERCEL_URL

if [ -z "$VERCEL_URL" ]; then
    echo -e "${RED}❌ No Vercel URL provided${NC}"
    exit 1
fi

# Remove trailing slash if present
VERCEL_URL="${VERCEL_URL%/}"

echo -e "${GREEN}✅ Vercel URL saved${NC}"

clear

echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                  🎉 DEPLOYMENT COMPLETE!                  ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo ""
echo -e "${BLUE}Your SkyFeed is now LIVE!${NC}"
echo ""
echo "📊 Live URLs:"
echo "   🌐 Frontend: ${GREEN}${VERCEL_URL}${NC}"
echo "   🔌 API: ${GREEN}${RAILWAY_URL}${NC}"
echo "   🗄️  Database: ${GREEN}Supabase PostgreSQL${NC}"
echo ""

echo "⏳ Note: Articles will start appearing after 4 hours"
echo "   (RSS aggregator runs automatically every 4 hours)"
echo ""

echo "🔄 Auto-Deployment enabled!"
echo "   Push to GitHub main → Auto-deploys backend & frontend"
echo ""

echo -e "${BLUE}Next steps:${NC}"
echo "1. Visit: ${GREEN}${VERCEL_URL}${NC}"
echo "2. Check the search functionality"
echo "3. Filter by categories"
echo "4. Wait for articles to load (up to 4 hours)"
echo ""

echo -e "${YELLOW}Need help?${NC}"
echo "See: https://github.com/jirin1997-wq/skyfeed/blob/main/QUICK_DEPLOY.md"
echo ""

echo -e "${GREEN}✅ SkyFeed deployment complete!${NC}"
