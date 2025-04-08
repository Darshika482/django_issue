
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DeepFocusTimerProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  activeTimer: boolean;
  setActiveTimer: React.Dispatch<React.SetStateAction<boolean>>;
  timerRef: React.MutableRefObject<NodeJS.Timeout | null>;
}

const DeepFocusTimer: React.FC<DeepFocusTimerProps> = ({ 
  timer, 
  setTimer, 
  activeTimer, 
  setActiveTimer,
  timerRef 
}) => {
  const isMobile = useIsMobile();
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const setTimerDuration = (minutes: number) => {
    setTimer(minutes * 60);
    setActiveTimer(false);
  };

  const toggleTimer = () => {
    if (activeTimer) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } else {
      timerRef.current = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            // Timer ended
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
            setActiveTimer(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    setActiveTimer(!activeTimer);
  };

  return (
    <div className="text-center mb-8">
      <div className="text-6xl font-bold text-white mb-6">
        {formatTime(timer)}
      </div>
      <div className="flex justify-center flex-wrap gap-2 mb-6">
        <Button 
          onClick={() => setTimerDuration(15)} 
          variant={timer === 15 * 60 ? "default" : "outline"} 
          className={timer === 15 * 60 
            ? "bg-[#8404fc] text-white" 
            : "bg-[#352368] text-white border-purple-700 hover:bg-[#463786] hover:text-white"}
        >
          15 min
        </Button>
        <Button 
          onClick={() => setTimerDuration(25)} 
          variant={timer === 25 * 60 ? "default" : "outline"} 
          className={timer === 25 * 60 
            ? "bg-[#8404fc] text-white" 
            : "bg-[#352368] text-white border-purple-700 hover:bg-[#463786] hover:text-white"}
        >
          25 min
        </Button>
        <Button 
          onClick={() => setTimerDuration(45)} 
          variant={timer === 45 * 60 ? "default" : "outline"} 
          className={timer === 45 * 60 
            ? "bg-[#8404fc] text-white" 
            : "bg-[#352368] text-white border-purple-700 hover:bg-[#463786] hover:text-white"}
        >
          45 min
        </Button>
        <Button 
          onClick={() => setTimerDuration(60)} 
          variant={timer === 60 * 60 ? "default" : "outline"} 
          className={timer === 60 * 60 
            ? "bg-[#8404fc] text-white" 
            : "bg-[#352368] text-white border-purple-700 hover:bg-[#463786] hover:text-white"}
        >
          60 min
        </Button>
      </div>
      <Button onClick={toggleTimer} className="px-10 bg-[#8404fc] hover:bg-[#6800cc] text-white">
        {activeTimer ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
        {activeTimer ? 'Pause' : 'Start'} Timer
      </Button>
    </div>
  );
};

export default DeepFocusTimer;
