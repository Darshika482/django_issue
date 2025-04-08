
import React, { useState } from 'react';
import { useWordContext } from '../contexts/WordContext';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Flashcard: React.FC = () => {
  const { currentWord, nextWord, prevWord, markAsKnown, markAsStudyLater } = useWordContext();
  const [isFlipped, setIsFlipped] = useState(false);
  const { toast } = useToast();

  if (!currentWord) {
    return (
      <Card className="p-8 text-center bg-purple-50 border border-purple-200">
        <p className="text-[#8000ff] font-medium">No vocabulary words found.</p>
      </Card>
    );
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const navigateNext = () => {
    setIsFlipped(false);
    nextWord();
  };

  const navigatePrev = () => {
    setIsFlipped(false);
    prevWord();
  };

  const handleMarkKnown = () => {
    markAsKnown(currentWord.id);
    toast({
      title: currentWord.known ? "Removed from known words" : "Added to known words",
      description: currentWord.known ? "The word has been removed from your known list." : "You'll see this word in your known words list.",
      variant: "default",
    });
  };

  const handleMarkStudyLater = () => {
    markAsStudyLater(currentWord.id);
    toast({
      title: currentWord.studyLater ? "Removed from study later" : "Added to study later",
      description: currentWord.studyLater ? "The word has been removed from your study later list." : "You'll see this word in your study later list.",
      variant: "default",
    });
  };

  return (
    <div className="flashcard-container relative h-[400px] mb-8">
      <div className={`flashcard h-full w-full relative ${isFlipped ? 'flipped' : ''}`}>
        {/* Front */}
        <Card className="flashcard-front bg-white border-purple-200 shadow-md h-full w-full flex flex-col items-center justify-center p-8 text-center">
          <div className="absolute top-4 left-4 text-xs text-gray-500 bg-purple-50 px-2 py-1 rounded-full">
            {currentWord.difficulty === 'easy' ? '⚪ Easy' : 
             currentWord.difficulty === 'medium' ? '🔵 Medium' : 
             '🔴 Hard'}
          </div>
          <div className="absolute top-4 right-4 flex space-x-1">
            {currentWord.known && (
              <span className="text-xs text-white bg-green-500 px-2 py-1 rounded-full">Known</span>
            )}
            {currentWord.studyLater && (
              <span className="text-xs text-white bg-yellow-500 px-2 py-1 rounded-full">Study Later</span>
            )}
          </div>
          <h2 className="text-3xl font-bold text-[#8000ff] mb-2">{currentWord.word}</h2>
          <p className="text-gray-600 mb-4">{currentWord.pronunciation}</p>
          <Button onClick={handleFlip} variant="outline" className="border-[#8000ff] text-[#8000ff] hover:bg-purple-50">
            <RotateCw className="mr-2 h-4 w-4" />
            Reveal Definition
          </Button>
        </Card>

        {/* Back */}
        <Card className="flashcard-back bg-white border-purple-200 shadow-md h-full w-full flex flex-col p-8 overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-[#8000ff] mb-1">{currentWord.word}</h3>
            <p className="text-gray-600 text-sm">{currentWord.pronunciation}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-md border border-purple-100 mb-4">
            <p className="font-medium text-gray-800">{currentWord.definition}</p>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-1">Example:</h4>
            <p className="text-gray-700 italic">{currentWord.example}</p>
          </div>
          
          {currentWord.synonyms.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-1">Synonyms:</h4>
              <div className="flex flex-wrap gap-2">
                {currentWord.synonyms.map((synonym, idx) => (
                  <span key={idx} className="bg-purple-100 text-[#8000ff] px-2 py-1 rounded-full text-sm">
                    {synonym}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <Button onClick={handleFlip} variant="outline" className="mt-auto border-[#8000ff] text-[#8000ff] hover:bg-purple-50">
            <RotateCw className="mr-2 h-4 w-4" />
            Show Word
          </Button>
        </Card>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            onClick={handleMarkKnown}
            variant="outline"
            className={`${
              currentWord.known
                ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Check className={`mr-2 h-4 w-4 ${currentWord.known ? 'text-green-600' : ''}`} />
            {currentWord.known ? 'Known' : 'Mark as Known'}
          </Button>
          
          <Button
            onClick={handleMarkStudyLater}
            variant="outline"
            className={`${
              currentWord.studyLater
                ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Clock className={`mr-2 h-4 w-4 ${currentWord.studyLater ? 'text-yellow-600' : ''}`} />
            {currentWord.studyLater ? 'Study Later' : 'Mark for Later'}
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button onClick={navigatePrev} variant="outline" className="border-gray-200">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={navigateNext} variant="outline" className="border-gray-200">
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
