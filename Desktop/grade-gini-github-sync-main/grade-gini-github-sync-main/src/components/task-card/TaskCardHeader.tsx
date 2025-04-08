
import React from 'react';
import { Task } from '@/types';
import { Checkbox } from "@/components/ui/checkbox";
import { formatTime } from '@/lib/utils';
import CategoryBadge from '../task-form/CategoryBadge';
import { getTaskPriorityInfo } from '@/lib/taskUtils';
import { Label } from '../ui/label';

interface TaskCardHeaderProps {
  task: Task;
  toggleCompletion: (taskId: string) => void;
  isCompact?: boolean;
  hasSubtasks?: boolean;
  expanded?: boolean;
  toggleExpanded?: (e: React.MouseEvent) => void;
}

const TaskCardHeader: React.FC<TaskCardHeaderProps> = ({ 
  task, 
  toggleCompletion,
  isCompact = false,
  hasSubtasks = false,
  expanded = false,
  toggleExpanded
}) => {
  const priorityInfo = getTaskPriorityInfo(task.priority);
  
  return (
    <div className="flex flex-col gap-2.5 p-4 relative">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          <Checkbox 
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => toggleCompletion(task.id)}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1">
            <Label
              htmlFor={`task-${task.id}`}
              className={`text-base font-medium cursor-pointer max-w-full 
                ${task.completed ? "text-gray-400 line-through" : ""}`}
            >
              {task.title}
            </Label>
            
            <div className="flex flex-wrap gap-1.5">
              {task.time && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                  {formatTime(task.time)}
                </span>
              )}
              
              {task.priority && (
                <span 
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityInfo.bgColor} ${priorityInfo.textColor}`}
                >
                  {priorityInfo.label}
                </span>
              )}
              
              {task.category && (
                <CategoryBadge category={task.category} />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {task.description && (
        <p className={`text-sm pl-8 text-gray-600 ${task.completed ? "line-through text-gray-400" : ""}`}>
          {task.description}
        </p>
      )}
    </div>
  );
};

export default TaskCardHeader;
