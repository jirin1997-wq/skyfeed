'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2, ExternalLink, Calendar } from 'lucide-react';
import { formatDate } from 'date-fns';
import Image from 'next/image';

interface Advertisement {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
  category: string;
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
}

interface AdsDisplayProps {
  apiUrl: string;
}

const categoryLabels: Record<string, string> = {
  aircraft: '✈️ Aircraft Sales',
  services: '🔧 Services',
  products: '📦 Products',
  events: '📅 Events',
};

export default function AdsDisplay({ apiUrl }: AdsDisplayProps) {
  const { data: ads, isLoading } = useQuery<any>({
    queryKey: ['advertisements'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/api/ads?limit=6`);
      return res.json();
    },
    refetchInterval: 60000, // Refresh every minute
  });

  const trackClick = async (adId: number) => {
    try {
      await fetch(`${apiUrl}/api/ads/${adId}/click`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to track click:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!ads?.data || ads.data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No advertisements available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Featured Ads Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.data.map((ad: Advertisement) => (
          <div
            key={ad.id}
            className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden hover:border-blue-500/50 transition"
          >
            {/* Image */}
            {ad.imageUrl && (
              <div className="relative h-48 bg-slate-700 overflow-hidden">
                <Image
                  src={ad.imageUrl}
                  alt={ad.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              {/* Category Badge */}
              <div className="mb-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                  {categoryLabels[ad.category] || ad.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition">
                {ad.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                {ad.description}
              </p>

              {/* Dates */}
              <div className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(new Date(ad.startDate), 'MMM d, yyyy')} -{' '}
                {formatDate(new Date(ad.endDate), 'MMM d, yyyy')}
              </div>

              {/* CTA */}
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick(ad.id)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm w-full justify-center"
              >
                View More <ExternalLink className="w-3 h-3" />
              </a>

              {/* Stats */}
              <div className="text-xs text-slate-500 mt-3 flex gap-4">
                <span>👁️ {ad.impressions} views</span>
                <span>🔗 {ad.clicks} clicks</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Ad CTA */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Post Your Advertisement</h3>
        <p className="text-slate-400 mb-6">
          Reach thousands of aviation enthusiasts. Post your aircraft, services, or events.
        </p>
        <a
          href="#post-ad"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
        >
          Post an Advertisement
        </a>
      </div>

      {/* Post Ad Form */}
      <div
        id="post-ad"
        className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Post Your Advertisement</h2>

        <form onSubmit={(e) => handleSubmit(e, apiUrl)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Cessna 172 For Sale"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description
            </label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Describe your product, service, or event..."
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="aircraft">✈️ Aircraft Sales</option>
              <option value="services">🔧 Services</option>
              <option value="products">📦 Products</option>
              <option value="events">📅 Events</option>
            </select>
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Link / URL
            </label>
            <input
              type="url"
              name="link"
              required
              placeholder="https://example.com"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="authorName"
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                name="authorEmail"
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Duration */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            Submit Advertisement (Pending Approval)
          </button>

          <p className="text-xs text-slate-400 text-center">
            Your advertisement will be reviewed and published within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}

async function handleSubmit(e: React.FormEvent<HTMLFormElement>, apiUrl: string) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    link: formData.get('link'),
    authorName: formData.get('authorName'),
    authorEmail: formData.get('authorEmail'),
    authorPhone: formData.get('authorPhone'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
  };

  try {
    const res = await fetch(`${apiUrl}/api/ads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert('✅ Advertisement submitted successfully! It will appear after approval.');
      e.currentTarget.reset();
    } else {
      alert('❌ Error: ' + result.error);
    }
  } catch (error) {
    alert('❌ Failed to submit advertisement');
    console.error(error);
  }
}
