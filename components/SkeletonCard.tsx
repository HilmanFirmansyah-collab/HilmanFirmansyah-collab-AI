import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 h-full animate-pulse">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-14 h-14 bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-5 bg-gray-700 rounded w-3/4"></div>
          <div className="flex gap-2">
            <div className="h-4 bg-gray-800 rounded w-12"></div>
            <div className="h-4 bg-gray-800 rounded w-16"></div>
          </div>
        </div>
      </div>
      <div className="space-y-3 mt-4">
        <div className="h-20 bg-gray-800/50 rounded-lg"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;