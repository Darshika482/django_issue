
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import NavItem from './navbar/NavItem';
import NavDropdown from './navbar/NavDropdown';

const DesktopNav: React.FC = () => {
  const location = useLocation();
  
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

  const moreFeaturesItems = [
    { to: '/all-systems', label: 'Study Systems' },
    { to: '/productivity-techniques', label: 'Productivity Methods' },
    { to: '/notes', label: 'Notes' },
  ];

  return (
    <div className="hidden md:flex items-center justify-between flex-1">
      {/* Navigation Links - improved spacing */}
      <div className="flex items-center space-x-12 ml-10">
        <NavItem 
          to="/dashboard" 
          label="Dashboard" 
          isActive={isActive('/dashboard')} 
        />

        <NavItem 
          to="/planner" 
          label="System Planner" 
          isActive={isActive('/planner')} 
        />

        <NavDropdown 
          label="More Features" 
          isActive={isMoreFeaturesActive()} 
          items={moreFeaturesItems} 
        />

        <NavItem 
          to="/about" 
          label="About Us" 
          isActive={isActive('/about')} 
        />
      </div>

      {/* Auth Button */}
      <div className="flex items-center">
        <Button 
          size="sm" 
          className="bg-[#8404fc] hover:bg-[#6400c0] text-white rounded-full px-6 text-sm shadow-md"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default DesktopNav;
