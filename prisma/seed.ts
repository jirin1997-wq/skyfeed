import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.airport.deleteMany();
  await prisma.resourceLink.deleteMany();
  await prisma.advertisement.deleteMany();

  // Seed Airports (Czech & EU General Aviation)
  const airports = await prisma.airport.createMany({
    data: [
      {
        icao: 'LKPR',
        iata: 'PRG',
        name: 'Václav Havel Airport Prague',
        city: 'Prague',
        country: 'Czech Republic',
        latitude: 50.1008,
        longitude: 14.26,
        elevation: 365,
        website: 'https://www.prague-airport.com',
      },
      {
        icao: 'LKBR',
        iata: 'BRN',
        name: 'Brno Airport',
        city: 'Brno',
        country: 'Czech Republic',
        latitude: 49.1547,
        longitude: 16.6969,
        elevation: 241,
        website: 'https://www.brno-airport.cz',
      },
      {
        icao: 'LKPD',
        iata: undefined,
        name: 'Podborany Airfield',
        city: 'Podborany',
        country: 'Czech Republic',
        latitude: 50.2333,
        longitude: 13.8333,
        elevation: 228,
      },
      {
        icao: 'LKMT',
        iata: undefined,
        name: 'Moravska Trebova Airfield',
        city: 'Moravska Trebova',
        country: 'Czech Republic',
        latitude: 49.5817,
        longitude: 16.6333,
        elevation: 230,
      },
      {
        icao: 'LKKV',
        iata: 'KV',
        name: 'Kunovice Airport',
        city: 'Kunovice',
        country: 'Czech Republic',
        latitude: 49.0119,
        longitude: 17.6733,
        elevation: 205,
        website: 'https://www.letiste-kunovice.cz',
      },
      {
        icao: 'EDDF',
        iata: 'FRA',
        name: 'Frankfurt am Main Airport',
        city: 'Frankfurt',
        country: 'Germany',
        latitude: 50.0379,
        longitude: 8.5622,
        elevation: 364,
        website: 'https://www.frankfurt-airport.com',
      },
      {
        icao: 'EDLG',
        iata: 'CGN',
        name: 'Cologne Bonn Airport',
        city: 'Cologne',
        country: 'Germany',
        latitude: 50.8659,
        longitude: 7.1494,
        elevation: 92,
        website: 'https://www.koeln-bonn-airport.de',
      },
      {
        icao: 'LEMD',
        iata: 'MAD',
        name: 'Adolfo Suarez Madrid Airport',
        city: 'Madrid',
        country: 'Spain',
        latitude: 40.4719,
        longitude: -3.6289,
        elevation: 610,
        website: 'https://www.adolfosuarezmadrid-airport.com',
      },
      {
        icao: 'LFPG',
        iata: 'CDG',
        name: 'Paris Charles de Gaulle',
        city: 'Paris',
        country: 'France',
        latitude: 49.0097,
        longitude: 2.5479,
        elevation: 392,
        website: 'https://www.parisaeroport.fr',
      },
      {
        icao: 'EGLL',
        iata: 'LHR',
        name: 'London Heathrow Airport',
        city: 'London',
        country: 'United Kingdom',
        latitude: 51.4706,
        longitude: -0.4619,
        elevation: 83,
        website: 'https://www.heathrow.com',
      },
    ],
  });

  console.log(`✅ Created ${airports.count} airports`);

  // Seed Resource Links
  const links = await prisma.resourceLink.createMany({
    data: [
      {
        title: 'EASA - European Aviation Safety Agency',
        url: 'https://www.easa.europa.eu',
        description: 'European regulations, certifications, and safety information',
        category: 'flying',
        icon: '📋',
        featured: true,
      },
      {
        title: 'FAA - Federal Aviation Administration',
        url: 'https://www.faa.gov',
        description: 'US aviation authority with resources and regulations',
        category: 'flying',
        icon: '🇺🇸',
        featured: true,
      },
      {
        title: 'Aviation Safety Network',
        url: 'https://aviation-safety.net',
        description: 'Aviation accident database and safety information',
        category: 'flying',
        icon: '🛡️',
        featured: true,
      },
      {
        title: 'AOPA - Aircraft Owners and Pilots Association',
        url: 'https://www.aopa.org',
        description: 'Advocacy and resources for aircraft owners and pilots',
        category: 'communities',
        icon: '✈️',
        featured: true,
      },
      {
        title: 'Flight Radar 24',
        url: 'https://www.flightradar24.com',
        description: 'Real-time flight tracking',
        category: 'tools',
        icon: '🛰️',
        featured: true,
      },
      {
        title: 'Skyvector',
        url: 'https://skyvector.com',
        description: 'Free online flight planning and navigation',
        category: 'tools',
        icon: '🗺️',
        featured: true,
      },
      {
        title: 'CheckRide.com',
        url: 'https://www.checkride.com',
        description: 'Pilot training and knowledge resources',
        category: 'schools',
        icon: '🎓',
      },
      {
        title: 'Aviation Weather - AVWX',
        url: 'https://avwx.rest',
        description: 'Aviation weather information and METAR/TAF data',
        category: 'tools',
        icon: '⛅',
      },
      {
        title: 'Airbus Training',
        url: 'https://www.airbus.com/en/aircraft/training',
        description: 'Commercial aircraft training resources',
        category: 'schools',
        icon: '🚁',
      },
      {
        title: 'GA News - AVweb',
        url: 'https://www.avweb.com',
        description: 'Daily general aviation news and updates',
        category: 'flying',
        icon: '📰',
      },
      {
        title: 'Cessna Pilots Association',
        url: 'https://www.cessnapilots.org',
        description: 'Resources for Cessna aircraft owners',
        category: 'communities',
        icon: '🛩️',
      },
      {
        title: 'MFB - Maintenance Tracking',
        url: 'https://www.airframe-tracker.com',
        description: 'Aircraft maintenance logs and tracking',
        category: 'tools',
        icon: '🔧',
      },
      {
        title: 'Aircraft Spruce',
        url: 'https://www.aircraftspruce.com',
        description: 'Aviation parts and accessories',
        category: 'shops',
        icon: '🛒',
      },
      {
        title: 'Aviapages',
        url: 'https://www.aviapages.com',
        description: 'European aviation directory and listing',
        category: 'communities',
        icon: '📱',
      },
    ],
  });

  console.log(`✅ Created ${links.count} resource links`);

  console.log('✨ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
