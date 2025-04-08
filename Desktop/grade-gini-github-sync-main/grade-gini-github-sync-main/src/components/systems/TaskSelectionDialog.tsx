import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SystemModule, Task } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TaskItem } from './module-components';

interface TaskSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  modules: SystemModule[];
  onAddSelectedToPlanner: (tasks: Task[]) => void;
}

const TaskSelectionDialog: React.FC<TaskSelectionDialogProps> = ({
  isOpen,
  onClose,
  modules,
  onAddSelectedToPlanner
}) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [allTasksInSystem, setAllTasksInSystem] = useState<Task[]>([]);
  
  // Reset selection when dialog opens or modules change
  useEffect(() => {
    if (isOpen) {
      setSelectedTaskIds([]);
      
      // Gather all tasks from all modules
      const allTasks: Task[] = [];
      modules.forEach(module => {
        if (module.tasks) {
          allTasks.push(...module.tasks);
        }
      });
      setAllTasksInSystem(allTasks);
    }
  }, [isOpen, modules]);
  
  const handleTaskSelection = (taskId: string) => {
    setSelectedTaskIds(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId) 
        : [...prev, taskId]
    );
  };
  
  const handleSelectAllTasks = () => {
    if (selectedTaskIds.length === allTasksInSystem.length) {
      // If all tasks are selected, deselect all
      setSelectedTaskIds([]);
    } else {
      // Otherwise, select all tasks
      setSelectedTaskIds(allTasksInSystem.map(task => task.id));
    }
  };
  
  const handleAddToPlanner = () => {
    // Get the selected tasks based on their IDs
    const selectedTasks = allTasksInSystem.filter(task => 
      selectedTaskIds.includes(task.id)
    );
    
    // Call the callback with selected tasks
    onAddSelectedToPlanner(selectedTasks);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden dialog-z-highest">
        <DialogHeader>
          <DialogTitle>Select Tasks to Add to Planner</DialogTitle>
          <DialogDescription>
            Choose tasks from your learning system to add to your planner.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mr-2">
              {selectedTaskIds.length} selected
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAllTasks}
            >
              {selectedTaskIds.length === allTasksInSystem.length 
                ? 'Deselect All' 
                : 'Select All'}
            </Button>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh]">
          {modules.map(module => (
            <div key={module.id} className="mb-6">
              <h3 className="text-lg font-bold mb-2">{module.title}</h3>
              <Separator className="mb-4" />
              
              {module.tasks && module.tasks.length > 0 ? (
                <div className="border rounded-md overflow-hidden divide-y">
                  {module.tasks.map(task => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      selectMode={true}
                      selectedTasks={selectedTaskIds}
                      onTaskSelection={handleTaskSelection}
                      onEditTask={() => {}}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No tasks in this module.</p>
              )}
            </div>
          ))}
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddToPlanner}
            disabled={selectedTaskIds.length === 0}
            variant="default"
          >
            Add {selectedTaskIds.length} {selectedTaskIds.length === 1 ? 'Task' : 'Tasks'} to Planner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskSelectionDialog;
