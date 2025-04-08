import React from 'react';
import { format } from 'date-fns';
import TaskItem from './TaskItem';
import { Task } from '@/types';
import { useTaskContext } from '@/store/task'; // Updated import path

interface TimeGridProps {
  weekDays: Date[];
  onEditTask: (taskId: string) => void;
}

const TimeGrid: React.FC<TimeGridProps> = ({
  weekDays,
  onEditTask
}) => {
  const { getTasksByDate, dragInfo, setDragInfo, updateTaskDate } = useTaskContext();
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getTasksForDay = (day: Date) => {
    const formattedDate = format(day, 'yyyy-MM-dd');
    const tasksForDay = getTasksByDate(formattedDate);
    return tasksForDay.filter(task => task.time);
  };

  const handleDragOver = (e: React.DragEvent, dayIndex: number, hour: number) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, dayIndex: number, hour: number) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    
    if (taskId && dragInfo.taskId === taskId) {
      const newDate = format(weekDays[dayIndex], 'yyyy-MM-dd');
      const hourStr = hour.toString().padStart(2, '0');
      const newTime = `${hourStr}:00`;
      
      updateTaskDate(taskId, newDate, newTime);
    }
    
    setDragInfo({ taskId: null });
  };

  return (
    <div className="grid grid-cols-[60px_repeat(7,1fr)] relative">
      {/* Time labels column */}
      <div className="col-start-1">
        {hours.map(hour => (
          <div key={hour} className="time-label h-20 border-t border-gray-200 text-xs text-right pr-2 pt-1">
            {format(new Date().setHours(hour, 0, 0, 0), 'h a')}
          </div>
        ))}
      </div>
      
      {/* Day columns */}
      {weekDays.map((day, dayIndex) => {
        // Get tasks for the day and filter by visible systems if needed
        const dayTasks = getTasksForDay(day);
        
        return (
          <div key={dayIndex} className="col-start-auto relative">
            {hours.map(hour => (
              <div 
                key={hour}
                className="time-slot h-20 border-t border-gray-200"
                onDragOver={(e) => handleDragOver(e, dayIndex, hour)}
                onDrop={(e) => handleDrop(e, dayIndex, hour)}
                data-hour={hour}
              >
              </div>
            ))}
            
            {/* Task items */}
            {dayTasks.map(task => {
              // Parse time values to position tasks correctly
              const taskHour = task.time ? parseInt(task.time.split(':')[0]) : 0;
              const taskMinute = task.time ? parseInt(task.time.split(':')[1]) : 0;
              const endHour = task.endTime ? parseInt(task.endTime.split(':')[0]) : taskHour + 1;
              const endMinute = task.endTime ? parseInt(task.endTime.split(':')[1]) : taskMinute;
              
              // Calculate task height and position
              const height = (endHour - taskHour) * 80 + ((endMinute - taskMinute) / 60) * 80;
              const top = taskHour * 80 + (taskMinute / 60) * 80;
              
              return (
                <div 
                  key={task.id} 
                  className="absolute w-full" 
                  style={{ top: `${top}px`, height: `${height}px` }}
                  onClick={() => onEditTask(task.id)}
                >
                  <TaskItem 
                    task={task} 
                    onEdit={() => onEditTask(task.id)} 
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TimeGrid;
