
import React from 'react';
import { motion } from 'framer-motion';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Used this to prep for my Series 7 exam—cut study time by 40%.",
      name: "Jordan",
      title: "Financial Advisor"
    },
    {
      quote: "Finally, a tool that thinks with me.",
      name: "Priya",
      title: "Data Scientist"
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mastery-purple">
            What Our Users Say
          </h2>
          <div className="w-24 h-1 bg-mastery-purple mx-auto"></div>
        </motion.div>
        
        <div className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-mastery-purple to-mastery-brightPurple opacity-90 rounded-xl transform -rotate-1"></div>
                <div className="relative bg-white rounded-xl shadow-xl p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <blockquote className="text-xl font-medium mb-6 text-gray-800">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-mastery-purple to-mastery-brightPurple rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-600">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-center md:justify-between"
        >
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-700 font-medium">Trusted by high-performers at top organizations</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="text-gray-500 font-semibold text-sm px-3 py-1 bg-gray-100 rounded-full">AES-256 Encryption</span>
            <span className="text-gray-500 font-semibold text-sm px-3 py-1 bg-gray-100 rounded-full">GDPR Certified</span>
            <span className="text-gray-500 font-semibold text-sm px-3 py-1 bg-gray-100 rounded-full">Trusted by Stanford Accelerator</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
