
import React from 'react';
import { format } from 'date-fns';
import { Task } from '@/types';
import { useTaskContext } from '@/store/TaskContext';
import TaskCard from '@/components/TaskCard';
import TaskSearch from './TaskSearch';
import TaskFilter from './TaskFilter';
import SystemFilter from './SystemFilter';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTaskFiltering } from './hooks/useTaskFiltering';
import { useTaskGrouping } from './hooks/useTaskGrouping';
import TaskDateSection from './TaskDateSection';
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuTrigger,
  ContextMenuSeparator
} from "@/components/ui/context-menu";
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TaskSidebarContentProps {
  onEditTask: (taskId: string) => void;
  visibleSystems?: string[];
}

const TaskSidebarContent: React.FC<TaskSidebarContentProps> = ({ 
  onEditTask,
  visibleSystems 
}) => {
  const { tasks, deleteTask } = useTaskContext();
  
  const {
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
  } = useTaskFiltering(tasks, visibleSystems);
  
  const { groupedTasks } = useTaskGrouping(filteredTasks);
  
  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };
  
  // Type-safe wrapper functions to handle filter and sortBy changes
  const handleFilterChange = (value: string) => {
    setFilter(value as 'all' | 'today' | 'upcoming' | 'completed' | 'overdue');
  };
  
  const handleSortByChange = (value: string) => {
    setSortBy(value as 'date' | 'priority' | 'title');
  };
  
  return (
    <div className="p-4">
      <TaskSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <SystemFilter 
        systems={systems}
        currentSystem={systemFilter}
        onSystemChange={setSystemFilter}
      />
      
      <TaskFilter 
        filter={filter}
        setFilter={handleFilterChange}
        sortBy={sortBy}
        setSortBy={handleSortByChange}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">Tasks ({filteredTasks.length})</h3>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No tasks found</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-280px)]">
            {Object.entries(groupedTasks).map(([date, dateTasks]) => (
              <TaskDateSection 
                key={date} 
                date={date} 
                tasks={dateTasks}
                renderTask={(task: Task) => (
                  <div key={task.id} className="relative task-sidebar-item mb-2 group">
                    <TaskCard 
                      task={task} 
                      onEdit={() => onEditTask(task.id)}
                      isDraggable={true}
                      isCompact
                    />
                    <Button
                      variant="ghost" 
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditTask(task.id);
                      }}
                    >
                      <Pencil className="h-3 w-3" />
                      <span className="sr-only">Edit task</span>
                    </Button>
                  </div>
                )}
              />
            ))}
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default TaskSidebarContent;
