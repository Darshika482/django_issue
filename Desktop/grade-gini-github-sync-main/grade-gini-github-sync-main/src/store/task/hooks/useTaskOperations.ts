
import { Dispatch } from 'react';
import { Task } from '@/types';
import { TaskAction } from '../taskReducer';
import { toast } from "sonner";
import { 
  createTask as apiCreateTask, 
  updateTask as apiUpdateTask, 
  deleteTask as apiDeleteTask,
  toggleSubtaskCompletion as apiToggleSubtaskCompletion 
} from '@/api/tasksApi';

// Helper function to handle API errors consistently
const handleApiError = (err: unknown, operation: string, showToast = true): Error => {
  const error = err instanceof Error ? err : new Error(String(err));
  console.error(`Failed to ${operation}:`, error);
  
  // Only show toast if requested
  if (showToast) {
    toast.error(`Failed to ${operation}. Please try again.`);
  }
  
  return error;
};

export const useTaskOperations = (dispatch: Dispatch<TaskAction>) => {
  const addTask = async (taskData: Omit<Task, 'id'>): Promise<Task> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newTask = await apiCreateTask(taskData);
      dispatch({ type: 'ADD_TASK', payload: newTask });
      toast.success('Task added successfully');
      return newTask;
    } catch (err) {
      const error = handleApiError(err, 'add task');
      dispatch({ type: 'SET_ERROR', payload: error });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedTask = await apiUpdateTask(id, updates);
      dispatch({ type: 'UPDATE_TASK', payload: { id, updates: updatedTask } });
      toast.success('Task updated successfully');
      return updatedTask;
    } catch (err) {
      const error = handleApiError(err, 'update task');
      dispatch({ type: 'SET_ERROR', payload: error });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await apiDeleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
      toast.success('Task deleted successfully');
      return true;
    } catch (err) {
      const error = handleApiError(err, 'delete task');
      dispatch({ type: 'SET_ERROR', payload: error });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleTaskCompletion = async (id: string): Promise<Task> => {
    try {
      // Don't show loading state for quick toggles
      const task = await apiUpdateTask(id, { completed: true });
      if (task) {
        dispatch({ type: 'UPDATE_TASK', payload: { id, updates: { completed: !task.completed } } });
      }
      return task;
    } catch (err) {
      // Silent handling for UI toggles, but still log
      handleApiError(err, 'toggle task completion', false);
      throw err;
    }
  };

  const toggleSubtaskCompletion = async (taskId: string, subtaskId: string): Promise<Task> => {
    try {
      const updatedTask = await apiToggleSubtaskCompletion(taskId, subtaskId);
      dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, updates: updatedTask } });
      return updatedTask;
    } catch (err) {
      // Silent handling for UI toggles, but still log
      handleApiError(err, 'toggle subtask completion', false);
      throw err;
    }
  };

  const moveTask = async (id: string, newDate: string): Promise<Task> => {
    try {
      const task = await updateTask(id, { date: newDate });
      return task;
    } catch (err) {
      // Error already handled in updateTask
      throw err;
    }
  };

  const updateTaskDate = async (id: string, newDate: string, newTime?: string, newEndTime?: string): Promise<Task> => {
    try {
      const updates: Partial<Task> = { date: newDate };
      if (newTime !== undefined) updates.time = newTime;
      if (newEndTime !== undefined) updates.endTime = newEndTime;
      
      const task = await updateTask(id, updates);
      return task;
    } catch (err) {
      // Error already handled in updateTask
      throw err;
    }
  };

  return {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    toggleSubtaskCompletion,
    moveTask,
    updateTaskDate
  };
};
