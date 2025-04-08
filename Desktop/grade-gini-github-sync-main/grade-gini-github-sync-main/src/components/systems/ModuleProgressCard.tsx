
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SystemModule } from '@/types';

interface ModuleProgressCardProps {
  modules: SystemModule[];
}

const ModuleProgressCard: React.FC<ModuleProgressCardProps> = ({ modules }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Module Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {modules?.map((module) => {
            const completedTasks = module.tasks.filter(t => t.completed).length;
            const totalTasks = module.tasks.length;
            const moduleProgress = (completedTasks / totalTasks) * 100;
            
            return (
              <div key={module.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{module.title}</span>
                  <span className="font-medium">{Math.round(moduleProgress)}%</span>
                </div>
                <Progress value={moduleProgress} className="h-2" />
                <div className="text-xs text-gray-500">
                  {completedTasks} of {totalTasks} tasks completed
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleProgressCard;
