
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const fontSize = 10;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const matrix = () => {
      ctx.fillStyle = 'rgba(10, 5, 25, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#8404fc30';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.floor(Math.random() * 128));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(matrix, 40);
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const menuItems = [
    { section: "Study Tools", links: [
      { label: "Dashboard", url: "/dashboard" },
      { label: "Planner", url: "/planner" },
      { label: "All Systems", url: "/all-systems" },
      { label: "NCERT Classes", url: "/ncert-classes" },
      { label: "AI Syllabus Creator", url: "/ai-syllabus-creator" },
    ]},
    { section: "Focus Tools", links: [
      { label: "Deep Focus", url: "/deep-focus" },
      { label: "Pomodoro Technique", url: "/pomodoro-technique" },
      { label: "Productivity Techniques", url: "/productivity-techniques" },
    ]},
    { section: "Resources", links: [
      { label: "Notes", url: "/notes" },
      { label: "All Templates", url: "/all-templates" },
      { label: "About Us", url: "/about" },
    ]},
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Matrix animation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      {/* Gradient overlay */}
      <div className="relative bg-gradient-to-tr from-[#0f0824] via-[#1a103c] to-[#231647] pt-16 pb-12">
        {/* Animated gradient line */}
        <div className="w-full h-1 bg-gradient-to-r from-[#6400c0] to-[#a968ff]"></div>
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9b6bff] to-[#c78dff]">
              Your Academic Journey Starts Here
            </h2>
          </motion.div>
          
          {/* Sitemap section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {menuItems.map((item, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">{item.section}</h3>
                <ul className="space-y-2">
                  {item.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.url} 
                        className="text-gray-300 hover:text-[#a968ff] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="text-gray-400 mb-6 md:mb-0 flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-[#a968ff] transition-colors">Privacy Policy</a>
              <span className="hidden md:inline text-gray-600">|</span>
              <a href="#" className="hover:text-[#a968ff] transition-colors">Terms of Service</a>
              <span className="hidden md:inline text-gray-600">|</span>
              <a href="#" className="hover:text-[#a968ff] transition-colors">Contact Support</a>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#6400c0] to-[#8404fc] text-white hover:shadow-lg hover:shadow-purple-500/20 hover:scale-110 transition-all">
                <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#6400c0] to-[#8404fc] text-white hover:shadow-lg hover:shadow-purple-500/20 hover:scale-110 transition-all">
                <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#6400c0] to-[#8404fc] text-white hover:shadow-lg hover:shadow-purple-500/20 hover:scale-110 transition-all">
                <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-purple-900/30 pt-8 mt-8">
            <div className="text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} GradeGini. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
