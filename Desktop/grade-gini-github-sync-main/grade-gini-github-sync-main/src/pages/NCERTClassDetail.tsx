import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Book, Check, Edit, Plus, Trash2 } from "lucide-react";
import Navbar from '@/components/layout/Navbar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { LearningSystem, SystemModule, Task } from '@/types';
import { useTaskContext } from '@/store/task';

interface ClassModule {
  id: string;
  title: string;
  description: string;
  tasks: ClassTask[];
  completedTasks: number;
}

interface ClassTask {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  selected?: boolean;
}

const NCERTClassDetail: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const { importTasksFromTemplate } = useTaskContext();
  
  const [classData, setClassData] = useState<LearningSystem | null>(null);
  const [modules, setModules] = useState<ClassModule[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTasks, setSelectedTasks] = useState<Record<string, boolean>>({});
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  
  useEffect(() => {
    if (classId) {
      const id = parseInt(classId);
      const classInfo = getClassData(id);
      
      if (classInfo) {
        setClassData(classInfo);
        const classModules = getClassModules(id);
        setModules(classModules);
      } else {
        navigate('/ncert-classes');
      }
    }
  }, [classId, navigate]);
  
  const getClassData = (id: number): LearningSystem | null => {
    const classesMap: Record<number, LearningSystem> = {
      206: {
        id: 206,
        title: "Class 6",
        description: "Middle school introduction with deeper subjects",
        progress: 65,
        deadline: "Dec 15, 2023",
        status: "Active",
        totalWeeks: 40,
        totalTasks: 48,
        completedTasks: 31,
        timeSpent: 120,
        estimatedTime: 200
      },
      207: {
        id: 207,
        title: "Class 7",
        description: "Building on middle school foundations",
        progress: 45,
        deadline: "Dec 20, 2023",
        status: "Active",
        totalWeeks: 42,
        totalTasks: 52,
        completedTasks: 23,
        timeSpent: 110,
        estimatedTime: 220
      },
      208: {
        id: 208,
        title: "Class 8",
        description: "Preparing for secondary education",
        progress: 35,
        deadline: "Jan 10, 2024",
        status: "Active",
        totalWeeks: 44,
        totalTasks: 56,
        completedTasks: 20,
        timeSpent: 95,
        estimatedTime: 240
      },
      209: {
        id: 209,
        title: "Class 9",
        description: "Secondary education with board exam preparation",
        progress: 25,
        deadline: "Jan 25, 2024",
        status: "Active",
        totalWeeks: 45,
        totalTasks: 60,
        completedTasks: 15,
        timeSpent: 80,
        estimatedTime: 260
      },
      210: {
        id: 210,
        title: "Class 10",
        description: "Board exam year with comprehensive curriculum",
        progress: 20,
        deadline: "Feb 5, 2024",
        status: "Active",
        totalWeeks: 46,
        totalTasks: 65,
        completedTasks: 13,
        timeSpent: 70,
        estimatedTime: 280
      },
      211: {
        id: 211,
        title: "Class 11",
        description: "Higher secondary specialization streams",
        progress: 15,
        deadline: "Feb 20, 2024",
        status: "Active",
        totalWeeks: 48,
        totalTasks: 70,
        completedTasks: 10,
        timeSpent: 65,
        estimatedTime: 300
      },
      212: {
        id: 212,
        title: "Class 12",
        description: "Final year with board and entrance exam focus",
        progress: 10,
        deadline: "Mar 5, 2024",
        status: "Active",
        totalWeeks: 50,
        totalTasks: 75,
        completedTasks: 8,
        timeSpent: 60,
        estimatedTime: 320
      }
    };
    
    return classesMap[id] || null;
  };
  
  const getClassModules = (classId: number): ClassModule[] => {
    const baseModules = [
      {
        id: `${classId}-1`,
        title: "Mathematics",
        description: "Covering all key math concepts for this grade level",
        tasks: [
          {
            id: `${classId}-1-1`,
            title: "Number Systems",
            description: "Learn about integers, rational numbers, and operations",
            date: "2023-10-15",
            isCompleted: true
          },
          {
            id: `${classId}-1-2`,
            title: "Algebra Basics",
            description: "Introduction to algebraic expressions and equations",
            date: "2023-10-22",
            isCompleted: false
          },
          {
            id: `${classId}-1-3`,
            title: "Geometry",
            description: "Study of lines, angles, and basic shapes",
            date: "2023-10-29",
            isCompleted: false
          }
        ],
        completedTasks: 1
      },
      {
        id: `${classId}-2`,
        title: "Science",
        description: "Exploring physical, chemical, and biological concepts",
        tasks: [
          {
            id: `${classId}-2-1`,
            title: "Physical Sciences",
            description: "Study of matter, energy, and forces",
            date: "2023-11-05",
            isCompleted: true
          },
          {
            id: `${classId}-2-2`,
            title: "Chemistry Fundamentals",
            description: "Basic chemical reactions and elements",
            date: "2023-11-12",
            isCompleted: false
          },
          {
            id: `${classId}-2-3`,
            title: "Life Sciences",
            description: "Introduction to living organisms and their processes",
            date: "2023-11-19",
            isCompleted: false
          }
        ],
        completedTasks: 1
      },
      {
        id: `${classId}-3`,
        title: "Social Studies",
        description: "Understanding history, geography, and civics",
        tasks: [
          {
            id: `${classId}-3-1`,
            title: "History",
            description: "Study of important historical events and civilizations",
            date: "2023-12-03",
            isCompleted: false
          },
          {
            id: `${classId}-3-2`,
            title: "Geography",
            description: "Learning about Earth's features and human geography",
            date: "2023-12-10",
            isCompleted: false
          },
          {
            id: `${classId}-3-3`,
            title: "Civics",
            description: "Understanding government systems and citizenship",
            date: "2023-12-17",
            isCompleted: false
          }
        ],
        completedTasks: 0
      }
    ];
    
    if (classId >= 209) {
      baseModules.push({
        id: `${classId}-4`,
        title: "Language and Literature",
        description: "Developing reading, writing, and literary analysis skills",
        tasks: [
          {
            id: `${classId}-4-1`,
            title: "Prose and Poetry",
            description: "Analysis of literary texts and poetic devices",
            date: "2023-12-24",
            isCompleted: false
          },
          {
            id: `${classId}-4-2`,
            title: "Grammar and Composition",
            description: "Developing writing skills and grammatical accuracy",
            date: "2023-12-31",
            isCompleted: false
          }
        ],
        completedTasks: 0
      });
    }
    
    if (classId >= 211) {
      baseModules.push({
        id: `${classId}-5`,
        title: "Physics",
        description: "Advanced physics concepts and problem-solving",
        tasks: [
          {
            id: `${classId}-5-1`,
            title: "Mechanics",
            description: "Study of motion, forces, and energy",
            date: "2024-01-07",
            isCompleted: false
          },
          {
            id: `${classId}-5-2`,
            title: "Electricity and Magnetism",
            description: "Understanding electrical circuits and magnetic fields",
            date: "2024-01-14",
            isCompleted: false
          }
        ],
        completedTasks: 0
      });
      
      baseModules.push({
        id: `${classId}-6`,
        title: "Chemistry",
        description: "Advanced chemical concepts and reactions",
        tasks: [
          {
            id: `${classId}-6-1`,
            title: "Organic Chemistry",
            description: "Study of carbon compounds and their reactions",
            date: "2024-01-21",
            isCompleted: false
          },
          {
            id: `${classId}-6-2`,
            title: "Physical Chemistry",
            description: "Thermodynamics, kinetics, and equilibrium",
            date: "2024-01-28",
            isCompleted: false
          }
        ],
        completedTasks: 0
      });
    }
    
    return baseModules;
  };
  
  const handleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };
  
  const getSelectedTasksCount = () => {
    return Object.values(selectedTasks).filter(Boolean).length;
  };
  
  const handleImportTasks = () => {
    if (getSelectedTasksCount() === 0) {
      toast.error("Please select at least one task to import");
      return;
    }
    
    const tasksToImport: Task[] = [];
    
    modules.forEach(module => {
      module.tasks.forEach(task => {
        if (selectedTasks[task.id]) {
          tasksToImport.push({
            id: task.id,
            title: task.title,
            description: task.description,
            date: task.date,
            completed: false,
            priority: "medium",
            category: "study",
            systemId: classId,
            systemName: classData?.title || ""
          });
        }
      });
    });
    
    if (classId && classData) {
      console.log("Importing tasks:", tasksToImport);
      importTasksFromTemplate(parseInt(classId), classData.title, tasksToImport);
      setImportDialogOpen(false);
      
      setSelectedTasks({});
      
      navigate('/planner');
    }
  };
  
  if (!classData) {
    return <div className="container mx-auto px-4 py-24">Loading...</div>;
  }
  
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
                onClick={() => navigate('/ncert-classes')}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <Book className="mr-2 h-8 w-8 text-[#8404fc]" />
                {classData.title}
              </h1>
            </div>
            <p className="text-gray-600 max-w-3xl">
              {classData.description}
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
            <Card className="md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>{classData.progress}%</span>
                  <span>100%</span>
                </div>
                <Progress value={classData.progress} className="h-3 bg-gray-100" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Deadline</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl font-bold">{classData.deadline}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Tasks</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl font-bold">{classData.completedTasks} / {classData.totalTasks}</p>
                <p className="text-sm text-gray-500">completed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Time Spent</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl font-bold">{classData.timeSpent} / {classData.estimatedTime}</p>
                <p className="text-sm text-gray-500">hours</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Modules</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-2xl font-bold">1 / {modules.length}</p>
                <p className="text-sm text-gray-500">completed</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-10">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full max-w-md bg-gray-100 p-1">
                <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Overview</TabsTrigger>
                <TabsTrigger value="modules" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Modules</TabsTrigger>
                <TabsTrigger value="progress" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">Progress</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>System Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-6 text-gray-700">{classData.description}</p>
                        
                        <h3 className="text-lg font-semibold mb-4">Learning Objectives:</h3>
                        <ul className="list-disc pl-6 space-y-3 text-gray-700">
                          <li>Master all {classData.title} subjects with comprehensive review</li>
                          <li>Develop problem-solving skills in mathematics and science</li>
                          <li>Build a strong foundation for higher classes</li>
                          <li>Complete all NCERT exercises and problems</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y">
                          {modules.flatMap(module => 
                            module.tasks.filter(task => !task.isCompleted).slice(0, 2)
                          ).slice(0, 3).map(task => (
                            <div key={task.id} className="p-4 flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <div className="w-3 h-3 rounded-full bg-amber-500" />
                              </div>
                              <div className="flex-grow">
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-xs text-gray-500">Due: {new Date(task.date).toLocaleDateString()}</p>
                              </div>
                              <Checkbox
                                checked={selectedTasks[task.id] || false}
                                onCheckedChange={() => handleTaskSelection(task.id)}
                                className="ml-2"
                              />
                            </div>
                          ))}

                          {modules.flatMap(module => 
                            module.tasks.filter(task => !task.isCompleted)
                          ).length === 0 && (
                            <div className="p-4 text-center text-gray-500">
                              No upcoming tasks
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="modules" className="mt-6 space-y-6">
                {modules.map((module, index) => (
                  <Card key={module.id} className="overflow-hidden">
                    <div className="flex items-center p-6 bg-gray-50 border-b">
                      <div className="w-9 h-9 rounded-full bg-[#8404fc] text-white flex items-center justify-center mr-4 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold">{module.title}</h3>
                          {module.completedTasks === module.tasks.length && (
                            <div className="ml-2 text-green-500">
                              <Check size={16} />
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{module.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-700">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-500">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-0">
                      <div className="divide-y border-b">
                        {module.tasks.map(task => (
                          <div key={task.id} className="flex items-start p-4">
                            <div className="flex-shrink-0 mt-1.5 mr-3">
                              <div className={`w-3 h-3 rounded-full ${task.isCompleted ? 'bg-green-500' : 'bg-amber-500'}`} />
                            </div>
                            <div className="flex-grow">
                              <h4 className={`font-medium ${task.isCompleted ? 'line-through text-gray-400' : ''}`}>{task.title}</h4>
                              <p className="text-sm text-gray-500">{task.description}</p>
                              <p className="text-xs text-gray-400 mt-1">Due: {new Date(task.date).toLocaleDateString()}</p>
                            </div>
                            <Checkbox
                              checked={selectedTasks[task.id] || false}
                              onCheckedChange={() => handleTaskSelection(task.id)}
                              className="ml-2"
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4">
                        <Button variant="ghost" className="text-sm text-[#8404fc] hover:text-[#6400c0] hover:bg-[#8404fc]/10">
                          <Plus size={16} className="mr-1" /> Add Task
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="progress" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Tracking</CardTitle>
                    <CardDescription>View your progress across all modules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {modules.map(module => (
                      <div key={module.id} className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{module.title}</h3>
                          <span className="text-sm">{module.completedTasks}/{module.tasks.length} tasks</span>
                        </div>
                        <Progress 
                          value={(module.completedTasks / module.tasks.length) * 100} 
                          className="h-3 bg-gray-100"
                          indicatorClassName="bg-[#8404fc]" 
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button 
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Edit System
              </Button>
              <Button 
                className="bg-[#8404fc] hover:bg-[#6400c0] text-white"
                onClick={() => setImportDialogOpen(true)}
                disabled={getSelectedTasksCount() === 0}
              >
                Import Selected Tasks ({getSelectedTasksCount()})
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Tasks from {classData.title}</DialogTitle>
            <DialogDescription>
              You are about to import {getSelectedTasksCount()} tasks to your planner. You can edit or delete them later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#8404fc] hover:bg-[#6400c0] text-white"
              onClick={handleImportTasks}
            >
              Import Tasks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NCERTClassDetail;
