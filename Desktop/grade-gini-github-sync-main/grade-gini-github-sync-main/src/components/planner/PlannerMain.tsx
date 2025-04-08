
import React, { useEffect, memo } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useTaskContext } from '@/store/task';
import { Task } from '@/types';
import PlannerHeader from './PlannerHeader';
import PlannerContent from './PlannerContent';
import PlannerSidebar from './PlannerSidebar';
import PlannerDialogs from './PlannerDialogs';
import { usePlannerStateContext } from './PlannerStateContext';
import { usePlannerHandlersContext } from './PlannerHandlersContext';

// Use React.memo to prevent unnecessary re-renders
const PlannerMain: React.FC = memo(() => {
  console.log("Rendering PlannerMain component");
  
  const { tasks, isLoading: tasksLoading, error: tasksError, refreshTasks, importTasksFromTemplate } = useTaskContext();
  
  // Get state and handlers from context
  const {
    isSidebarOpen,
    sidebarSize,
    isTaskFormOpen,
    taskToEdit,
    isTaskSelectionOpen,
    systemModules
  } = usePlannerStateContext();
  
  const {
    handlePanelResize,
    handleCloseTaskForm,
    openTaskSelectionDialog
  } = usePlannerHandlersContext();
  
  // Only fetch tasks once when the component mounts
  useEffect(() => {
    console.log("Fetching tasks in PlannerMain");
    refreshTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleAddSelectedToPlanner = (tasks: Task[]) => {
    if (tasks.length > 0) {
      const systemId = parseInt(tasks[0].systemId || "0");
      const systemName = tasks[0].systemName || "Learning System";
      
      importTasksFromTemplate(systemId, systemName, tasks);
    }
  };
  
  // Loading state
  if (tasksLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (tasksError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-destructive bg-destructive/10 p-6 rounded-lg max-w-md">
          <h3 className="text-lg font-semibold mb-2">Error Loading Tasks</h3>
          <p>{tasksError.message}</p>
          <button 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md" 
            onClick={() => refreshTasks()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen overflow-hidden pt-16">
      <ResizablePanelGroup 
        direction="horizontal" 
        className="h-full w-full"
        onLayout={handlePanelResize}
      >
        {isSidebarOpen && (
          <>
            <PlannerSidebar />
            
            <ResizableHandle withHandle />
          </>
        )}
        
        <ResizablePanel defaultSize={isSidebarOpen ? 100 - sidebarSize : 100} minSize={60}>
          <div className="flex-1 flex flex-col overflow-hidden h-full">
            <PlannerHeader />
            
            <PlannerContent />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      
      <PlannerDialogs
        isTaskFormOpen={isTaskFormOpen}
        onCloseTaskForm={handleCloseTaskForm}
        taskToEdit={taskToEdit}
        isTaskSelectionOpen={isTaskSelectionOpen}
        onCloseTaskSelection={() => openTaskSelectionDialog([])}
        systemModules={systemModules}
        onAddSelectedToPlanner={handleAddSelectedToPlanner}
      />
    </div>
  );
});

PlannerMain.displayName = 'PlannerMain';

export default PlannerMain;
