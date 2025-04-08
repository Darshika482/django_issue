import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Task, TaskCategory, TaskPriority, SubTask } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTaskContext } from '@/store/TaskContext';
import { toast } from "sonner";
import { Check, Plus, Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TaskFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task;
  defaultDate?: Date;
  onSubmit?: (taskData: Omit<Task, 'id'>) => void;
}

interface FormData {
  title: string;
  description?: string;
  date: string;
  time?: string;
  endTime?: string;
  category: string;
  priority: string;
  systemId?: string;
  systemName?: string;
  subtasks: SubTask[];
  productivityTechnique?: string;
}

const TaskFormDialog: React.FC<TaskFormDialogProps> = ({ 
  isOpen, 
  onClose, 
  taskToEdit, 
  defaultDate,
  onSubmit
}) => {
  const { addTask, updateTask } = useTaskContext();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '',
    endTime: '',
    category: 'other',
    priority: 'medium',
    systemId: '',
    systemName: '',
    subtasks: [],
    productivityTechnique: 'none'
  });
  
  const [newSubtask, setNewSubtask] = useState('');
  const [activeTab, setActiveTab] = useState("general");
  
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        date: taskToEdit.date,
        time: taskToEdit.time || '',
        endTime: taskToEdit.endTime || '',
        category: taskToEdit.category || 'other',
        priority: taskToEdit.priority,
        systemId: taskToEdit.systemId,
        systemName: taskToEdit.systemName,
        subtasks: taskToEdit.subtasks || [],
        productivityTechnique: taskToEdit.productivityTechnique || 'none'
      });
    } else {
      const initialDate = defaultDate || new Date();
      setFormData({
        title: '',
        description: '',
        date: format(initialDate, 'yyyy-MM-dd'),
        time: '',
        endTime: '',
        category: 'other',
        priority: 'medium',
        systemId: '',
        systemName: '',
        subtasks: [],
        productivityTechnique: 'none'
      });
    }
  }, [taskToEdit, defaultDate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast.error('Title is required');
      return;
    }
    
    const taskData: Omit<Task, 'id'> = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      endTime: formData.endTime,
      category: formData.category as TaskCategory,
      priority: formData.priority as TaskPriority,
      completed: taskToEdit?.completed || false,
      systemId: formData.systemId,
      systemName: formData.systemName,
      subtasks: formData.subtasks,
      productivityTechnique: formData.productivityTechnique
    };
    
    if (onSubmit) {
      onSubmit(taskData);
    } else {
      try {
        if (taskToEdit) {
          await updateTask(taskToEdit.id, taskData);
        } else {
          await addTask(taskData);
        }
        onClose();
      } catch (err) {
        console.error("Task submission error:", err);
        toast.error("Failed to save task");
      }
    }
  };
  
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
    <div className="task-form-dialog">
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-[500px] w-[95%] max-h-[90vh] overflow-y-auto task-form-dialog">
          <DialogHeader className="pb-2">
            <DialogTitle>{taskToEdit ? 'Edit Task' : 'Create New Task'}</DialogTitle>
            <DialogDescription className="text-xs">
              {taskToEdit ? 'Make changes to your task' : 'Add details for your new task'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="productivity">Productivity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-3 pt-3">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm">Description</Label>
                  <Input
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
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
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm">Start Time (optional)</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time || ''}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-sm">End Time (optional)</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime || ''}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-sm">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="study">Study</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="errands">Errands</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority" className="text-sm">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {formData.systemId && formData.systemName && (
                  <div className="bg-muted p-2 rounded-md">
                    <Label className="text-xs font-medium mb-1 block">System</Label>
                    <div className="text-sm">{formData.systemName}</div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label className="text-sm">Subtasks</Label>
                  <div className="space-y-2 max-h-[120px] overflow-y-auto">
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
              </TabsContent>
              
              <TabsContent value="productivity" className="space-y-3 pt-3">
                <div className="space-y-3">
                  <Label className="text-sm">Productivity Technique</Label>
                  
                  <RadioGroup
                    value={formData.productivityTechnique || "none"}
                    onValueChange={(value) => setFormData({ ...formData, productivityTechnique: value })}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-2"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-2 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none" className="flex flex-col cursor-pointer">
                        <span className="text-sm font-medium">None</span>
                        <span className="text-xs text-muted-foreground">No specific technique</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rounded-md border p-2 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="pomodoro" id="pomodoro" />
                      <Label htmlFor="pomodoro" className="flex flex-col cursor-pointer">
                        <span className="text-sm font-medium">Pomodoro</span>
                        <span className="text-xs text-muted-foreground">25 min work, 5 min break</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rounded-md border p-2 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="timeblocking" id="timeblocking" />
                      <Label htmlFor="timeblocking" className="flex flex-col cursor-pointer">
                        <span className="text-sm font-medium">Time Blocking</span>
                        <span className="text-xs text-muted-foreground">Dedicate specific time blocks</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rounded-md border p-2 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="eisenhower" id="eisenhower" />
                      <Label htmlFor="eisenhower" className="flex flex-col cursor-pointer">
                        <span className="text-sm font-medium">Eisenhower Matrix</span>
                        <span className="text-xs text-muted-foreground">Urgent vs. Important</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rounded-md border p-2 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="gtd" id="gtd" />
                      <Label htmlFor="gtd" className="flex flex-col cursor-pointer">
                        <span className="text-sm font-medium">Getting Things Done</span>
                        <span className="text-xs text-muted-foreground">Capture, clarify, organize</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rounded-md border p-2 cursor-pointer hover:bg-muted">
                      <RadioGroupItem value="deepwork" id="deepwork" />
                      <Label htmlFor="deepwork" className="flex flex-col cursor-pointer">
                        <span className="text-sm font-medium">Deep Work</span>
                        <span className="text-xs text-muted-foreground">Focused work without distractions</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="pt-2">
              <Button type="submit" size="sm">{taskToEdit ? 'Update Task' : 'Create Task'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskFormDialog;
