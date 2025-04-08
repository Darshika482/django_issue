
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Maximize, Minimize } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import DeepFocusTimer from '@/components/focus/DeepFocusTimer';
import MusicPlayer from '@/components/focus/MusicPlayer';
import FocusTips from '@/components/focus/FocusTips';
import { useIsMobile } from '@/hooks/use-mobile';

const DeepFocus: React.FC = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [activeTimer, setActiveTimer] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState('nature');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const musicTracks = {
    nature: '/sounds/nature.mp3',
    rain: '/sounds/rain.mp3',
    ambient: '/sounds/ambient.mp3',
    piano: '/sounds/work-end.mp3'
  };

  const toggleFullscreen = () => {
    if (!fullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setFullscreen(!fullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div ref={containerRef} className="min-h-screen pt-16 bg-[#1a103c] text-white">
        <div className={`max-w-5xl mx-auto px-4 py-8 ${isMobile ? 'pt-4' : ''}`}>
          <h1 className="text-3xl font-bold text-center text-white mb-8">Deep Focus Mode</h1>
          
          <div className="bg-[#231647] rounded-xl shadow-lg shadow-purple-900/30 p-4 md:p-6 mb-8 backdrop-blur-sm border border-purple-800/30">
            <DeepFocusTimer 
              timer={timer}
              setTimer={setTimer}
              activeTimer={activeTimer}
              setActiveTimer={setActiveTimer}
              timerRef={timerRef}
            />

            <MusicPlayer 
              playing={playing}
              setPlaying={setPlaying}
              muted={muted}
              setMuted={setMuted}
              volume={volume}
              setVolume={setVolume}
              selectedMusic={selectedMusic}
              setSelectedMusic={setSelectedMusic}
              audioRef={audioRef}
              musicTracks={musicTracks}
            />

            <div className="text-center mt-6">
              <Button onClick={toggleFullscreen} className="px-10 bg-[#8404fc] hover:bg-[#7000db] text-white">
                {fullscreen ? <Minimize className="mr-2 h-4 w-4" /> : <Maximize className="mr-2 h-4 w-4" />}
                {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              </Button>
              <p className="text-sm text-gray-300 mt-2">
                Fullscreen mode helps eliminate distractions for maximum focus
              </p>
            </div>
          </div>

          <FocusTips />
        </div>

        {/* Audio element for background music */}
        <audio 
          ref={audioRef} 
          src={musicTracks[selectedMusic as keyof typeof musicTracks]} 
          loop 
        />
      </div>
      <Footer />
    </>
  );
};

export default DeepFocus;
