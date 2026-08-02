'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Search, MapPin, Zap, ShoppingCart } from 'lucide-react';
import ArticleCard from './components/ArticleCard';

interface Article {
  id: number;
  title: string;
  content: string;
  link: string;
  published: string;
  category: string;
  source: { title: string };
}

interface ApiResponse {
  data: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface Category {
  name: string;
  count: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function Home() {
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['articles', category, search, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: '20',
        page: page.toString(),
        ...(category !== 'all' && { category }),
        ...(search && { search }),
      });

      const res = await fetch(`${API_URL}/api/articles?${params}`);
      if (!res.ok) throw new Error('Failed to fetch articles');
      return res.json();
    },
    retry: 1,
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/api/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
    retry: 1,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              ✈️ SkyFeed
            </h1>
            <p className="text-slate-400 text-lg">
              Real-time aviation news from trusted sources
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-slate-800 transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Category Filter */}
      <div className="bg-slate-800/30 border-b border-slate-700/50 sticky top-24 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${
                category === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              All Articles
            </button>
            {categories?.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-medium ${
                  category === cat.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {cat.name} <span className="text-xs opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {error ? (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center">
            <p className="text-red-400">
              Failed to load articles. Please try again later.
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : data?.data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              No articles found. Try adjusting your search.
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {data?.data.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {data && data.pagination.pages > 1 && (
              <div className="flex justify-center gap-2 pt-8 border-t border-slate-700">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg transition"
                >
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({
                    length: Math.min(5, data.pagination.pages),
                  }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-lg transition ${
                          page === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(data.pagination.pages, p + 1))
                  }
                  disabled={page === data.pagination.pages}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Quick Links Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-700/50">
        <h2 className="text-3xl font-bold text-white mb-8">More from SkyFeed</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Airports Card */}
          <Link href="/airports" className="group bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 hover:border-blue-400 rounded-lg p-6 transition">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Airports</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Aviation airports with facilities and codes.
            </p>
            <span className="text-blue-400 hover:text-blue-300 font-medium text-sm">
              Explore →
            </span>
          </Link>

          {/* Resources Card */}
          <Link href="/resources" className="group bg-gradient-to-br from-cyan-500/10 to-green-500/10 border border-cyan-500/30 hover:border-cyan-400 rounded-lg p-6 transition">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Resources</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Tools and links for pilots and enthusiasts.
            </p>
            <span className="text-cyan-400 hover:text-cyan-300 font-medium text-sm">
              Browse →
            </span>
          </Link>

          {/* Rentals Card */}
          <Link href="/rentals" className="group bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 hover:border-orange-400 rounded-lg p-6 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 text-orange-400 text-xl">✈️</span>
              <h3 className="text-lg font-bold text-white">Rentals</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Aircraft rental companies and charters.
            </p>
            <span className="text-orange-400 hover:text-orange-300 font-medium text-sm">
              Find →
            </span>
          </Link>

          {/* Flight Schools Card */}
          <Link href="/schools" className="group bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 hover:border-green-400 rounded-lg p-6 transition">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 text-green-400 text-xl">🎓</span>
              <h3 className="text-lg font-bold text-white">Schools</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Flight training and certification programs.
            </p>
            <span className="text-green-400 hover:text-green-300 font-medium text-sm">
              Search →
            </span>
          </Link>

          {/* Marketplace Card */}
          <Link href="/marketplace" className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 hover:border-purple-400 rounded-lg p-6 transition">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-8 h-8 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Marketplace</h3>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Buy, sell and trade aviation products.
            </p>
            <span className="text-purple-400 hover:text-purple-300 font-medium text-sm">
              Browse →
            </span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-700/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-slate-400 text-sm">
            <p>
              © {new Date().getFullYear()} SkyFeed. All rights reserved.
            </p>
            <p className="mt-2">
              Aggregating aviation news from trusted sources worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
