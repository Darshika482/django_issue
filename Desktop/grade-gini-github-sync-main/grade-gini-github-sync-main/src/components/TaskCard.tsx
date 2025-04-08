
import React from 'react';
import { Task } from '@/types';
import { Card } from "@/components/ui/card";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Trash2 } from "lucide-react";
import { useTaskContext } from '@/store/TaskContext';
import TaskCardHeader from './task-card/TaskCardHeader';
import TaskCardContent from './task-card/TaskCardContent';
import TaskCardSubtasks from './task-card/TaskCardSubtasks';
import TaskCardFooter from './task-card/TaskCardFooter';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  isDraggable?: boolean;
  isCompact?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onEdit, 
  isDraggable = true,
  isCompact = false
}) => {
  const { setDragInfo, deleteTask } = useTaskContext();
  const [expanded, setExpanded] = React.useState(false);
  
  const handleTaskClick = () => {
    onEdit();
  };
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    setDragInfo({ taskId: task.id, sourceDate: task.date });
  };
  
  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };
  
  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };
  
  const getPriorityClass = (priority: string = 'medium') => {
    const priorityClasses: Record<string, string> = {
      high: 'border-l-4 border-red-500',
      medium: 'border-l-4 border-yellow-500',
      low: 'border-l-4 border-green-500'
    };
    
    return priorityClasses[priority] || priorityClasses.medium;
  };
  
  const getTaskStatusClass = () => {
    if (task.completed) return 'opacity-60';
    if (!isToday(new Date(task.date)) && isPast(new Date(task.date))) return 'bg-red-50';
    return '';
  };

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          className={`${isCompact ? 'mb-1 p-0' : 'mb-2'} cursor-pointer hover:shadow-md transition-shadow ${getPriorityClass(task.priority)} ${getTaskStatusClass()} ${task.completed ? 'completed' : ''}`}
          onClick={handleTaskClick}
          draggable={isDraggable}
          onDragStart={handleDragStart}
        >
          <div className={`${isCompact ? 'p-2' : 'p-3'} overflow-visible`}>
            <div className="flex justify-between items-start mb-1">
              <div className="flex-1 min-w-0">
                <TaskCardHeader 
                  task={task} 
                  toggleCompletion={deleteTask}
                  isCompact={isCompact}
                  hasSubtasks={hasSubtasks}
                  expanded={expanded}
                  toggleExpanded={toggleExpanded}
                />
                
                <TaskCardContent task={task} isCompact={isCompact} />
                
                {expanded && hasSubtasks && (
                  <TaskCardSubtasks task={task} />
                )}
              </div>
            </div>
            
            {(!isCompact || task.category || task.time || task.systemName) && (
              <TaskCardFooter task={task} isCompact={isCompact} />
            )}
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={onEdit}>
          Edit
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem 
          onClick={handleDeleteTask}
          className="text-red-500"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

// Add missing imports
import { isToday, isPast } from 'date-fns';

export default TaskCard;
