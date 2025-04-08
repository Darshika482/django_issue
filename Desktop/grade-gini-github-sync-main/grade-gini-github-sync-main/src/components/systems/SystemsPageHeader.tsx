
import React from 'react';
import { Plus, ArrowLeft, ArrowRight, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface SystemsPageHeaderProps {
  handleCreateSystem: () => void;
}

const SystemsPageHeader: React.FC<SystemsPageHeaderProps> = ({ handleCreateSystem }) => {
  const navigate = useNavigate();
  
  return (
    <header className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold">
          All Learning Systems
        </h1>
      </div>
      <p className="text-sm text-gray-600">
        Browse templates and create your own learning systems.
      </p>
      
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/planner')}
          className="flex items-center gap-1 text-[#8404fc] border-[#8404fc]/20 hover:bg-[#8404fc]/10"
        >
          <CalendarPlus className="h-4 w-4" />
          <span>Go to Planner</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
        
        <Button onClick={handleCreateSystem} className="bg-[#8404fc] hover:bg-[#6400c0] text-white">
          <Plus size={16} className="mr-1" />
          Create New System
        </Button>
      </div>
    </header>
  );
};

export default SystemsPageHeader;
