'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2, ExternalLink } from 'lucide-react';

interface ResourceLink {
  id: number;
  title: string;
  url: string;
  description: string;
  category: string;
  icon?: string;
  featured: boolean;
}

interface ResourceLinksProps {
  apiUrl: string;
}

const categoryLabels: Record<string, string> = {
  flying: '✈️ Flying',
  schools: '🎓 Schools',
  shops: '🛒 Shops',
  tools: '🛠️ Tools',
  communities: '👥 Communities',
};

export default function ResourceLinks({ apiUrl }: ResourceLinksProps) {
  const { data: allLinks } = useQuery<any>({
    queryKey: ['resource-links'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/api/links`);
      return res.json();
    },
  });

  const { data: categories } = useQuery<any>({
    queryKey: ['link-categories'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/api/links/categories`);
      return res.json();
    },
  });

  if (!allLinks) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const groupedLinks: Record<string, ResourceLink[]> = {};
  allLinks.data?.forEach((link: ResourceLink) => {
    if (!groupedLinks[link.category]) {
      groupedLinks[link.category] = [];
    }
    groupedLinks[link.category].push(link);
  });

  return (
    <div className="space-y-12">
      {/* Featured Links */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">⭐ Essential Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allLinks.data
            ?.filter((link: ResourceLink) => link.featured)
            .map((link: ResourceLink) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 hover:border-blue-400 rounded-lg p-4 transition"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-2xl">{link.icon}</span>
                  <ExternalLink className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-blue-300 transition">
                  {link.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2">{link.description}</p>
              </a>
            ))}
        </div>
      </div>

      {/* Grouped by Category */}
      {categories?.map((cat: any) => {
        const catKey = cat.name;
        const links = groupedLinks[catKey] || [];

        if (links.length === 0) return null;

        return (
          <div key={catKey}>
            <h2 className="text-2xl font-bold text-white mb-6">
              {categoryLabels[catKey] || catKey}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {links.map((link: ResourceLink) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 rounded-lg p-4 transition"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-2xl">{link.icon || '🔗'}</span>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white group-hover:text-blue-300 transition line-clamp-2">
                    {link.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {link.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
