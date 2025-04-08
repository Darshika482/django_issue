
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Template } from '@/types';
import { Edit, Plus } from 'lucide-react';

interface TemplateOverviewCardProps {
  template: Template;
  onEditTemplate: () => void;
  onUseTemplate: () => void;
}

const TemplateOverviewCard: React.FC<TemplateOverviewCardProps> = ({ 
  template, 
  onEditTemplate,
  onUseTemplate
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Template Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="spacing-y-md">
          <div className="flex justify-between gap-4 items-center">
            <div>
              <h3 className="font-medium text-gray-700">Category</h3>
              <p>{template.category}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Difficulty</h3>
              <p>{template.difficulty}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Duration</h3>
              <p>{template.estimatedDuration}</p>
            </div>
          </div>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onUseTemplate}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Use Template
            </Button>
            <Button 
              variant="outline" 
              onClick={onEditTemplate}
              className="w-full sm:w-auto hover:text-black"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Template
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateOverviewCard;
