
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden pt-3 pb-2 border-t border-gray-200 mt-2">
      <div className="flex flex-col space-y-2">
        <Link 
          to="/dashboard" 
          className={`text-sm px-4 py-2 block ${
            isActive('/dashboard') ? 'text-[#8404fc] font-medium' : 'text-gray-700 hover:text-[#8404fc]'
          }`}
          onClick={onClose}
        >
          Dashboard
        </Link>
        
        <Link 
          to="/planner" 
          className={`text-sm px-4 py-2 block ${
            isActive('/planner') ? 'text-[#8404fc] font-medium' : 'text-gray-700 hover:text-[#8404fc]'
          }`}
          onClick={onClose}
        >
          Planner
        </Link>
        
        <Link 
          to="/deep-focus" 
          className={`text-sm px-4 py-2 block ${
            isActive('/deep-focus') ? 'text-[#8404fc] font-medium' : 'text-gray-700 hover:text-[#8404fc]'
          }`}
          onClick={onClose}
        >
          Deep Focus
        </Link>
        
        <div className="pl-4">
          <p className="text-xs font-medium text-gray-500 mb-1">Features</p>
          <Link 
            to="/all-systems" 
            className={`text-sm px-4 py-2 block ${
              isActive('/all-systems') ? 'text-[#8404fc] font-medium' : 'text-gray-700 hover:text-[#8404fc]'
            }`}
            onClick={onClose}
          >
            Study Systems
          </Link>
          <Link 
            to="/productivity-techniques" 
            className={`text-sm px-4 py-2 block ${
              isActive('/productivity-techniques') ? 'text-[#8404fc] font-medium' : 'text-gray-700 hover:text-[#8404fc]'
            }`}
            onClick={onClose}
          >
            Productivity Methods
          </Link>
          <Link 
            to="/notes" 
            className={`text-sm px-4 py-2 block ${
              isActive('/notes') ? 'text-[#8404fc] font-medium' : 'text-gray-700 hover:text-[#8404fc]'
            }`}
            onClick={onClose}
          >
            Notes
          </Link>
        </div>
        
        <Link 
          to="/about" 
          className={`text-sm px-4 py-2 block ${
            isActive('/about') ? 'text-[#8404fc] font-medium' : 'text-gray-700 hover:text-[#8404fc]'
          }`}
          onClick={onClose}
        >
          About Us
        </Link>
        
        {!user && (
          <Link 
            to="/auth" 
            className={`text-sm px-4 py-2 block text-[#8404fc] font-medium`}
            onClick={onClose}
          >
            Sign In / Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
