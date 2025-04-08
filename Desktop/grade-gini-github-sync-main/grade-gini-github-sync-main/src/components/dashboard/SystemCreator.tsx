
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const SystemCreator: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/create-system');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Create New Learning System</CardTitle>
          <CardDescription>
            Design a custom learning system to achieve your goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Create a personalized learning system with modules and tasks. You can use AI to automatically generate content based on your learning objectives.
            </p>
            
            <div className="flex justify-end">
              <Button 
                className="bg-mastery-purple hover:bg-mastery-deepIndigo text-white"
                onClick={handleContinue}
              >
                Create Learning System
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemCreator;
