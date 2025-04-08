
import React from 'react';

interface ModuleProgressBarProps {
  completedTasks: number;
  totalTasks: number;
  selectMode: boolean;
}

const ModuleProgressBar: React.FC<ModuleProgressBarProps> = ({
  completedTasks,
  totalTasks,
  selectMode
}) => {
  return (
    <div className="px-5 py-3 bg-gray-50 border-y flex justify-between items-center">
      <p className="text-sm text-gray-600">Tasks: {completedTasks} / {totalTasks} completed</p>
    </div>
  );
};

export default ModuleProgressBar;
