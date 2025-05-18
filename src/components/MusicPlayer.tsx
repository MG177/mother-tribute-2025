import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, togglePlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  // Load audio and handle play/pause based on isPlaying prop
  useEffect(() => {
    if (!audioRef.current) return;

    const handleCanPlayThrough = () => {
      setAudioLoaded(true);
    };

    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          'canplaythrough',
          handleCanPlayThrough
        );
      }
    };
  }, []);

  // Handle play/pause when isPlaying changes or audio loads
  useEffect(() => {
    if (!audioRef.current || !audioLoaded) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Audio playback failed:', error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioLoaded]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} loop preload="auto" src="/src/data/music.mp3" />
      <button
        className="bg-white/80 backdrop-blur-sm hover:bg-white/90 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        tabIndex={0}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
};

export default MusicPlayer;
