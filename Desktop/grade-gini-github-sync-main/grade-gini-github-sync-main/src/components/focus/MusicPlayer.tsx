
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MusicPlayerProps {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  muted: boolean;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  selectedMusic: string;
  setSelectedMusic: React.Dispatch<React.SetStateAction<string>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  musicTracks: Record<string, string>;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  playing,
  setPlaying,
  muted,
  setMuted,
  volume,
  setVolume,
  selectedMusic,
  setSelectedMusic,
  audioRef,
  musicTracks
}) => {
  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const changeMusic = (track: string) => {
    setSelectedMusic(track);
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = musicTracks[track as keyof typeof musicTracks];
      if (wasPlaying) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4 text-white">Background Sound</h2>
      <Tabs defaultValue={selectedMusic} onValueChange={changeMusic} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4 bg-[#352368]">
          <TabsTrigger value="nature" className="data-[state=active]:bg-[#8404fc] data-[state=active]:text-white text-white">Nature</TabsTrigger>
          <TabsTrigger value="rain" className="data-[state=active]:bg-[#8404fc] data-[state=active]:text-white text-white">Rain</TabsTrigger>
          <TabsTrigger value="ambient" className="data-[state=active]:bg-[#8404fc] data-[state=active]:text-white text-white">Ambient</TabsTrigger>
          <TabsTrigger value="piano" className="data-[state=active]:bg-[#8404fc] data-[state=active]:text-white text-white">Piano</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center justify-between mb-2">
        <Button onClick={togglePlay} variant="ghost" className="flex items-center text-white hover:text-white hover:bg-[#352368]/10">
          {playing ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
          {playing ? 'Pause' : 'Play'} Music
        </Button>
        <div className="flex items-center space-x-4">
          <Button onClick={toggleMute} variant="ghost" size="icon" className="text-white hover:text-white hover:bg-[#352368]/10">
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <div className="w-48">
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="[&_[role=slider]]:bg-[#8404fc]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
