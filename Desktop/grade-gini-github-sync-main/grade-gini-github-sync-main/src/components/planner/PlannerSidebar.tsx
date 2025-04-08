
import React from 'react';
import { ResizablePanel } from '@/components/ui/resizable';
import TaskSidebar from '@/components/sidebar/TaskSidebar';
import { usePlannerContext } from './PlannerContext';

const PlannerSidebar: React.FC = () => {
  const { handleEditTask, sidebarSize } = usePlannerContext();
  
  return (
    <ResizablePanel 
      defaultSize={sidebarSize} 
      minSize={20}
      maxSize={40}
      className="planner-sidebar"
    >
      <TaskSidebar 
        onEditTask={handleEditTask} 
      />
    </ResizablePanel>
  );
};

export default PlannerSidebar;
