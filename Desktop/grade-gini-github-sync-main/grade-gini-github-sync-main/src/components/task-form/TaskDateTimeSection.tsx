
import React from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TaskFormData } from './hooks/useTaskForm';

interface TaskDateTimeSectionProps {
  formData: TaskFormData;
  setFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
}

const TaskDateTimeSection: React.FC<TaskDateTimeSectionProps> = ({ formData, setFormData }) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !formData.date && "text-muted-foreground"
              )}
            >
              {formData.date ? (
                format(new Date(formData.date), "yyyy-MM-dd")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.date ? new Date(formData.date) : undefined}
              onSelect={(date) => setFormData({ ...formData, date: format(date as Date, 'yyyy-MM-dd') })}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="time">Start Time (optional)</Label>
          <Input
            id="time"
            type="time"
            value={formData.time || ''}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time (optional)</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime || ''}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          />
        </div>
      </div>
    </>
  );
};

export default TaskDateTimeSection;
