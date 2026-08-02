import ResourceLinks from '../components/ResourceLinks';
import AdsDisplay from '../components/AdsDisplay';

export const metadata = {
  title: 'Resources & Advertisements - SkyFeed',
  description: 'Aviation resources, links, and community advertisements',
};

export default function ResourcesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            🔗 Resources & Community
          </h1>
          <p className="text-slate-400 text-lg">
            Essential aviation links, tools, and community advertisements
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Resources Section */}
        <section className="mb-16">
          <ResourceLinks apiUrl={API_URL} />
        </section>

        {/* Advertisements Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">📢 Community Advertisements</h2>
          <AdsDisplay apiUrl={API_URL} />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-700/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-slate-400 text-sm">
            <p>
              © {new Date().getFullYear()} SkyFeed - Aviation News & Community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
