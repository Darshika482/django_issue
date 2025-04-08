
import React, { createContext, useContext } from 'react';
import { Task, SystemModule } from '@/types';

interface PlannerHandlersContextType {
  handleAddTask: () => void;
  handleEditTask: (taskId: string) => void;
  handleCloseTaskForm: () => void;
  toggleSidebar: () => void;
  handlePanelResize: (sizes: number[]) => void;
  openTaskSelectionDialog: (modules: SystemModule[]) => void;
}

const PlannerHandlersContext = createContext<PlannerHandlersContextType | undefined>(undefined);

export const usePlannerHandlersContext = () => {
  const context = useContext(PlannerHandlersContext);
  if (!context) {
    throw new Error('usePlannerHandlersContext must be used within a PlannerHandlersContextProvider');
  }
  return context;
};

export default PlannerHandlersContext;
