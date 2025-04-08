
import React from 'react';
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningSystem } from '@/types';
import EmptySystemsState from '@/components/systems/EmptySystemsState';
import SystemsGrid from '@/components/systems/SystemsGrid';
import TemplatesGrid from '@/components/systems/TemplatesGrid';

interface SystemTabsContainerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  systems: LearningSystem[];
  isLoading: boolean;
  templates: any[];
  handleCreateSystem: () => void;
  onSystemClick: (systemId: string | number) => void;
  onDeleteSystem: (systemId: string | number) => void;
  onViewTemplate: (templateId: string | number) => void;
}

const SystemTabsContainer: React.FC<SystemTabsContainerProps> = ({
  activeTab,
  setActiveTab,
  systems,
  isLoading,
  templates,
  handleCreateSystem,
  onSystemClick,
  onDeleteSystem,
  onViewTemplate
}) => {
  return (
    <Tabs defaultValue="my-systems" value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="my-systems">My Systems</TabsTrigger>
        <TabsTrigger value="templates">Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="my-systems" className="mt-6">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        ) : systems.length > 0 ? (
          <SystemsGrid 
            systems={systems} 
            onSystemClick={onSystemClick}
            onDeleteSystem={onDeleteSystem}
          />
        ) : (
          <EmptySystemsState 
            handleCreateSystem={handleCreateSystem}
            setActiveTab={setActiveTab}
          />
        )}
      </TabsContent>

      <TabsContent value="templates" className="mt-6">
        <TemplatesGrid 
          templates={templates}
          onViewTemplate={onViewTemplate}
        />
      </TabsContent>
    </Tabs>
  );
};

export default SystemTabsContainer;
