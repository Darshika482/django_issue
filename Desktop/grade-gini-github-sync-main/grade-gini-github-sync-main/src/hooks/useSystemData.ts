
import { useState, useEffect } from 'react';
import { LearningSystem, SystemModule } from '@/types';
import { fetchSystemById } from '@/api/systemsApi';
import { fetchSystemModules } from '@/api/modulesApi';
import { toast } from 'sonner';

export const useSystemData = (id: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [system, setSystem] = useState<LearningSystem | null>(null);
  const [modules, setModules] = useState<SystemModule[]>([]);

  useEffect(() => {
    async function loadSystemData() {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch system details
        const systemData = await fetchSystemById(id);
        
        // Fetch modules with their tasks
        const modulesData = await fetchSystemModules(Number(id));
        
        // Calculate system stats based on modules and tasks
        const allTasks = modulesData.flatMap(module => module.tasks || []);
        const completedTasks = allTasks.filter(task => task.completed).length;
        const completedModules = modulesData.filter(module => module.isCompleted).length;
        
        // Estimate time metrics
        const estimatedTimePerTask = 2; // 2 hours per task
        const estimatedTime = allTasks.length * estimatedTimePerTask;
        const timeSpent = completedTasks * estimatedTimePerTask;
        
        // Update system with calculated values
        const enrichedSystem = {
          ...systemData,
          totalTasks: allTasks.length,
          completedTasks,
          modules: modulesData,
          tasks: allTasks,
          progress: allTasks.length > 0 ? Math.round((completedTasks / allTasks.length) * 100) : 0,
          timeSpent,
          estimatedTime,
          totalWeeks: Math.ceil(estimatedTime / 40), // Assuming 40 hours per week
          completedModules
        };
        
        setSystem(enrichedSystem);
        setModules(modulesData);
      } catch (error) {
        console.error('Error loading system data:', error);
        setError('Failed to load system data. Please try again.');
        toast.error('Error loading system data');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadSystemData();
  }, [id]);

  return {
    isLoading,
    error,
    system,
    modules,
    setModules
  };
};
