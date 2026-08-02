import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.airport.deleteMany();
  await prisma.resourceLink.deleteMany();
  await prisma.advertisement.deleteMany();
  await prisma.aircraftRental.deleteMany();
  await prisma.flightSchool.deleteMany();

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

  // Seed Aircraft Rentals
  const rentals = await prisma.aircraftRental.createMany({
    data: [
      {
        name: 'Brno Aero Club',
        website: 'https://www.brno-aero.cz',
        phone: '+420541212121',
        email: 'info@brno-aero.cz',
        description:
          'General aviation rental and flight operations in Brno. Cessna and Piper aircraft available.',
        city: 'Brno',
        country: 'Czech Republic',
        latitude: 49.1547,
        longitude: 16.6969,
        aircraftTypes: JSON.stringify(['Cessna 172', 'Piper PA-28', 'Diamond DA40']),
      },
      {
        name: 'Prague Aviation',
        website: 'https://www.prague-aviation.cz',
        phone: '+420224411755',
        email: 'booking@prague-aviation.cz',
        description:
          'Professional aircraft rental and charter services. Modern fleet, experienced pilots.',
        city: 'Prague',
        country: 'Czech Republic',
        latitude: 50.1008,
        longitude: 14.26,
        aircraftTypes: JSON.stringify(['Cessna 172', 'Cessna 182', 'Piper Seneca']),
      },
      {
        name: 'Podborany Flight Services',
        website: 'https://www.podborany-flying.cz',
        phone: '+420318664077',
        email: 'info@podborany-flying.cz',
        description: 'Flight training and aircraft rental at Podborany airfield.',
        city: 'Podborany',
        country: 'Czech Republic',
        latitude: 50.2333,
        longitude: 13.8333,
        aircraftTypes: JSON.stringify(['Cessna 172', 'Grob 102']),
      },
      {
        name: 'European Air Services',
        website: 'https://www.europeanairservices.de',
        phone: '+49189949000',
        email: 'info@europeanairservices.de',
        description: 'Leading aircraft rental company in Germany with multiple locations.',
        city: 'Munich',
        country: 'Germany',
        latitude: 48.3536,
        longitude: 11.7861,
        aircraftTypes: JSON.stringify([
          'Cessna 172',
          'Piper PA-28',
          'Diamond DA40',
          'Cirrus SR22',
        ]),
      },
      {
        name: 'Aero France',
        website: 'https://www.aero-france.fr',
        phone: '+33140777755',
        email: 'bookings@aero-france.fr',
        description: 'Aircraft rental and flight school in Paris area.',
        city: 'Paris',
        country: 'France',
        latitude: 48.8566,
        longitude: 2.3522,
        aircraftTypes: JSON.stringify(['Cessna 172', 'Piper PA-28', 'Tecnam P2006T']),
      },
    ],
  });

  console.log(`✅ Created ${rentals.count} aircraft rental companies`);

  // Seed Flight Schools
  const schools = await prisma.flightSchool.createMany({
    data: [
      {
        name: 'Brno Flight Academy',
        website: 'https://www.brno-flight-academy.cz',
        phone: '+420541212121',
        email: 'training@brno-flight-academy.cz',
        description:
          'Professional pilot training. PPL, CPL, and ATPL courses available.',
        city: 'Brno',
        country: 'Czech Republic',
        latitude: 49.1547,
        longitude: 16.6969,
        certifications: JSON.stringify(['PPL', 'CPL', 'ATPL', 'Instrument Rating']),
      },
      {
        name: 'Prague Pilot School',
        website: 'https://www.prague-pilot-school.cz',
        phone: '+420224411755',
        email: 'info@prague-pilot-school.cz',
        description:
          'Learn to fly in Prague. From discovery flights to commercial license training.',
        city: 'Prague',
        country: 'Czech Republic',
        latitude: 50.1008,
        longitude: 14.26,
        certifications: JSON.stringify(['PPL', 'CPL', 'Multi-Engine', 'Instrument']),
      },
      {
        name: 'Podborany Flying Club School',
        website: 'https://www.podborany-flying.cz/school',
        phone: '+420318664077',
        email: 'school@podborany-flying.cz',
        description: 'Recreational and professional pilot training.',
        city: 'Podborany',
        country: 'Czech Republic',
        latitude: 50.2333,
        longitude: 13.8333,
        certifications: JSON.stringify(['PPL', 'Recreational', 'Private Pilot']),
      },
      {
        name: 'Luftfahrtschule München',
        website: 'https://www.luftfahrtschule-muenchen.de',
        phone: '+49189949222',
        email: 'info@luftfahrtschule-muenchen.de',
        description:
          'Professional flight training in Bavaria. EASA approved training organization.',
        city: 'Munich',
        country: 'Germany',
        latitude: 48.3536,
        longitude: 11.7861,
        certifications: JSON.stringify(['PPL', 'CPL', 'ATPL', 'Type Ratings']),
      },
      {
        name: 'Ecole de Pilotage Île-de-France',
        website: 'https://www.epif.fr',
        phone: '+33140777755',
        email: 'contact@epif.fr',
        description: 'Comprehensive flight training near Paris.',
        city: 'Paris',
        country: 'France',
        latitude: 48.8566,
        longitude: 2.3522,
        certifications: JSON.stringify(['PPL', 'CPL', 'Microlight', 'Ultralight']),
      },
      {
        name: 'Nordic Flight School',
        website: 'https://www.nordic-flight-school.se',
        phone: '+46812345678',
        email: 'info@nordic-flight-school.se',
        description: 'Leading flight training organization in Scandinavia.',
        city: 'Stockholm',
        country: 'Sweden',
        latitude: 59.3293,
        longitude: 18.0686,
        certifications: JSON.stringify(['PPL', 'CPL', 'ATPL', 'Commercial Ratings']),
      },
    ],
  });

  console.log(`✅ Created ${schools.count} flight schools`);

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
