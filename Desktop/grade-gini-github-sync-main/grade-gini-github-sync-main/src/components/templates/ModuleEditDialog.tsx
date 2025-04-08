
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
import { TemplateModule } from '@/types';

// Form schema
const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  order_number: z.number().min(1, 'Order is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface ModuleEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  module?: TemplateModule;
  templateId: string;
  onModuleSaved: () => void;
}

export function ModuleEditDialog({ isOpen, onClose, module, templateId, onModuleSaved }: ModuleEditDialogProps) {
  const isEditing = !!module;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: module?.title || '',
      description: module?.description || '',
      order_number: module?.order_number || 1,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditing && module) {
        // Update existing module
        const { error } = await supabase
          .from('template_modules')
          .update({
            title: values.title,
            description: values.description || null,
            order_number: values.order_number,
            updated_at: new Date().toISOString(),
          })
          .eq('id', module.id);

        if (error) throw error;
        toast({ description: 'Module updated successfully!' });
      } else {
        // Create new module
        const { error } = await supabase
          .from('template_modules')
          .insert({
            template_id: templateId,
            title: values.title,
            description: values.description || null,
            order_number: values.order_number,
          });

        if (error) throw error;
        toast({ description: 'Module added successfully!' });
      }
      
      // Reset form and close dialog
      form.reset();
      onModuleSaved();
      onClose();
    } catch (error: any) {
      console.error('Error saving module:', error);
      toast({ 
        variant: 'destructive',
        description: `Failed to save module: ${error.message}` 
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Module' : 'Add New Module'}</DialogTitle>
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
                    <Input placeholder="Module title" {...field} />
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
                      placeholder="Module description" 
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
              <Button type="submit">{isEditing ? 'Update' : 'Add'} Module</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ModuleEditDialog;
