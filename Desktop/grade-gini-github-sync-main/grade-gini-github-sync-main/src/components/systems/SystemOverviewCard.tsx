
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Calendar, AlertCircle, Edit, Plus } from 'lucide-react';
import { LearningSystem } from '@/types';

interface SystemOverviewCardProps {
  system: LearningSystem;
  completedModules: number;
  totalModules: number;
  onEditSystem: () => void;
  onAddModule: () => void;
}

const SystemOverviewCard: React.FC<SystemOverviewCardProps> = ({ 
  system, 
  completedModules, 
  totalModules,
  onEditSystem,
  onAddModule
}) => {
  return (
    <Card className="flex-1 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{system.title}</CardTitle>
            <CardDescription className="mt-1 text-gray-600">{system.description}</CardDescription>
          </div>
          <span className={`text-xs font-medium px-2.5 py-1.5 rounded-full ${
            system.status === 'Active' 
              ? 'bg-[#8404fc]/10 text-[#8404fc]' 
              : system.status === 'Paused'
                ? 'bg-amber-100 text-amber-700'
                : system.status === 'Completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
          }`}>
            {system.status}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 font-medium">Overall Progress</span>
              <span className="font-semibold">{system.progress}%</span>
            </div>
            <Progress value={system.progress} className="h-2.5 bg-gray-100" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-[#8404fc]" />
                <span className="text-xs text-gray-600 font-medium">Deadline</span>
              </div>
              <p className="text-sm font-semibold">
                {new Date(system.deadline).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-xs text-gray-600 font-medium">Tasks</span>
              </div>
              <p className="text-sm font-semibold">
                {system.completedTasks} / {system.totalTasks} completed
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-gray-600 font-medium">Time Spent</span>
              </div>
              <p className="text-sm font-semibold">
                {system.timeSpent} / {system.estimatedTime} hours
              </p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="text-xs text-gray-600 font-medium">Modules</span>
              </div>
              <p className="text-sm font-semibold">
                {completedModules} / {totalModules} completed
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onEditSystem}
              className="text-gray-700 border-gray-200 hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit System
            </Button>
            <Button 
              className="bg-[#8404fc] hover:bg-[#6400c0] text-white" 
              size="sm"
              onClick={onAddModule}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Module
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemOverviewCard;
