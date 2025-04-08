
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SystemDescriptionProps {
  description: string;
}

const SystemDescription: React.FC<SystemDescriptionProps> = ({ description }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">System Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default SystemDescription;
