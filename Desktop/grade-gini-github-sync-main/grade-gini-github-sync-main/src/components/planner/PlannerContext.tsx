
import React, { useContext } from 'react';
import { Task, ViewType, SystemModule } from '@/types';
import PlannerStateContext, { usePlannerStateContext } from './PlannerStateContext';
import PlannerHandlersContext, { usePlannerHandlersContext } from './PlannerHandlersContext';

// Combined context type for backward compatibility
interface PlannerContextType {
  // State
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isTaskFormOpen: boolean;
  taskToEdit?: Task;
  isSidebarOpen: boolean;
  sidebarSize: number;
  isTaskSelectionOpen: boolean;
  systemModules: SystemModule[];
  
  // Handlers
  handleAddTask: () => void;
  handleEditTask: (taskId: string) => void;
  handleCloseTaskForm: () => void;
  toggleSidebar: () => void;
  handlePanelResize: (sizes: number[]) => void;
  openTaskSelectionDialog: (modules: SystemModule[]) => void;
}

// This is a compatibility layer that combines both contexts
export const usePlannerContext = (): PlannerContextType => {
  const stateContext = usePlannerStateContext();
  const handlersContext = usePlannerHandlersContext();
  
  return {
    ...stateContext,
    ...handlersContext
  };
};

// Create and export the context for backward compatibility
const PlannerContext = React.createContext<PlannerContextType | undefined>(undefined);
export default PlannerContext;
