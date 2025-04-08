
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Task } from '@/types';
import { useTaskContext } from '@/store/TaskContext';
import { toast } from "sonner";
import TaskBasicInfo from './TaskBasicInfo';
import TaskDateTimeSection from './TaskDateTimeSection';
import TaskCategorySection from './TaskCategorySection';
import TaskSubtasksSection from './TaskSubtasksSection';
import TaskProductivitySection from './TaskProductivitySection';
import { useTaskForm } from './hooks/useTaskForm';

interface TaskFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task;
  defaultDate?: Date;
  onSubmit?: (taskData: Omit<Task, 'id'>) => void;
}

const TaskFormDialog: React.FC<TaskFormDialogProps> = ({ 
  isOpen, 
  onClose, 
  taskToEdit, 
  defaultDate,
  onSubmit
}) => {
  const { addTask, updateTask } = useTaskContext();
  const { formData, setFormData, resetForm, validateForm } = useTaskForm(taskToEdit, defaultDate);
  const [activeTab, setActiveTab] = React.useState("general");
  
  React.useEffect(() => {
    if (isOpen) {
      resetForm(taskToEdit, defaultDate);
    }
  }, [isOpen, taskToEdit, defaultDate, resetForm]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const taskData: Omit<Task, 'id'> = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      endTime: formData.endTime,
      category: formData.category as any,
      priority: formData.priority as any,
      completed: taskToEdit?.completed || false,
      systemId: formData.systemId,
      systemName: formData.systemName,
      subtasks: formData.subtasks,
      productivityTechnique: formData.productivityTechnique
    };
    
    console.log("Submitting task data:", taskData);
    
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
  
  return (
    <div className="task-form-dialog">
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
        <DialogContent className="max-w-[500px] w-[95%] max-h-[90vh] overflow-y-auto">
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
                <TaskBasicInfo formData={formData} setFormData={setFormData} />
                
                <TaskDateTimeSection formData={formData} setFormData={setFormData} />
                
                <TaskCategorySection formData={formData} setFormData={setFormData} />
                
                {formData.systemId && formData.systemName && (
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-xs font-medium mb-1 block">System</div>
                    <div className="text-sm">{formData.systemName}</div>
                  </div>
                )}
                
                <TaskSubtasksSection formData={formData} setFormData={setFormData} />
              </TabsContent>
              
              <TabsContent value="productivity" className="space-y-3 pt-3">
                <TaskProductivitySection formData={formData} setFormData={setFormData} />
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
