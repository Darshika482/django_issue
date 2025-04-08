
import { supabase } from '@/integrations/supabase/client';
import { LearningSystem } from '@/types';

// Learning Systems API
export const fetchUserSystems = async () => {
  const { data, error } = await supabase
    .from('learning_systems')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  // Transform data to match our application types
  return data.map(item => ({
    id: String(item.id), // Ensure ID is a string for consistent comparison
    title: item.title,
    description: item.description || '',
    progress: item.progress || 0,
    deadline: item.deadline || '',
    status: item.status || 'Active',
  })) as LearningSystem[];
};

export const fetchSystemById = async (id: string | number) => {
  const { data, error } = await supabase
    .from('learning_systems')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  
  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    progress: data.progress || 0,
    deadline: data.deadline || '',
    status: data.status || 'Active',
  } as LearningSystem;
};

export const createSystem = async (system: Omit<LearningSystem, 'id'>) => {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not authenticated");
  
  // Prepare system data, ensuring deadline is properly formatted
  const systemData = {
    title: system.title,
    description: system.description,
    progress: system.progress,
    status: system.status,
    user_id: user.id,
    // Only include deadline if it's a non-empty string
    ...(system.deadline && system.deadline.trim() !== "" ? { deadline: system.deadline } : {})
  };
  
  const { data, error } = await supabase
    .from('learning_systems')
    .insert(systemData)
    .select()
    .single();

  if (error) throw error;
  
  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    progress: data.progress || 0,
    deadline: data.deadline || '',
    status: data.status || 'Active',
  } as LearningSystem;
};

export const updateSystem = async (id: number, updates: Partial<LearningSystem>) => {
  // Prepare update data, ensuring deadline is properly formatted
  const updateData: any = {};
  
  if (updates.title !== undefined) updateData.title = updates.title;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.progress !== undefined) updateData.progress = updates.progress;
  if (updates.status !== undefined) updateData.status = updates.status;
  // Only include deadline if it's a non-empty string
  if (updates.deadline !== undefined && updates.deadline.trim() !== "") {
    updateData.deadline = updates.deadline;
  }
  
  const { data, error } = await supabase
    .from('learning_systems')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  
  return {
    id: data.id,
    title: data.title,
    description: data.description || '',
    progress: data.progress || 0,
    deadline: data.deadline || '',
    status: data.status || 'Active',
  } as LearningSystem;
};

export const deleteSystem = async (id: string | number) => {
  const { error } = await supabase
    .from('learning_systems')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};
