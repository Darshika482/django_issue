
import React, { useState } from 'react';
import { ArrowLeft, Book, FilePlus } from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { LearningSystem } from '@/types';
import { useTaskContext } from '@/store/TaskContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import NCERTClassCard from './NCERTClassCard';

const NCERTClassesContent: React.FC = () => {
  const navigate = useNavigate();
  const { importTasksFromTemplate } = useTaskContext();
  const [selectedClass, setSelectedClass] = useState<LearningSystem | null>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  // Only showing classes 6-12 - using string IDs for consistency
  const ncertClasses: LearningSystem[] = [
    {
      id: "206",
      title: "Class 6",
      description: "Middle school introduction with deeper subjects",
      progress: 0,
      deadline: "Ongoing",
      status: "Planned"
    },
    {
      id: "207",
      title: "Class 7",
      description: "Building on middle school foundations",
      progress: 0,
      deadline: "Ongoing",
      status: "Planned"
    },
    {
      id: "208",
      title: "Class 8",
      description: "Preparing for secondary education",
      progress: 0,
      deadline: "Ongoing",
      status: "Planned"
    },
    {
      id: "209",
      title: "Class 9",
      description: "Secondary education with board exam preparation",
      progress: 0,
      deadline: "Ongoing",
      status: "Planned"
    },
    {
      id: "210",
      title: "Class 10",
      description: "Board exam year with comprehensive curriculum",
      progress: 0,
      deadline: "Ongoing",
      status: "Planned"
    },
    {
      id: "211",
      title: "Class 11",
      description: "Higher secondary specialization streams",
      progress: 0,
      deadline: "Ongoing",
      status: "Planned"
    },
    {
      id: "212",
      title: "Class 12",
      description: "Final year with board and entrance exam focus",
      progress: 0,
      deadline: "Ongoing",
      status: "Planned"
    }
  ];

  const handleClassClick = (classSystem: LearningSystem) => {
    // Navigate to the detailed class page
    navigate(`/ncert-class/${classSystem.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/all-systems')}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <Book className="mr-2 h-8 w-8 text-[#8404fc]" />
                NCERT Class 6-12 Curriculum
              </h1>
            </div>
            <p className="text-gray-600 max-w-3xl">
              Comprehensive learning systems based on the National Council of Educational Research and Training (NCERT) curriculum covering all subjects from Class 6 to Class 12.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {ncertClasses.map((classSystem) => (
              <NCERTClassCard 
                key={classSystem.id}
                classSystem={classSystem}
                onClick={handleClassClick}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NCERTClassesContent;
