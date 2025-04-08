
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock, CheckSquare, LayoutGrid, Calendar, Brain, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const ProductivityTechniques: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Productivity Methods</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover science-backed techniques to enhance focus, manage time, and achieve consistent progress toward your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Pomodoro Technique */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-100">
            <div className="h-3 bg-gradient-to-r from-red-400 to-red-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Pomodoro Technique</h3>
              <p className="text-gray-600 mb-4">
                Work in focused 25-minute intervals followed by 5-minute breaks to maintain high levels of concentration and prevent burnout.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                  Enhances focus and concentration
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                  Prevents mental fatigue
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span>
                  Increases accountability and motivation
                </div>
              </div>
              <div className="mt-6">
                <Link to="/pomodoro-technique">
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    Start Timer <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Time Blocking */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-100">
            <div className="h-3 bg-gradient-to-r from-blue-400 to-blue-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Time Blocking</h3>
              <p className="text-gray-600 mb-4">
                Schedule specific blocks of time for different tasks, eliminating multitasking and creating a structured daily plan.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                  Reduces decision fatigue
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                  Creates accountability for time usage
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                  Improves time-awareness and estimation
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Learn How <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Deep Focus */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-100">
            <div className="h-3 bg-gradient-to-r from-purple-400 to-purple-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Deep Focus Mode</h3>
              <p className="text-gray-600 mb-4">
                Eliminate distractions, enhance concentration, and create the perfect environment for maximum productivity.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Ambient noise and concentration tools
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Distraction-free environment
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                  Perfect for challenging tasks
                </div>
              </div>
              <div className="mt-6">
                <Link to="/deep-focus">
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                    Enter Deep Focus <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* GTD Method */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-100">
            <div className="h-3 bg-gradient-to-r from-green-400 to-green-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckSquare className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Getting Things Done</h3>
              <p className="text-gray-600 mb-4">
                The GTD method involves capturing all tasks, breaking them into actionable steps, and organizing them by context and priority.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                  Clears mental clutter
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                  Enhances focus on immediate actions
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                  Regular review system for progress
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* 5-Min Vocabulary */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-100">
            <div className="h-3 bg-gradient-to-r from-[#8000ff] to-[#a800ff]"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-[#8000ff]" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">5-Min Vocabulary</h3>
              <p className="text-gray-600 mb-4">
                Build your vocabulary in just 5 minutes a day with flashcards, quizzes, and spaced repetition learning.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#8000ff] mr-2"></span>
                  Perfect for exam preparation (GRE, SAT)
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#8000ff] mr-2"></span>
                  Track your progress over time
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-[#8000ff] mr-2"></span>
                  Efficient learning through spaced repetition
                </div>
              </div>
              <div className="mt-6">
                <Link to="/5-min-vocabulary">
                  <Button className="w-full bg-[#8000ff] hover:bg-[#7000db] text-white">
                    Start Learning <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Eisenhower Matrix */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-purple-100">
            <div className="h-3 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <LayoutGrid className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Eisenhower Matrix</h3>
              <p className="text-gray-600 mb-4">
                Prioritize tasks by urgency and importance, dividing them into four categories to determine what requires immediate attention.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                  Eliminates time wasted on non-essential tasks
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                  Identifies tasks that can be delegated
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                  Creates clear decision-making framework
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link to="/productivity-techniques">
            <Button variant="outline" className="border-[#8404fc] text-[#8404fc] hover:bg-[#8404fc]/10 px-8">
              View All Productivity Techniques
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductivityTechniques;
