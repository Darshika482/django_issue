
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LearningSystem } from '@/types';

interface SystemProgressCardProps {
  system: LearningSystem;
  completedModules: number;
  totalModules: number;
}

const SystemProgressCard: React.FC<SystemProgressCardProps> = ({ 
  system, 
  completedModules, 
  totalModules 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Progress Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="spacing-y-lg">
          <div>
            <div className="flex-between text-sm mb-1">
              <span className="text-gray-600">Overall Completion</span>
              <span className="font-medium">{system.progress}%</span>
            </div>
            <Progress value={system.progress} className="h-2" />
          </div>
          
          <div>
            <div className="flex-between text-sm mb-1">
              <span className="text-gray-600">Tasks Completed</span>
              <span className="font-medium">{system.completedTasks} / {system.totalTasks}</span>
            </div>
            <Progress 
              value={(system.completedTasks || 0) / (system.totalTasks || 1) * 100} 
              className="h-2" 
            />
          </div>
          
          <div>
            <div className="flex-between text-sm mb-1">
              <span className="text-gray-600">Time Spent</span>
              <span className="font-medium">{system.timeSpent} / {system.estimatedTime} hours</span>
            </div>
            <Progress 
              value={(system.timeSpent || 0) / (system.estimatedTime || 1) * 100} 
              className="h-2" 
            />
          </div>
          
          <div>
            <div className="flex-between text-sm mb-1">
              <span className="text-gray-600">Modules Completed</span>
              <span className="font-medium">{completedModules} / {totalModules}</span>
            </div>
            <Progress 
              value={(completedModules || 0) / (totalModules || 1) * 100} 
              className="h-2" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemProgressCard;
