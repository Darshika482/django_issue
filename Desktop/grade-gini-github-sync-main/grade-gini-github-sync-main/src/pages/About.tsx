
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 flex-grow">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold mb-6">About GradeGini</h1>
        <p className="text-lg text-gray-600 mb-8">
          Learn more about our mission to empower students with powerful learning tools.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-center text-gray-500">About us content coming soon...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
