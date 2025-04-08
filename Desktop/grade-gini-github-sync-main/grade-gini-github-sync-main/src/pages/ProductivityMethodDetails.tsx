
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, List, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

interface MethodDetails {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  color: string;
  hoverColor: string;
  icon: React.ReactNode;
  steps: string[];
  benefits: string[];
  tips: string[];
  history: string;
  resources: { title: string; url: string }[];
}

const ProductivityMethodDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [method, setMethod] = useState<MethodDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the method data
    const methods: MethodDetails[] = [
      {
        id: 1,
        name: "Pomodoro Technique",
        description: "Work in focused sprints, rest, repeat.",
        longDescription: "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for tomato, after the tomato-shaped kitchen timer that Cirillo used as a university student.",
        color: "bg-red-50 text-red-600",
        hoverColor: "hover:bg-red-100",
        icon: <Clock className="h-12 w-12 text-red-500" />,
        steps: [
          "Choose a task you'd like to get done",
          "Set the timer for 25 minutes",
          "Work on the task until the timer rings",
          "Take a short 5-minute break",
          "After four pomodoros, take a longer break (15-30 minutes)"
        ],
        benefits: [
          "Enhances focus and concentration",
          "Reduces mental fatigue",
          "Increases accountability",
          "Improves planning and estimation skills",
          "Creates a better work-life balance"
        ],
        tips: [
          "Start with just one pomodoro to get comfortable with the technique",
          "Use a dedicated timer rather than your phone to avoid distractions",
          "If you finish a task before the pomodoro is complete, use the remaining time for review or improvement",
          "Track your pomodoros to understand your productivity patterns"
        ],
        history: "The technique was developed by Francesco Cirillo in the late 1980s when he was a university student. He named it after the tomato-shaped kitchen timer he used.",
        resources: [
          { title: "The Pomodoro Technique Official Website", url: "https://francescocirillo.com/pages/pomodoro-technique" },
          { title: "Pomodoro Timer Apps", url: "https://pomofocus.io/" }
        ]
      },
      {
        id: 2,
        name: "Time Blocking",
        description: "Schedule specific tasks for specific hours.",
        longDescription: "Time blocking is a time management method that divides your day into blocks of time. Each block is dedicated to accomplishing a specific task, or group of tasks, and only those specific tasks. Instead of keeping an open-ended to-do list of things you'll get to as you're able, you'll start each day with a concrete schedule that lays out what you'll work on and when.",
        color: "bg-blue-50 text-blue-600",
        hoverColor: "hover:bg-blue-100",
        icon: <Calendar className="h-12 w-12 text-blue-500" />,
        steps: [
          "Identify your high-priority tasks and goals",
          "Estimate how much time each task will take",
          "Schedule blocks of time in your calendar for each task",
          "Include buffer time between blocks for unexpected issues",
          "Review and adjust your time blocks as needed"
        ],
        benefits: [
          "Reduces decision fatigue by planning ahead",
          "Minimizes context switching between different types of tasks",
          "Creates a realistic picture of what you can accomplish in a day",
          "Helps you become more aware of how you spend your time",
          "Makes it easier to say no to non-priority tasks"
        ],
        tips: [
          "Don't schedule every minute—leave buffer time for unexpected tasks",
          "Group similar tasks together to minimize context switching",
          "Schedule your most important work during your peak energy hours",
          "Reflect on your time blocks at the end of each day or week to improve your estimates"
        ],
        history: "Time blocking has been used by many successful people throughout history, including Benjamin Franklin, who planned his days in hourly increments, and Elon Musk, who is known to schedule his day in five-minute blocks.",
        resources: [
          { title: "Cal Newport on Time Blocking", url: "https://www.calnewport.com/blog/2013/12/21/deep-habits-the-importance-of-planning-every-minute-of-your-work-day/" },
          { title: "Time Blocking Apps", url: "https://calendar.google.com/" }
        ]
      },
      {
        id: 3,
        name: "Eisenhower Matrix",
        description: "Organize tasks by urgency and importance.",
        longDescription: "The Eisenhower Matrix, also known as the Urgent-Important Matrix, is a decision-making framework that helps you prioritize tasks by sorting them into four categories based on their urgency and importance. The matrix was popularized by Stephen Covey in his book 'The 7 Habits of Highly Effective People,' but it's named after President Dwight D. Eisenhower, who said, 'I have two kinds of problems, the urgent and the important. The urgent are not important, and the important are never urgent.'",
        color: "bg-purple-50 text-purple-600",
        hoverColor: "hover:bg-purple-100",
        icon: <div className="grid grid-cols-2 gap-1">
                <div className="bg-red-400 rounded p-1"></div>
                <div className="bg-orange-400 rounded p-1"></div>
                <div className="bg-blue-400 rounded p-1"></div>
                <div className="bg-green-400 rounded p-1"></div>
              </div>,
        steps: [
          "Draw a square divided into four quadrants",
          "Label them: Urgent & Important (Do), Not Urgent & Important (Schedule), Urgent & Not Important (Delegate), Not Urgent & Not Important (Eliminate)",
          "Place all your tasks into the appropriate quadrants",
          "Act on tasks according to their quadrant"
        ],
        benefits: [
          "Provides a clear framework for decision-making",
          "Helps you identify tasks that can be eliminated",
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
          { title: "Priority Matrix App", url: "https://www.prioritymatrix.com/" }
        ]
      },
      {
        id: 4,
        name: "Eat the Frog",
        description: "Tackle your most difficult task first.",
        longDescription: "Eat the Frog is a productivity method based on a quote attributed to Mark Twain: 'Eat a live frog first thing in the morning and nothing worse will happen to you the rest of the day.' In productivity terms, your 'frog' is your biggest, most important task, the one you're most likely to procrastinate on. The method suggests that you should tackle this task first thing in the morning when your willpower and concentration are highest.",
        color: "bg-emerald-50 text-emerald-600",
        hoverColor: "hover:bg-emerald-100",
        icon: <div className="relative h-12 w-12">
                <div className="absolute inset-0 bg-emerald-500 rounded-full"></div>
                <div className="absolute inset-x-2 top-3 bg-emerald-300 rounded-full h-2"></div>
                <div className="absolute inset-x-4 top-7 bg-emerald-300 rounded-full h-1"></div>
              </div>,
        steps: [
          "Identify your most important or challenging task (your 'frog')",
          "Tackle this task first thing in the morning",
          "Work on it until completion, if possible",
          "Move on to the next most important task"
        ],
        benefits: [
          "Builds momentum for the rest of the day",
          "Eliminates procrastination on important tasks",
          "Creates a sense of accomplishment early in the day",
          "Ensures that important tasks don't get pushed aside by urgent ones",
          "Increases overall productivity by focusing on high-impact work"
        ],
        tips: [
          "Prepare your 'frog' the night before so you can start immediately in the morning",
          "If you have multiple frogs, start with the biggest one",
          "Break down large frogs into smaller, manageable tasks",
          "Remove distractions during your frog-eating time"
        ],
        history: "The concept is based on a quote attributed to Mark Twain. Brian Tracy popularized it as a productivity strategy in his book 'Eat That Frog!: 21 Great Ways to Stop Procrastinating and Get More Done in Less Time.'",
        resources: [
          { title: "Brian Tracy's Eat That Frog Book", url: "https://www.briantracy.com/blog/time-management/eat-that-frog/" },
          { title: "Eat That Frog App", url: "https://todoist.com/productivity-methods/eat-the-frog" }
        ]
      },
      {
        id: 5,
        name: "GTD (Getting Things Done)",
        description: "Capture, clarify, organize, review, engage.",
        longDescription: "Getting Things Done (GTD) is a personal productivity system created by David Allen. The method is based on the idea of getting tasks out of your mind and into a reliable system, which frees up mental space for actual work rather than remembering what needs to be done. GTD consists of five steps: capture, clarify, organize, reflect, and engage.",
        color: "bg-indigo-50 text-indigo-600",
        hoverColor: "hover:bg-indigo-100",
        icon: <CheckCircle className="h-12 w-12 text-indigo-500" />,
        steps: [
          "Capture: Collect what has your attention (tasks, ideas, commitments) in trusted places",
          "Clarify: Process what each item means and what to do about it",
          "Organize: Put items where they belong (next actions, projects, waiting for, someday/maybe)",
          "Reflect: Review and update your system regularly",
          "Engage: Take action based on your system"
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
        history: "GTD was created by David Allen and first described in his 2001 book 'Getting Things Done: The Art of Stress-Free Productivity.' It has since become one of the most popular productivity systems worldwide.",
        resources: [
          { title: "Official GTD Website", url: "https://gettingthingsdone.com/" },
          { title: "GTD Apps", url: "https://todoist.com/productivity-methods/getting-things-done" }
        ]
      }
    ];

    const foundMethod = methods.find(m => m.id === parseInt(id || '1'));
    
    setTimeout(() => {
      setMethod(foundMethod || methods[0]);
      setLoading(false);
    }, 500);
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

  if (!method) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <main className="flex-1 pt-24 pb-12">
          <div className="container mx-auto px-4 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Method Not Found</h1>
            <p className="text-gray-600 mb-6">The productivity method you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/productivity-techniques')}>
              Return to Productivity Techniques
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
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Productivity Techniques
          </Button>

          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className={`${method.color.split(" ")[0]} p-3 rounded-lg`}>
                  {method.icon}
                </div>
                <h1 className="text-3xl font-bold text-gray-800">{method.name}</h1>
              </div>
              <p className="text-gray-600 mt-2 max-w-3xl">{method.longDescription}</p>
            </div>
            <Badge className={method.color}>Productivity Method</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="h-5 w-5 text-gray-600" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 list-decimal pl-5">
                  {method.steps.map((step, index) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-gray-600" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  {method.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-700">{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-gray-600" />
                  Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  {method.tips.map((tip, index) => (
                    <li key={index} className="text-gray-700">{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>History & Background</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{method.history}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {method.resources.map((resource, index) => (
                    <li key={index}>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-gray-100 rounded-xl p-6 max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-semibold mb-3">Ready to Try This Method?</h2>
            <p className="text-gray-600 mb-4">
              Add this method to your workflow with our integrated tools.
            </p>
            <Button className="bg-[#8404fc] hover:bg-[#6400c0] text-white">
              Start Using {method.name}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductivityMethodDetails;
