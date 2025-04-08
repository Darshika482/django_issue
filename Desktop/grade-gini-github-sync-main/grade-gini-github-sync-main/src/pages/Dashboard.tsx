
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LearningSystem, SystemModule, Task } from '@/types';
import { fetchUserSystems, deleteSystem } from '@/api/systemsApi';
import { toast } from 'sonner';
import { useTaskContext } from '@/store/task';
import SystemDeleteDialog from '@/components/systems/SystemDeleteDialog';
import TaskSelectionDialog from '@/components/systems/TaskSelectionDialog';

// Import dashboard components
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import TabContent from '@/components/dashboard/TabContent';

const Dashboard = () => {
  const navigate = useNavigate();
  const [systems, setSystems] = useState<LearningSystem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [systemToDelete, setSystemToDelete] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTaskSelectionOpen, setIsTaskSelectionOpen] = useState(false);
  const [selectedSystemModules, setSelectedSystemModules] = useState<SystemModule[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  const { importTasksFromTemplate, refreshTasks } = useTaskContext();
  
  const loadSystems = async () => {
    try {
      setIsLoading(true);
      setLoadError(null);
      const userSystems = await fetchUserSystems();
      setSystems(userSystems);
    } catch (error) {
      console.error("Error loading learning systems:", error);
      setLoadError(error instanceof Error ? error : new Error("Failed to load systems"));
      toast.error("Failed to load your learning systems");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSystems();
  }, []);
  
  const handleSystemClick = (systemId: string | number) => {
    navigate(`/system/${systemId}`);
  };

  const handleEditSystem = (systemId: string | number) => {
    navigate(`/edit-system/${systemId}`);
  };

  const handleDeleteSystem = async () => {
    if (!systemToDelete) return;
    
    try {
      setIsDeleting(true);
      await deleteSystem(systemToDelete);
      setSystems(systems.filter(system => system.id !== systemToDelete));
      toast.success("Learning system deleted successfully");
    } catch (error) {
      console.error("Error deleting system:", error);
      toast.error("Failed to delete learning system");
    } finally {
      setIsDeleting(false);
      setSystemToDelete(null);
    }
  };
  
  const handleOpenTaskSelection = (systemModules: SystemModule[]) => {
    setSelectedSystemModules(systemModules);
    setIsTaskSelectionOpen(true);
  };
  
  const handleAddSelectedToPlanner = (tasks: Task[]) => {
    if (tasks.length > 0) {
      const systemId = tasks[0].systemId ? parseInt(tasks[0].systemId) : 0;
      const systemName = tasks[0].systemName || "Learning System";
      
      importTasksFromTemplate(systemId, systemName, tasks);
      
      toast.success(`Added ${tasks.length} tasks to planner`);
      navigate('/planner');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshTasks();
    await loadSystems();
    setIsRefreshing(false);
    toast.success("Data refreshed successfully");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <WelcomeSection />

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="px-6">Overview</TabsTrigger>
            <TabsTrigger value="library" className="px-6">Library</TabsTrigger>
            <TabsTrigger value="analytics" className="px-6">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <TabContent 
              activeTab={activeTab}
              loadError={loadError}
              isRefreshing={isRefreshing}
              handleRefresh={handleRefresh}
              systems={systems}
              isLoading={isLoading}
              onOpenTaskSelection={handleOpenTaskSelection}
            />
          </TabsContent>
        </Tabs>
        
        <SystemDeleteDialog
          isOpen={systemToDelete !== null}
          isDeleting={isDeleting}
          onClose={() => setSystemToDelete(null)}
          onConfirm={handleDeleteSystem}
        />
        
        <TaskSelectionDialog
          isOpen={isTaskSelectionOpen}
          onClose={() => setIsTaskSelectionOpen(false)}
          modules={selectedSystemModules}
          onAddSelectedToPlanner={handleAddSelectedToPlanner}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
