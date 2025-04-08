
import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, BookOpen, Brain, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [animatedElements, setAnimatedElements] = useState<{ id: number; icon: string; x: number; y: number; delay: number; size: number; rotation: number }[]>([]);

  useEffect(() => {
    const generateAnimatedElements = () => {
      const icons = ['book', 'clock', 'brain', 'calendar', 'pencil'];
      const newElements = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        icon: icons[Math.floor(Math.random() * icons.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 20 + 15,
        rotation: Math.random() * 30 - 15
      }));
      setAnimatedElements(newElements);
    };

    generateAnimatedElements();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      {/* Educational Elements Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {animatedElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute opacity-10"
            style={{ top: `${element.y}%`, left: `${element.x}%` }}
            animate={{
              y: [0, -20, 0],
              rotate: [element.rotation, -element.rotation, element.rotation]
            }}
            transition={{
              duration: 5 + element.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: element.delay
            }}
          >
            {element.icon === 'book' && <BookOpen size={element.size} className="text-[#8404fc]" />}
            {element.icon === 'clock' && <Clock size={element.size} className="text-[#8404fc]" />}
            {element.icon === 'brain' && <Brain size={element.size} className="text-[#8404fc]" />}
            {element.icon === 'calendar' && <Calendar size={element.size} className="text-[#8404fc]" />}
            {element.icon === 'pencil' && <span style={{fontSize: element.size}} className="text-[#8404fc]">✏️</span>}
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto text-center max-w-5xl z-10 mt-20"
      >
        {/* Features Announcement Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block mb-8"
        >
          <div className="relative group">
            <motion.div 
              className="absolute -inset-px rounded-full bg-[#8404fc] opacity-75"
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <button className="relative bg-white px-6 py-3 rounded-full flex items-center gap-2 border border-[#8404fc]/30 group-hover:border-[#8404fc] transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#8404fc] flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <span className="text-gray-900 font-medium">Introducing Our Latest Features</span>
            </button>
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight"
        >
          Design Your Mastery System
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl font-medium mb-8 text-gray-700 max-w-3xl mx-auto"
        >
          Where AI Meets Productivity Genius
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-lg font-normal mb-10 text-gray-600 max-w-2xl mx-auto"
        >
          Build custom learning systems, automate task generation, and dominate goals with elite time-management techniques—crafted for relentless achievers.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-16"
        >
          <button className="bg-gradient-to-r from-[#8404fc] to-[#a53aff] text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2 text-lg">
            Start Your Process <ArrowRight className="ml-1" />
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-white/80 backdrop-blur-lg rounded-xl p-3 shadow-xl border border-gray-100"
        >
          <div className="bg-white/80 rounded-lg overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-4 border-r border-gray-100">
              <div className="bg-white rounded-lg p-4 h-full shadow-sm">
                <div className="border-b border-gray-200 pb-2 mb-4 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                  <h3 className="text-gray-800 text-lg font-medium">Creating: Learn AI Development</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-[#8404fc]/10 rounded p-3 border border-[#8404fc]/30 transform transition-transform hover:scale-[1.02] hover:bg-[#8404fc]/20">
                    <p className="text-gray-800 font-medium text-sm">Module 1: Python Fundamentals</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <p className="text-gray-600 text-xs">Pomodoro Technique</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded p-3 border border-gray-200 transform transition-transform hover:scale-[1.02] hover:bg-gray-50">
                    <p className="text-gray-800 font-medium text-sm">Module 2: Machine Learning Basics</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <p className="text-gray-600 text-xs">Time Blocking</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded p-3 border border-gray-200 transform transition-transform hover:scale-[1.02] hover:bg-gray-50">
                    <p className="text-gray-800 font-medium text-sm">Module 3: Neural Networks</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <p className="text-gray-600 text-xs">Eisenhower Matrix</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <div className="bg-[#8404fc] text-white px-3 py-1 rounded text-sm hover:bg-[#a53aff] cursor-pointer transform transition-all hover:scale-105">
                      Add Module +
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 p-4">
              <div className="bg-white rounded-lg p-4 h-full shadow-sm">
                <div className="border-b border-gray-200 pb-2 mb-4 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1.5"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                  <h3 className="text-gray-800 text-lg font-medium">AI-Generated Tasks</h3>
                </div>
                <p className="text-gray-600 text-xs mb-4">From uploaded PDF: "Complete AI Course Syllabus"</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-gray-100 rounded p-3 transform transition-transform hover:scale-[1.02] hover:bg-gray-50">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div>
                      <p className="text-gray-800 text-sm">Install Python & Libraries</p>
                      <p className="text-gray-600 text-xs">Today - 25min Pomodoro</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-gray-100 rounded p-3 transform transition-transform hover:scale-[1.02] hover:bg-gray-50">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <div>
                      <p className="text-gray-800 text-sm">Complete NumPy Tutorial</p>
                      <p className="text-gray-600 text-xs">Tomorrow - 2hr Time Block</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-gray-100 rounded p-3 transform transition-transform hover:scale-[1.02] hover:bg-gray-50">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <div>
                      <p className="text-gray-800 text-sm">Watch Lecture on Data Processing</p>
                      <p className="text-gray-600 text-xs">Wed - 1.5hr Time Block</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 bg-gray-100 rounded p-3 transform transition-transform hover:scale-[1.02] hover:bg-gray-50">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div>
                      <p className="text-gray-800 text-sm">Assignment #1: Data Visualization</p>
                      <p className="text-gray-600 text-xs">Priority: High - Due Fri</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
