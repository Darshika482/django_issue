import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LearningSystem, SystemModule } from '@/types';
import { Loader2, RefreshCw } from 'lucide-react';
import ActiveSystemsSection from './ActiveSystemsSection';
import OverviewSection from './OverviewSection';
import SystemCreator from './SystemCreator';
import TaskSelectionDialog from '@/components/systems/TaskSelectionDialog';

interface TabContentProps {
  activeTab: string;
  loadError: Error | null;
  isRefreshing: boolean;
  handleRefresh: () => void;
  systems: LearningSystem[];
  isLoading: boolean;
  onOpenTaskSelection: (modules: SystemModule[]) => void;
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  loadError,
  isRefreshing,
  handleRefresh,
  systems,
  isLoading,
  onOpenTaskSelection
}) => {
  const [isTaskSelectionOpen, setIsTaskSelectionOpen] = useState(false);
  const [selectedSystemModules, setSelectedSystemModules] = useState<SystemModule[]>([]);

  const handleOpenTaskSelection = (modules: SystemModule[]) => {
    setSelectedSystemModules(modules);
    setIsTaskSelectionOpen(true);
  };

  if (loadError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex flex-col items-center">
        <div className="text-red-500 font-medium mb-4">Failed to load your data</div>
        <p className="text-gray-600 mb-4 text-center">
          There was an error loading your learning systems. Please try refreshing the page or try again later.
        </p>
        <Button 
          variant="outline"
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          {isRefreshing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Refreshing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </>
          )}
        </Button>
      </div>
    );
  }

  if (activeTab === "overview") {
    return (
      <div className="space-y-10">
        <OverviewSection systems={systems} />
        
        <ActiveSystemsSection 
          systems={systems} 
          isLoading={isLoading} 
          onOpenTaskSelection={handleOpenTaskSelection}
        />
        
        <SystemCreator />

        <TaskSelectionDialog
          isOpen={isTaskSelectionOpen}
          onClose={() => setIsTaskSelectionOpen(false)}
          modules={selectedSystemModules}
          onAddSelectedToPlanner={(tasks) => {
            onOpenTaskSelection(selectedSystemModules);
            setIsTaskSelectionOpen(false);
          }}
        />
      </div>
    );
  }

  if (activeTab === "library") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Your Learning Library</h2>
        <p className="text-gray-500">Your saved courses, books, and learning resources will appear here.</p>
      </div>
    );
  }

  if (activeTab === "analytics") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Learning Analytics</h2>
        <p className="text-gray-500">Insights and progress tracking for your learning journey.</p>
      </div>
    );
  }

  return null;
};

export default TabContent;
