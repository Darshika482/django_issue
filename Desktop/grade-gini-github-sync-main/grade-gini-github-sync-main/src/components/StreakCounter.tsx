
import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

const StreakCounter: React.FC = () => {
  const [streak, setStreak] = useState(0);
  
  useEffect(() => {
    // In a real app, this would be fetched from an API or localStorage
    const fetchStreak = () => {
      const lastActivity = localStorage.getItem('lastVocabActivity');
      const streakCount = localStorage.getItem('vocabStreak');
      
      if (!lastActivity) {
        // First time user
        localStorage.setItem('lastVocabActivity', new Date().toISOString());
        localStorage.setItem('vocabStreak', '1');
        setStreak(1);
        return;
      }
      
      const today = new Date();
      const lastDate = new Date(lastActivity);
      
      // Check if last activity was yesterday
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const isYesterday = 
        lastDate.getDate() === yesterday.getDate() &&
        lastDate.getMonth() === yesterday.getMonth() &&
        lastDate.getFullYear() === yesterday.getFullYear();
      
      // Check if last activity was today
      const isToday = 
        lastDate.getDate() === today.getDate() &&
        lastDate.getMonth() === today.getMonth() &&
        lastDate.getFullYear() === today.getFullYear();
      
      if (isToday) {
        // Already visited today
        setStreak(parseInt(streakCount || '0', 10));
      } else if (isYesterday) {
        // Visited yesterday, increment streak
        const newStreak = parseInt(streakCount || '0', 10) + 1;
        localStorage.setItem('lastVocabActivity', today.toISOString());
        localStorage.setItem('vocabStreak', newStreak.toString());
        setStreak(newStreak);
      } else {
        // Missed days, reset streak
        localStorage.setItem('lastVocabActivity', today.toISOString());
        localStorage.setItem('vocabStreak', '1');
        setStreak(1);
      }
    };
    
    fetchStreak();
  }, []);
  
  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-100 rounded-full px-4 py-2 border border-amber-200">
      <Flame className="h-5 w-5 text-orange-500" />
      <div className="flex items-baseline">
        <span className="text-lg font-bold text-orange-500">{streak}</span>
        <span className="text-sm text-gray-600 ml-1">day streak</span>
      </div>
    </div>
  );
};

export default StreakCounter;
