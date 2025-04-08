
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Loader2, Plus, CalendarPlus } from 'lucide-react';
import { LearningSystem } from '@/types';
import { fetchSystemModules } from '@/api/modulesApi';
import { toast } from 'sonner';

interface ActiveSystemsSectionProps {
  systems: LearningSystem[];
  isLoading: boolean;
  onOpenTaskSelection: (modules: any[]) => void;
}

const ActiveSystemsSection: React.FC<ActiveSystemsSectionProps> = ({ 
  systems, 
  isLoading,
  onOpenTaskSelection 
}) => {
  const navigate = useNavigate();

  const handleAddToPlanner = async (systemId: number | string) => {
    try {
      // Fetch modules for the system
      const modules = await fetchSystemModules(Number(systemId));
      
      if (!modules || modules.length === 0) {
        toast.error("This system has no tasks to add to the planner");
        return;
      }
      
      // If we have modules, open the task selection dialog
      onOpenTaskSelection(modules);
    } catch (error) {
      console.error("Error adding to planner:", error);
      toast.error("Failed to add tasks to planner");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Active Learning Systems</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/all-systems')}
            className="text-sm"
          >
            See All
          </Button>
          <Button 
            size="sm"
            onClick={() => navigate('/create-system')}
            className="gap-1 text-sm"
          >
            <Plus className="h-4 w-4" />
            New System
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : systems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systems.slice(0, 3).map((system) => (
            <div key={system.id} className="bg-white rounded-lg border overflow-hidden">
              <div className="border-t-4 border-[#8404fc]">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{system.title}</h3>
                    <span className="bg-purple-100 text-[#8404fc] text-xs px-2 py-1 rounded-full">Active</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{system.description}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{system.progress || Math.floor(Math.random() * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-[#8404fc] h-1.5 rounded-full" 
                        style={{ width: `${system.progress || Math.floor(Math.random() * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs gap-1"
                      onClick={() => handleAddToPlanner(system.id)}
                    >
                      <CalendarPlus className="h-3.5 w-3.5" />
                      Add to Planner
                    </Button>
                    
                    <button 
                      onClick={() => navigate(`/system/${system.id}`)} 
                      className="text-[#8404fc] text-sm"
                    >
                      View →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg p-6 bg-white shadow-sm text-center">
          <p className="text-gray-500 mb-4">No active learning systems yet.</p>
          <Button 
            onClick={() => navigate('/create-system')} 
            variant="default"
          >
            Create Your First System
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActiveSystemsSection;
