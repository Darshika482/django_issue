
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ModuleEditDialog from './ModuleEditDialog';
import { TemplateModule, TemplateTask } from '@/types';

interface TemplateModulesProps {
  templateId?: string;
  isEditable?: boolean;
}

const TemplateModules = ({ templateId, isEditable = false }: TemplateModulesProps) => {
  const [modules, setModules] = useState<TemplateModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<TemplateModule | undefined>(undefined);
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null);

  const fetchModules = async () => {
    if (!templateId) return;
    
    try {
      setLoading(true);
      
      // Fetch modules
      const { data: modulesData, error: modulesError } = await supabase
        .from('template_modules')
        .select('*')
        .eq('template_id', templateId)
        .order('order_number');
      
      if (modulesError) throw modulesError;
      
      // Fetch tasks for each module
      const modulesWithTasks = await Promise.all(
        modulesData.map(async (module) => {
          const { data: tasksData, error: tasksError } = await supabase
            .from('template_tasks')
            .select('*')
            .eq('module_id', module.id)
            .order('order_number');
          
          if (tasksError) throw tasksError;
          
          return {
            ...module,
            tasks: tasksData || []
          } as TemplateModule;
        })
      );
      
      setModules(modulesWithTasks);
    } catch (error: any) {
      console.error('Error fetching modules:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to load modules'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [templateId]);

  const handleAddModule = () => {
    setSelectedModule(undefined);
    setIsEditDialogOpen(true);
  };

  const handleEditModule = (module: TemplateModule) => {
    setSelectedModule(module);
    setIsEditDialogOpen(true);
  };

  const handleDeleteModule = async () => {
    if (!moduleToDelete) return;
    
    try {
      const { error } = await supabase
        .from('template_modules')
        .delete()
        .eq('id', moduleToDelete);
      
      if (error) throw error;
      
      // Update local state
      setModules(modules.filter(m => m.id !== moduleToDelete));
      toast({ description: 'Module deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting module:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to delete module'
      });
    } finally {
      setModuleToDelete(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading modules...</div>;
  }

  // If there are no modules or we're in editable mode with an empty state
  if (modules.length === 0) {
    return (
      <div className="p-8 text-center border rounded-lg bg-gray-50">
        <p className="mb-4 text-gray-500">No modules found for this template.</p>
        {isEditable && (
          <Button onClick={handleAddModule}>
            <Plus className="mr-2 h-4 w-4" />
            Add First Module
          </Button>
        )}
        
        {/* Edit Module Dialog */}
        {isEditable && templateId && (
          <ModuleEditDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            module={selectedModule}
            templateId={templateId}
            onModuleSaved={fetchModules}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-700">
          This template includes the following modules that you can customize:
        </p>
        {isEditable && (
          <Button onClick={handleAddModule} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Module
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div 
            key={module.id}
            className="relative border rounded-lg hover:border-purple-500 transition-colors overflow-hidden"
          >
            {isEditable && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-white" 
                  onClick={() => handleEditModule(module)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full bg-white text-red-500 hover:text-red-700 hover:bg-red-50" 
                  onClick={() => setModuleToDelete(module.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          
            <div className="border-l-4 border-purple-500 h-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{module.title}</h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    {module.tasks.length} tasks
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{module.description}</p>
                
                {/* Task list section */}
                {module.tasks.length > 0 && (
                  <div className="bg-gray-50 rounded-md p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                      <span className="text-xs font-medium">Tasks</span>
                    </div>
                    {module.tasks.slice(0, 4).map((task) => (
                      <div key={task.id} className="mb-2 last:mb-0">
                        <p className="text-xs font-medium">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-gray-600">{task.description}</p>
                        )}
                      </div>
                    ))}
                    {module.tasks.length > 4 && (
                      <div className="text-xs text-center text-gray-500 mt-1">
                        +{module.tasks.length - 4} more tasks
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-sm text-gray-600">Order: {module.order_number}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Edit Module Dialog */}
      {isEditable && templateId && (
        <ModuleEditDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          module={selectedModule}
          templateId={templateId}
          onModuleSaved={fetchModules}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!moduleToDelete} onOpenChange={() => setModuleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Module</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this module? This action cannot be undone 
              and will also delete all tasks associated with this module.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteModule} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TemplateModules;
