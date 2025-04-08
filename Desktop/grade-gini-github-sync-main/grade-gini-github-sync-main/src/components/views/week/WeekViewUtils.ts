
import { format } from 'date-fns';

// Get the formatted time string from a position on the time grid
export const getTimeForPosition = (position: number): string => {
  const hour = Math.floor(position / 80);
  const minute = Math.round((position % 80) / 80 * 60);
  
  // Format hour and minute as HH:MM
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

// Helper function to format time in 12-hour format
export const formatTime = (time: string): string => {
  if (!time) return '';
  
  const [hourStr, minuteStr] = time.split(':');
  const hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);
  
  // Create a date object set to the specified hour and minute
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  
  return format(date, 'h:mm a');
};

// Check if a task is an all-day event
export const isAllDayTask = (task: { time?: string; isAllDay?: boolean }): boolean => {
  return !task.time || !!task.isAllDay;
};

// Helper function to get time from position for DayView
export const formatTimeDisplay = (time: string): string => {
  return formatTime(time);
};

// Helper function to get time from a click position in time slot
export const getTimeForPositionInSlot = (slotRef: HTMLDivElement, clientY: number): string => {
  const rect = slotRef.getBoundingClientRect();
  const relativeY = clientY - rect.top;
  const hourHeight = 80; // Height of an hour slot in pixels
  
  // Calculate minutes from the top of the hour
  const minutes = Math.floor((relativeY / hourHeight) * 60);
  
  // Get the hour from the data attribute
  const hour = parseInt(slotRef.getAttribute('data-hour') || '0');
  
  // Format as HH:MM
  return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
