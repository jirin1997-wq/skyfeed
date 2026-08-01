import { formatDistanceToNow } from 'date-fns';
import { ExternalLink } from 'lucide-react';

interface ArticleCardProps {
  article: {
    id: number;
    title: string;
    content: string;
    link: string;
    published: string;
    category: string;
    source: { title: string };
  };
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const timeAgo = formatDistanceToNow(new Date(article.published), {
    addSuffix: true,
  });

  const contentPreview = article.content
    .replace(/<[^>]*>/g, '')
    .substring(0, 150)
    .trim();

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium">
              {article.category}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition line-clamp-3 leading-tight">
          {article.title}
        </h3>

        {/* Content Preview */}
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
          {contentPreview}
          {article.content.length > 150 ? '...' : ''}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/30 mt-auto">
          <div className="flex flex-col text-xs">
            <span className="text-slate-500">{article.source.title}</span>
            <span className="text-slate-600">{timeAgo}</span>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
        </div>
      </div>
    </a>
  );
}
