
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { TemplateTask } from '@/types';

// Form schema
const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  estimated_time: z.number().min(0, 'Time must be a positive number').optional(),
  order_number: z.number().min(1, 'Order is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface TaskEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task?: TemplateTask;
  moduleId: string;
  onTaskSaved: () => void;
}

export function TaskEditDialog({ isOpen, onClose, task, moduleId, onTaskSaved }: TaskEditDialogProps) {
  const isEditing = !!task;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      estimated_time: task?.estimated_time || 0,
      order_number: task?.order_number || 1,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditing && task) {
        // Update existing task
        const { error } = await supabase
          .from('template_tasks')
          .update({
            title: values.title,
            description: values.description || null,
            estimated_time: values.estimated_time || null,
            order_number: values.order_number,
            updated_at: new Date().toISOString(),
          })
          .eq('id', task.id);

        if (error) throw error;
        toast({ description: 'Task updated successfully!' });
      } else {
        // Create new task
        const { error } = await supabase
          .from('template_tasks')
          .insert({
            module_id: moduleId,
            title: values.title,
            description: values.description || null,
            estimated_time: values.estimated_time || null,
            order_number: values.order_number,
          });

        if (error) throw error;
        toast({ description: 'Task added successfully!' });
      }
      
      // Reset form and close dialog
      form.reset();
      onTaskSaved();
      onClose();
    } catch (error: any) {
      console.error('Error saving task:', error);
      toast({ 
        variant: 'destructive',
        description: `Failed to save task: ${error.message}` 
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Task description" 
                      {...field} 
                      value={field.value || ''} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimated_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Time (minutes)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      value={field.value || 0} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      value={field.value} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">{isEditing ? 'Update' : 'Add'} Task</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TaskEditDialog;
