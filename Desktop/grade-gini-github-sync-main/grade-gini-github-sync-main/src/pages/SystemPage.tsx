
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskProvider } from '@/store/TaskContext';
import TaskFormDialog from '@/components/TaskFormDialog';
import SystemOverviewCard from '@/components/systems/SystemOverviewCard';

// Import refactored components and hooks
import SystemHeader from '@/components/systems/SystemHeader';
import SystemLoading from '@/components/systems/SystemLoading';
import SystemError from '@/components/systems/SystemError';
import ModuleFormDialog from '@/components/systems/ModuleFormDialog';
import DeleteModuleDialog from '@/components/systems/DeleteModuleDialog';
import SystemTabsContent from '@/components/systems/SystemTabsContent';
import TaskSelectionDialog from '@/components/systems/TaskSelectionDialog';
import { useSystemData } from '@/hooks/useSystemData';
import { useSystemActions } from '@/hooks/useSystemActions';
import { useTaskPlanner } from '@/hooks/useTaskPlanner';

// Create a content component that uses the task context
const SystemPageContent = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  // Use custom hooks
  const { isLoading, error, system, modules, setModules } = useSystemData(id);
  
  const {
    isTaskFormOpen,
    taskToEdit,
    selectedModuleId,
    isEditingModule,
    moduleToEdit,
    moduleToDelete,
    isDeleting,
    isTaskSelectionOpen,
    setIsTaskSelectionOpen,
    handleAddTask,
    handleEditTask,
    handleCloseTaskForm,
    handleTaskFormSubmit,
    handleAddModule,
    handleEditModule,
    handleCloseModuleForm,
    handleModuleFormSubmit,
    handleDeleteModuleConfirm,
    handleDeleteTask,
    handleEditSystem,
    setModuleToDelete
  } = useSystemActions(id, setModules);
  
  const { handleAddSelectedTasksToPlanner } = useTaskPlanner(system);

  // Handle loading and error states
  if (isLoading) {
    return <SystemLoading />;
  }

  if (error || !system) {
    return <SystemError error={error} />;
  }

  const completedModules = system.modules?.filter(module => module.isCompleted).length || 0;
  const totalModules = system.modules?.length || 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <SystemHeader 
            system={system}
            onEditSystem={handleEditSystem}
            onOpenTaskSelection={() => setIsTaskSelectionOpen(true)}
          />
          
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <SystemOverviewCard 
              system={system} 
              completedModules={completedModules} 
              totalModules={totalModules}
              onEditSystem={handleEditSystem}
              onAddModule={handleAddModule}
            />
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <SystemTabsContent 
                activeTab="overview"
                system={system}
                modules={modules}
                onViewAllTasks={() => setActiveTab("modules")}
                onAddModule={handleAddModule}
                onEditModule={(moduleId: string) => handleEditModule(moduleId)}
                onDeleteModule={(moduleId: string) => setModuleToDelete(moduleId)}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                completedModules={completedModules}
                totalModules={totalModules}
              />
            </TabsContent>
            
            <TabsContent value="modules" className="mt-6">
              <SystemTabsContent 
                activeTab="modules"
                system={system}
                modules={modules}
                onViewAllTasks={() => setActiveTab("modules")}
                onAddModule={handleAddModule}
                onEditModule={(moduleId: string) => handleEditModule(moduleId)}
                onDeleteModule={(moduleId: string) => setModuleToDelete(moduleId)}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                completedModules={completedModules}
                totalModules={totalModules}
              />
            </TabsContent>
            
            <TabsContent value="progress" className="mt-6">
              <SystemTabsContent 
                activeTab="progress"
                system={system}
                modules={modules}
                onViewAllTasks={() => setActiveTab("modules")}
                onAddModule={handleAddModule}
                onEditModule={(moduleId: string) => handleEditModule(moduleId)}
                onDeleteModule={(moduleId: string) => setModuleToDelete(moduleId)}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                completedModules={completedModules}
                totalModules={totalModules}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Dialogs */}
      {isTaskFormOpen && (
        <TaskFormDialog 
          isOpen={isTaskFormOpen}
          onClose={handleCloseTaskForm}
          taskToEdit={taskToEdit}
          onSubmit={handleTaskFormSubmit}
        />
      )}
      
      {isEditingModule && (
        <ModuleFormDialog
          isOpen={isEditingModule}
          onClose={handleCloseModuleForm}
          moduleToEdit={moduleToEdit}
          onSubmit={handleModuleFormSubmit}
        />
      )}
      
      <DeleteModuleDialog
        isOpen={moduleToDelete !== null}
        onClose={() => setModuleToDelete(null)}
        onConfirm={handleDeleteModuleConfirm}
        isDeleting={isDeleting}
      />

      <TaskSelectionDialog
        isOpen={isTaskSelectionOpen}
        onClose={() => setIsTaskSelectionOpen(false)}
        modules={modules}
        onAddSelectedToPlanner={handleAddSelectedTasksToPlanner}
      />
    </div>
  );
};

// Wrapper component that provides TaskContext
const SystemPage = () => {
  return (
    <TaskProvider>
      <SystemPageContent />
    </TaskProvider>
  );
};

export default SystemPage;
