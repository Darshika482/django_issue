
import React from 'react';
import { Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SystemFilterProps {
  systems: string[];
  currentSystem: string | 'all';
  onSystemChange: (system: string | 'all') => void;
}

const SystemFilter: React.FC<SystemFilterProps> = ({
  systems,
  currentSystem,
  onSystemChange,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900">System Filter</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Filter className="h-4 w-4 mr-1" />
              {currentSystem === 'all' 
                ? 'All Systems' 
                : currentSystem?.length > 15 
                  ? `${currentSystem.substring(0, 15)}...` 
                  : currentSystem}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => onSystemChange('all')}
                className="flex justify-between"
              >
                <span>All Systems</span>
                {currentSystem === 'all' && <Check className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              {systems.map((system) => (
                <DropdownMenuItem
                  key={system}
                  onClick={() => onSystemChange(system)}
                  className="flex justify-between"
                >
                  <span className="truncate">{system}</span>
                  {currentSystem === system && <Check className="h-4 w-4 ml-2 flex-shrink-0" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SystemFilter;
