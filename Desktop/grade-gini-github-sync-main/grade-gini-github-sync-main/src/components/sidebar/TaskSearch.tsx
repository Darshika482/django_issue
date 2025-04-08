
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface TaskSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative">
      <Input
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-8"
      />
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default TaskSearch;
