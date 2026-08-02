'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

interface School {
  id: number;
  name: string;
  city: string;
  country: string;
  website: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  description: string;
  certifications: string[];
}

interface MapFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: School & { type: string };
}

const schoolIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCountry, setSearchCountry] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [mapFeatures, setMapFeatures] = useState<MapFeature[]>([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/schools');
        const data = await response.json();
        setSchools(data.data);
        setFilteredSchools(data.data);

        const mapResponse = await fetch('/api/schools/map/geojson');
        const mapData = await mapResponse.json();
        setMapFeatures(mapData.features);
      } catch (error) {
        console.error('Error fetching schools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    let filtered = schools;

    if (searchCountry) {
      filtered = filtered.filter((s) =>
        s.country.toLowerCase().includes(searchCountry.toLowerCase())
      );
    }

    if (searchCity) {
      filtered = filtered.filter((s) =>
        s.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    }

    setFilteredSchools(filtered);
  }, [searchCountry, searchCity, schools]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Flight Training Schools</h1>
          <p className="mt-2 text-green-100">Find professional flight schools and training centers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Search & Filter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by country..."
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Search by city..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Found <strong>{filteredSchools.length}</strong> flight schools
          </p>
        </div>

        {/* Map */}
        {mapFeatures.length > 0 && (
          <div className="mb-8 bg-white rounded-lg shadow overflow-hidden">
            <div style={{ height: '500px' }}>
              <MapContainer
                center={[50, 15]}
                zoom={4}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                {mapFeatures.map((feature) => (
                  <Marker
                    key={feature.properties.id}
                    position={[
                      feature.geometry.coordinates[1],
                      feature.geometry.coordinates[0],
                    ]}
                    icon={schoolIcon}
                  >
                    <Popup>
                      <div className="text-sm">
                        <p className="font-semibold">{feature.properties.name}</p>
                        <p>{feature.properties.city}, {feature.properties.country}</p>
                        {feature.properties.website && (
                          <a
                            href={feature.properties.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline"
                          >
                            Website
                          </a>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        )}

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{school.name}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {school.city}, {school.country}
                </p>

                <p className="mt-3 text-gray-700 text-sm line-clamp-2">
                  {school.description}
                </p>

                {school.certifications.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Certifications Offered:</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {school.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  {school.phone && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {school.phone}
                    </p>
                  )}
                  {school.email && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {school.email}
                    </p>
                  )}
                </div>

                {school.website && (
                  <a
                    href={school.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No flight schools found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
