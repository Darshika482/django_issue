
import React from 'react';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const SystemLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-[#8404fc] animate-spin mb-4" />
          <p className="text-gray-600">Loading system data...</p>
        </div>
      </main>
    </div>
  );
};

export default SystemLoading;
