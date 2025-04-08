
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NCERTClassesCard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="luxury-card hover-lift cursor-pointer overflow-hidden" onClick={() => navigate('/ncert-classes')}>
      <div className="h-1 bg-gradient-to-r from-[#8404fc] to-[#4a008e]"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">NCERT Class 1-12</CardTitle>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 hover:text-black">
            Education
          </span>
        </div>
        <CardDescription className="text-gray-600 text-xs">
          Complete curriculum for NCERT syllabus covering all grades 1-12
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="text-[#8404fc] h-4 w-4" />
            <span className="text-xs text-gray-600">All subjects included</span>
          </div>
          <div className="flex justify-between items-center pt-1">
            <div className="text-xs text-gray-600">Various difficulty levels</div>
            <Button variant="outline" size="sm" className="text-xs hover:text-black" onClick={e => {
              e.stopPropagation();
              navigate('/ncert-classes');
            }}>
              <Eye size={14} className="mr-1" />
              View Classes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NCERTClassesCard;
