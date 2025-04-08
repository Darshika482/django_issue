
import React from 'react';
import { format } from 'date-fns';
import { Task, TaskCategory } from '@/types';
import { Calendar, Clock, MoreHorizontal, Trash2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableRow, TableCell } from "@/components/ui/table";
import { useTaskContext } from '@/store/TaskContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface TaskTableRowProps {
  task: Task;
  onEditTask: (taskId: string) => void;
  showDatePicker: (taskId: string) => void;
}

const TaskTableRow: React.FC<TaskTableRowProps> = ({ task, onEditTask, showDatePicker }) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    const taskElement = e.currentTarget as HTMLElement;
    taskElement.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const taskElement = e.currentTarget as HTMLElement;
    taskElement.classList.remove('opacity-50');
  };
  
  const handleDeleteTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return null;
    }
  };
  
  const getCategoryBadge = (category: TaskCategory | undefined) => {
    if (!category) return null;
    
    switch (category) {
      case 'work':
        return <Badge className="bg-blue-100 text-blue-800">Work</Badge>;
      case 'personal':
        return <Badge className="bg-green-100 text-green-800">Personal</Badge>;
      case 'study':
        return <Badge className="bg-orange-100 text-orange-800">Study</Badge>;
      case 'health':
        return <Badge className="bg-red-100 text-red-800">Health</Badge>;
      case 'errands':
        return <Badge className="bg-yellow-100 text-yellow-800">Errands</Badge>;
      case 'finance':
        return <Badge className="bg-violet-100 text-violet-800">Finance</Badge>;
      case 'other':
        return <Badge className="bg-purple-100 text-purple-800">Other</Badge>;
      default:
        return null;
    }
  };

  return (
    <TableRow 
      className={`cursor-pointer ${task.completed ? 'bg-muted/30' : ''}`}
      onClick={() => onEditTask(task.id)}
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      onDragEnd={handleDragEnd}
    >
      <TableCell className="p-2">
        <Checkbox
          checked={task.completed}
          onClick={(e) => {
            e.stopPropagation();
            toggleTaskCompletion(task.id);
          }}
          className="data-[state=checked]:bg-[#8404fc] data-[state=checked]:border-[#8404fc]"
        />
      </TableCell>
      <TableCell className={task.completed ? 'line-through text-muted-foreground' : ''}>
        <div className="font-medium">{task.title}</div>
        {task.description && (
          <div className={`text-sm ${task.completed ? 'line-through' : ''} text-muted-foreground mt-1`}>
            {task.description.length > 100 
              ? `${task.description.substring(0, 100)}...` 
              : task.description
            }
          </div>
        )}
      </TableCell>
      <TableCell>{getCategoryBadge(task.category as TaskCategory)}</TableCell>
      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
      <TableCell>
        <div 
          className="flex items-center hover:bg-primary/10 p-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            showDatePicker(task.id);
          }}
        >
          <Calendar className="h-4 w-4 mr-1" />
          {format(new Date(task.date), 'MMM dd, yyyy')}
        </div>
      </TableCell>
      <TableCell>
        {task.time ? (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {task.time}
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell className="text-right pr-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onEditTask(task.id);
            }}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDeleteTask}
              className="text-red-500"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default TaskTableRow;
