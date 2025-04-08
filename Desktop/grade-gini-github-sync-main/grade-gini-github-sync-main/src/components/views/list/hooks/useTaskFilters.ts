
import { useMemo } from 'react';
import { Task } from '@/types';

interface UseTaskFiltersProps {
  tasks: Task[];
  searchQuery: string;
  categoryFilter: 'all' | Task['category']; 
  priorityFilter: 'all' | Task['priority'];
  sortBy: 'date' | 'priority' | 'title';
  sortDirection: 'asc' | 'desc';
}

export const useTaskFilters = ({
  tasks,
  searchQuery,
  categoryFilter,
  priorityFilter,
  sortBy,
  sortDirection
}: UseTaskFiltersProps) => {
  
  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(task => task.category === categoryFilter);
    }
    
    // Filter by priority
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    
    // Sort tasks
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          const result = new Date(a.date).getTime() - new Date(b.date).getTime();
          return sortDirection === 'asc' ? result : -result;
        case 'priority':
          const priorityOrder: Record<Task['priority'], number> = { high: 3, medium: 2, low: 1 };
          const priorityResult = priorityOrder[b.priority] - priorityOrder[a.priority];
          return sortDirection === 'asc' ? -priorityResult : priorityResult;
        case 'title':
          const titleResult = a.title.localeCompare(b.title);
          return sortDirection === 'asc' ? titleResult : -titleResult;
        default:
          return 0;
      }
    });
  }, [tasks, searchQuery, categoryFilter, priorityFilter, sortBy, sortDirection]);

  return filteredTasks;
};
