
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TaskFormData } from './hooks/useTaskForm';

interface TaskProductivitySectionProps {
  formData: TaskFormData;
  setFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
}

const TaskProductivitySection: React.FC<TaskProductivitySectionProps> = ({ formData, setFormData }) => {
  return (
    <div className="space-y-4">
      <Label>Productivity Technique</Label>
      
      <RadioGroup
        value={formData.productivityTechnique || "none"}
        onValueChange={(value) => setFormData({ ...formData, productivityTechnique: value })}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
          <RadioGroupItem value="none" id="none" />
          <Label htmlFor="none" className="flex flex-col cursor-pointer">
            <span className="font-medium">None</span>
            <span className="text-xs text-muted-foreground">No specific technique</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
          <RadioGroupItem value="pomodoro" id="pomodoro" />
          <Label htmlFor="pomodoro" className="flex flex-col cursor-pointer">
            <span className="font-medium">Pomodoro</span>
            <span className="text-xs text-muted-foreground">25 min work, 5 min break</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
          <RadioGroupItem value="timeblocking" id="timeblocking" />
          <Label htmlFor="timeblocking" className="flex flex-col cursor-pointer">
            <span className="font-medium">Time Blocking</span>
            <span className="text-xs text-muted-foreground">Dedicate specific time blocks</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
          <RadioGroupItem value="eisenhower" id="eisenhower" />
          <Label htmlFor="eisenhower" className="flex flex-col cursor-pointer">
            <span className="font-medium">Eisenhower Matrix</span>
            <span className="text-xs text-muted-foreground">Urgent vs. Important</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
          <RadioGroupItem value="gtd" id="gtd" />
          <Label htmlFor="gtd" className="flex flex-col cursor-pointer">
            <span className="font-medium">Getting Things Done</span>
            <span className="text-xs text-muted-foreground">Capture, clarify, organize</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted">
          <RadioGroupItem value="deepwork" id="deepwork" />
          <Label htmlFor="deepwork" className="flex flex-col cursor-pointer">
            <span className="font-medium">Deep Work</span>
            <span className="text-xs text-muted-foreground">Focused work without distractions</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default TaskProductivitySection;
