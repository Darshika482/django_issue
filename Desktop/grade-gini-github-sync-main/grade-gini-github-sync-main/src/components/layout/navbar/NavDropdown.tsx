
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

interface DropdownItemProps {
  to: string;
  label: string;
}

interface NavDropdownProps {
  label: string;
  isActive: boolean;
  items: DropdownItemProps[];
  onItemClick?: () => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, isActive, items, onItemClick }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={`text-sm px-4 py-2 transition-colors ${
              isActive
                ? 'text-[#8404fc] font-medium' 
                : 'text-gray-700 hover:text-[#8404fc]'
            }`}
          >
            {label}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white rounded-lg shadow-lg p-2 min-w-[220px]">
            <ul className="grid gap-1">
              {items.map((item) => (
                <li key={item.to}>
                  <NavigationMenuLink asChild>
                    <Link 
                      to={item.to} 
                      className="block p-2 rounded-md hover:bg-gray-100 hover:text-[#8404fc] transition-colors"
                      onClick={onItemClick}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavDropdown;
