
import { useState } from 'react';
import { SystemModule, Task } from '@/types';
import { createModule, updateModule, deleteModule } from '@/api/modulesApi';
import { createTask, updateTask, deleteTask } from '@/api/tasksApi';
import { fetchSystemModules } from '@/api/modulesApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useSystemActions = (systemId: string | undefined, setModules: React.Dispatch<React.SetStateAction<SystemModule[]>>) => {
  const navigate = useNavigate();
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [isEditingModule, setIsEditingModule] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState<SystemModule | null>(null);
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTaskSelectionOpen, setIsTaskSelectionOpen] = useState(false);
  
  const handleAddTask = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setTaskToEdit(undefined);
    setIsTaskFormOpen(true);
  };
  
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskFormOpen(true);
  };
  
  const handleCloseTaskForm = () => {
    setIsTaskFormOpen(false);
    setTaskToEdit(undefined);
    setSelectedModuleId(null);
  };

  const handleTaskFormSubmit = async (taskData: Omit<Task, 'id'>) => {
    try {
      if (taskToEdit) {
        // Update existing task
        await updateTask(taskToEdit.id, taskData);
        toast.success('Task updated successfully');
      } else {
        // Create new task
        if (!selectedModuleId) {
          toast.error('No module selected for this task');
          return;
        }
        
        const createdTask = await createTask(taskData, selectedModuleId);
        toast.success('Task created successfully');
      }
      
      // Reload modules data to get updated tasks
      if (systemId) {
        const updatedModules = await fetchSystemModules(Number(systemId));
        setModules(updatedModules);
      }
      
      // Close the form
      handleCloseTaskForm();
    } catch (error) {
      console.error('Error saving task:', error);
      toast.error('Failed to save task');
    }
  };

  const handleAddModule = () => {
    setIsEditingModule(true);
    setModuleToEdit(null);
  };

  // Modified to accept moduleId as string instead of module object
  const handleEditModule = (moduleId: string) => {
    // Find the module by ID
    setModules(prevModules => {
      const moduleToEdit = prevModules.find(m => m.id === moduleId);
      if (moduleToEdit) {
        setIsEditingModule(true);
        setModuleToEdit(moduleToEdit);
      } else {
        toast.error('Module not found');
      }
      return prevModules;
    });
  };

  const handleCloseModuleForm = () => {
    setIsEditingModule(false);
    setModuleToEdit(null);
  };

  const handleModuleFormSubmit = async (moduleData: Omit<SystemModule, 'id' | 'tasks'>) => {
    try {
      if (moduleToEdit) {
        // Update existing module
        await updateModule(moduleToEdit.id, moduleData);
        toast.success('Module updated successfully');
      } else {
        // Create new module
        if (!systemId) {
          toast.error('System ID is missing');
          return;
        }
        await createModule(moduleData, Number(systemId));
        toast.success('Module created successfully');
      }
      
      // Reload modules data
      if (systemId) {
        const updatedModules = await fetchSystemModules(Number(systemId));
        setModules(updatedModules);
      }
      
      // Close the form
      handleCloseModuleForm();
    } catch (error) {
      console.error('Error saving module:', error);
      toast.error('Failed to save module');
    }
  };

  const handleDeleteModuleConfirm = async () => {
    if (!moduleToDelete) return;
    
    try {
      setIsDeleting(true);
      await deleteModule(moduleToDelete);
      
      // Update modules list
      setModules(prevModules => prevModules.filter(module => module.id !== moduleToDelete));
      
      toast.success('Module deleted successfully');
    } catch (error) {
      console.error('Error deleting module:', error);
      toast.error('Failed to delete module');
    } finally {
      setIsDeleting(false);
      setModuleToDelete(null);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      
      // Update modules data to reflect the deleted task
      setModules(prevModules => prevModules.map(module => ({
        ...module,
        tasks: module.tasks ? module.tasks.filter(task => task.id !== taskId) : []
      })));
      
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  const handleEditSystem = () => {
    if (systemId) {
      navigate(`/edit-system/${systemId}`);
    }
  };

  return {
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
  };
};
