
import { useState, useMemo } from 'react';
import { isToday, isPast, isFuture, parseISO } from 'date-fns';
import { Task, TaskPriority } from '@/types';

export const useTaskFiltering = (tasks: Task[], visibleSystems?: string[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'today' | 'upcoming' | 'completed' | 'overdue'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [systemFilter, setSystemFilter] = useState<string | 'all'>('all');

  // Get unique systems from tasks
  const systems = useMemo(() => {
    const systemsSet = new Set<string>();
    
    tasks.forEach(task => {
      if (task.systemName) {
        systemsSet.add(task.systemName);
      }
    });
    
    return Array.from(systemsSet);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    // Only log in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log("Filtering tasks:", tasks);
      console.log("Current filter:", filter);
      console.log("Current system filter:", systemFilter);
    }
    
    let filtered = tasks;
    
    // Apply system filter first if it's not 'all'
    if (systemFilter !== 'all') {
      filtered = filtered.filter(task => task.systemName === systemFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    switch (filter) {
      case 'today':
        filtered = filtered.filter(task => {
          try {
            return isToday(parseISO(task.date));
          } catch (e) {
            if (process.env.NODE_ENV === 'development') {
              console.error("Invalid date in task:", task);
            }
            return false;
          }
        });
        break;
      case 'upcoming':
        filtered = filtered.filter(task => {
          try {
            return isFuture(parseISO(task.date));
          } catch (e) {
            if (process.env.NODE_ENV === 'development') {
              console.error("Invalid date in task:", task);
            }
            return false;
          }
        });
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'overdue':
        filtered = filtered.filter(task => {
          try {
            return isPast(parseISO(task.date)) && !task.completed && !isToday(parseISO(task.date));
          } catch (e) {
            if (process.env.NODE_ENV === 'development') {
              console.error("Invalid date in task:", task);
            }
            return false;
          }
        });
        break;
      default:
        break;
    }
    
    if (process.env.NODE_ENV === 'development') {
      console.log("Filtered tasks:", filtered);
    }
    
    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        try {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          const result = dateA - dateB;
          return sortDirection === 'asc' ? result : -result;
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            console.error("Date comparison error:", e);
          }
          return 0;
        }
      } else if (sortBy === 'priority') {
        const priorityOrder: Record<TaskPriority, number> = { high: 3, medium: 2, low: 1 };
        const result = priorityOrder[b.priority] - priorityOrder[a.priority];
        return sortDirection === 'asc' ? -result : result;
      } else {
        // Handle 'title' sort
        const result = a.title.localeCompare(b.title);
        return sortDirection === 'asc' ? result : -result;
      }
    });
  }, [tasks, searchQuery, filter, sortBy, sortDirection, systemFilter]);

  return {
    filteredTasks,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    systemFilter,
    setSystemFilter,
    systems
  };
};
