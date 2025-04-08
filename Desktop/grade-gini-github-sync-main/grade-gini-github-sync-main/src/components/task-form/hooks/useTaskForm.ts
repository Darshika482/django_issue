
import { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { Task, TaskCategory, TaskPriority, SubTask } from '@/types';
import { toast } from "sonner";

export interface TaskFormData {
  title: string;
  description?: string;
  date: string;
  time?: string;
  endTime?: string;
  category: string;
  priority: string;
  systemId?: string;
  systemName?: string;
  subtasks: SubTask[];
  productivityTechnique?: string;
}

export const useTaskForm = (taskToEdit?: Task, defaultDate?: Date) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    endTime: '',
    category: 'other',
    priority: 'medium',
    systemId: '',
    systemName: '',
    subtasks: [],
    productivityTechnique: 'none'
  });
  
  const resetForm = useCallback((task?: Task, newDefaultDate?: Date) => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        date: task.date,
        time: task.time || '',
        endTime: task.endTime || '',
        category: task.category || 'other',
        priority: task.priority,
        systemId: task.systemId,
        systemName: task.systemName,
        subtasks: task.subtasks || [],
        productivityTechnique: task.productivityTechnique || 'none'
      });
    } else {
      const initialDate = newDefaultDate || new Date();
      setFormData({
        title: '',
        description: '',
        date: format(initialDate, 'yyyy-MM-dd'),
        time: '',
        endTime: '',
        category: 'other',
        priority: 'medium',
        systemId: '',
        systemName: '',
        subtasks: [],
        productivityTechnique: 'none'
      });
    }
  }, []);
  
  const validateForm = useCallback(() => {
    if (!formData.title) {
      toast.error('Title is required');
      return false;
    }
    return true;
  }, [formData.title]);
  
  return {
    formData,
    setFormData,
    resetForm,
    validateForm
  };
};
