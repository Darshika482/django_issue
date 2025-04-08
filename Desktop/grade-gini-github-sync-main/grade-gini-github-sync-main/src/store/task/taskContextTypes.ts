
import { Task } from '@/types';

export interface TaskContextProps {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  
  // Task operations
  addTask: (task: Omit<Task, 'id'>) => Promise<Task>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => Promise<boolean>;
  toggleTaskCompletion: (id: string) => Promise<Task>;
  toggleSubtaskCompletion: (taskId: string, subtaskId: string) => Promise<Task>;
  moveTask: (id: string, newDate: string) => Promise<Task>;
  updateTaskDate: (id: string, newDate: string, newTime?: string, newEndTime?: string) => Promise<Task>;
  
  // Drag and drop functionality
  dragInfo: { taskId: string | null; sourceDate?: string };
  setDragInfo: (info: { taskId: string | null; sourceDate?: string }) => void;
  
  // Helper functions
  getTasksByDate: (date: string) => Task[];
  importTasksFromTemplate: (systemId: number, systemName: string, tasks: Task[]) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
}
