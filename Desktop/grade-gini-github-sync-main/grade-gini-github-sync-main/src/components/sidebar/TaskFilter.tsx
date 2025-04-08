
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from 'lucide-react';

interface TaskFilterProps {
  filter: string;
  setFilter: (value: string | ((prev: string) => string)) => void;
  sortBy: string;
  setSortBy: (value: string | ((prev: string) => string)) => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (direction: 'asc' | 'desc') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  sortDirection,
  setSortDirection
}) => {
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex flex-col space-y-3 mt-3">
      <div className="flex gap-2">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="flex-1 text-sm">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="flex-1 text-sm border-r-0 rounded-r-none">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline" 
            size="icon" 
            className="h-9 w-9 border-l-0 rounded-l-none"
            onClick={toggleSortDirection}
          >
            {sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
