
import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TasksListProps {
  tasks: Task[];
  selectMode: boolean;
  selectedTasks: string[];
  onTaskSelection: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onAddTask: (moduleId: string) => void;
  moduleId: string;
}

const TasksList: React.FC<TasksListProps> = ({
  tasks,
  selectMode,
  selectedTasks,
  onTaskSelection,
  onEditTask,
  onDeleteTask,
  onAddTask,
  moduleId
}) => {
  return (
    <>
      <div className="divide-y">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem 
              key={task.id}
              task={task}
              selectMode={selectMode}
              selectedTasks={selectedTasks}
              onTaskSelection={onTaskSelection}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No tasks found for this module. Add a task to get started.
          </div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full text-[#8404fc] border-[#8404fc]/20 hover:bg-[#8404fc]/10 hover:text-[#6400c0] flex items-center justify-center"
          onClick={() => onAddTask(moduleId)}
        >
          <Plus className="h-4 w-4 mr-1" />
          <span>Add Task</span>
        </Button>
      </div>
    </>
  );
};

export default TasksList;
