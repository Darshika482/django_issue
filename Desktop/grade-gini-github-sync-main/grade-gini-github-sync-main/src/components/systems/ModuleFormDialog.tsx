
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { SystemModule } from '@/types';

interface ModuleFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  moduleToEdit: SystemModule | null;
  onSubmit: (moduleData: Omit<SystemModule, 'id' | 'tasks'>) => Promise<void>;
}

const ModuleFormDialog: React.FC<ModuleFormDialogProps> = ({
  isOpen,
  onClose,
  moduleToEdit,
  onSubmit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
    
    try {
      await onSubmit({
        title,
        description,
        isCompleted: moduleToEdit?.isCompleted || false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{moduleToEdit ? 'Edit Module' : 'Add New Module'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input 
              name="title"
              type="text"
              required
              defaultValue={moduleToEdit?.title || ''}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              name="description"
              rows={4}
              defaultValue={moduleToEdit?.description || ''}
              className="w-full px-3 py-2 border rounded-md"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {moduleToEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  {moduleToEdit ? 'Update' : 'Create'} Module
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModuleFormDialog;
