
import React from 'react';
import { Task, SystemModule } from '@/types';
import TaskFormDialog from '@/components/task-form/TaskFormDialog';
import TaskSelectionDialog from '@/components/systems/TaskSelectionDialog';

interface PlannerDialogsProps {
  isTaskFormOpen: boolean;
  onCloseTaskForm: () => void;
  taskToEdit?: Task;
  isTaskSelectionOpen: boolean;
  onCloseTaskSelection: () => void;
  systemModules: SystemModule[];
  onAddSelectedToPlanner: (tasks: Task[]) => void;
}

const PlannerDialogs: React.FC<PlannerDialogsProps> = ({
  isTaskFormOpen,
  onCloseTaskForm,
  taskToEdit,
  isTaskSelectionOpen,
  onCloseTaskSelection,
  systemModules,
  onAddSelectedToPlanner
}) => {
  return (
    <div className="planner-dialog">
      <TaskFormDialog 
        isOpen={isTaskFormOpen}
        onClose={onCloseTaskForm}
        taskToEdit={taskToEdit}
      />
      
      <TaskSelectionDialog
        isOpen={isTaskSelectionOpen}
        onClose={onCloseTaskSelection}
        modules={systemModules}
        onAddSelectedToPlanner={onAddSelectedToPlanner}
      />
    </div>
  );
};

export default PlannerDialogs;
