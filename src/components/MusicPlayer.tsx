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
    <div className="fixed right-6 bottom-6 z-40">
      <audio ref={audioRef} loop preload="auto" src="/music.mp3" />
      <button
        className="p-3 text-gray-800 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 bg-white/80 hover:bg-white/90 hover:scale-105"
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
