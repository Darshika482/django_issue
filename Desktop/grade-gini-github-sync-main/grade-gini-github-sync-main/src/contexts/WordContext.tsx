
import React, { createContext, useContext, useState, useEffect } from 'react';
import { WordCard, initialWordList } from '../data/wordData';

interface WordContextType {
  words: WordCard[];
  currentWord: WordCard | null;
  setCurrentWord: (word: WordCard | null) => void;
  nextWord: () => void;
  prevWord: () => void;
  markAsKnown: (id: string) => void;
  markAsStudyLater: (id: string) => void;
  resetWords: () => void;
  addNewWord: (word: Omit<WordCard, 'id'>) => void;
}

const WordContext = createContext<WordContextType>({
  words: [],
  currentWord: null,
  setCurrentWord: () => {},
  nextWord: () => {},
  prevWord: () => {},
  markAsKnown: () => {},
  markAsStudyLater: () => {},
  resetWords: () => {},
  addNewWord: () => {},
});

export const useWordContext = () => useContext(WordContext);

export const WordProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [words, setWords] = useState<WordCard[]>(() => {
    const savedWords = localStorage.getItem('words');
    return savedWords ? JSON.parse(savedWords) : initialWordList;
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = words.length > 0 ? words[currentIndex] : null;

  // Save words to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(words));
  }, [words]);

  const setCurrentWord = (word: WordCard | null) => {
    if (!word) return;
    const index = words.findIndex(w => w.id === word.id);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(words.length - 1);
    }
  };

  const markAsKnown = (id: string) => {
    setWords(prev => 
      prev.map(word => 
        word.id === id ? { ...word, known: !word.known } : word
      )
    );
  };

  const markAsStudyLater = (id: string) => {
    setWords(prev => 
      prev.map(word => 
        word.id === id ? { ...word, studyLater: !word.studyLater } : word
      )
    );
  };

  const resetWords = () => {
    setWords(initialWordList);
    setCurrentIndex(0);
  };

  const addNewWord = (word: Omit<WordCard, 'id'>) => {
    const newWord: WordCard = {
      ...word,
      id: Date.now().toString(),
    };
    setWords(prev => [...prev, newWord]);
  };

  return (
    <WordContext.Provider
      value={{
        words,
        currentWord,
        setCurrentWord,
        nextWord,
        prevWord,
        markAsKnown,
        markAsStudyLater,
        resetWords,
        addNewWord,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};
