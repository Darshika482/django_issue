
import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, CalendarPlus } from 'lucide-react';
import { LearningSystem } from '@/types';

interface SystemHeaderProps {
  system: LearningSystem;
  onEditSystem: () => void;
  onOpenTaskSelection: () => void;
}

const SystemHeader: React.FC<SystemHeaderProps> = ({ 
  system, 
  onEditSystem,
  onOpenTaskSelection
}) => {
  return (
    <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{system.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          {system.description || "No description provided"}
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onOpenTaskSelection}
        >
          <CalendarPlus className="h-4 w-4" />
          <span>Add to Planner</span>
        </Button>
        
        <Button 
          variant="outline"
          onClick={onEditSystem}
          className="flex items-center gap-2"
        >
          <Edit className="h-4 w-4" />
          <span>Edit System</span>
        </Button>
      </div>
    </div>
  );
};

export default SystemHeader;
