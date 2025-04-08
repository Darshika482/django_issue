
import React from 'react';
import { format } from 'date-fns';
import { Task } from '@/types';
import { ArrowUp, ArrowDown, Calendar, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useTaskContext } from '@/store/TaskContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TaskTableRow from './TaskTableRow';

interface TaskTableProps {
  tasks: Task[];
  onEditTask: (taskId: string) => void;
  sortBy: 'date' | 'priority' | 'title';
  setSortBy: (sort: 'date' | 'priority' | 'title') => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (direction: 'asc' | 'desc') => void;
  showDatePicker: (taskId: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onEditTask,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection,
  showDatePicker
}) => {
  const handleSortClick = (column: 'date' | 'priority' | 'title') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSortClick('title')}
            >
              <div className="flex items-center">
                Task
                {sortBy === 'title' && (
                  sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleSortClick('date')}
            >
              <div className="flex items-center">
                Date
                {sortBy === 'date' && (
                  sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No tasks found
              </TableCell>
            </TableRow>
          ) : (
            tasks.map(task => (
              <TaskTableRow 
                key={task.id}
                task={task}
                onEditTask={onEditTask}
                showDatePicker={showDatePicker}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;
