import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { SystemModule, Task } from '@/types';
import { useTaskContext } from '@/store/TaskContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import ModuleHeader from './module-components/ModuleHeader';
import ModuleProgressBar from './module-components/ModuleProgressBar';
import TasksList from './module-components/TasksList';
import TaskSelectionControls from './module-components/TaskSelectionControls';

interface SystemModuleCardProps {
  module: SystemModule;
  index: number;
  onEditModule: () => void;
  onDeleteModule: () => void;
  onAddTask: (moduleId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
}

const SystemModuleCard: React.FC<SystemModuleCardProps> = ({ 
  module, 
  index, 
  onEditModule, 
  onDeleteModule, 
  onAddTask, 
  onEditTask,
  onDeleteTask
}) => {
  const { importTasksFromTemplate } = useTaskContext();
  const navigate = useNavigate();
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState(false);
  
  console.log(`Module ${module.id} tasks:`, module.tasks);
  
  const moduleTasks = module.tasks || [];
  
  const completedTasks = moduleTasks.filter(t => t.completed).length;
  const totalTasks = moduleTasks.length;

  const handleTaskSelection = (taskId: string) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleSelectAllTasks = () => {
    if (selectedTasks.length === moduleTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(moduleTasks.map(task => task.id));
    }
  };

  const handleAddSelectedToPlanner = () => {
    if (selectedTasks.length === 0) {
      toast.warning("No tasks selected");
      return;
    }

    const tasksToAdd = moduleTasks.filter(task => selectedTasks.includes(task.id));
    
    const systemId = Number(module.id.split('-')[0]);
    
    importTasksFromTemplate(
      systemId,
      `${module.title} (from module)`,
      tasksToAdd
    );
    
    toast.success(`Added ${tasksToAdd.length} tasks to planner`);
    setSelectMode(false);
    setSelectedTasks([]);
    navigate('/planner');
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (selectMode) {
      setSelectedTasks([]);
    }
  };

  return (
    <Card className="overflow-hidden border shadow-sm">
      <ModuleHeader 
        module={module}
        index={index}
        selectMode={selectMode}
        toggleSelectMode={toggleSelectMode}
        onEditModule={onEditModule}
        onDeleteModule={onDeleteModule}
      />
      
      <div>
        <div className="flex justify-between items-center">
          <ModuleProgressBar 
            completedTasks={completedTasks} 
            totalTasks={totalTasks}
            selectMode={selectMode}
          />
          
          {selectMode && (
            <div className="px-5 py-3">
              <TaskSelectionControls
                selectedTasks={selectedTasks}
                totalTasks={totalTasks}
                onSelectAllTasks={handleSelectAllTasks}
                onAddSelectedToPlanner={handleAddSelectedToPlanner}
              />
            </div>
          )}
        </div>
        
        <TasksList 
          tasks={moduleTasks}
          selectMode={selectMode}
          selectedTasks={selectedTasks}
          onTaskSelection={handleTaskSelection}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onAddTask={onAddTask}
          moduleId={module.id.toString()}
        />
      </div>
    </Card>
  );
};

export default SystemModuleCard;
