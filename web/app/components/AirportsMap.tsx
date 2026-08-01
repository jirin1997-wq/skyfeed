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

interface AirportsMapProps {
  apiUrl: string;
}

export default function AirportsMap({ apiUrl }: AirportsMapProps) {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        setLoading(true);
        const url = selectedCountry
          ? `${apiUrl}/api/airports?country=${selectedCountry}`
          : `${apiUrl}/api/airports?limit=100`;

        const res = await fetch(url);
        const data = await res.json();
        setAirports(data.data || []);

        // Extract unique countries
        if (!selectedCountry) {
          const uniqueCountries = [
            ...new Set(data.data.map((a: Airport) => a.country)),
          ] as string[];
          setCountries(uniqueCountries.sort());
        }
      } catch (error) {
        console.error('Failed to fetch airports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAirports();
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
            {airports.map((airport) => (
              <Marker
                key={airport.id}
                position={[airport.latitude, airport.longitude]}
              >
                <Popup>
                  <div className="min-w-48 text-slate-900">
                    <h4 className="font-bold text-sm mb-1">{airport.name}</h4>
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
          </MapContainer>
        )}
      </div>

      {/* Airport List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {airports.slice(0, 6).map((airport) => (
          <div
            key={airport.id}
            className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4"
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
              <p>
                <span className="text-slate-500">ICAO:</span> {airport.icao}
              </p>
              {airport.iata && (
                <p>
                  <span className="text-slate-500">IATA:</span> {airport.iata}
                </p>
              )}
              {airport.elevation && (
                <p>
                  <span className="text-slate-500">Elevation:</span>{' '}
                  {airport.elevation}m
                </p>
              )}
            </div>
            {airport.website && (
              <a
                href={airport.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-xs inline-flex items-center gap-1"
              >
                Website <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-400 text-center">
        Showing {airports.length} airports
      </p>
    </div>
  );
}
