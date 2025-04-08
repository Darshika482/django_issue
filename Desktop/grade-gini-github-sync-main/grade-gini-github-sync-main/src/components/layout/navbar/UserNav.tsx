
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Avatar, 
  AvatarFallback 
} from "@/components/ui/avatar";
import { User } from '@supabase/supabase-js';
import { BookOpen, UserCircle, Settings, LogOut } from 'lucide-react';

interface UserNavProps {
  user: User;
  onSignOut: () => void;
}

const UserNav: React.FC<UserNavProps> = ({ user, onSignOut }) => {
  const username = user.user_metadata?.username || user.email?.split('@')[0] || 'User';
  const initials = username.substring(0, 2).toUpperCase();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-9 w-9 border-2 border-mastery-purple/30">
          <AvatarFallback className="bg-mastery-purple/10 text-mastery-purple font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{username}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/dashboard">
          <DropdownMenuItem className="cursor-pointer">
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/all-systems">
          <DropdownMenuItem className="cursor-pointer">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>My Systems</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/planner">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
