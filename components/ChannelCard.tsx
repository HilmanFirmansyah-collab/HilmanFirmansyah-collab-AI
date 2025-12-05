import React from 'react';
import { ChannelRecommendation } from '../types';

interface ChannelCardProps {
  channel: ChannelRecommendation;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel }) => {
  // Generate a consistent avatar based on the name since we don't have direct access to YT Data API images without an API key for it.
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&background=random&color=fff&size=128&bold=true`;

  return (
    <a 
      href={channel.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group h-full"
    >
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 h-full transition-all duration-300 hover:border-red-500/50 hover:bg-[#252525] hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 flex flex-col">
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex-shrink-0">
            <img 
              src={avatarUrl} 
              alt={channel.name} 
              className="w-14 h-14 rounded-full border-2 border-gray-700 group-hover:border-red-500 transition-colors"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white truncate group-hover:text-red-400 transition-colors">
              {channel.name}
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {channel.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-red-900/10 border border-red-900/20 rounded-lg p-3 mb-3">
            <p className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">Kenapa Mirip?</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              {channel.similarityReason}
            </p>
          </div>
          <p className="text-sm text-gray-400 line-clamp-3">
            {channel.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-800 flex items-center justify-between text-sm">
          <span className="text-gray-500 group-hover:text-gray-300 transition-colors">Kunjungi Channel</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default ChannelCard;