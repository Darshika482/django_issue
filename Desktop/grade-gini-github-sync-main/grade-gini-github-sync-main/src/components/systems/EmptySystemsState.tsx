
import React from 'react';
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptySystemsStateProps {
  handleCreateSystem: () => void;
  setActiveTab: (tab: string) => void;
}

const EmptySystemsState: React.FC<EmptySystemsStateProps> = ({ 
  handleCreateSystem, 
  setActiveTab 
}) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <svg 
          className="h-8 w-8 text-gray-500"
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No learning systems yet</h3>
      <p className="text-gray-500 max-w-md mx-auto mb-6">
        Create your first learning system to organize your educational journey. 
        You can start from scratch or use one of our templates.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          onClick={handleCreateSystem} 
          className="bg-[#8404fc] hover:bg-[#6400c0] text-white"
        >
          <Plus size={16} className="mr-1" />
          Create New System
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setActiveTab("templates")}
        >
          Browse Templates
        </Button>
      </div>
    </div>
  );
};

export default EmptySystemsState;
