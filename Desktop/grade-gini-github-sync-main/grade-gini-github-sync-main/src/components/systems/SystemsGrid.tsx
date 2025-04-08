
import React from 'react';
import { LearningSystem, SystemModule } from '@/types';
import SystemCard from './SystemCard';

interface SystemsGridProps {
  systems: LearningSystem[];
  onSystemClick: (id: string | number) => void;
  onDeleteSystem?: (id: string | number) => void;
  onEditSystem?: (id: string | number) => void;
  onOpenTaskSelection?: (modules: SystemModule[]) => void;
}

const SystemsGrid: React.FC<SystemsGridProps> = ({ 
  systems, 
  onSystemClick, 
  onDeleteSystem,
  onEditSystem,
  onOpenTaskSelection
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {systems.map(system => (
        <SystemCard 
          key={system.id} 
          system={system} 
          onClick={() => onSystemClick(system.id)}
          onDelete={onDeleteSystem ? () => onDeleteSystem(system.id) : undefined}
          onEdit={onEditSystem ? () => onEditSystem(system.id) : undefined}
          onOpenTaskSelection={onOpenTaskSelection}
        />
      ))}
    </div>
  );
};

export default SystemsGrid;
