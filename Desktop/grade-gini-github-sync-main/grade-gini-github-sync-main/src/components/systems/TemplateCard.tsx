
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Template } from '@/types';
import { Eye, BookOpen } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onViewTemplate: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onViewTemplate }) => {
  // Sample task data for each template
  const sampleTasks = [
    {
      title: "Introduction to topic",
      description: "Overview of key concepts"
    },
    {
      title: "Practice exercises",
      description: "Apply what you've learned"
    }
  ];

  return (
    <Card className="card-simple hover:border-primary transition-colors duration-200">
      <div className="h-1 bg-primary"></div>
      <CardHeader className="pb-2">
        <div className="flex-between">
          <CardTitle className="text-lg">{template.title}</CardTitle>
          <span className="status-badge bg-blue-100 text-blue-700">
            {template.category}
          </span>
        </div>
        <CardDescription className="text-gray-600 text-xs">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="spacing-y-sm">
          <div className="flex-between text-xs mb-3">
            <span className="text-gray-600">Difficulty</span>
            <span className="font-medium">{template.difficulty}</span>
          </div>
          
          {/* Sample tasks */}
          <div className="bg-gray-50 rounded-md p-3 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">Sample Tasks</span>
            </div>
            {sampleTasks.map((task, index) => (
              <div key={index} className="mb-2 last:mb-0">
                <p className="text-xs font-medium">{task.title}</p>
                <p className="text-xs text-gray-600">{task.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex-between items-center pt-1">
            <div className="text-xs text-gray-600">Duration: {template.estimatedDuration}</div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                onViewTemplate();
              }}
            >
              <Eye size={14} className="mr-1" />
              View Template
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
