
import React from 'react';
import { Button } from "@/components/ui/button";
import { CalendarPlus } from 'lucide-react';

interface TaskSelectionControlsProps {
  selectedTasks: string[];
  totalTasks: number;
  onSelectAllTasks: () => void;
  onAddSelectedToPlanner: () => void;
}

const TaskSelectionControls: React.FC<TaskSelectionControlsProps> = ({
  selectedTasks,
  totalTasks,
  onSelectAllTasks,
  onAddSelectedToPlanner
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onSelectAllTasks}
        className="h-7 text-xs"
      >
        {selectedTasks.length === totalTasks ? "Deselect All" : "Select All"}
      </Button>
      <Button 
        variant="default" 
        size="sm" 
        onClick={onAddSelectedToPlanner}
        className="h-7 text-xs bg-primary text-white"
        disabled={selectedTasks.length === 0}
      >
        <CalendarPlus className="h-3 w-3 mr-1" />
        Add to Planner
      </Button>
    </div>
  );
};

export default TaskSelectionControls;
