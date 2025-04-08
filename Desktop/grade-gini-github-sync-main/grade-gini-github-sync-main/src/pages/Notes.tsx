
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

const Notes: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-6">Notes Management</h1>
        <p className="text-lg text-gray-600 mb-8">
          Organize, create and manage your study notes in one place.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-center text-gray-500">Notes management content coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
