import React, { useRef, useState, useEffect } from 'react';
import Header from './components/Header';
import Slide from './components/Slide';
import MusicPlayer from './components/MusicPlayer';
import Navigation from './components/Navigation';
import { slides } from './data/slideData';

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle intersection observer to detect active slide
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7, // At least 70% of the slide must be visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slideIndex = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          setActiveSlide(slideIndex);
        }
      });
    }, options);

    const slideElements = document.querySelectorAll('.slide');
    slideElements.forEach((el) => observer.observe(el));

    return () => {
      slideElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSlide = (index: number) => {
    const slideElements = document.querySelectorAll('.slide');
    if (slideElements[index]) {
      slideElements[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="overflow-hidden relative w-full h-screen font-sans text-gray-800">
      <Header />
      
      <div
        ref={containerRef}
        className="overflow-y-scroll h-screen snap-y snap-mandatory scroll-smooth"
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            index={index}
            imageUrl={slide.imageUrl}
            heading={slide.heading}
            content={slide.content}
            bgColor={slide.bgColor}
            textColor={slide.textColor}
          />
        ))}
      </div>

      <Navigation
        totalSlides={slides.length}
        activeSlide={activeSlide}
        onNavigate={scrollToSlide}
      />

      <MusicPlayer
        isPlaying={isMusicPlaying}
        togglePlay={() => setIsMusicPlaying(!isMusicPlaying)}
      />
    </div>
  );
}

export default App;