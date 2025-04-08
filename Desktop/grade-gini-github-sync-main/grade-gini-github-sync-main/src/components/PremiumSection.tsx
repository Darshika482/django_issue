
import React from 'react';
import { ArrowRight } from 'lucide-react';

const PremiumSection: React.FC = () => {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            For Those Who Want More Than Just Productivity
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-masteryGradient rounded-lg mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">AI-Powered Precision</h3>
            <p className="text-gray-700 mb-4">Tasks adapt to your progress. Fall behind? AI reshapes your schedule.</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="w-5 h-5 rounded-full bg-mastery-purple/20 flex items-center justify-center mr-2 text-mastery-purple">✓</span>
                Dynamic rescheduling
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-5 h-5 rounded-full bg-mastery-purple/20 flex items-center justify-center mr-2 text-mastery-purple">✓</span>
                Personalized difficulty scaling
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-5 h-5 rounded-full bg-mastery-purple/20 flex items-center justify-center mr-2 text-mastery-purple">✓</span>
                Real-time performance adjustments
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-masteryGradient rounded-lg mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Techniques That Actually Work</h3>
            <p className="text-gray-700 mb-4">No fluff. Just frameworks used by CEOs and Nobel laureates.</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-700">
                <span className="w-5 h-5 rounded-full bg-mastery-purple/20 flex items-center justify-center mr-2 text-mastery-purple">✓</span>
                Evidence-based methodologies
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-5 h-5 rounded-full bg-mastery-purple/20 flex items-center justify-center mr-2 text-mastery-purple">✓</span>
                Customizable to your workflow
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-5 h-5 rounded-full bg-mastery-purple/20 flex items-center justify-center mr-2 text-mastery-purple">✓</span>
                Backed by cognitive science
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button className="cta-button">
            Join the Mastery Movement <ArrowRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumSection;
