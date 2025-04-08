
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Book, ChevronRight, Plus } from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Template } from '@/types';
import TemplateCard from '@/components/systems/TemplateCard';

const AllTemplates: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .order('title');
        
        if (error) throw error;
        
        // Map the data to match our Template type
        const formattedTemplates: Template[] = data.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          estimatedDuration: item.estimated_duration,
          difficulty: item.difficulty,
          category: item.category,
          created_at: item.created_at,
          updated_at: item.updated_at
        }));
        
        setTemplates(formattedTemplates);
      } catch (error: any) {
        console.error('Error fetching templates:', error);
        toast({
          variant: 'destructive',
          description: 'Failed to load templates'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTemplates();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <Book className="mr-2 h-8 w-8 text-[#8404fc]" />
                Learning System Templates
              </h1>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600 max-w-3xl">
                Browse our collection of ready-to-use learning system templates. Each template provides a structured framework that you can customize to fit your specific needs.
              </p>
              <Button 
                className="bg-[#8404fc] hover:bg-[#7000db] text-white" 
                onClick={() => {
                  // Add logic to create a new template
                  console.log('Create new template');
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </div>
          </header>

          {loading ? (
            <div className="text-center py-8">Loading templates...</div>
          ) : templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onViewTemplate={() => navigate(`/template/${template.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No templates found.</p>
              <Button 
                className="bg-[#8404fc] hover:bg-[#7000db] text-white" 
                onClick={() => {
                  // Add logic to create a new template
                  console.log('Create new template');
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </div>
          )}

          <div className="mt-12">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader>
                <CardTitle>NCERT Curriculum</CardTitle>
                <CardDescription>
                  Access the complete NCERT curriculum for Classes 1-12
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/ncert-classes')}
                >
                  View NCERT Classes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllTemplates;
