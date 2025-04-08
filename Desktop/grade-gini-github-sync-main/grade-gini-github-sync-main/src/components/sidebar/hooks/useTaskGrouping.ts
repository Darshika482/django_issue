
import { useMemo } from 'react';
import { Task } from '@/types';
import { format, parseISO } from 'date-fns';
import { normalizeDate, getFormattedDate } from '../utils/dateUtils';

export const useTaskGrouping = (filteredTasks: Task[]) => {
  const groupedTasks = useMemo(() => {
    console.log("Grouping tasks:", filteredTasks);
    
    const grouped: Record<string, Task[]> = {};
    
    // Use current date for today and tomorrow, ensuring consistent format
    const today = normalizeDate(new Date());
    const tomorrow = normalizeDate(new Date(Date.now() + 86400000));
    
    console.log("Today's date (for grouping):", today);
    console.log("Tomorrow's date (for grouping):", tomorrow);
    
    // Initialize groups for today and tomorrow even if there are no tasks yet
    grouped[getFormattedDate(today)] = [];
    grouped[getFormattedDate(tomorrow)] = [];
    
    // Add each task to its date group
    filteredTasks.forEach(task => {
      if (!task.date) {
        console.warn("Task without date found:", task);
        return;
      }
      
      // Ensure consistent date format
      const taskDate = normalizeDate(task.date);
      const formattedDate = getFormattedDate(taskDate);
      
      if (!grouped[formattedDate]) {
        grouped[formattedDate] = [];
      }
      grouped[formattedDate].push({
        ...task,
        date: taskDate // Update the task with the normalized date
      });
    });
    
    // Remove empty dates (except for today and tomorrow which we always want to show)
    Object.keys(grouped).forEach(date => {
      if (grouped[date].length === 0 && 
          date !== getFormattedDate(today) && 
          date !== getFormattedDate(tomorrow)) {
        delete grouped[date];
      }
    });
    
    return grouped;
  }, [filteredTasks]);

  return { groupedTasks };
};
