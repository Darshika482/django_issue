
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';

const WelcomeSection: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="mb-8">
      <div className="flex items-center mb-1">
        <ArrowLeft className="h-5 w-5 mr-2 text-gray-500" />
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-[#8404fc]">{user?.email?.split('@')[0] || "Student"}</span>
        </h1>
      </div>
      <p className="text-gray-600 ml-7">
        {format(new Date(), "EEEE, MMMM d, yyyy")} | Your progress is inspiring
      </p>
    </div>
  );
};

export default WelcomeSection;
