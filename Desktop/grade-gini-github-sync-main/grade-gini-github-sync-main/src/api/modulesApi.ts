import { supabase } from '@/integrations/supabase/client';
import { SystemModule } from '@/types';
import { fetchModuleTasks } from './tasksApi';

// Modules API
export const fetchSystemModules = async (systemId: number) => {
  try {
    console.log(`Fetching modules for system ID: ${systemId}`);
    
    const { data, error } = await supabase
      .from('system_modules')
      .select('*')
      .eq('system_id', systemId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error("Error fetching system modules:", error);
      throw error;
    }
    
    console.log(`Found ${data.length} modules for system ID: ${systemId}`);
    
    // Transform the data to match our application types
    const modulesWithTasks = await Promise.all(data.map(async (mod) => {
      console.log(`Fetching tasks for module ID: ${mod.id}`);
      const tasks = await fetchModuleTasks(mod.id);
      console.log(`Found ${tasks.length} tasks for module ID: ${mod.id}`);
      
      return {
        id: mod.id,
        title: mod.title,
        description: mod.description || '',
        isCompleted: mod.is_completed || false,
        tasks: tasks
      };
    }));
    
    return modulesWithTasks as SystemModule[];
  } catch (error) {
    console.error("Error in fetchSystemModules:", error);
    throw error;
  }
};

export const createModule = async (moduleData: Omit<SystemModule, 'id' | 'tasks'>, systemId: number) => {
  const { data, error } = await supabase
    .from('system_modules')
    .insert({
      title: moduleData.title,
      description: moduleData.description,
      is_completed: moduleData.isCompleted,
      system_id: systemId
    })
    .select()
    .single();

  if (error) throw error;
  
  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    isCompleted: data.is_completed || false,
    tasks: []
  } as SystemModule;
};

export const updateModule = async (id: string, updates: Partial<SystemModule>) => {
  const { data, error } = await supabase
    .from('system_modules')
    .update({
      title: updates.title,
      description: updates.description,
      is_completed: updates.isCompleted
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  
  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    isCompleted: data.is_completed || false,
    tasks: updates.tasks || []
  } as SystemModule;
};

export const deleteModule = async (id: string) => {
  const { error } = await supabase
    .from('system_modules')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};
