
import React from 'react';
import OverviewCard from './OverviewCard';
import { LearningSystem } from '@/types';

interface OverviewSectionProps {
  systems: LearningSystem[];
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ systems }) => {
  // Mock data for dashboard stats
  const todaysFocus = {
    hours: 4,
    tasksPlanned: 6,
    tasksCompleted: 2
  };

  const upcomingDeadlines = [
    "Medical Ethics Paper (3 days)",
    "Python Project (5 days)"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Active Systems Card */}
      <OverviewCard
        title="Active Systems"
        value={systems.length}
        subtitle={systems.length > 0 
          ? systems.map(s => s.title).slice(0, 2).join(", ") + (systems.length > 2 ? " ..." : "") 
          : "No active systems yet"}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8404fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        }
      />

      {/* Today's Focus Card */}
      <OverviewCard
        title="Today's Focus"
        value={`${todaysFocus.hours} hrs`}
        subtitle={`${todaysFocus.tasksPlanned} tasks planned with ${todaysFocus.tasksCompleted} completed`}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8404fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />

      {/* Upcoming Deadlines Card */}
      <OverviewCard
        title="Upcoming Deadlines"
        value={upcomingDeadlines.length}
        subtitle={upcomingDeadlines.length > 0 ? upcomingDeadlines[0] : "No upcoming deadlines"}
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8404fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
      />

      {/* Productivity Score Card */}
      <OverviewCard
        title="Productivity Score"
        value="92%"
        subtitle="12% above average in your cohort"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8404fc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      />
    </div>
  );
};

export default OverviewSection;
