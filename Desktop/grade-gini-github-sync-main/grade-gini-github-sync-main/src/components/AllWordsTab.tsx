
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { WordCard } from '../data/wordData';
import SearchFilterBar from './SearchFilterBar';
import WordCardGrid from './WordCardGrid';
import WordsPagination from './WordsPagination';

interface AllWordsTabProps {
  words: WordCard[];
  tabType: 'all' | 'known' | 'study';
}

const AllWordsTab: React.FC<AllWordsTabProps> = ({ words, tabType }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentFilter, setCurrentFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredWords, setFilteredWords] = useState(words);
  const [isLoading, setIsLoading] = useState(true);
  
  const itemsPerPage = 8;
  const totalWords = filteredWords.length;
  const totalPages = Math.ceil(totalWords / itemsPerPage);

  // Filter and sort words
  useEffect(() => {
    setIsLoading(true);
    let result = [...words];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(word => 
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by difficulty
    if (currentFilter !== 'all') {
      result = result.filter(word => word.difficulty === currentFilter);
    }
    
    // Sort alphabetically
    result.sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.word.localeCompare(b.word);
      } else {
        return b.word.localeCompare(a.word);
      }
    });
    
    setFilteredWords(result);
    
    // Reset to first page when filters change
    setCurrentPage(1);
    
    // Simulate loading for animation
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [words, searchTerm, currentFilter, sortDirection]);

  // Calculate displayed words based on pagination
  const currentWords = filteredWords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    toast({
      title: `Sorted ${sortDirection === 'asc' ? 'Z-A' : 'A-Z'}`,
      description: "Word list has been re-ordered",
    });
  };

  return (
    <div className="space-y-6">
      <SearchFilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
        sortDirection={sortDirection}
        toggleSortDirection={toggleSortDirection}
      />
      
      <WordCardGrid 
        words={currentWords}
        isLoading={isLoading}
        tabType={tabType}
      />
      
      {totalPages > 1 && (
        <WordsPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default AllWordsTab;
