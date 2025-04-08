
import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTaskContext } from '@/store/TaskContext';
import { Task, CalendarViewProps } from '@/types';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskCard from '@/components/TaskCard';

interface MonthViewProps extends CalendarViewProps {
  onEditTask: (taskId: string) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ onEditTask }) => {
  const { tasks, dragInfo, updateTaskDate, getTasksByDate } = useTaskContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dropTargetDate, setDropTargetDate] = useState<Date | null>(null);
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const dayOfWeek = monthStart.getDay();
  const daysToIncludeFromPrevMonth = dayOfWeek;
  
  const totalDaysInCalendarView = 42;
  const daysToIncludeFromNextMonth = totalDaysInCalendarView - monthDays.length - daysToIncludeFromPrevMonth;
  
  const prevMonthStart = subMonths(monthStart, 1);
  const prevMonthEnd = endOfMonth(prevMonthStart);
  const prevMonthDays = [];
  
  for (let i = daysToIncludeFromPrevMonth - 1; i >= 0; i--) {
    const day = new Date(prevMonthEnd);
    day.setDate(prevMonthEnd.getDate() - i);
    prevMonthDays.push(day);
  }
  
  const nextMonthStart = addMonths(monthStart, 1);
  const nextMonthDays = [];
  
  for (let i = 1; i <= daysToIncludeFromNextMonth; i++) {
    const day = new Date(nextMonthStart);
    day.setDate(i);
    nextMonthDays.push(day);
  }
  
  const allDays = [...prevMonthDays, ...monthDays, ...nextMonthDays];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const handleDragOver = (event: React.DragEvent, day: Date) => {
    event.preventDefault();
    setDropTargetDate(day);
  };

  const handleDragLeave = () => {
    setDropTargetDate(null);
  };

  const handleDrop = (event: React.DragEvent, day: Date) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    
    if (taskId && dragInfo.taskId === taskId) {
      updateTaskDate(taskId, format(day, 'yyyy-MM-dd'));
    }
    
    setDropTargetDate(null);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setCurrentDate(prev => subMonths(prev, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setCurrentDate(prev => addMonths(prev, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-7 gap-px px-4">
          {weekDays.map(day => (
            <div 
              key={day} 
              className="p-2 text-center font-medium text-sm bg-secondary sticky top-0 z-10"
            >
              {day}
            </div>
          ))}
          
          {allDays.map((day, index) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const dayTasks = getTasksByDate(dateStr);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isDropTarget = dropTargetDate && isSameDay(day, dropTargetDate);
            
            return (
              <div
                key={index}
                className={`calendar-cell min-h-[120px] ${
                  isToday(day) ? 'today' : ''
                } ${
                  !isCurrentMonth ? 'different-month' : ''
                } ${
                  isDropTarget ? 'drop-target' : ''
                }`}
                onDragOver={(e) => handleDragOver(e, day)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, day)}
              >
                <div className="p-1">
                  <div className={`text-right text-sm font-medium ${
                    isToday(day) ? 'bg-[#8404fc] text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto' : ''
                  }`}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="mt-1 space-y-1">
                    {dayTasks.slice(0, 3).map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => onEditTask(task.id)}
                        isCompact={true}
                      />
                    ))}
                    
                    {dayTasks.length > 3 && (
                      <div className="text-xs text-center text-muted-foreground">
                        +{dayTasks.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MonthView;
