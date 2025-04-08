
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, SkipForward, Bell, BellOff, HelpCircle, Check, Info } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

type TimerState = 'idle' | 'work' | 'shortBreak' | 'longBreak';

const PomodoroTechnique = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Timer state
  const [timerState, setTimerState] = useState<TimerState>('idle');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  
  // Settings
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showEducation, setShowEducation] = useState(false);
  
  // Progress tracking
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(8);
  const [sessionCount, setSessionCount] = useState(0);

  // Audio refs
  const workEndSound = useRef<HTMLAudioElement | null>(null);
  const breakEndSound = useRef<HTMLAudioElement | null>(null);
  
  // Timer logic
  const timerRef = useRef<number | null>(null);

  // Initialize audio elements
  useEffect(() => {
    workEndSound.current = new Audio('/sounds/work-end.mp3');
    breakEndSound.current = new Audio('/sounds/break-end.mp3');
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format time to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage for circular timer
  const calculateProgress = (): number => {
    let totalDuration = 0;
    
    switch(timerState) {
      case 'work':
        totalDuration = workDuration * 60;
        break;
      case 'shortBreak':
        totalDuration = shortBreakDuration * 60;
        break;
      case 'longBreak':
        totalDuration = longBreakDuration * 60;
        break;
      default:
        totalDuration = workDuration * 60;
    }
    
    return (timeLeft / totalDuration) * 100;
  };

  // Start the timer
  const startTimer = () => {
    if (isRunning) return;
    
    if (timerState === 'idle') {
      setTimerState('work');
      setTimeLeft(workDuration * 60);
    }
    
    setIsRunning(true);
    
    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Pause the timer
  const pauseTimer = () => {
    if (!isRunning) return;
    
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Reset the timer
  const resetTimer = () => {
    pauseTimer();
    setTimerState('idle');
    setTimeLeft(workDuration * 60);
    setIsRunning(false);
  };

  // Skip to next session
  const skipSession = () => {
    pauseTimer();
    handleTimerComplete();
  };

  // Handle timer completion
  const handleTimerComplete = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Play sound if enabled
    if (soundEnabled) {
      if (timerState === 'work') {
        workEndSound.current?.play();
      } else {
        breakEndSound.current?.play();
      }
    }
    
    // Show toast notification
    toast({
      title: timerState === 'work' ? "Work session complete!" : "Break time over!",
      description: timerState === 'work' ? "Time for a break." : "Ready for the next work session?",
    });
    
    // Update state based on current timer state
    if (timerState === 'work') {
      setCompletedPomodoros(prev => prev + 1);
      setSessionCount(prev => prev + 1);
      
      // Every 4 sessions, take a long break
      if (sessionCount % 4 === 3) {
        setTimerState('longBreak');
        setTimeLeft(longBreakDuration * 60);
      } else {
        setTimerState('shortBreak');
        setTimeLeft(shortBreakDuration * 60);
      }
    } else {
      // After a break, start a work session
      setTimerState('work');
      setTimeLeft(workDuration * 60);
    }
    
    // Auto-start the next session
    startTimer();
  };

  // Update timeLeft when durations change
  useEffect(() => {
    if (!isRunning) {
      if (timerState === 'work' || timerState === 'idle') {
        setTimeLeft(workDuration * 60);
      } else if (timerState === 'shortBreak') {
        setTimeLeft(shortBreakDuration * 60);
      } else if (timerState === 'longBreak') {
        setTimeLeft(longBreakDuration * 60);
      }
    }
  }, [workDuration, shortBreakDuration, longBreakDuration, timerState, isRunning]);

  // Get background color based on timer state
  const getBackgroundColor = () => {
    switch(timerState) {
      case 'work': return 'from-blue-500/20 to-blue-600/20';
      case 'shortBreak': return 'from-green-500/20 to-green-600/20';
      case 'longBreak': return 'from-teal-500/20 to-teal-600/20';
      default: return 'from-gray-100 to-gray-200';
    }
  };

  // Get text color based on timer state
  const getTextColor = () => {
    switch(timerState) {
      case 'work': return 'text-blue-700';
      case 'shortBreak': return 'text-green-700';
      case 'longBreak': return 'text-teal-700';
      default: return 'text-gray-700';
    }
  };

  // Get progress color based on timer state
  const getProgressColor = () => {
    switch(timerState) {
      case 'work': return '#3b82f6';
      case 'shortBreak': return '#22c55e';
      case 'longBreak': return '#14b8a6';
      default: return '#9ca3af';
    }
  };

  // Get timer label based on state
  const getTimerLabel = () => {
    switch(timerState) {
      case 'work': return 'Work Session';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return 'Ready to Focus?';
    }
  };

  // Calculate circumference for progress circle
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (calculateProgress() / 100) * circumference;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/productivity-techniques')}
              className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Techniques
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full w-8 h-8 p-0"
                    onClick={() => setShowEducation(!showEducation)}
                  >
                    <HelpCircle className="h-5 w-5 text-red-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>How the Pomodoro Technique Works</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Pomodoro Technique</h1>
            <p className="text-lg text-gray-600">Work in Focused Sprints, Rest, Repeat</p>
          </div>

          {/* Main Timer Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
            {/* Left Column - Timer */}
            <div className="lg:col-span-3 flex flex-col items-center">
              <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${getBackgroundColor()} rounded-3xl p-12 w-full max-w-md mx-auto`}>
                <div className="absolute inset-0 bg-white/40 rounded-3xl backdrop-blur-sm"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <p className={`text-lg font-medium mb-4 ${getTextColor()}`}>{getTimerLabel()}</p>
                  
                  {/* SVG Circle Timer */}
                  <div className="relative">
                    <svg width="280" height="280" className="transform -rotate-90">
                      <circle
                        cx="140"
                        cy="140"
                        r={radius}
                        stroke="#f1f1f1"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="140"
                        cy="140"
                        r={radius}
                        stroke={getProgressColor()}
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={progressOffset}
                        className="transition-all duration-1000 ease-linear"
                      />
                    </svg>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl md:text-6xl font-bold text-gray-900">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Timer Controls */}
                  <div className="flex items-center gap-4 mt-8">
                    {!isRunning ? (
                      <Button 
                        onClick={startTimer} 
                        size="lg"
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center"
                      >
                        <Play className="h-6 w-6" />
                      </Button>
                    ) : (
                      <Button 
                        onClick={pauseTimer} 
                        size="lg"
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center"
                      >
                        <Pause className="h-6 w-6" />
                      </Button>
                    )}
                    
                    <Button 
                      onClick={resetTimer} 
                      variant="outline" 
                      size="icon"
                      className="rounded-full border-2 border-gray-300 w-10 h-10"
                    >
                      <RotateCcw className="h-4 w-4 text-gray-600" />
                    </Button>
                    
                    <Button 
                      onClick={skipSession} 
                      variant="outline" 
                      size="icon"
                      className="rounded-full border-2 border-gray-300 w-10 h-10"
                    >
                      <SkipForward className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Progress Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">Today's Progress</h3>
                  <span className="text-sm text-gray-500">{completedPomodoros}/{dailyGoal} sessions</span>
                </div>
                
                {/* Tomato Icons for Completed Sessions */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.from({ length: dailyGoal }).map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < completedPomodoros 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {index < completedPomodoros ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span className="text-xs">{index + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Progress Bar */}
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-300"
                    style={{ width: `${(completedPomodoros / dailyGoal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Settings */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Customize Your Sessions</h3>
                  
                  <div className="space-y-6">
                    {/* Work Duration */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="work-duration" className="text-sm font-medium text-gray-700">
                          Work Duration: {workDuration} min
                        </Label>
                      </div>
                      <Slider
                        id="work-duration"
                        min={5}
                        max={60}
                        step={5}
                        value={[workDuration]}
                        onValueChange={(value) => setWorkDuration(value[0])}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Short Break Duration */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="short-break" className="text-sm font-medium text-gray-700">
                          Short Break: {shortBreakDuration} min
                        </Label>
                      </div>
                      <Slider
                        id="short-break"
                        min={1}
                        max={15}
                        step={1}
                        value={[shortBreakDuration]}
                        onValueChange={(value) => setShortBreakDuration(value[0])}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Long Break Duration */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="long-break" className="text-sm font-medium text-gray-700">
                          Long Break: {longBreakDuration} min
                        </Label>
                      </div>
                      <Slider
                        id="long-break"
                        min={10}
                        max={30}
                        step={5}
                        value={[longBreakDuration]}
                        onValueChange={(value) => setLongBreakDuration(value[0])}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Daily Goal */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="daily-goal" className="text-sm font-medium text-gray-700">
                          Daily Goal: {dailyGoal} pomodoros
                        </Label>
                      </div>
                      <Slider
                        id="daily-goal"
                        min={1}
                        max={12}
                        step={1}
                        value={[dailyGoal]}
                        onValueChange={(value) => setDailyGoal(value[0])}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Sound Toggle */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sound-toggle" className="text-sm font-medium text-gray-700 cursor-pointer">
                        <div className="flex items-center gap-2">
                          {soundEnabled ? (
                            <Bell className="h-4 w-4 text-gray-600" />
                          ) : (
                            <BellOff className="h-4 w-4 text-gray-400" />
                          )}
                          Sound Notifications
                        </div>
                      </Label>
                      <Switch
                        id="sound-toggle"
                        checked={soundEnabled}
                        onCheckedChange={setSoundEnabled}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Preset Durations */}
              <div className="mt-4 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-md font-medium text-gray-800 mb-3">Quick Presets</h3>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setWorkDuration(25);
                      setShortBreakDuration(5);
                      setLongBreakDuration(15);
                    }}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Classic (25/5)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setWorkDuration(50);
                      setShortBreakDuration(10);
                      setLongBreakDuration(30);
                    }}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Long Focus (50/10)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setWorkDuration(15);
                      setShortBreakDuration(3);
                      setLongBreakDuration(15);
                    }}
                    className="border-green-200 text-green-600 hover:bg-green-50"
                  >
                    Quick Cycles (15/3)
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Educational Section - collapsed by default */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showEducation ? 'auto' : 0,
              opacity: showEducation ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white rounded-xl shadow-sm mb-10"
          >
            <div className="p-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">How the Pomodoro Technique Works</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <Info className="h-5 w-5 text-red-500" />
                      Step-by-Step Process
                    </h3>
                    <ol className="space-y-3 text-gray-600">
                      <li className="flex gap-3">
                        <span className="bg-red-100 text-red-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">1</span>
                        <span>Choose a task to work on</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="bg-red-100 text-red-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">2</span>
                        <span>Set the timer for 25 minutes (one Pomodoro)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="bg-red-100 text-red-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">3</span>
                        <span>Work on the task until the timer rings</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="bg-red-100 text-red-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">4</span>
                        <span>Take a short break (5 minutes)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="bg-red-100 text-red-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">5</span>
                        <span>After 4 Pomodoros, take a longer break (15-30 minutes)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="bg-red-100 text-red-600 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 font-medium">6</span>
                        <span>Repeat the cycle</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                      <Info className="h-5 w-5 text-red-500" />
                      Why Pomodoro Works
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Reduces mental fatigue by breaking work into manageable chunks</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Helps maintain focus and avoid distractions</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Creates a sense of urgency to complete tasks within timeboxes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Gives your brain regular rest periods to process information</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Improves estimation skills by tracking work in fixed intervals</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Reduces burnout and enhances sustainable productivity</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    The Pomodoro Technique was developed by Francesco Cirillo in the late 1980s. 
                    The name "Pomodoro" (tomato in Italian) comes from the tomato-shaped kitchen timer 
                    Cirillo used as a university student.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PomodoroTechnique;
