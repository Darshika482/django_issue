
import { useState, useCallback } from 'react';
import { Task, ViewType, SystemModule } from '@/types';
import { useTaskContext } from '@/store/task';

export const usePlannerState = () => {
  // Use useState with initialization functions to prevent recreation on re-renders
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [activeView, setActiveView] = useState<ViewType>('month');
  const [isTaskFormOpen, setIsTaskFormOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [visibleSystems, setVisibleSystems] = useState<string[]>(['all']);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [sidebarSize, setSidebarSize] = useState<number>(25);
  const [isTaskSelectionOpen, setIsTaskSelectionOpen] = useState<boolean>(false);
  const [systemModules, setSystemModules] = useState<SystemModule[]>([]);
  
  // Get task context only once
  const { tasks } = useTaskContext();
  
  // Memoize handler functions to prevent recreating them on every render
  const handleAddTask = useCallback(() => {
    setTaskToEdit(undefined);
    setIsTaskFormOpen(true);
  }, []);
  
  const handleEditTask = useCallback((taskId: string) => {
    const task = tasks.find(task => task.id === taskId);
    
    if (task) {
      setTaskToEdit(task);
      setIsTaskFormOpen(true);
    }
  }, [tasks]);
  
  const handleCloseTaskForm = useCallback(() => {
    setIsTaskFormOpen(false);
    setTaskToEdit(undefined);
  }, []);
  
  const handleSystemFilterChange = useCallback((systems: string[]) => {
    setVisibleSystems(systems);
  }, []);
  
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handlePanelResize = useCallback((sizes: number[]) => {
    if (sizes[0]) {
      setSidebarSize(sizes[0]);
    }
  }, []);
  
  const openTaskSelectionDialog = useCallback((modules: SystemModule[]) => {
    setSystemModules(modules);
    setIsTaskSelectionOpen(true);
  }, []);

  return {
    currentDate,
    setCurrentDate,
    activeView,
    setActiveView,
    isTaskFormOpen,
    setIsTaskFormOpen,
    taskToEdit,
    setTaskToEdit,
    visibleSystems,
    setVisibleSystems,
    isSidebarOpen,
    setIsSidebarOpen,
    sidebarSize,
    setSidebarSize,
    isTaskSelectionOpen,
    setIsTaskSelectionOpen,
    systemModules,
    setSystemModules,
    handleAddTask,
    handleEditTask,
    handleCloseTaskForm,
    handleSystemFilterChange,
    toggleSidebar,
    handlePanelResize,
    openTaskSelectionDialog
  };
};
