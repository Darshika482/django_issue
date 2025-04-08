
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import PremiumSection from '../components/PremiumSection';
import CircularProductivityMethods from '../components/CircularProductivityMethods';
import Footer from '../components/Footer';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const Index: React.FC = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [controls]);

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-white"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <Navbar />
        <div className="relative">
          <Hero />
          <Features />
          <HowItWorks />
          <CircularProductivityMethods />
          <Testimonials />
          <PremiumSection />
          <Footer />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
