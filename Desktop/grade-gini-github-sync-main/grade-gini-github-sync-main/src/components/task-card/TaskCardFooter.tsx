
import React from 'react';
import { Task } from '@/types';
import { Badge } from "@/components/ui/badge";

interface TaskCardFooterProps {
  task: Task;
  isCompact: boolean;
}

const TaskCardFooter: React.FC<TaskCardFooterProps> = ({ task, isCompact }) => {
  const getTaskCategoryClass = (category: string = 'other') => {
    const categoryClasses: Record<string, string> = {
      work: 'bg-blue-100 text-blue-800',
      personal: 'bg-green-100 text-green-800',
      study: 'bg-orange-100 text-orange-800',
      health: 'bg-red-100 text-red-800',
      other: 'bg-purple-100 text-purple-800'
    };
    
    return categoryClasses[category] || categoryClasses.other;
  };
  
  const formatTime = (time?: string) => {
    if (!time) return '';
    
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${period}`;
  };
  
  return (
    <div className="flex flex-wrap justify-between items-center mt-2 ml-6 gap-1 overflow-hidden opacity-70">
      <div className="flex flex-wrap items-center gap-1 max-w-full">
        {task.category && (
          <Badge variant="outline" className={`${getTaskCategoryClass(task.category)} text-xs truncate max-w-[90px]`}>
            {task.category}
          </Badge>
        )}
        
        {task.time && (
          <span className="text-xs text-gray-600 truncate">
            {formatTime(task.time)}
            {task.endTime && ` - ${formatTime(task.endTime)}`}
          </span>
        )}
      </div>
      
      {task.systemName && (
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 text-xs truncate max-w-[90px]">
          {task.systemName}
        </Badge>
      )}
    </div>
  );
};

export default TaskCardFooter;
