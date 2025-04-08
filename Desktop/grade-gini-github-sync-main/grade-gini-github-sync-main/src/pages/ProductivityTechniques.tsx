
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ShuffleIcon, TimerIcon, Calendar, TargetIcon, CheckSquare, List, ClipboardList, Clock, BookmarkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

interface Technique {
  id: string;
  name: string;
  description: string;
  color: string;
  hoverColor: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonAction: string;
}

const ProductivityTechniques: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [techniques, setTechniques] = useState<Technique[]>([
    {
      id: "pomodoro",
      name: "Pomodoro Technique",
      description: "Work in focused sprints, rest, repeat.",
      color: "bg-rose-50 text-rose-600",
      hoverColor: "hover:bg-rose-100 hover:border-rose-200",
      icon: <TimerIcon className="h-12 w-12 text-rose-500" />,
      buttonText: "Start Timer",
      buttonAction: "timer"
    },
    {
      id: "timeblocking",
      name: "Time Blocking",
      description: "Schedule specific tasks for specific hours.",
      color: "bg-sky-50 text-sky-600",
      hoverColor: "hover:bg-sky-100 hover:border-sky-200",
      icon: <Calendar className="h-12 w-12 text-sky-500" />,
      buttonText: "Create Schedule",
      buttonAction: "schedule"
    },
    {
      id: "eisenhower",
      name: "Eisenhower Matrix",
      description: "Organize tasks by urgency and importance.",
      color: "bg-indigo-50 text-indigo-600",
      hoverColor: "hover:bg-indigo-100 hover:border-indigo-200",
      icon: <div className="grid grid-cols-2 gap-1">
              <div className="bg-red-400 rounded p-1"></div>
              <div className="bg-amber-400 rounded p-1"></div>
              <div className="bg-sky-400 rounded p-1"></div>
              <div className="bg-emerald-400 rounded p-1"></div>
            </div>,
      buttonText: "Create Matrix",
      buttonAction: "matrix"
    },
    {
      id: "pareto",
      name: "Pareto Principle (80/20 Rule)",
      description: "Focus on the vital few, not the trivial many.",
      color: "bg-amber-50 text-amber-600", 
      hoverColor: "hover:bg-amber-100 hover:border-amber-200",
      icon: <div className="flex items-end h-12 w-12">
              <div className="bg-amber-500 w-3/4 h-4/5 rounded"></div>
              <div className="bg-amber-300 w-1/4 h-1/5 rounded"></div>
            </div>,
      buttonText: "Identify Priorities",
      buttonAction: "priorities"
    },
    {
      id: "smart",
      name: "SMART Goals",
      description: "Specific, Measurable, Achievable, Relevant, Time-bound.",
      color: "bg-emerald-50 text-emerald-600",
      hoverColor: "hover:bg-emerald-100 hover:border-emerald-200",
      icon: <TargetIcon className="h-12 w-12 text-emerald-500" />,
      buttonText: "Set Goal",
      buttonAction: "goals"
    },
    {
      id: "gtd",
      name: "GTD (Getting Things Done)",
      description: "Capture, clarify, organize, review, engage.",
      color: "bg-purple-50 text-purple-600",
      hoverColor: "hover:bg-purple-100 hover:border-purple-200",
      icon: <CheckSquare className="h-12 w-12 text-purple-500" />,
      buttonText: "Create Workflow",
      buttonAction: "workflow"
    },
    {
      id: "ivylee",
      name: "Ivy Lee Method",
      description: "Six tasks, prioritized, focused execution.",
      color: "bg-fuchsia-50 text-fuchsia-600",
      hoverColor: "hover:bg-fuchsia-100 hover:border-fuchsia-200",
      icon: <List className="h-12 w-12 text-fuchsia-500" />,
      buttonText: "Plan Six Tasks",
      buttonAction: "six-tasks"
    },
    {
      id: "kanban",
      name: "Kanban Boards",
      description: "Visualize workflow with cards in columns.",
      color: "bg-teal-50 text-teal-600",
      hoverColor: "hover:bg-teal-100 hover:border-teal-200",
      icon: <div className="grid grid-cols-3 gap-1 h-12 w-12">
              <div className="bg-teal-200 rounded-md flex flex-col gap-1 p-1">
                <div className="bg-teal-300 rounded-sm h-1"></div>
                <div className="bg-teal-300 rounded-sm h-1"></div>
              </div>
              <div className="bg-teal-300 rounded-md flex flex-col gap-1 p-1">
                <div className="bg-teal-400 rounded-sm h-1"></div>
              </div>
              <div className="bg-teal-400 rounded-md flex flex-col gap-1 p-1">
                <div className="bg-teal-500 rounded-sm h-1"></div>
              </div>
            </div>,
      buttonText: "Build Board",
      buttonAction: "kanban"
    },
    {
      id: "frog",
      name: "Eat the Frog",
      description: "Tackle your most difficult task first.",
      color: "bg-lime-50 text-lime-600",
      hoverColor: "hover:bg-lime-100 hover:border-lime-200",
      icon: <div className="relative h-12 w-12">
              <div className="absolute inset-0 bg-lime-500 rounded-full"></div>
              <div className="absolute inset-x-2 top-3 bg-lime-300 rounded-full h-2"></div>
              <div className="absolute inset-x-4 top-7 bg-lime-300 rounded-full h-1"></div>
            </div>,
      buttonText: "Identify Frog",
      buttonAction: "frog"
    },
    {
      id: "abcde",
      name: "ABCDE Method",
      description: "Prioritize tasks by importance with letters.",
      color: "bg-orange-50 text-orange-600",
      hoverColor: "hover:bg-orange-100 hover:border-orange-200",
      icon: <div className="flex flex-col h-12 w-12 justify-around items-center">
              <span className="font-bold text-orange-700">A</span>
              <span className="font-medium text-orange-600">B</span>
              <span className="text-sm text-orange-500">C</span>
              <span className="text-xs text-orange-400">D</span>
              <span className="text-xs text-orange-300">E</span>
            </div>,
      buttonText: "Rank Tasks",
      buttonAction: "abcde"
    }
  ]);

  const filteredTechniques = techniques.filter(technique => 
    technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    technique.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const shuffleTechniques = () => {
    const shuffled = [...techniques].sort(() => Math.random() - 0.5);
    setTechniques(shuffled);
  };

  const handleLearnMore = (techniqueId: string) => {
    navigate(`/productivity-technique/${techniqueId}`);
  };

  const handleButtonAction = (techniqueId: string, action: string) => {
    if (techniqueId === "pomodoro" && action === "timer") {
      // Navigate to the DeepFocus page which has the Pomodoro timer
      navigate('/deep-focus');
    } else {
      // Handle other button actions
      navigate(`/productivity-technique/${techniqueId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-gray-100">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <header className="mb-8 text-center max-w-3xl mx-auto">
            <div className="inline-block mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 text-sm font-medium">
              Productivity Methods
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              Productivity Powerhouse: 10 Proven Methods
            </h1>
            <p className="text-gray-600 text-lg">
              Transform Your Productivity, One Method at a Time
            </p>
          </header>

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 max-w-6xl mx-auto">
            <div className="relative w-full md:w-auto mb-4 md:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                type="text" 
                placeholder="Search techniques..." 
                className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-primary focus:ring-primary w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline"
              size="sm"
              onClick={shuffleTechniques}
              className="rounded-full flex items-center gap-1 border-primary/20 hover:bg-primary/5 hover:border-primary/30"
            >
              <ShuffleIcon className="h-4 w-4" />
              <span>Surprise Me!</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredTechniques.map((technique) => (
              <Card 
                key={technique.id} 
                className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${technique.hoverColor} border border-gray-100`}
              >
                <div className={`h-2 ${technique.color.split(" ")[0]}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-gray-800">{technique.name}</CardTitle>
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-gray-100">
                      <BookmarkIcon className="h-4 w-4 text-gray-400" />
                    </Button>
                  </div>
                  <CardDescription className="text-gray-600">
                    {technique.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex justify-center">
                    <div className={`${technique.color.split(" ")[0]} p-3 rounded-xl shadow-sm`}>
                      {technique.icon}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => handleLearnMore(technique.id)}
                    >
                      <span className="text-sm">Learn more</span>
                    </Button>
                    <Button 
                      className={`${technique.color.split(" ")[0]} ${technique.color.split(" ")[1]} hover:opacity-90 hover:text-white shadow-sm`}
                      onClick={() => handleButtonAction(technique.id, technique.buttonAction)}
                    >
                      {technique.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-3 text-center text-gray-800">Need Help Choosing?</h2>
            <p className="text-gray-600 text-center mb-4">
              Not sure which productivity technique fits your work style? Take our quick quiz to find out!
            </p>
            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-[#8404fc] to-[#7000db] hover:from-[#7000db] hover:to-[#6400c0] text-white rounded-full px-6 shadow-md">
                Take the Quiz
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductivityTechniques;
