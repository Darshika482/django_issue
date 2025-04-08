
import React from 'react';
import { WordCard } from '../data/wordData';
import { Card, CardContent } from "@/components/ui/card";
import { Search, Check, Clock } from 'lucide-react';

interface WordCardGridProps {
  words: WordCard[];
  isLoading: boolean;
  tabType: 'all' | 'known' | 'study';
}

const WordCardGrid: React.FC<WordCardGridProps> = ({ words, isLoading, tabType }) => {
  if (words.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        {tabType === 'all' ? (
          <>
            <Search className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-600">No words found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </>
        ) : tabType === 'known' ? (
          <>
            <Check className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-600">No known words yet</h3>
            <p className="text-gray-500 mt-2">Mark words as "Known" to see them here</p>
          </>
        ) : (
          <>
            <Clock className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-medium text-gray-600">No study later words</h3>
            <p className="text-gray-500 mt-2">Mark words as "Study Later" to see them here</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
      {words.map((word, index) => (
        <Card 
          key={word.id}
          className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${
            tabType === 'known' ? 'border-green-100 hover:border-green-300' :
            tabType === 'study' ? 'border-yellow-100 hover:border-yellow-300' :
            'border-purple-100 hover:border-[#8000ff]/30'
          } animate-fade-in`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className={`h-2 ${
            word.difficulty === 'easy' ? 'bg-green-400' : 
            word.difficulty === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
          }`} />
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-[#8000ff]">{word.word}</h3>
              <div className="flex gap-1">
                {word.known && (
                  <span className="inline-block bg-green-100 rounded-full p-1">
                    <Check size={14} className="text-green-600" />
                  </span>
                )}
                {word.studyLater && (
                  <span className="inline-block bg-yellow-100 rounded-full p-1">
                    <Clock size={14} className="text-yellow-600" />
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">{word.pronunciation}</p>
            <p className="text-sm line-clamp-3">{word.definition}</p>
            
            {word.synonyms && word.synonyms.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Synonyms:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {word.synonyms.slice(0, 3).map((syn, i) => (
                    <span 
                      key={i} 
                      className={`text-xs px-2 py-1 rounded-full ${
                        tabType === 'known' ? 'bg-green-50 text-green-700' :
                        tabType === 'study' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-purple-50 text-[#8000ff]'
                      }`}
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WordCardGrid;
