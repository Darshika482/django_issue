
import React, { useMemo } from 'react';
import Layout from '@/components/Layout';
import PlannerMain from '@/components/planner/PlannerMain';
import PlannerStateContext from '@/components/planner/PlannerStateContext';
import PlannerHandlersContext from '@/components/planner/PlannerHandlersContext';
import { usePlannerState } from '@/components/planner/hooks/usePlannerState';
import PlannerContext from '@/components/planner/PlannerContext';

const Planner = () => {
  // Use the state hook only once
  const plannerState = usePlannerState();
  
  // Memoize context values to prevent unnecessary re-renders
  const stateContextValue = useMemo(() => ({
    currentDate: plannerState.currentDate,
    setCurrentDate: plannerState.setCurrentDate,
    activeView: plannerState.activeView,
    setActiveView: plannerState.setActiveView,
    isTaskFormOpen: plannerState.isTaskFormOpen,
    taskToEdit: plannerState.taskToEdit,
    isSidebarOpen: plannerState.isSidebarOpen,
    sidebarSize: plannerState.sidebarSize,
    isTaskSelectionOpen: plannerState.isTaskSelectionOpen,
    systemModules: plannerState.systemModules
  }), [
    plannerState.currentDate,
    plannerState.activeView,
    plannerState.isTaskFormOpen,
    plannerState.taskToEdit,
    plannerState.isSidebarOpen,
    plannerState.sidebarSize,
    plannerState.isTaskSelectionOpen,
    plannerState.systemModules
  ]);
  
  // Memoize handlers to prevent unnecessary re-renders
  const handlersContextValue = useMemo(() => ({
    handleAddTask: plannerState.handleAddTask,
    handleEditTask: plannerState.handleEditTask,
    handleCloseTaskForm: plannerState.handleCloseTaskForm,
    toggleSidebar: plannerState.toggleSidebar,
    handlePanelResize: plannerState.handlePanelResize,
    openTaskSelectionDialog: plannerState.openTaskSelectionDialog
  }), [
    plannerState.handleAddTask,
    plannerState.handleEditTask,
    plannerState.handleCloseTaskForm,
    plannerState.toggleSidebar,
    plannerState.handlePanelResize,
    plannerState.openTaskSelectionDialog
  ]);
  
  // For backward compatibility, also memoized
  const contextValue = useMemo(() => ({
    ...stateContextValue,
    ...handlersContextValue
  }), [stateContextValue, handlersContextValue]);
  
  // Add a console log to help with debugging
  console.log("Rendering Planner component");
  
  return (
    <Layout>
      <PlannerStateContext.Provider value={stateContextValue}>
        <PlannerHandlersContext.Provider value={handlersContextValue}>
          <PlannerContext.Provider value={contextValue}>
            <PlannerMain />
          </PlannerContext.Provider>
        </PlannerHandlersContext.Provider>
      </PlannerStateContext.Provider>
    </Layout>
  );
};

export default Planner;
