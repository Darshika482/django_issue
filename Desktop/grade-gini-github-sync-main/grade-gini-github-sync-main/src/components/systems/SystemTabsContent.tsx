import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus } from 'lucide-react';
import { LearningSystem, SystemModule, Task } from '@/types';
import SystemModuleCard from '@/components/systems/SystemModule';
import SystemProgressCard from '@/components/systems/SystemProgressCard';
import ModuleProgressCard from '@/components/systems/ModuleProgressCard';
import { useIsMobile } from '@/hooks/use-mobile';

interface SystemTabsContentProps {
  activeTab: string;
  system: LearningSystem;
  modules: SystemModule[];
  onViewAllTasks: () => void;
  onAddModule: () => void;
  onEditModule: (moduleId: string) => void;
  onDeleteModule: (moduleId: string) => void;
  onAddTask: (moduleId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  completedModules: number;
  totalModules: number;
}

const SystemTabsContent: React.FC<SystemTabsContentProps> = ({
  activeTab,
  system,
  modules,
  onViewAllTasks,
  onAddModule,
  onEditModule,
  onDeleteModule,
  onAddTask,
  onEditTask,
  onDeleteTask,
  completedModules,
  totalModules
}) => {
  const isMobile = useIsMobile();

  if (activeTab === 'overview') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Modules</h2>
              <Button 
                variant="link" 
                className="flex items-center gap-1 text-primary"
                onClick={onViewAllTasks}
              >
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            {modules.slice(0, 2).map((module, index) => (
              <SystemModuleCard
                key={module.id}
                module={module}
                index={index}
                onEditModule={() => onEditModule(module.id)}
                onDeleteModule={() => onDeleteModule(module.id)}
                onAddTask={onAddTask}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
            
            {modules.length === 0 && (
              <div className="bg-white border rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No modules yet</h3>
                <p className="text-gray-600 mb-4">Start by creating your first module</p>
                <Button onClick={onAddModule} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Module
                </Button>
              </div>
            )}
            
            {modules.length > 0 && modules.length > 2 && (
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  className="w-full max-w-xs"
                  onClick={onViewAllTasks}
                >
                  View All {modules.length} Modules
                </Button>
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-1/3 space-y-6">
            <SystemProgressCard 
              completedModules={completedModules} 
              totalModules={totalModules}
              system={system}
            />
          </div>
        </div>
      </div>
    );
  }
  
  if (activeTab === 'modules') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">All Modules</h2>
          <Button 
            onClick={onAddModule}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" /> Add Module
          </Button>
        </div>
        
        {modules.map((module, index) => (
          <SystemModuleCard
            key={module.id}
            module={module}
            index={index}
            onEditModule={() => onEditModule(module.id)}
            onDeleteModule={() => onDeleteModule(module.id)}
            onAddTask={onAddTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
        
        {modules.length === 0 && (
          <div className="bg-white border rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No modules yet</h3>
            <p className="text-gray-600 mb-4">Start by creating your first module</p>
            <Button onClick={onAddModule} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Module
            </Button>
          </div>
        )}
      </div>
    );
  }
  
  if (activeTab === 'progress') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="w-full lg:w-2/3 space-y-6">
            <h2 className="text-xl font-medium mb-4">Module Progress</h2>
            
            <ModuleProgressCard modules={modules} />
            
            {modules.length === 0 && (
              <div className="bg-white border rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No modules yet</h3>
                <p className="text-gray-600 mb-4">Start by creating your first module</p>
                <Button onClick={onAddModule} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Module
                </Button>
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-1/3 space-y-6">
            <SystemProgressCard 
              completedModules={completedModules} 
              totalModules={totalModules}
              system={system}
            />
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default SystemTabsContent;
