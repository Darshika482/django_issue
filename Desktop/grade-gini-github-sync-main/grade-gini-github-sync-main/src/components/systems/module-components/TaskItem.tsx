
import React from 'react';
import { Task } from '@/types';
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskItemProps {
  task: Task;
  selectMode: boolean;
  selectedTasks: string[];
  onTaskSelection: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  selectMode,
  selectedTasks,
  onTaskSelection,
  onEditTask,
  onDeleteTask
}) => {
  const isSelected = selectedTasks.includes(task.id);
  
  return (
    <div className="p-4 group hover:bg-gray-50">
      <div className="flex items-start">
        {selectMode ? (
          <div className="flex-shrink-0 mr-3 mt-0.5">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={() => onTaskSelection(task.id)}
              id={`task-select-${task.id}`}
            />
          </div>
        ) : null}
        
        <div className="flex-grow">
          <div className="flex justify-between">
            <h4 
              className={`text-base font-medium ${task.completed ? "text-gray-400 line-through" : "text-gray-800"}`}
            >
              {task.title}
            </h4>
            
            {!selectMode && onDeleteTask && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <MoreHorizontal className="h-4 w-4 text-gray-500" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[100]">
                  <DropdownMenuItem 
                    onClick={() => onEditTask(task)}
                    className="cursor-pointer"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDeleteTask(task.id)}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          
          {task.description && (
            <p className={`text-sm mt-1 ${task.completed ? "text-gray-400 line-through" : "text-gray-600"}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-1 mt-2">
            {task.priority && (
              <span className={`text-xs px-2 py-0.5 rounded 
                ${task.priority === 'high' 
                  ? 'bg-red-50 text-red-600' 
                  : task.priority === 'medium' 
                    ? 'bg-amber-50 text-amber-600' 
                    : 'bg-blue-50 text-blue-600'}`
              }>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            )}
            
            {task.category && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
