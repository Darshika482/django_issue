
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Edit, Trash2, CalendarPlus } from 'lucide-react';
import { SystemModule } from '@/types';

interface ModuleHeaderProps {
  module: SystemModule;
  index: number;
  selectMode: boolean;
  toggleSelectMode: () => void;
  onEditModule: () => void;
  onDeleteModule: () => void;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  module,
  index,
  selectMode,
  toggleSelectMode,
  onEditModule,
  onDeleteModule
}) => {
  return (
    <div className="bg-gray-50 p-4 border-b">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="bg-gradient-to-br from-[#8404fc] to-[#4a008e] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
            {index + 1}
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold">{module.title}</h3>
              {module.isCompleted && (
                <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSelectMode} 
            className={`h-8 w-8 ${selectMode ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-gray-700'}`}
            title={selectMode ? "Exit select mode" : "Select tasks to add to planner"}
          >
            <CalendarPlus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onEditModule} className="h-8 w-8 text-gray-500 hover:text-gray-700">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDeleteModule} className="h-8 w-8 text-gray-500 hover:text-red-500">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleHeader;
