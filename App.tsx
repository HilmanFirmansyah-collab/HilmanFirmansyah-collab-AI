import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ChannelCard from './components/ChannelCard';
import SkeletonCard from './components/SkeletonCard';
import { ChannelRecommendation, SearchState } from './types';
import { findSimilarChannels } from './services/geminiService';

const App: React.FC = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const handleSearch = async (url: string) => {
    setSearchState({ isLoading: true, error: null, data: null });
    
    try {
      const results = await findSimilarChannels(url);
      setSearchState({ isLoading: false, error: null, data: results });
    } catch (error: any) {
      setSearchState({ 
        isLoading: false, 
        error: error.message || "Something went wrong", 
        data: null 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      <main className="flex-grow container mx-auto px-4 pb-20">
        <Header />
        <SearchBar onSearch={handleSearch} isLoading={searchState.isLoading} />

        {/* Error State */}
        {searchState.error && (
          <div className="max-w-2xl mx-auto bg-red-900/20 border border-red-900 text-red-200 p-4 rounded-lg flex items-center gap-3">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p>{searchState.error}</p>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {searchState.isLoading && (
            <>
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </>
          )}

          {!searchState.isLoading && searchState.data && searchState.data.length > 0 && (
            searchState.data.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))
          )}
        </div>

        {!searchState.isLoading && searchState.data && searchState.data.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <p>Tidak ada hasil ditemukan. Coba link yang lain.</p>
          </div>
        )}
        
        {!searchState.isLoading && !searchState.data && !searchState.error && (
            <div className="text-center mt-20 opacity-30">
                <div className="flex justify-center mb-4">
                     <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
                </div>
                <p className="text-lg">Menunggu input link video...</p>
            </div>
        )}
      </main>

      <footer className="w-full py-6 border-t border-gray-900 text-center text-gray-600 text-sm">
        <p>Powered by Google Gemini 2.5 Flash & Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;