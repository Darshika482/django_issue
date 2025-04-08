
import React from 'react';
import { ChevronRight } from "lucide-react";
import { LearningSystem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NCERTClassCardProps {
  classSystem: LearningSystem;
  onClick: (classSystem: LearningSystem) => void;
}

const NCERTClassCard: React.FC<NCERTClassCardProps> = ({ classSystem, onClick }) => {
  return (
    <Card 
      key={classSystem.id}
      className="luxury-card hover-lift cursor-pointer overflow-hidden"
      onClick={() => onClick(classSystem)}
    >
      <div className="h-1 bg-gradient-to-r from-[#8404fc] to-[#4a008e]"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{classSystem.title}</CardTitle>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
            NCERT
          </span>
        </div>
        <CardDescription className="text-gray-600 text-xs">
          {classSystem.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center pt-1">
          <div className="text-xs text-gray-600">All Subjects</div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-6 hover:bg-transparent"
            >
              <span className="text-xs">View Curriculum</span>
            </Button>
            <ChevronRight size={16} className="text-[#8404fc] ml-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NCERTClassCard;
