
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TemplateDescriptionProps {
  description: string;
}

const TemplateDescription: React.FC<TemplateDescriptionProps> = ({ description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Template Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          {description}
        </p>
        <div className="mt-4">
          <h4 className="font-medium mb-2">What's Included:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Comprehensive subject coverage for MCAT preparation</li>
            <li>Interview preparation modules with practice questions</li>
            <li>Structured timeline with weekly study goals</li>
            <li>Practice tests and question banks</li>
            <li>Application materials checklist and guidance</li>
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="font-medium mb-2">Benefits:</h4>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Save time with a pre-designed study structure</li>
            <li>Ensure comprehensive coverage of all required topics</li>
            <li>Track progress with built-in milestones</li>
            <li>Reduce stress with organized approach to preparation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateDescription;
