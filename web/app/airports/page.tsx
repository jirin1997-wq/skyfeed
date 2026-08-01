import AirportsMap from '../components/AirportsMap';

export const metadata = {
  title: 'Airport Directory - SkyFeed',
  description: 'Find general aviation airports across Europe',
};

export default function AirportsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            🗺️ Airport Directory
          </h1>
          <p className="text-slate-400 text-lg">
            Explore general aviation airports across Europe
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <AirportsMap apiUrl={API_URL} />
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
