import React from 'react';
import { format, isToday } from 'date-fns';
import { Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TaskCard from '@/components/TaskCard';
import { Task } from '@/types';
import { useTaskContext } from '@/store/TaskContext';

interface AllDaySectionProps {
  weekDays: Date[];
  handleExpandTask: (task: Task) => void;
  onEditTask: (taskId: string) => void;
  onDateChange: (date: Date) => void;
}

const AllDaySection: React.FC<AllDaySectionProps> = ({
  weekDays,
  handleExpandTask,
  onEditTask,
  onDateChange
}) => {
  const { getTasksByDate, dragInfo, setDragInfo, updateTaskDate } = useTaskContext();
  
  const getAllDayTasksForDay = (day: Date) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    const tasksForDay = getTasksByDate(formattedDate);
    return tasksForDay.filter(task => !task.time);
  };
  
  const handleDragOver = (e: React.DragEvent, dayIndex: number) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, dayIndex: number) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    
    if (taskId && dragInfo.taskId === taskId) {
      const newDate = format(weekDays[dayIndex], 'yyyy-MM-dd');
      
      // Dropped in all-day section
      updateTaskDate(taskId, newDate, undefined, undefined);
    }
    
    setDragInfo({ taskId: null });
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">All Day</h3>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, dayIndex) => {
          const allDayTasks = getAllDayTasksForDay(day);
          
          return (
            <div 
              key={dayIndex}
              className={`border rounded-md p-2 min-h-[100px] ${
                isToday(day) ? 'bg-primary/5' : ''
              } cursor-pointer`}
              onClick={() => onDateChange(day)}
              onDragOver={(e) => handleDragOver(e, dayIndex)}
              onDrop={(e) => handleDrop(e, dayIndex)}
            >
              <div className="text-center mb-2">
                <div className="text-sm">{format(day, 'EEE')}</div>
                <div className={`text-lg ${isToday(day) ? 'bg-[#8404fc] text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
                  {format(day, 'd')}
                </div>
              </div>
              
              <div className="space-y-1">
                {allDayTasks.map(task => (
                  <div
                    key={task.id}
                    className="relative group"
                  >
                    <div className="calendar-day-task">
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => onEditTask(task.id)}
                        isCompact={true}
                      />
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandTask(task);
                      }}
                    >
                      <Clock className="h-3 w-3 mr-1" /> Set time
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllDaySection;
