
import { Dispatch } from 'react';
import { Task } from '@/types';
import { TaskAction } from '../taskReducer';
import { createTask } from '@/api/tasksApi';
import { toast } from 'sonner';

export const useTaskImport = (dispatch: Dispatch<TaskAction>) => {
  const importTasksFromTemplate = async (
    systemId: number,
    systemName: string,
    tasks: Task[]
  ): Promise<void> => {
    if (!tasks || tasks.length === 0) {
      toast.error("No tasks to import");
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const newTasks: Task[] = [];
      
      // Process tasks in sequence to avoid overwhelming the API
      for (const task of tasks) {
        try {
          // Create a new task based on the template task
          const newTask = await createTask({
            title: task.title,
            description: task.description,
            date: task.date || new Date().toISOString().split('T')[0],
            time: task.time || '',
            endTime: task.endTime || '',
            category: task.category || 'study',
            priority: task.priority || 'medium',
            completed: false,
            systemId: String(systemId),
            systemName: systemName,
            subtasks: [] // Initialize with empty array since subtasks aren't stored in the database
          });
          
          newTasks.push(newTask);
        } catch (error) {
          console.error(`Error importing task ${task.title}:`, error);
          // Continue with other tasks even if one fails
        }
      }
      
      if (newTasks.length > 0) {
        dispatch({ type: 'ADD_MULTIPLE_TASKS', payload: newTasks });
        toast.success(`Imported ${newTasks.length} tasks successfully`);
      } else {
        toast.error("Failed to import tasks");
      }
    } catch (error) {
      console.error("Error importing tasks:", error);
      toast.error("Failed to import tasks");
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error : new Error(String(error)) });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return {
    importTasksFromTemplate
  };
};
