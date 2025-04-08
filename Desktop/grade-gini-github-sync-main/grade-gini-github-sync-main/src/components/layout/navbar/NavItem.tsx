
import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`relative text-sm font-medium px-1 py-2 transition-colors ${
        isActive 
          ? 'text-[#8404fc]' 
          : 'text-gray-700 hover:text-[#8404fc]'
      }`}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8404fc] rounded-full" />
      )}
    </Link>
  );
};

export default NavItem;
