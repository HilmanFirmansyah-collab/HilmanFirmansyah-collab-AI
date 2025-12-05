import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 text-center space-y-4">
      <div className="inline-flex items-center justify-center p-3 bg-red-600/10 rounded-full mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-white">
        Find <span className="text-red-600">Similar</span> Channels
      </h1>
      <p className="text-gray-400 max-w-lg mx-auto text-lg">
        Masukkan link video YouTube favoritmu, dan kami akan mencarikan kreator lain dengan vibe dan materi yang sama.
      </p>
    </header>
  );
};

export default Header;