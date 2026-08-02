'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Loader2, MapPin, ExternalLink } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface Airport {
  id: number;
  icao: string;
  iata?: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  website?: string;
}

interface Rental {
  id: number;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  website?: string;
  phone?: string;
  email?: string;
  aircraftTypes?: string;
}

interface School {
  id: number;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  website?: string;
  phone?: string;
  email?: string;
  certifications?: string;
}

interface AirportsMapProps {
  apiUrl: string;
}

export default function AirportsMap({ apiUrl }: AirportsMapProps) {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [countries, setCountries] = useState<string[]>([]);
  const [showRentals, setShowRentals] = useState(true);
  const [showSchools, setShowSchools] = useState(true);
  const [showAirports, setShowAirports] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch airports
        const airportUrl = selectedCountry
          ? `${apiUrl}/api/airports?country=${selectedCountry}`
          : `${apiUrl}/api/airports?limit=100`;
        const airportRes = await fetch(airportUrl);
        const airportData = await airportRes.json();
        setAirports(airportData.data || []);

        // Fetch rentals
        const rentalUrl = selectedCountry
          ? `${apiUrl}/api/rentals?country=${selectedCountry}`
          : `${apiUrl}/api/rentals`;
        const rentalRes = await fetch(rentalUrl);
        const rentalData = await rentalRes.json();
        setRentals(rentalData.data || []);

        // Fetch schools
        const schoolUrl = selectedCountry
          ? `${apiUrl}/api/schools?country=${selectedCountry}`
          : `${apiUrl}/api/schools`;
        const schoolRes = await fetch(schoolUrl);
        const schoolData = await schoolRes.json();
        setSchools(schoolData.data || []);

        // Extract unique countries from airports
        if (!selectedCountry) {
          const uniqueCountries = [
            ...new Set([
              ...(airportData.data || []).map((a: Airport) => a.country),
              ...(rentalData.data || []).map((r: Rental) => r.country),
              ...(schoolData.data || []).map((s: School) => s.country),
            ]),
          ] as string[];
          setCountries(uniqueCountries.sort());
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry, apiUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Country Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCountry('')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${
            !selectedCountry
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          All Countries
        </button>
        {countries.map((country) => (
          <button
            key={country}
            onClick={() => setSelectedCountry(country)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${
              selectedCountry === country
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Display Toggle Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setShowAirports(!showAirports)}
          className={`px-4 py-2 rounded-lg transition font-medium text-sm ${
            showAirports
              ? 'bg-blue-600 text-white'
              : 'bg-slate-700 text-slate-400'
          }`}
        >
          ✈️ Airports ({airports.length})
        </button>
        <button
          onClick={() => setShowRentals(!showRentals)}
          className={`px-4 py-2 rounded-lg transition font-medium text-sm ${
            showRentals
              ? 'bg-green-600 text-white'
              : 'bg-slate-700 text-slate-400'
          }`}
        >
          🚁 Rentals ({rentals.length})
        </button>
        <button
          onClick={() => setShowSchools(!showSchools)}
          className={`px-4 py-2 rounded-lg transition font-medium text-sm ${
            showSchools
              ? 'bg-amber-600 text-white'
              : 'bg-slate-700 text-slate-400'
          }`}
        >
          🎓 Schools ({schools.length})
        </button>
      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden border border-slate-700/50 h-96">
        {typeof window !== 'undefined' && (
          <MapContainer
            center={[50, 15]}
            zoom={4}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            
            {/* Airports */}
            {showAirports && airports.map((airport) => (
              <Marker
                key={`airport-${airport.id}`}
                position={[airport.latitude, airport.longitude]}
              >
                <Popup>
                  <div className="min-w-48 text-slate-900">
                    <h4 className="font-bold text-sm mb-1">✈️ {airport.name}</h4>
                    <p className="text-xs text-slate-600 mb-2">
                      {airport.city}, {airport.country}
                    </p>
                    <div className="space-y-1 text-xs">
                      <p>
                        <span className="font-semibold">ICAO:</span> {airport.icao}
                      </p>
                      {airport.iata && (
                        <p>
                          <span className="font-semibold">IATA:</span> {airport.iata}
                        </p>
                      )}
                      {airport.elevation && (
                        <p>
                          <span className="font-semibold">Elevation:</span>{' '}
                          {airport.elevation}m
                        </p>
                      )}
                    </div>
                    {airport.website && (
                      <a
                        href={airport.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs mt-2 flex items-center gap-1"
                      >
                        Website <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Rentals */}
            {showRentals && rentals.map((rental) => (
              rental.latitude && rental.longitude && (
                <Marker
                  key={`rental-${rental.id}`}
                  position={[rental.latitude, rental.longitude]}
                >
                  <Popup>
                    <div className="min-w-48 text-slate-900">
                      <h4 className="font-bold text-sm mb-1">🚁 {rental.name}</h4>
                      <p className="text-xs text-slate-600 mb-2">
                        {rental.city}, {rental.country}
                      </p>
                      <div className="space-y-1 text-xs">
                        {rental.aircraftTypes && (
                          <p>
                            <span className="font-semibold">Aircraft:</span>{' '}
                            {JSON.parse(rental.aircraftTypes).join(', ')}
                          </p>
                        )}
                      </div>
                      {rental.website && (
                        <a
                          href={rental.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-xs mt-2 flex items-center gap-1"
                        >
                          Website <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {rental.phone && (
                        <p className="text-xs mt-1">
                          <span className="font-semibold">Phone:</span> {rental.phone}
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )
            ))}

            {/* Schools */}
            {showSchools && schools.map((school) => (
              school.latitude && school.longitude && (
                <Marker
                  key={`school-${school.id}`}
                  position={[school.latitude, school.longitude]}
                >
                  <Popup>
                    <div className="min-w-48 text-slate-900">
                      <h4 className="font-bold text-sm mb-1">🎓 {school.name}</h4>
                      <p className="text-xs text-slate-600 mb-2">
                        {school.city}, {school.country}
                      </p>
                      <div className="space-y-1 text-xs">
                        {school.certifications && (
                          <p>
                            <span className="font-semibold">Certifications:</span>{' '}
                            {JSON.parse(school.certifications).join(', ')}
                          </p>
                        )}
                      </div>
                      {school.website && (
                        <a
                          href={school.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-xs mt-2 flex items-center gap-1"
                        >
                          Website <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {school.phone && (
                        <p className="text-xs mt-1">
                          <span className="font-semibold">Phone:</span> {school.phone}
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        )}
      </div>

      {/* Lists */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Airports List */}
        {showAirports && airports.slice(0, 3).map((airport) => (
          <div
            key={`airport-list-${airport.id}`}
            className="bg-slate-800/50 border border-blue-500/30 rounded-lg p-4"
          >
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm mb-1">
                  {airport.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {airport.city}, {airport.country}
                </p>
              </div>
            </div>
            <div className="space-y-1 text-xs text-slate-400 mb-3">
              <p>ICAO: {airport.icao}</p>
              {airport.website && (
                <a
                  href={airport.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  Website <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Rentals List */}
        {showRentals && rentals.slice(0, 3).map((rental) => (
          <div
            key={`rental-list-${rental.id}`}
            className="bg-slate-800/50 border border-green-500/30 rounded-lg p-4"
          >
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm mb-1">
                  {rental.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {rental.city}, {rental.country}
                </p>
              </div>
            </div>
            {rental.aircraftTypes && (
              <p className="text-xs text-slate-400 mb-3">
                {JSON.parse(rental.aircraftTypes).join(', ')}
              </p>
            )}
            {rental.website && (
              <a
                href={rental.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 text-xs inline-flex items-center gap-1"
              >
                Website <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}

        {/* Schools List */}
        {showSchools && schools.slice(0, 3).map((school) => (
          <div
            key={`school-list-${school.id}`}
            className="bg-slate-800/50 border border-amber-500/30 rounded-lg p-4"
          >
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm mb-1">
                  {school.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {school.city}, {school.country}
                </p>
              </div>
            </div>
            {school.certifications && (
              <p className="text-xs text-slate-400 mb-3">
                {JSON.parse(school.certifications).join(', ')}
              </p>
            )}
            {school.website && (
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 text-xs inline-flex items-center gap-1"
              >
                Website <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-400 text-center">
        Showing {airports.length} airports • {rentals.length} rentals • {schools.length} schools
      </p>
    </div>
  );
}
