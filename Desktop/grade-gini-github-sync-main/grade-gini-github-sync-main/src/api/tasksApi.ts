
import { supabase } from '@/integrations/supabase/client';
import { Task, SubTask } from '@/types';

// Tasks API
export const fetchModuleTasks = async (moduleId: string) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('module_id', moduleId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    
    return data.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description || '',
      date: task.date || '',
      time: task.time,
      endTime: task.end_time,
      completed: task.is_completed,
      category: task.category || 'study',
      priority: task.priority || 'medium',
      productivityTechnique: task.technique,
      systemId: task.system_id,
      systemName: task.system_name,
      subtasks: task.subtasks || []
    })) as Task[];
  } catch (error) {
    console.error("Error fetching module tasks:", error);
    throw error;
  }
};

export const fetchAllTasks = async () => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;
    
    return data.map(task => ({
      id: task.id,
      title: task.title,
      description: task.description || '',
      date: task.date || '',
      time: task.time,
      endTime: task.end_time,
      completed: task.is_completed,
      category: task.category || 'study',
      priority: task.priority || 'medium',
      productivityTechnique: task.technique,
      systemId: task.system_id,
      systemName: task.system_name,
      subtasks: task.subtasks || []
    })) as Task[];
  } catch (error) {
    console.error("Error fetching all tasks:", error);
    throw error;
  }
};

export const createTask = async (task: Omit<Task, 'id'>, moduleId?: string) => {
  try {
    console.log("Creating task with:", {
      title: task.title,
      moduleId: moduleId || "undefined",
      subtasks: task.subtasks || []
    });
    
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title: task.title,
        description: task.description,
        date: task.date,
        time: task.time,
        end_time: task.endTime,
        is_completed: task.completed,
        category: task.category,
        priority: task.priority,
        technique: task.productivityTechnique,
        module_id: moduleId,
        system_id: task.systemId,
        system_name: task.systemName,
        subtasks: task.subtasks || []
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating task:", error);
      throw error;
    }
    
    console.log("Task created successfully:", data);
    
    return {
      id: data.id,
      title: data.title,
      description: data.description || '',
      date: data.date || '',
      time: data.time,
      endTime: data.end_time,
      completed: data.is_completed,
      category: data.category || 'study',
      priority: data.priority || 'medium',
      productivityTechnique: data.technique,
      systemId: data.system_id,
      systemName: data.system_name,
      subtasks: data.subtasks || []
    } as Task;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        title: updates.title,
        description: updates.description,
        date: updates.date,
        time: updates.time,
        end_time: updates.endTime,
        is_completed: updates.completed,
        category: updates.category,
        priority: updates.priority,
        technique: updates.productivityTechnique,
        system_id: updates.systemId,
        system_name: updates.systemName,
        subtasks: updates.subtasks || []
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      description: data.description || '',
      date: data.date || '',
      time: data.time,
      endTime: data.end_time,
      completed: data.is_completed,
      category: data.category || 'study',
      priority: data.priority || 'medium',
      productivityTechnique: data.technique,
      systemId: data.system_id,
      systemName: data.system_name,
      subtasks: data.subtasks || []
    } as Task;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const toggleSubtaskCompletion = async (taskId: string, subtaskId: string) => {
  try {
    // First, fetch the current task to get its subtasks
    const { data: taskData, error: fetchError } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Get the current subtasks and update the completed status of the target subtask
    const subtasks = taskData.subtasks || [];
    const updatedSubtasks = subtasks.map((subtask: SubTask) => 
      subtask.id === subtaskId 
        ? { ...subtask, completed: !subtask.completed } 
        : subtask
    );
    
    // Update the task with the modified subtasks
    const { data, error } = await supabase
      .from('tasks')
      .update({ subtasks: updatedSubtasks })
      .eq('id', taskId)
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      description: data.description || '',
      date: data.date || '',
      time: data.time,
      endTime: data.end_time,
      completed: data.is_completed,
      category: data.category || 'study',
      priority: data.priority || 'medium',
      productivityTechnique: data.technique,
      systemId: data.system_id,
      systemName: data.system_name,
      subtasks: data.subtasks || []
    } as Task;
  } catch (error) {
    console.error("Error toggling subtask completion:", error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
