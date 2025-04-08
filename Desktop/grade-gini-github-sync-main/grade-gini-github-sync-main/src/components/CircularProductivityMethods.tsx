
import React from 'react';
import { Clock, Calendar, LayoutGrid, CheckSquare, Layers, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductivityMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  angle: number;
  path: string;
}

const CircularProductivityMethods: React.FC = () => {
  // Define the productivity methods with their position angles
  const methods: ProductivityMethod[] = [
    { 
      id: 'pomodoro', 
      name: 'Pomodoro', 
      icon: <Clock className="h-5 w-5 text-red-500" />, 
      color: 'bg-red-100',
      angle: 0,
      path: '/pomodoro-technique'
    },
    { 
      id: 'time-blocking', 
      name: 'Time Blocking', 
      icon: <Calendar className="h-5 w-5 text-blue-500" />, 
      color: 'bg-blue-100',
      angle: 60,
      path: '/productivity-technique/timeblocking'
    },
    { 
      id: 'eisenhower', 
      name: 'Eisenhower Matrix', 
      icon: <LayoutGrid className="h-5 w-5 text-indigo-500" />, 
      color: 'bg-indigo-100',
      angle: 120,
      path: '/productivity-technique/eisenhower'
    },
    { 
      id: 'kanban', 
      name: 'Kanban', 
      icon: <Layers className="h-5 w-5 text-teal-500" />, 
      color: 'bg-teal-100',
      angle: 180,
      path: '/productivity-technique/kanban'
    },
    { 
      id: 'gtd', 
      name: 'GTD Method', 
      icon: <CheckSquare className="h-5 w-5 text-purple-500" />, 
      color: 'bg-purple-100',
      angle: 240,
      path: '/productivity-technique/gtd'
    },
    { 
      id: 'deep-work', 
      name: 'Deep Work', 
      icon: <Brain className="h-5 w-5 text-pink-500" />, 
      color: 'bg-pink-100',
      angle: 300,
      path: '/deep-focus'
    }
  ];

  // Calculate outer circle dimensions
  const outerRadius = 240;
  const innerRadius = 130;
  const centerRadius = 50;
  const circleSize = outerRadius * 2;
  
  // Set container dimensions with additional padding
  const containerSize = circleSize + 60;

  return (
    <div className="w-full py-16 px-4 bg-slate-50/50">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Productivity Techniques</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our platform integrates elite productivity methods to supercharge your workflow
        </p>
      </div>
      
      <div className="flex justify-center items-center">
        <div className="relative" style={{ width: `${containerSize}px`, height: `${containerSize}px` }}>
          {/* Outer circle */}
          <div 
            className="absolute rounded-full border border-purple-300"
            style={{ 
              width: `${circleSize}px`, 
              height: `${circleSize}px`,
              left: `${containerSize / 2 - circleSize / 2}px`, 
              top: `${containerSize / 2 - circleSize / 2}px`
            }}
          />
          
          {/* Inner circle */}
          <div 
            className="absolute rounded-full border border-purple-300"
            style={{ 
              width: `${innerRadius * 2}px`, 
              height: `${innerRadius * 2}px`,
              left: `${containerSize / 2 - innerRadius}px`, 
              top: `${containerSize / 2 - innerRadius}px`
            }}
          />
          
          {/* Center element - No longer rotating */}
          <div 
            className="absolute z-20 w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center"
            style={{ 
              left: `${containerSize / 2 - centerRadius / 2 - 15}px`, 
              top: `${containerSize / 2 - centerRadius / 2 - 15}px` 
            }}
          >
            <span className="text-4xl font-bold text-purple-600">M</span>
          </div>
          
          {/* Method icons */}
          {methods.map((method) => {
            // Calculate position
            const angle = method.angle * (Math.PI / 180);
            const midRadius = (outerRadius + innerRadius) / 2 - 10;
            const x = Math.cos(angle) * midRadius;
            const y = Math.sin(angle) * midRadius;
            
            return (
              <div 
                key={method.id} 
                className="absolute"
                style={{ 
                  left: `${containerSize / 2 + x}px`,
                  top: `${containerSize / 2 + y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <Link to={method.path}>
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 ${method.color} rounded-lg shadow-sm flex items-center justify-center mb-2`}>
                      {method.icon}
                    </div>
                    <span className="text-xs text-center font-medium text-gray-600 whitespace-nowrap">
                      {method.name}
                    </span>
                  </div>
                </Link>
                {/* Purple dot on circle */}
                <div 
                  className="absolute w-2 h-2 bg-purple-500 rounded-full"
                  style={{
                    left: `${x > 0 ? -20 : 20}px`,
                    top: 0
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CircularProductivityMethods;
