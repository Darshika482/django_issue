
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(time: string): string {
  // Basic time formatting
  try {
    if (!time) return '';
    
    // If it's already in HH:MM format, return it
    if (/^\d{1,2}:\d{2}$/.test(time)) return time;
    
    // If it's a date string, extract the time part
    const date = new Date(time);
    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    return time;
  } catch (error) {
    console.error('Error formatting time:', error);
    return time;
  }
}
