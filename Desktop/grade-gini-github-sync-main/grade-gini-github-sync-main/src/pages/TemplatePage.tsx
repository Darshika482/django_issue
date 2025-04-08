
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Template } from '@/types';
import { ArrowLeft, Edit, Plus } from 'lucide-react';
import TemplateOverviewCard from '@/components/templates/TemplateOverviewCard';
import TemplateDescription from '@/components/templates/TemplateDescription';
import TemplateModules from '@/components/templates/TemplateModules';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const TemplatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const fetchTemplate = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('templates')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        // Map the data to match our Template type
        const formattedTemplate: Template = {
          id: data.id,
          title: data.title,
          description: data.description,
          estimatedDuration: data.estimated_duration,
          difficulty: data.difficulty,
          category: data.category,
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        
        setTemplate(formattedTemplate);
      } catch (error: any) {
        console.error('Error fetching template:', error);
        toast({
          variant: 'destructive',
          description: 'Failed to load template details'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTemplate();
  }, [id]);

  const handleUseTemplate = () => {
    // Logic to create a new system based on this template
    console.log('Using template:', template?.id);
    navigate('/all-systems');
  };

  const handleEditTemplate = () => {
    // Logic to edit template
    setIsEditing(!isEditing);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold">
                Loading...
              </h1>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold">
                Template not found
              </h1>
            </div>
            <Button onClick={() => navigate('/all-templates')}>
              Back to Templates
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">
              {template.title}
            </h1>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Template Overview Card */}
            <TemplateOverviewCard 
              template={template}
              onEditTemplate={handleEditTemplate}
              onUseTemplate={handleUseTemplate}
            />
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <TemplateDescription description={template.description || ''} />
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-lg mb-3">Who This Is For</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-[#8404fc]/20 text-[#8404fc] rounded-full p-1 mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="text-gray-700">Pre-med students preparing for MCAT</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[#8404fc]/20 text-[#8404fc] rounded-full p-1 mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="text-gray-700">Medical school applicants</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[#8404fc]/20 text-[#8404fc] rounded-full p-1 mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </span>
                      <span className="text-gray-700">Science graduates transitioning to medicine</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="modules" className="mt-6">
              <TemplateModules templateId={id} isEditable={isEditing} />
            </TabsContent>
            
            <TabsContent value="progress" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-lg mb-4">Progress Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall Completion</span>
                        <span className="text-sm font-medium">0%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#8404fc] h-2.5 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Modules Started</span>
                        <span className="text-sm font-medium">0/7</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Tasks Completed</span>
                        <span className="text-sm font-medium">0/52</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold text-lg mb-4">Estimated Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Total Duration</span>
                      <span className="text-sm font-medium">{template.estimatedDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Study Hours</span>
                      <span className="text-sm font-medium">~320 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Recommended Pace</span>
                      <span className="text-sm font-medium">20 hours/week</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default TemplatePage;
