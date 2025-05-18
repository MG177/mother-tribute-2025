import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface NavigationProps {
  totalSlides: number;
  activeSlide: number;
  onNavigate: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  totalSlides, 
  activeSlide, 
  onNavigate 
}) => {
  const goToPrevSlide = () => {
    if (activeSlide > 0) {
      onNavigate(activeSlide - 1);
    }
  };

  const goToNextSlide = () => {
    if (activeSlide < totalSlides - 1) {
      onNavigate(activeSlide + 1);
    }
  };
  
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-6">
      {/* Slide dots navigation */}
      <div className="flex flex-col space-y-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === activeSlide 
                ? 'bg-pink-400 scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => onNavigate(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      
      {/* Up/Down navigation arrows */}
      <div className="flex flex-col space-y-3">
        <button 
          className={`p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 ${
            activeSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
          }`}
          onClick={goToPrevSlide}
          disabled={activeSlide === 0}
          aria-label="Previous slide"
        >
          <ChevronUp size={16} className="text-white" />
        </button>
        <button 
          className={`p-2 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-all duration-300 ${
            activeSlide === totalSlides - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
          }`}
          onClick={goToNextSlide}
          disabled={activeSlide === totalSlides - 1}
          aria-label="Next slide"
        >
          <ChevronDown size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;