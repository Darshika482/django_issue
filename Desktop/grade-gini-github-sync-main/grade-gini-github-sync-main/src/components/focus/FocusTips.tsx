
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const FocusTips: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-[#231647] rounded-xl shadow-lg shadow-purple-900/30 p-4 md:p-6 backdrop-blur-sm border border-purple-800/30 w-full">
      <h2 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-white">Focus Tips</h2>
      <ul className="space-y-3 md:space-y-4 text-gray-200">
        <li className="flex items-start">
          <span className="bg-[#8404fc]/20 text-[#a385ff] rounded-full w-6 h-6 flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 text-sm">1</span>
          <span className="text-sm md:text-base">Use the Pomodoro technique: 25 minutes of focused work followed by a 5-minute break.</span>
        </li>
        <li className="flex items-start">
          <span className="bg-[#8404fc]/20 text-[#a385ff] rounded-full w-6 h-6 flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 text-sm">2</span>
          <span className="text-sm md:text-base">Turn on Do Not Disturb mode on your devices to minimize interruptions.</span>
        </li>
        <li className="flex items-start">
          <span className="bg-[#8404fc]/20 text-[#a385ff] rounded-full w-6 h-6 flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 text-sm">3</span>
          <span className="text-sm md:text-base">Keep water nearby to stay hydrated during your focus sessions.</span>
        </li>
        <li className="flex items-start">
          <span className="bg-[#8404fc]/20 text-[#a385ff] rounded-full w-6 h-6 flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 text-sm">4</span>
          <span className="text-sm md:text-base">Use background noise or music without lyrics to maintain concentration.</span>
        </li>
      </ul>
    </div>
  );
};

export default FocusTips;
