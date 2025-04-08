
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from '@/types';
import { useTaskContext } from '@/store/task';

interface TimeEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onEditFullTask: (taskId: string) => void;
}

const TimeEditDialog: React.FC<TimeEditDialogProps> = ({ 
  isOpen, 
  onClose, 
  task,
  onEditFullTask
}) => {
  const { updateTaskDate } = useTaskContext();
  const [time, setTime] = useState(task.time || '');
  const [endTime, setEndTime] = useState(task.endTime || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTaskDate(task.id, task.date, time || undefined, endTime || undefined);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-base">Edit Time for {task.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-sm">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-sm">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => {
                onClose();
                onEditFullTask(task.id);
              }}
            >
              Edit Full Task
            </Button>
            <Button type="submit" size="sm">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TimeEditDialog;
