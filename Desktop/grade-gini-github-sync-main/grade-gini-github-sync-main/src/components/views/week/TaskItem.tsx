
import React from 'react';
import { Task } from '@/types';
import { cn } from "@/lib/utils";
import { useTaskContext } from '@/store/TaskContext';

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { dragInfo, setDragInfo } = useTaskContext();
  
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };
  
  const getCategoryColor = (category?: Task['category']) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personal': return 'bg-green-100 text-green-800 border-green-200';
      case 'study': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'health': return 'bg-red-100 text-red-800 border-red-200';
      case 'errands': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'finance': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    setDragInfo({ taskId: task.id, sourceDate: task.date });
  };
  
  return (
    <div 
      className={cn(
        "task-item p-1 text-xs rounded shadow-sm border-l-4 w-full h-full overflow-hidden",
        task.completed ? "opacity-60" : "",
        getCategoryColor(task.category)
      )}
      style={{ borderLeftColor: getPriorityColor(task.priority).replace('bg-', '') }}
      draggable
      onDragStart={handleDragStart}
      onClick={onEdit}
    >
      <div className={cn("font-medium truncate", task.completed && "line-through text-gray-500")}>
        {task.title}
      </div>
      {task.time && (
        <div className={cn("text-[10px] mt-0.5 opacity-80", task.completed && "line-through")}>
          {task.time} {task.endTime ? `- ${task.endTime}` : ''}
        </div>
      )}
      {task.systemName && (
        <div className={cn("text-[10px] mt-0.5 bg-primary/10 rounded-sm px-1 inline-block", 
          task.completed && "line-through text-gray-500")}>
          {task.systemName}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
