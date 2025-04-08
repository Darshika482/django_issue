
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskListHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: 'all' | Task['category'];
  setCategoryFilter: (category: 'all' | Task['category']) => void;
  priorityFilter: 'all' | Task['priority'];
  setPriorityFilter: (priority: 'all' | Task['priority']) => void;
}

const TaskListHeader: React.FC<TaskListHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  priorityFilter,
  setPriorityFilter
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <h2 className="text-2xl font-bold">All Tasks</h2>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCategoryFilter('all')}>All Categories</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('work')}>Work</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('personal')}>Personal</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('study')}>Study</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('health')}>Health</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('errands')}>Errands</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('finance')}>Finance</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('other')}>Other</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Priority
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setPriorityFilter('all')}>All Priorities</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('high')}>High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('medium')}>Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPriorityFilter('low')}>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default TaskListHeader;
