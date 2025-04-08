
import React from 'react';
import { Task } from '@/types';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DatePickerDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  tasks: Task[];
  selectedTaskId: string | null;
  onDateSelect: (date: Date | undefined) => void;
}

const DatePickerDialog: React.FC<DatePickerDialogProps> = ({
  isOpen,
  setIsOpen,
  tasks,
  selectedTaskId,
  onDateSelect
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Task Date</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <Calendar
            mode="single"
            selected={selectedTaskId ? new Date(tasks.find(t => t.id === selectedTaskId)?.date || new Date()) : undefined}
            onSelect={onDateSelect}
            initialFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DatePickerDialog;
