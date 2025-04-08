
import React, { createContext, useContext } from 'react';
import { Task, ViewType, SystemModule } from '@/types';

interface PlannerStateContextType {
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
}

const PlannerStateContext = createContext<PlannerStateContextType | undefined>(undefined);

export const usePlannerStateContext = () => {
  const context = useContext(PlannerStateContext);
  if (!context) {
    throw new Error('usePlannerStateContext must be used within a PlannerStateContextProvider');
  }
  return context;
};

export default PlannerStateContext;
