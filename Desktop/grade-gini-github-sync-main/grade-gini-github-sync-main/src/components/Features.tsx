
import React from 'react';
import { Puzzle, Bot, Hourglass, ChartBar } from 'lucide-react';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Puzzle className="w-10 h-10 text-mastery-purple" />,
      emoji: "🧩",
      title: "Custom Systems",
      description: "Build your blueprint—language learning, coding, certifications, or fitness. Your rules, your flow."
    },
    {
      icon: <Bot className="w-10 h-10 text-mastery-purple" />,
      emoji: "🤖",
      title: "AI Syllabus Interpreter",
      description: "Upload PDFs or paste text. AI extracts deadlines, chapters, and crafts your battle plan."
    },
    {
      icon: <Hourglass className="w-10 h-10 text-mastery-purple" />,
      emoji: "⏳",
      title: "10+ Masterclass Techniques",
      description: "Pomodoro, Eisenhower Matrix, Time Blocking—apply proven frameworks to tasks with one click."
    },
    {
      icon: <ChartBar className="w-10 h-10 text-mastery-purple" />,
      emoji: "📊",
      title: "Elite Progress Analytics",
      description: "Track time spent, technique success rates, and AI-driven improvement hacks."
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mastery-purple">
            Why This Changes Everything
          </h2>
          <div className="w-24 h-1 bg-mastery-purple mx-auto"></div>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="rounded-xl overflow-hidden h-full group transition-all duration-300"
              whileHover={{ 
                scale: 1.03, 
                transition: { duration: 0.2 } 
              }}
            >
              <div className="bg-white rounded-xl shadow-md p-6 h-full border border-mastery-purple/10 hover:border-mastery-purple/30 transition-all duration-300 relative overflow-hidden">
                {/* Gradient overlay at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-mastery-purple to-mastery-brightPurple transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300"></div>
                
                <div className="mb-6 flex items-center">
                  <span className="text-5xl mr-2">{feature.emoji}</span>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-mastery-purple/5 to-mastery-brightPurple/5 rounded-2xl p-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Ready to transform your learning process?</h3>
              <p className="text-gray-700 mb-6">Our AI-powered system takes your educational goals to the next level with personalized approaches tailored to your unique needs.</p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white rounded-lg px-4 py-3 shadow-md flex items-center">
                  <div className="text-mastery-purple mr-3 text-xl">✓</div>
                  <span className="text-sm font-medium">AI-Optimized Scheduling</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 shadow-md flex items-center">
                  <div className="text-mastery-purple mr-3 text-xl">✓</div>
                  <span className="text-sm font-medium">Automated Material Analysis</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 shadow-md flex items-center">
                  <div className="text-mastery-purple mr-3 text-xl">✓</div>
                  <span className="text-sm font-medium">Productivity Tracking</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-mastery-purple to-mastery-brightPurple flex items-center justify-center shadow-lg">
                <span className="text-7xl">🚀</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
