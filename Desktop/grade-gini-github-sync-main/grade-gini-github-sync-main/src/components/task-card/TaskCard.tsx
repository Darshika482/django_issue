
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Strikethrough } from 'lucide-react';
import { Task } from '@/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import TaskCardHeader from './TaskCardHeader';
import TaskCardContent from './TaskCardContent';
import TaskCardFooter from './TaskCardFooter';

interface TaskCardProps {
  task: Task;
  onToggleComplete?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  className,
}) => {
  // Format the date if it exists
  const formattedDate = task.date 
    ? format(new Date(task.date), 'MMM d, yyyy')
    : 'No date set';
  
  const priorityClasses = {
    low: 'bg-green-50 border-green-300 text-green-700',
    medium: 'bg-yellow-50 border-yellow-300 text-yellow-700',
    high: 'bg-red-50 border-red-300 text-red-700',
  }[task.priority || 'medium'];

  return (
    <Card className={cn("overflow-hidden", 
      task.completed && "opacity-75 bg-gray-50", 
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="pt-1">
            <Checkbox 
              checked={task.completed}
              onCheckedChange={onToggleComplete}
              className="mt-1"
            />
          </div>
          
          <div className="flex-1">
            <h3 className={cn("font-medium text-base leading-tight", 
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            <TaskCardContent task={task} isCompact={false} />
            
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs text-gray-500">
                {formattedDate}
              </span>
              
              {task.systemName && (
                <span className="text-xs text-violet-600 font-medium">
                  {task.systemName}
                </span>
              )}
              
              <span className={cn("text-xs px-2 py-0.5 rounded-full border", priorityClasses)}>
                {task.priority}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      
      {(onEdit || onDelete) && (
        <CardFooter className="flex justify-end gap-2 py-2 px-4 bg-gray-50">
          {onEdit && (
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Pencil className="h-3.5 w-3.5 mr-1" />
              Edit
            </Button>
          )}
          
          {onDelete && (
            <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default TaskCard;
