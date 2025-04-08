
import React, { ReactNode } from 'react';

interface OverviewCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <div className="flex items-center mb-3">
        <div className="bg-purple-100 p-2 rounded-lg mr-3">
          {icon}
        </div>
        <h2 className="text-base font-semibold text-gray-700">{title}</h2>
      </div>
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

export default OverviewCard;
