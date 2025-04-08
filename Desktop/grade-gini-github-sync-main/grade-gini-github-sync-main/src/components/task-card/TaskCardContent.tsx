
import React from 'react';
import { Task } from '@/types';

interface TaskCardContentProps {
  task: Task;
  isCompact: boolean;
}

const TaskCardContent: React.FC<TaskCardContentProps> = ({ task, isCompact }) => {
  if (isCompact || !task.description) {
    return null;
  }
  
  return (
    <p className={`text-xs text-gray-500 mt-1 ml-6 line-clamp-2 whitespace-normal break-words opacity-80 ${task.completed ? 'line-through' : ''}`}>
      {task.description}
    </p>
  );
};

export default TaskCardContent;
