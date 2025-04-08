import React from 'react';
import { Calendar, Plus, Menu, ListFilter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewType } from '@/types';

interface HeaderProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  onCreateTask: () => void;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

// Simple header variant for pages that don't need the full planner functionality
export interface SimpleHeaderProps {
  title?: string;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  setCurrentView, 
  onCreateTask,
  toggleSidebar,
  isSidebarOpen
}) => {
  return (
    <header className="bg-white border-b p-4 sticky top-16 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          <h1 className="text-xl md:text-2xl font-bold">Planner</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Desktop View Controls - Always visible */}
          <div className="flex space-x-2">
            <Button 
              variant={currentView === 'month' ? "default" : "outline"} 
              size="sm"
              onClick={() => setCurrentView('month')}
              className="gap-1.5"
            >
              <Calendar className="h-4 w-4" />
              <span>Month</span>
            </Button>
            <Button 
              variant={currentView === 'list' ? "default" : "outline"} 
              size="sm"
              onClick={() => setCurrentView('list')}
              className="gap-1.5"
            >
              <ListFilter className="h-4 w-4" />
              <span>List</span>
            </Button>
          </div>
          
          <Button onClick={onCreateTask}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>
    </header>
  );
};

// Simple header component for other pages
export const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  title = "Planner",
  showAddButton = false,
  onAddClick = () => {}
}) => {
  return (
    <header className="bg-white border-b p-4 sticky top-16 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
        </div>
        
        {showAddButton && (
          <div className="flex items-center space-x-2">
            <Button onClick={onAddClick}>
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
