
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Plus, Trash2 } from 'lucide-react';
import { TaskFormData } from './hooks/useTaskForm';
import { SubTask } from '@/types';

interface TaskSubtasksSectionProps {
  formData: TaskFormData;
  setFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
}

const TaskSubtasksSection: React.FC<TaskSubtasksSectionProps> = ({ formData, setFormData }) => {
  const [newSubtask, setNewSubtask] = useState('');
  
  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    
    const newSubtaskItem: SubTask = {
      id: crypto.randomUUID(),
      title: newSubtask.trim(),
      completed: false
    };
    
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, newSubtaskItem]
    });
    
    setNewSubtask('');
  };
  
  const handleRemoveSubtask = (id: string) => {
    setFormData({
      ...formData,
      subtasks: formData.subtasks.filter(subtask => subtask.id !== id)
    });
  };
  
  const toggleSubtaskCompletion = (id: string) => {
    setFormData({
      ...formData,
      subtasks: formData.subtasks.map(subtask => 
        subtask.id === id 
          ? { ...subtask, completed: !subtask.completed } 
          : subtask
      )
    });
  };
  
  return (
    <div className="space-y-2">
      <Label>Subtasks</Label>
      <div className="space-y-2">
        {formData.subtasks.map(subtask => (
          <div key={subtask.id} className="flex items-center gap-2 group">
            <div 
              className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer
                ${subtask.completed ? 'bg-primary border-primary' : 'border-gray-300'}`}
              onClick={() => toggleSubtaskCompletion(subtask.id)}
            >
              {subtask.completed && <Check className="h-3 w-3 text-white" />}
            </div>
            <div className={`flex-1 text-sm ${subtask.completed ? 'line-through text-muted-foreground' : ''}`}>
              {subtask.title}
            </div>
            <Button
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 opacity-0 group-hover:opacity-100"
              onClick={() => handleRemoveSubtask(subtask.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Add a subtask..."
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSubtask();
              }
            }}
          />
          <Button type="button" size="sm" onClick={handleAddSubtask}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskSubtasksSection;
