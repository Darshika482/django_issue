
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import TaskSidebarContent from './TaskSidebarContent';

interface TaskSidebarProps {
  onEditTask: (taskId: string) => void;
}

const TaskSidebar: React.FC<TaskSidebarProps> = ({ onEditTask }) => {
  return (
    <div className="w-full h-full border-r border-border bg-secondary/30 flex flex-col overflow-hidden">
      <TooltipProvider>
        <TaskSidebarContent onEditTask={onEditTask} />
      </TooltipProvider>
    </div>
  );
};

export default TaskSidebar;
