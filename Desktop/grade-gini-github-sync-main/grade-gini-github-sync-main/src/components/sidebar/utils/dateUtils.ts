
import { format, isToday, isTomorrow, parseISO } from 'date-fns';

// Ensures all dates are in the same format (YYYY-MM-DD)
export const normalizeDate = (inputDate: string | Date): string => {
  try {
    if (typeof inputDate === 'string') {
      // Try to parse the date string
      const parsedDate = parseISO(inputDate);
      return format(parsedDate, 'yyyy-MM-dd');
    } else {
      // It's already a Date object
      return format(inputDate, 'yyyy-MM-dd');
    }
  } catch (error) {
    console.error("Error normalizing date:", error, "Input was:", inputDate);
    
    // If we can't parse the input, return it as is if it's a string
    if (typeof inputDate === 'string') {
      return inputDate;
    }
    
    // Last resort, return today's date
    return format(new Date(), 'yyyy-MM-dd');
  }
};

// Returns a user-friendly date format (Today, Tomorrow, or the full date)
export const getFormattedDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else {
      return format(date, 'EEEE, MMMM d, yyyy');
    }
  } catch (error) {
    console.error("Error formatting date:", error, "Input was:", dateString);
    return dateString; // Fallback to returning the input
  }
};
