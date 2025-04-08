
import React, { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import { WordProvider } from '../contexts/WordContext';
import { SimpleHeader } from '../components/Header';
import Flashcard from '../components/Flashcard';
import WordsPage from '../components/WordsPage';

const VocabularyPage: React.FC = () => {
  const [showAddWordDialog, setShowAddWordDialog] = useState(false);

  const handleAddWord = () => {
    setShowAddWordDialog(true);
    // This is a placeholder. In a real implementation, you would show a dialog to add words
    // You can implement this functionality later if needed
  };

  return (
    <WordProvider>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 pt-20">
          <SimpleHeader 
            title="5-Minute Vocabulary" 
            showAddButton={true}
            onAddClick={handleAddWord}
          />
          
          <div className="mt-8 flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <Flashcard />
            </div>
            
            <div className="w-full mt-12">
              <WordsPage />
            </div>
          </div>
        </div>
        <Footer />
        <Toaster />
      </div>
    </WordProvider>
  );
};

export default VocabularyPage;
