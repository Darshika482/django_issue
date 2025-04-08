
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Edit, Info, MoreVertical, Trash, ExternalLink } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { LearningSystem, SystemModule } from '@/types';
import { fetchSystemModules } from '@/api/modulesApi';
import { toast } from 'sonner';

interface SystemCardProps {
  system: LearningSystem;
  onClick: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onOpenTaskSelection?: (modules: SystemModule[]) => void;
}

const SystemCard: React.FC<SystemCardProps> = ({ 
  system, 
  onClick, 
  onDelete, 
  onEdit,
  onOpenTaskSelection
}) => {
  const handleAddToPlanner = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent clicking through to the system details
    
    if (!onOpenTaskSelection) return;
    
    try {
      // Fetch modules for the system - convert system.id to number if it's a string
      const systemId = typeof system.id === 'string' ? parseInt(system.id, 10) : system.id;
      const modules = await fetchSystemModules(systemId);
      
      if (modules.length === 0) {
        toast.error("This system has no modules or tasks to add to the planner");
        return;
      }
      
      onOpenTaskSelection(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Failed to load modules for task selection");
    }
  };
  
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{system.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              )}
              
              {onOpenTaskSelection && (
                <DropdownMenuItem onClick={handleAddToPlanner}>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Add to Planner
                </DropdownMenuItem>
              )}
              
              {onDelete && (
                <DropdownMenuItem 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2">
          {system.description || "No description provided."}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{system.progress || 0}%</span>
        </div>
        <Progress value={system.progress || 0} />
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenTaskSelection) {
              handleAddToPlanner(e);
            }
          }}
        >
          <CalendarPlus className="h-3.5 w-3.5 mr-1" />
          Add to Planner
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <ExternalLink className="h-3.5 w-3.5 mr-1" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SystemCard;
