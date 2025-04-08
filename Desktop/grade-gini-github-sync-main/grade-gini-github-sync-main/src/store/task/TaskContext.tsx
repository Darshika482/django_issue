
import React, { createContext, useContext, useReducer, useState, useEffect, useRef } from 'react';
import { Task } from '@/types';
import { toast } from "sonner";
import { taskReducer, TaskState } from './taskReducer';
import { TaskContextProps } from './taskContextTypes';
import { fetchAllTasks } from '@/api/tasksApi';
import { useTaskOperations } from './hooks/useTaskOperations';
import { useTaskImport } from './hooks/useTaskImport';

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    isLoading: false,
    error: null
  });
  const [dragInfo, setDragInfo] = useState<{ taskId: string | null; sourceDate?: string }>({ taskId: null });
  const errorToastShown = useRef(false);
  const loadAttempts = useRef(0);
  const maxAttempts = 3;
  
  const { tasks, isLoading, error } = state;

  // Task CRUD operations
  const {
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    toggleSubtaskCompletion,
    moveTask,
    updateTaskDate
  } = useTaskOperations(dispatch);

  // Task import functionality
  const { importTasksFromTemplate } = useTaskImport(dispatch);

  // Load tasks from Supabase when the component mounts
  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = async () => {
    // If we've tried too many times, don't keep trying to avoid infinite loops
    if (loadAttempts.current >= maxAttempts) {
      if (!errorToastShown.current) {
        toast.error("Failed to load tasks after multiple attempts. Please reload the page.");
        errorToastShown.current = true;
      }
      return;
    }
    
    loadAttempts.current += 1;
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const tasksData = await fetchAllTasks();
      dispatch({ type: 'SET_TASKS', payload: tasksData });
      
      // Reset error states on success
      errorToastShown.current = false;
      loadAttempts.current = 0;
      
      if (process.env.NODE_ENV === 'development') {
        console.log("Tasks loaded from database:", tasksData);
      }
    } catch (err) {
      console.error("Failed to load tasks:", err);
      dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err : new Error(String(err)) });
      
      // Show only one toast for error to prevent spam
      if (!errorToastShown.current) {
        toast.error("Failed to load tasks. Please try again later.");
        errorToastShown.current = true;
      }
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getTasksByDate = (date: string): Task[] => {
    // Normalize the input date for consistent comparison
    let normalizedInputDate;
    try {
      const parsedDate = new Date(date);
      normalizedInputDate = parsedDate.toISOString().split('T')[0];
    } catch (error) {
      console.error("Error normalizing input date:", error);
      normalizedInputDate = date;
    }
    
    return tasks.filter(task => {
      // Normalize task date for comparison
      let normalizedTaskDate;
      try {
        if (task.date) {
          const parsedTaskDate = new Date(task.date);
          normalizedTaskDate = parsedTaskDate.toISOString().split('T')[0];
        } else {
          normalizedTaskDate = null;
        }
      } catch (error) {
        console.error("Error normalizing task date:", error);
        normalizedTaskDate = task.date;
      }
      
      // Check if the date matches
      return normalizedTaskDate === normalizedInputDate;
    });
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        isLoading,
        error,
        addTask, 
        updateTask, 
        deleteTask, 
        toggleTaskCompletion,
        toggleSubtaskCompletion,
        moveTask,
        updateTaskDate,
        dragInfo,
        setDragInfo,
        getTasksByDate,
        importTasksFromTemplate,
        refreshTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
