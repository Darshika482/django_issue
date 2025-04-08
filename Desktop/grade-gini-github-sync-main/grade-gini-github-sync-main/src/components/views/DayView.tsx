import React, { useState, useRef } from 'react';
import { 
  format, 
  isToday,
  addDays,
  subDays,
  isSameDay
} from 'date-fns';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useTaskContext } from '@/store/TaskContext';
import { Task } from '@/types';
import { Button } from "@/components/ui/button";
import TaskCard from '@/components/TaskCard';
import { formatTimeDisplay, getTimeForPositionInSlot } from './week/WeekViewUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DayViewProps {
  onEditTask: (taskId: string) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  visibleSystems: string[];
}

const DayView: React.FC<DayViewProps> = ({ onEditTask, currentDate, onDateChange, visibleSystems = ['all'] }) => {
  const { tasks, dragInfo, updateTaskDate, addTask } = useTaskContext();
  const [dropTargetTime, setDropTargetTime] = useState<number | null>(null);
  const [expandedTask, setExpandedTask] = useState<Task | null>(null);
  const [newStartTime, setNewStartTime] = useState<string>('');
  const [newEndTime, setNewEndTime] = useState<string>('');
  const timeSlotRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getTasksForHour = (hour: number): Task[] => {
    return tasks.filter(task => {
      if (!isSameDay(new Date(task.date), currentDate)) return false;
      
      if (!task.time) return hour === -1;
      
      const [taskHour] = task.time.split(':').map(Number);
      
      if (!visibleSystems.includes('all')) {
        if (task.systemId) {
          if (!visibleSystems.includes(task.systemId)) {
            return false;
          }
        } else {
          return false;
        }
      }
      
      return hour === taskHour;
    });
  };
  
  const tasksWithNoTime = getTasksForHour(-1);

  const handleDragOver = (event: React.DragEvent, hour: number) => {
    event.preventDefault();
    setDropTargetTime(hour);
  };

  const handleDragLeave = () => {
    setDropTargetTime(null);
  };

  const handleDrop = (event: React.DragEvent, hour: number) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    
    if (taskId && dragInfo.taskId === taskId) {
      const newDate = format(currentDate, 'yyyy-MM-dd');
      
      const newTime = hour >= 0 ? `${hour.toString().padStart(2, '0')}:00` : undefined;
      
      let endTime;
      if (hour >= 0) {
        const endHour = (hour + 1) % 24;
        endTime = `${endHour.toString().padStart(2, '0')}:00`;
      }
      
      updateTaskDate(taskId, newDate, newTime, endTime);
    }
    
    setDropTargetTime(null);
  };

  const handleExpandTask = (task: Task) => {
    setExpandedTask(task);
    setNewStartTime(task.time || '');
    setNewEndTime(task.endTime || '');
  };

  const handleUpdateTaskTime = () => {
    if (expandedTask) {
      updateTaskDate(
        expandedTask.id,
        expandedTask.date,
        newStartTime,
        newEndTime
      );
      setExpandedTask(null);
    }
  };

  const handleTimeSlotClick = (e: React.MouseEvent, hour: number, slotRef: HTMLDivElement | null) => {
    if (slotRef && e.target === slotRef) {
      const timeString = getTimeForPositionInSlot(slotRef, e.clientY);
      
      const dateString = currentDate.toISOString().split('T')[0];
      
      addTask({
        title: 'New Task',
        description: '',
        date: dateString,
        time: timeString,
        category: 'work',
        priority: 'medium',
        completed: false,
        productivityTechnique: 'none'
      });
    }
  };
  
  return (
    <div className="day-view-container overflow-y-auto">
      <div className="day-view-header">
        <h2 className="text-2xl font-bold">{format(currentDate, 'EEEE, MMMM d, yyyy')}</h2>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onDateChange(subDays(currentDate, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onDateChange(new Date())}
          >
            Today
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onDateChange(addDays(currentDate, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mb-4" 
        onDragOver={(e) => handleDragOver(e, -1)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, -1)}
      >
        <h3 className="text-sm font-medium mb-2">All Day</h3>
        <div className={`space-y-2 border rounded-md p-2 min-h-[100px] ${
          dropTargetTime === -1 ? 'drop-target' : ''
        }`}>
          {tasksWithNoTime.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-4">
              No all-day tasks
            </div>
          ) : (
            tasksWithNoTime.map(task => (
              <div className="relative group" key={task.id}>
                <TaskCard
                  task={task}
                  onEdit={() => onEditTask(task.id)}
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpandTask(task);
                  }}
                >
                  <Clock className="h-3 w-3 mr-1" /> Set time
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="day-view-time-slots">
        {hours.map(hour => {
          const hourTasks = getTasksForHour(hour);
          const isDropTarget = dropTargetTime === hour;
          const slotRef = (ref: HTMLDivElement | null) => {
            timeSlotRefs.current[`hour-${hour}`] = ref;
          };
          
          return (
            <div 
              key={hour} 
              className={`grid grid-cols-12 border rounded-sm ${isDropTarget ? 'drop-target' : 'hover:bg-gray-50'}`}
              onDragOver={(e) => handleDragOver(e, hour)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, hour)}
            >
              <div className="col-span-1 text-right pr-2 py-3 text-sm text-muted-foreground border-r">
                {hour === 0 ? '12 AM' : 
                 hour < 12 ? `${hour} AM` : 
                 hour === 12 ? '12 PM' : 
                 `${hour - 12} PM`}
              </div>
              
              <div 
                ref={slotRef}
                data-hour={hour}
                className="col-span-11 min-h-[80px] p-2 relative"
                onClick={(e) => handleTimeSlotClick(e, hour, timeSlotRefs.current[`hour-${hour}`])}
              >
                {hourTasks.map(task => (
                  <div
                    key={task.id}
                    className="relative group"
                  >
                    <TaskCard
                      task={task}
                      onEdit={() => onEditTask(task.id)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExpandTask(task);
                      }}
                    >
                      <Clock className="h-3 w-3 mr-1" /> Change time
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <Dialog open={expandedTask !== null} onOpenChange={() => setExpandedTask(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Task Time</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">{expandedTask?.title}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="startTime" className="text-sm font-medium">
                    Start Time
                  </label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="endTime" className="text-sm font-medium">
                    End Time
                  </label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newEndTime}
                    onChange={(e) => setNewEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setExpandedTask(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateTaskTime}>
                Update Time
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DayView;
