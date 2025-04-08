
import React from 'react';
import { format, subWeeks, addWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WeekViewHeaderProps {
  weekStart: Date;
  weekEnd: Date;
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

const WeekViewHeader: React.FC<WeekViewHeaderProps> = ({ 
  weekStart, 
  weekEnd, 
  currentDate, 
  onDateChange 
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">
        {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
      </h2>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => onDateChange(subWeeks(currentDate, 1))}
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
          onClick={() => onDateChange(addWeeks(currentDate, 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WeekViewHeader;
