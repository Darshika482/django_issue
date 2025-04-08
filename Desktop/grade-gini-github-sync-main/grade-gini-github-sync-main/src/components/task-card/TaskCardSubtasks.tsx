
import React from 'react';
import { CheckCircle2 } from "lucide-react";
import { Task } from '@/types';
import { useTaskContext } from '@/store/TaskContext';

interface TaskCardSubtasksProps {
  task: Task;
}

const TaskCardSubtasks: React.FC<TaskCardSubtasksProps> = ({ task }) => {
  const { toggleSubtaskCompletion } = useTaskContext();
  
  const handleSubtaskCheckboxClick = (e: React.MouseEvent, subtaskId: string) => {
    e.stopPropagation();
    toggleSubtaskCompletion(task.id, subtaskId);
  };
  
  if (!task.subtasks || task.subtasks.length === 0) {
    return null;
  }
  
  return (
    <div className="ml-6 mt-2 space-y-1">
      {task.subtasks.map(subtask => (
        <div key={subtask.id} className="flex items-center gap-2 text-xs">
          <div 
            className={`w-3 h-3 rounded-full border flex items-center justify-center cursor-pointer
              ${subtask.completed ? 'bg-primary border-primary' : 'border-gray-300'}`}
            onClick={(e) => handleSubtaskCheckboxClick(e, subtask.id)}
          >
            {subtask.completed && <CheckCircle2 className="h-2 w-2 text-white" />}
          </div>
          <span className={subtask.completed ? 'line-through text-muted-foreground' : ''}>
            {subtask.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TaskCardSubtasks;
