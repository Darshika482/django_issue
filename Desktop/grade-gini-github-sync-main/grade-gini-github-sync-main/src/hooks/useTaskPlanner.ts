
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '@/store/task';
import { Task, LearningSystem } from '@/types';
import { toast } from 'sonner';

export const useTaskPlanner = (system: LearningSystem | null) => {
  const navigate = useNavigate();
  const { importTasksFromTemplate } = useTaskContext();
  
  const handleAddSelectedTasksToPlanner = (selectedTasks: Task[]) => {
    if (system && selectedTasks.length > 0) {
      // Process tasks to ensure they don't have unsupported fields
      const processedTasks = selectedTasks.map(task => ({
        ...task,
        // If subtasks don't exist in the database, don't include them
        subtasks: task.subtasks || []
      }));
      
      importTasksFromTemplate(
        system.id as number,
        system.title,
        processedTasks
      );
      
      toast.success(`Added ${selectedTasks.length} tasks to planner`);
      navigate('/planner');
    }
  };
  
  return {
    handleAddSelectedTasksToPlanner
  };
};
