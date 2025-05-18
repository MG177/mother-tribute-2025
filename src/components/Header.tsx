import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-black/30 to-transparent pointer-events-none">
      <div className="pointer-events-auto">
        <h1 className="text-white text-shadow-lg flex items-center">
          <Heart size={24} className="text-pink-400 mr-2 animate-pulse" fill="#f8a5c2" /> 
          <span className="font-serif italic">Mother's Day Tribute</span>
        </h1>
      </div>
    </div>
  );
};

export default Header;