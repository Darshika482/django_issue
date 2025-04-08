
import React from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Logo: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/6025db79-00f6-4ab7-b21e-55d473883d4d.png" 
        alt="GradeGeni Logo" 
        className={`${isMobile ? 'h-8' : 'h-11'} w-auto`} 
        loading="eager"
        width="44"
        height="44"
      />
      <span className={`${isMobile ? 'text-xl' : 'text-[28px]'} font-bold text-[#8404fc] ml-0.5 tracking-tight`}>
        GradeGeni
      </span>
    </Link>
  );
};

export default Logo;
