
import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Design",
      description: "Create your custom system in minutes",
    },
    {
      number: 2,
      title: "Automate",
      description: "AI processes your materials into actionable tasks",
    },
    {
      number: 3,
      title: "Dominate",
      description: "Optimize execution with elite techniques",
    }
  ];

  return (
    <div className="py-28 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="container mx-auto max-w-6xl"
      >
        <div className="text-center mb-24">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            From Ambition to Execution
          </motion.h2>
          <div className="w-24 h-1 bg-[#8404fc] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-white shadow-lg border border-primary/10 p-8 relative group hover:border-primary transition-colors">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#8404fc]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-[#8404fc] to-[#a53aff] text-white flex items-center justify-center text-2xl font-bold mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 font-normal">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[#8404fc] text-4xl"
                  >
                    →
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HowItWorks;
