
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight } from 'lucide-react';
import { SystemModule, Task } from '@/types';
import { useTaskContext } from '@/store/TaskContext';

interface UpcomingTasksProps {
  modules: SystemModule[];
  onViewAllTasks: () => void;
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ modules, onViewAllTasks }) => {
  const { tasks } = useTaskContext();
  
  // Get system IDs from the modules
  const systemIds = modules?.map(module => module.id) || [];
  
  // Filter tasks by system IDs
  const systemTasks = tasks.filter(task => 
    task.systemId && systemIds.includes(task.systemId)
  );
  
  // Get only incomplete tasks and sort by date
  const upcomingTasks = systemTasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {upcomingTasks.map(task => (
            <div key={task.id} className="p-4 flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1.5">
                <div className={`w-3 h-3 rounded-full ${
                  task.priority === 'high' 
                    ? 'bg-red-500' 
                    : task.priority === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                }`} />
              </div>
              <div className="flex-grow">
                <p className="font-medium">{task.title}</p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(task.date).toLocaleDateString()}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
            </div>
          ))}
          
          {upcomingTasks.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">
              No upcoming tasks
            </div>
          )}
        </div>
        
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full text-sm text-[#8404fc] border-[#8404fc]/20 hover:bg-[#8404fc]/10 hover:text-[#6400c0] flex items-center justify-center" 
            size="sm" 
            onClick={onViewAllTasks}
          >
            <span>View All Tasks</span>
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
