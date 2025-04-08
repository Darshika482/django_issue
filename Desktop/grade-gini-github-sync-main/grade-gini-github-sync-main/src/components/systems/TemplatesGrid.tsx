
import React from 'react';
import { Template } from '@/types';
import TemplateCard from '@/components/systems/TemplateCard';
import NCERTClassesCard from '@/components/systems/NCERTClassesCard';

interface TemplatesGridProps {
  templates: Template[];
  onViewTemplate: (templateId: string | number) => void;
}

const TemplatesGrid: React.FC<TemplatesGridProps> = ({ templates, onViewTemplate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* NCERT Classes card - This will be at the top */}
      <NCERTClassesCard />
      
      {/* Template cards */}
      {templates.map(template => (
        <TemplateCard 
          key={template.id} 
          template={template} 
          onViewTemplate={() => onViewTemplate(template.id)} 
        />
      ))}
    </div>
  );
};

export default TemplatesGrid;
