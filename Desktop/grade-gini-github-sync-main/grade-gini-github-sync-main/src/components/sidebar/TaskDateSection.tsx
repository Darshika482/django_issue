
import React from 'react';
import { Task } from '@/types';

interface TaskDateSectionProps {
  date: string;
  tasks: Task[];
  renderTask: (task: Task) => React.ReactNode;
}

export const TaskDateSection: React.FC<TaskDateSectionProps> = ({
  date,
  tasks,
  renderTask
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2 px-2">
        {date} 
        <span className="text-xs text-muted-foreground ml-2">
          ({tasks.length} tasks)
        </span>
      </h3>
      
      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map(task => renderTask(task))
        ) : (
          <div className="text-xs text-muted-foreground px-2">No tasks for this day</div>
        )}
      </div>
    </div>
  );
};

export default TaskDateSection;
