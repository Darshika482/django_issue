
import React from 'react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import { usePlannerContext } from './PlannerContext';

const PlannerHeader: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    handleAddTask, 
    toggleSidebar, 
    isSidebarOpen 
  } = usePlannerContext();
  
  return (
    <div className="planner-header">
      <Header 
        currentView={activeView}
        setCurrentView={setActiveView}
        onCreateTask={handleAddTask}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
};

export default PlannerHeader;
