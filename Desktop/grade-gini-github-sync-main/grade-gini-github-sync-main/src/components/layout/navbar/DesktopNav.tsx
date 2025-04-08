
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';
import { useAuth } from '@/context/AuthContext';

const DesktopNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isMoreFeaturesActive = () => {
    return isActive('/all-systems') || 
           isActive('/ncert-classes') || 
           location.pathname.includes('/system/') || 
           isActive('/ai-syllabus-creator') ||
           isActive('/productivity-techniques') || 
           isActive('/notes');
  };

  const isDeepFocusActive = () => {
    return isActive('/deep-focus') || isActive('/pomodoro-technique');
  };

  const moreFeaturesItems = [
    { to: '/all-systems', label: 'Study Systems' },
    { to: '/productivity-techniques', label: 'Productivity Methods' },
    { to: '/notes', label: 'Notes' },
  ];

  const focusItems = [
    { to: '/deep-focus', label: 'Deep Focus' },
    { to: '/pomodoro-technique', label: 'Pomodoro Timer' },
  ];

  return (
    <div className="hidden md:flex items-center justify-center flex-1">
      {/* Navigation Links - centered */}
      <div className="flex items-center space-x-12">
        <NavItem 
          to="/dashboard" 
          label="Dashboard" 
          isActive={isActive('/dashboard')} 
        />

        <NavItem 
          to="/planner" 
          label="Planner" 
          isActive={isActive('/planner')} 
        />
        
        <NavDropdown 
          label="Focus Tools" 
          isActive={isDeepFocusActive()} 
          items={focusItems} 
        />

        <NavDropdown 
          label="Features" 
          isActive={isMoreFeaturesActive()} 
          items={moreFeaturesItems} 
        />

        <NavItem 
          to="/about" 
          label="About Us" 
          isActive={isActive('/about')} 
        />
      </div>

      {/* Auth Button removed for logged in users */}
      {!user && (
        <div className="absolute right-4">
          <Button 
            size="sm" 
            className="bg-[#8404fc] hover:bg-[#6400c0] text-white rounded-full px-6 py-2.5 text-sm font-medium shadow-md transition-all"
          >
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesktopNav;
