'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

interface Rental {
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
  aircraftTypes: string[];
}

interface MapFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: Rental & { type: string };
}

const rentalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function RentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchCountry, setSearchCountry] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [mapFeatures, setMapFeatures] = useState<MapFeature[]>([]);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const response = await fetch('/api/rentals');
        const data = await response.json();
        setRentals(data.data);
        setFilteredRentals(data.data);

        const mapResponse = await fetch('/api/rentals/map/geojson');
        const mapData = await mapResponse.json();
        setMapFeatures(mapData.features);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  useEffect(() => {
    let filtered = rentals;

    if (searchCountry) {
      filtered = filtered.filter((r) =>
        r.country.toLowerCase().includes(searchCountry.toLowerCase())
      );
    }

    if (searchCity) {
      filtered = filtered.filter((r) =>
        r.city.toLowerCase().includes(searchCity.toLowerCase())
      );
    }

    setFilteredRentals(filtered);
  }, [searchCountry, searchCity, rentals]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Aircraft Rentals & Charters</h1>
          <p className="mt-2 text-blue-100">Find aircraft rental companies across Europe</p>
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Search by city..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Found <strong>{filteredRentals.length}</strong> rental companies
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
                    icon={rentalIcon}
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
                            className="text-blue-600 hover:underline"
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
          {filteredRentals.map((rental) => (
            <div
              key={rental.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{rental.name}</h3>
                <p className="mt-1 text-sm text-gray-600">
                  {rental.city}, {rental.country}
                </p>

                <p className="mt-3 text-gray-700 text-sm line-clamp-2">
                  {rental.description}
                </p>

                {rental.aircraftTypes.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Aircraft Available:</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {rental.aircraftTypes.map((type, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  {rental.phone && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {rental.phone}
                    </p>
                  )}
                  {rental.email && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {rental.email}
                    </p>
                  )}
                </div>

                {rental.website && (
                  <a
                    href={rental.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRentals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No rental companies found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
