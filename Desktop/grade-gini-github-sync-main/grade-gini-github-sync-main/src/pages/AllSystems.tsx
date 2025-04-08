import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { LearningSystem, Task } from '@/types';
import { templates } from '@/data/templateData';
import { fetchUserSystems, deleteSystem } from '@/api/systemsApi';
import { toast } from 'sonner';
import TaskSelectionDialog from '@/components/systems/TaskSelectionDialog';
import { useTaskContext } from '@/store/task';
import SystemsPageHeader from '@/components/systems/SystemsPageHeader';
import SystemDeleteDialog from '@/components/systems/SystemDeleteDialog';
import SystemTabsContainer from '@/components/systems/SystemTabsContainer';

const AllSystems = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("my-systems");
  const [systems, setSystems] = useState<LearningSystem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [systemToDelete, setSystemToDelete] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTaskSelectionOpen, setIsTaskSelectionOpen] = useState(false);
  const [selectedSystemModules, setSelectedSystemModules] = useState<any[]>([]);
  
  const { importTasksFromTemplate } = useTaskContext();
  
  useEffect(() => {
    const loadSystems = async () => {
      try {
        setIsLoading(true);
        const userSystems = await fetchUserSystems();
        setSystems(userSystems);
      } catch (error) {
        console.error("Error loading systems:", error);
        toast.error("Failed to load your learning systems");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSystems();
  }, []);
  
  const handleCreateSystem = () => {
    navigate('/create-system');
  };
  
  const handleSystemClick = (systemId: string | number) => {
    navigate(`/system/${systemId}`);
  };
  
  const handleViewTemplate = (templateId: string | number) => {
    navigate(`/template/${templateId}`);
  };
  
  const handleUseTemplate = (templateId: string | number) => {
    if (templateId === "111") {
      navigate('/ncert-classes');
    } else {
      navigate(`/ai-syllabus-creator?template=${templateId}`);
    }
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
    }
  };
  
  const handleOpenTaskSelection = (systemModules: any[]) => {
    setSelectedSystemModules(systemModules);
    setIsTaskSelectionOpen(true);
  };
  
  const handleAddSelectedToPlanner = (tasks: Task[]) => {
    if (tasks.length > 0) {
      const systemId = parseInt(tasks[0].systemId || "0");
      const systemName = tasks[0].systemName || "Learning System";
      
      importTasksFromTemplate(systemId, systemName, tasks);
      
      toast.success(`Added ${tasks.length} tasks to planner`);
      navigate('/planner');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <SystemsPageHeader handleCreateSystem={handleCreateSystem} />
          
          <SystemTabsContainer
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            systems={systems}
            isLoading={isLoading}
            templates={templates}
            handleCreateSystem={handleCreateSystem}
            onSystemClick={handleSystemClick}
            onDeleteSystem={setSystemToDelete}
            onViewTemplate={handleViewTemplate}
          />
        </div>
      </main>

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
  );
};

export default AllSystems;
