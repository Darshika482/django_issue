
import React, { useState, useMemo } from 'react';
import { 
  startOfWeek, 
  endOfWeek, 
  addDays,
} from 'date-fns';
import { useTaskContext } from '@/store/task';
import { Task, CalendarViewProps } from '@/types';
import WeekViewHeader from './week/WeekViewHeader';
import AllDaySection from './week/AllDaySection';
import TimeGrid from './week/TimeGrid';
import TimeEditDialog from './week/TimeEditDialog';

interface WeekViewProps extends CalendarViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onEditTask: (taskId: string) => void;
}

interface TimeEditState {
  isOpen: boolean;
  task: Task | null;
}

const WeekView: React.FC<WeekViewProps> = ({ 
  currentDate, 
  onDateChange,
  onEditTask
}) => {
  const { updateTaskDate } = useTaskContext();
  // Combined state for time edit dialog
  const [timeEditState, setTimeEditState] = useState<TimeEditState>({
    isOpen: false,
    task: null
  });
  
  // Calculate week start and end dates
  const weekStart = useMemo(() => startOfWeek(currentDate, { weekStartsOn: 0 }), [currentDate]);
  const weekEnd = useMemo(() => endOfWeek(currentDate, { weekStartsOn: 0 }), [currentDate]);
  
  // Generate array of days for the week
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  }, [weekStart]);
  
  const handleExpandTask = (task: Task) => {
    setTimeEditState({
      isOpen: true,
      task
    });
  };
  
  const handleCloseTimeEditDialog = () => {
    setTimeEditState({
      isOpen: false,
      task: null
    });
  };
  
  return (
    <div className="p-4">
      <WeekViewHeader 
        weekStart={weekStart}
        weekEnd={weekEnd}
        currentDate={currentDate}
        onDateChange={onDateChange}
      />
      
      <div className="week-view-container mt-4">
        <AllDaySection 
          weekDays={weekDays}
          handleExpandTask={handleExpandTask}
          onEditTask={onEditTask}
          onDateChange={onDateChange}
        />
        
        <TimeGrid 
          weekDays={weekDays}
          onEditTask={onEditTask}
        />
      </div>
      
      {timeEditState.task && (
        <TimeEditDialog 
          isOpen={timeEditState.isOpen}
          onClose={handleCloseTimeEditDialog}
          task={timeEditState.task}
          onEditFullTask={onEditTask}
        />
      )}
    </div>
  );
};

export default WeekView;
