import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSearch(input.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-200"></div>
        <div className="relative flex items-center bg-[#1f1f1f] rounded-lg border border-gray-700 focus-within:border-red-500 transition-colors duration-300">
          <div className="pl-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <input
            type="url"
            className="w-full bg-transparent p-4 text-white placeholder-gray-500 focus:outline-none"
            placeholder="Paste YouTube video link here... (e.g., https://youtu.be/...)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`mr-2 px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
              isLoading
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20'
            }`}
          >
            {isLoading ? 'Menganalisis...' : 'Cari'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;