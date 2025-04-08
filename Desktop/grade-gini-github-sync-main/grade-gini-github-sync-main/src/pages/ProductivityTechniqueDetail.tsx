
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, List, CheckCircle, Info, ExternalLink, BookOpen, Star, Timer, PieChart, BarChart3, ListTodo, Layers, BrainCircuit, Zap } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

interface TechniqueStep {
  title: string;
  description: string;
}

interface Technique {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  color: string;
  textColor: string;
  hoverColor: string;
  icon: React.ReactNode;
  steps: TechniqueStep[];
  benefits: string[];
  tips: string[];
  history: string;
  resources: { title: string; url: string }[];
  creator?: string;
  yearCreated?: string;
}

const ProductivityTechniqueDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [technique, setTechnique] = useState<Technique | null>(null);
  const [loading, setLoading] = useState(true);

  const iconComponents = {
    "pomodoro": <Clock className="h-12 w-12" />,
    "timeblocking": <Timer className="h-12 w-12" />,
    "eisenhower": <PieChart className="h-12 w-12" />,
    "kanban": <Layers className="h-12 w-12" />,
    "gtd": <ListTodo className="h-12 w-12" />,
    "deepwork": <BrainCircuit className="h-12 w-12" />
  };

  useEffect(() => {
    const techniques: Record<string, Technique> = {
      "pomodoro": {
        id: "pomodoro",
        name: "Pomodoro Technique",
        description: "Work in focused sprints, rest, repeat.",
        longDescription: "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a 'pomodoro', from the Italian word for tomato, after the tomato-shaped kitchen timer that Cirillo used as a university student.",
        color: "bg-rose-100",
        textColor: "text-rose-600",
        hoverColor: "hover:bg-rose-200",
        icon: <Clock className="h-12 w-12 text-rose-600" />,
        steps: [
          { title: "Choose a Task", description: "Decide on the task that needs to be completed." },
          { title: "Set the Timer", description: "Set your timer for 25 minutes (one Pomodoro)." },
          { title: "Work on the Task", description: "Focus solely on the task until the timer rings. If a distraction pops into your head, write it down and continue focusing on your task." },
          { title: "Take a Short Break", description: "When the timer rings, put a checkmark on a paper and take a short break (5 minutes)." },
          { title: "Repeat", description: "Repeat steps 1-4 until you complete four pomodoros." },
          { title: "Take a Longer Break", description: "After four pomodoros, take a longer break (15-30 minutes), then start the cycle again." }
        ],
        benefits: [
          "Enhances focus and concentration",
          "Increases awareness of decisions",
          "Reduces mental fatigue",
          "Increases productivity and creativity",
          "Strengthens determination to achieve goals"
        ],
        tips: [
          "Use a dedicated timer rather than your phone to avoid distractions",
          "The official Pomodoro Technique uses 25-minute intervals, but you can adjust this to suit your workflow",
          "Use the first few minutes of each Pomodoro to review what you've done and plan what you'll do next",
          "Track your Pomodoros to better understand your productivity patterns"
        ],
        history: "The technique was developed by Francesco Cirillo in the late 1980s when he was a university student. Struggling with procrastination and distractions, he challenged himself to commit to just 10 minutes of focused study time. He found a tomato-shaped kitchen timer (pomodoro in Italian), and the technique was born.",
        resources: [
          { title: "Official Pomodoro Technique Website", url: "https://francescocirillo.com/pages/pomodoro-technique" },
          { title: "Pomofocus Timer", url: "https://pomofocus.io/" },
          { title: "Pomodoro Technique: The Ultimate Guide", url: "https://todoist.com/productivity-methods/pomodoro-technique" }
        ],
        creator: "Francesco Cirillo",
        yearCreated: "1980s"
      },
      "timeblocking": {
        id: "timeblocking",
        name: "Time Blocking",
        description: "Schedule specific tasks for specific hours.",
        longDescription: "Time blocking is a time management method that divides your day into blocks of time. Each block is dedicated to accomplishing a specific task or group of tasks. Instead of keeping an open-ended to-do list, you start each day with a concrete schedule that lays out what you'll work on and when.",
        color: "bg-sky-100",
        textColor: "text-sky-600",
        hoverColor: "hover:bg-sky-200",
        icon: <Timer className="h-12 w-12 text-sky-600" />,
        steps: [
          { title: "Plan Your Day", description: "At the beginning of each day (or the night before), identify the tasks you need to complete." },
          { title: "Estimate Time Requirements", description: "For each task, estimate how much time you'll need to complete it." },
          { title: "Allocate Time Blocks", description: "Assign each task to a specific time block in your calendar." },
          { title: "Include Buffer Time", description: "Add buffer time between blocks to account for overruns or unexpected tasks." },
          { title: "Follow the Schedule", description: "During each time block, focus exclusively on the assigned task." },
          { title: "Adjust as Needed", description: "If a task takes more or less time than expected, adjust your schedule accordingly." }
        ],
        benefits: [
          "Reduces decision fatigue by planning ahead",
          "Increases accountability for how time is spent",
          "Minimizes multitasking and improves focus",
          "Creates a realistic picture of what can be accomplished in a day",
          "Helps identify and eliminate time-wasting activities"
        ],
        tips: [
          "Time block for both work and personal activities",
          "Schedule your most important or difficult tasks during your peak energy hours",
          "Don't forget to schedule breaks",
          "Review your time blocks at the end of each day to improve future estimates",
          "Use color-coding in your calendar for different types of activities"
        ],
        history: "Time blocking has been used by many productive people throughout history. Benjamin Franklin planned his days in hourly increments, and Cal Newport, author of 'Deep Work,' is a modern proponent who has helped popularize the method for knowledge workers.",
        resources: [
          { title: "Cal Newport on Time Blocking", url: "https://www.calnewport.com/blog/2013/12/21/deep-habits-the-importance-of-planning-every-minute-of-your-work-day/" },
          { title: "Time Blocking Guide", url: "https://todoist.com/productivity-methods/time-blocking" },
          { title: "Google Calendar", url: "https://calendar.google.com/" }
        ],
        creator: "Various",
        yearCreated: "N/A"
      },
      "eisenhower": {
        id: "eisenhower",
        name: "Eisenhower Matrix",
        description: "Organize tasks by urgency and importance.",
        longDescription: "The Eisenhower Matrix, also known as the Urgent-Important Matrix, is a decision-making framework that helps prioritize tasks by sorting them into four categories based on their urgency and importance. Named after President Dwight D. Eisenhower, who said, 'I have two kinds of problems, the urgent and the important. The urgent are not important, and the important are never urgent.'",
        color: "bg-indigo-100",
        textColor: "text-indigo-600",
        hoverColor: "hover:bg-indigo-200",
        icon: <PieChart className="h-12 w-12 text-indigo-600" />,
        steps: [
          { title: "Create Your Matrix", description: "Draw a square divided into four quadrants." },
          { title: "Label the Quadrants", description: "Label them: Q1: Urgent & Important (Do First), Q2: Not Urgent & Important (Schedule), Q3: Urgent & Not Important (Delegate), Q4: Not Urgent & Not Important (Eliminate)." },
          { title: "List Your Tasks", description: "Write down all the tasks you need to complete." },
          { title: "Categorize Each Task", description: "Place each task in the appropriate quadrant based on its urgency and importance." },
          { title: "Prioritize Accordingly", description: "Focus on Quadrant 1 tasks first, schedule time for Quadrant 2 tasks, delegate Quadrant 3 tasks if possible, and minimize or eliminate Quadrant 4 tasks." }
        ],
        benefits: [
          "Provides a clear framework for decision-making",
          "Helps identify tasks that can be eliminated",
          "Reduces time spent on urgent but unimportant activities",
          "Allows you to focus on important tasks that contribute to long-term goals",
          "Decreases stress by organizing and prioritizing work"
        ],
        tips: [
          "Review your matrix regularly to re-evaluate task priorities",
          "Be honest about what's truly important versus what feels urgent",
          "Schedule time for quadrant 2 (important but not urgent) tasks to prevent them from becoming urgent",
          "Use tools like task managers or project management software to help visualize your matrix"
        ],
        history: "The concept is attributed to President Dwight D. Eisenhower, who was known for his exceptional ability to sustain productivity over long periods. Stephen Covey later popularized it in his influential book 'The 7 Habits of Highly Effective People.'",
        resources: [
          { title: "The Eisenhower Method", url: "https://www.eisenhower.me/" },
          { title: "Eisenhower Matrix Guide", url: "https://todoist.com/productivity-methods/eisenhower-matrix" },
          { title: "Priority Matrix App", url: "https://www.prioritymatrix.com/" }
        ],
        creator: "Dwight D. Eisenhower",
        yearCreated: "1950s"
      },
      "kanban": {
        id: "kanban",
        name: "Kanban",
        description: "Visualize workflow with cards in columns.",
        longDescription: "Kanban is a visual system for managing work as it moves through a process. It visualizes both the process (the workflow) and the actual work passing through that process. The goal of Kanban is to identify potential bottlenecks in your process and fix them so work can flow through it cost-effectively at an optimal speed or throughput.",
        color: "bg-teal-100",
        textColor: "text-teal-600",
        hoverColor: "hover:bg-teal-200",
        icon: <Layers className="h-12 w-12 text-teal-600" />,
        steps: [
          { title: "Visualize Your Workflow", description: "Create columns representing the stages of your workflow (e.g., To Do, In Progress, Done)." },
          { title: "Create Cards", description: "Write each task on a card and place it in the appropriate column." },
          { title: "Limit Work in Progress", description: "Set a maximum number of tasks allowed in each column to prevent overloading." },
          { title: "Manage Flow", description: "Move cards from left to right as work progresses." },
          { title: "Monitor and Improve", description: "Regularly review and optimize your workflow to improve efficiency." }
        ],
        benefits: [
          "Visualizes workflow and bottlenecks",
          "Reduces wasted time and resources",
          "Improves team collaboration and coordination",
          "Increases flexibility and adaptability",
          "Provides a clear picture of progress and productivity"
        ],
        tips: [
          "Start simple with just three columns: To Do, Doing, Done",
          "Use color-coding to indicate priority or type of task",
          "Consider using swim lanes to separate different types of work",
          "Hold regular stand-up meetings around your Kanban board",
          "Use digital Kanban tools for remote teams"
        ],
        history: "Kanban was developed by Taiichi Ohno at Toyota in the late 1940s as a scheduling system for lean manufacturing. The word 'kanban' is Japanese for 'visual signal' or 'card.' In the early 2000s, David J. Anderson formulated the Kanban Method for knowledge work, adapting the principles from manufacturing to software development and other industries.",
        resources: [
          { title: "Kanban Guide", url: "https://www.atlassian.com/agile/kanban" },
          { title: "Trello (Kanban Tool)", url: "https://trello.com/" },
          { title: "Kanban University", url: "https://kanban.university/" }
        ],
        creator: "Taiichi Ohno (Manufacturing), David J. Anderson (Knowledge Work)",
        yearCreated: "1940s (Manufacturing), 2000s (Knowledge Work)"
      },
      "gtd": {
        id: "gtd",
        name: "GTD Method",
        description: "Capture, clarify, organize, reflect, engage.",
        longDescription: "Getting Things Done (GTD) is a personal productivity system created by David Allen. The method is based on the idea of moving planned tasks out of the mind by recording them externally and then breaking them down into actionable work items. This allows for focusing attention on taking action on tasks, instead of recalling them.",
        color: "bg-purple-100",
        textColor: "text-purple-600",
        hoverColor: "hover:bg-purple-200",
        icon: <ListTodo className="h-12 w-12 text-purple-600" />,
        steps: [
          { title: "Capture", description: "Collect what has your attention (tasks, ideas, commitments) in trusted places." },
          { title: "Clarify", description: "Process what each item means and what to do about it." },
          { title: "Organize", description: "Put items where they belong (next actions, projects, waiting for, someday/maybe)." },
          { title: "Reflect", description: "Review and update your system regularly." },
          { title: "Engage", description: "Take action based on your system." }
        ],
        benefits: [
          "Reduces mental overload by externalizing all commitments",
          "Provides clear next actions for projects",
          "Improves decision-making by clarifying priorities",
          "Creates a trusted system for managing work",
          "Helps maintain focus on the current task"
        ],
        tips: [
          "Do a complete 'brain dump' when you first set up your system",
          "Process your inbox to empty regularly",
          "Follow the 2-minute rule: If a task takes less than 2 minutes, do it immediately",
          "Conduct weekly reviews to keep your system current",
          "Use digital or physical tools that work for your style"
        ],
        history: "GTD was created by David Allen and first described in his 2001 book 'Getting Things Done: The Art of Stress-Free Productivity.' It has since become one of the most popular productivity systems worldwide, with adaptations for digital tools and various work environments.",
        resources: [
          { title: "Official GTD Website", url: "https://gettingthingsdone.com/" },
          { title: "GTD Guide", url: "https://todoist.com/productivity-methods/getting-things-done" },
          { title: "GTD with Notion", url: "https://www.notion.so/templates/gtd-getting-things-done" }
        ],
        creator: "David Allen",
        yearCreated: "2001"
      },
      "deepwork": {
        id: "deepwork",
        name: "Deep Work",
        description: "Focus without distraction on cognitively demanding tasks.",
        longDescription: "Deep Work is a concept coined by Cal Newport, referring to the ability to focus without distraction on a cognitively demanding task. It's the process of performing professional activities in a state of distraction-free concentration that push your cognitive capabilities to their limit, creating new value and improving your skills.",
        color: "bg-fuchsia-100",
        textColor: "text-fuchsia-600",
        hoverColor: "hover:bg-fuchsia-200",
        icon: <BrainCircuit className="h-12 w-12 text-fuchsia-600" />,
        steps: [
          { title: "Schedule Deep Work", description: "Block out specific times in your calendar dedicated to deep work." },
          { title: "Create a Ritual", description: "Develop a routine that minimizes the friction to starting deep work sessions." },
          { title: "Eliminate Distractions", description: "Remove all potential interruptions during deep work sessions (silence notifications, find a quiet space)." },
          { title: "Train Your Concentration", description: "Gradually increase the duration of your deep work sessions to build mental stamina." },
          { title: "Take Restorative Breaks", description: "Intersperse deep work with periods of rest and recovery." }
        ],
        benefits: [
          "Produces higher quality work in less time",
          "Develops valuable skills that are hard to replicate",
          "Brings more meaning and satisfaction to your professional life",
          "Improves your ability to learn difficult concepts quickly",
          "Creates a competitive advantage in an increasingly distracted world"
        ],
        tips: [
          "Start with shorter deep work sessions (1 hour) and gradually build up",
          "Experiment with different environments to find where you work best",
          "Use a 'shutdown ritual' at the end of the workday to give your brain time to rest",
          "Track your deep work hours to build accountability",
          "Consider batching shallow work (emails, administrative tasks) into specific time blocks"
        ],
        history: "The concept was developed by Cal Newport, a computer science professor at Georgetown University, and introduced in his 2016 book 'Deep Work: Rules for Focused Success in a Distracted World.' The book became a Wall Street Journal bestseller and has influenced work habits across many industries.",
        resources: [
          { title: "Cal Newport's Blog", url: "https://www.calnewport.com/blog/" },
          { title: "Deep Work Book", url: "https://www.calnewport.com/books/deep-work/" },
          { title: "Deep Work Summary", url: "https://fs.blog/deep-work-cal-newport/" }
        ],
        creator: "Cal Newport",
        yearCreated: "2016"
      }
    };

    const foundTechnique = techniques[id || ''];
    
    setTimeout(() => {
      setTechnique(foundTechnique || null);
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="flex-1 pt-24 pb-12 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!technique) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <Info className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Technique Not Found</h1>
            <p className="text-gray-600 mb-6">The productivity technique you're looking for doesn't exist or hasn't been added yet.</p>
            <Button 
              onClick={() => navigate('/productivity-techniques')}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
            >
              Explore Other Techniques
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/productivity-techniques')}
            className="mb-6 flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Productivity Techniques
          </Button>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className={`${technique.color} p-4 rounded-2xl shadow-sm`}>
                  {technique.icon}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">{technique.name}</h1>
                  {technique.creator && (
                    <p className="text-gray-500">Created by {technique.creator} {technique.yearCreated && `(${technique.yearCreated})`}</p>
                  )}
                </div>
              </div>
              <Badge className={`${technique.color} ${technique.textColor}`}>
                Productivity Method
              </Badge>
            </div>
            
            <p className="text-gray-700 text-lg max-w-3xl leading-relaxed">
              {technique.longDescription}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="overflow-hidden border-0 shadow-md bg-white">
                <div className={`h-2 ${technique.color}`}></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <List className={`h-5 w-5 ${technique.textColor}`} />
                    How It Works
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {technique.steps.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <div className={`flex-shrink-0 rounded-full ${technique.color} ${technique.textColor} h-6 w-6 flex items-center justify-center text-sm font-medium`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{step.title}</h3>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-md bg-white">
                <div className={`h-2 ${technique.color}`}></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Star className={`h-5 w-5 ${technique.textColor}`} />
                    Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {technique.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className={`h-5 w-5 flex-shrink-0 ${technique.textColor}`} />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="overflow-hidden border-0 shadow-md bg-white">
                <div className={`h-2 ${technique.color}`}></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Info className={`h-5 w-5 ${technique.textColor}`} />
                    Tips for Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {technique.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`rounded-full ${technique.color} h-1.5 w-1.5 mt-2`} />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-md bg-white">
                <div className={`h-2 ${technique.color}`}></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen className={`h-5 w-5 ${technique.textColor}`} />
                    History & Background
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{technique.history}</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-md bg-white">
                <div className={`h-2 ${technique.color}`}></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <ExternalLink className={`h-5 w-5 ${technique.textColor}`} />
                    Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {technique.resources.map((resource, index) => (
                      <li key={index}>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`${technique.color} rounded-xl p-8 max-w-3xl mx-auto text-center shadow-md`}
          >
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Ready to Try {technique.name}?</h2>
            <p className={`${technique.textColor} mb-4`}>
              Add this method to your workflow with our integrated tools.
            </p>
            <Button className="bg-gradient-to-r from-[#8404fc] to-[#7000db] hover:from-[#7000db] hover:to-[#6400c0] text-white rounded-full px-6 shadow-md">
              Start Using {technique.name}
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ProductivityTechniqueDetail;
