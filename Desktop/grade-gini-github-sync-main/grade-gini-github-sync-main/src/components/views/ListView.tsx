
import React, { useState } from 'react';
import { useTaskContext } from '@/store/task';
import { Task } from '@/types';
import TaskListHeader from './list/TaskListHeader';
import TaskTable from './list/TaskTable';
import DatePickerDialog from './list/DatePickerDialog';
import { useTaskFilters } from './list/hooks/useTaskFilters';

interface ListViewProps {
  onEditTask: (taskId: string) => void;
}

const ListView: React.FC<ListViewProps> = ({ onEditTask }) => {
  const { tasks, updateTaskDate } = useTaskContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Task['category']>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Task['priority']>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  // Use the custom hook for filtering and sorting
  const filteredTasks = useTaskFilters({
    tasks,
    searchQuery,
    categoryFilter,
    priorityFilter,
    sortBy,
    sortDirection
  });

  const showDatePicker = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsDatePickerOpen(true);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && selectedTaskId) {
      const newDate = date.toISOString().split('T')[0];
      updateTaskDate(selectedTaskId, newDate);
      setIsDatePickerOpen(false);
      setSelectedTaskId(null);
    }
  };
  
  return (
    <div className="p-4">
      <TaskListHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />
      
      <TaskTable 
        tasks={filteredTasks}
        onEditTask={onEditTask}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        showDatePicker={showDatePicker}
      />

      <DatePickerDialog
        isOpen={isDatePickerOpen}
        setIsOpen={setIsDatePickerOpen}
        tasks={tasks}
        selectedTaskId={selectedTaskId}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default ListView;
