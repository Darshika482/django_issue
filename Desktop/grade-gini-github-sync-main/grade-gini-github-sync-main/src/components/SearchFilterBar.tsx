
import React from 'react';
import { Button } from "@/components/ui/button";
import { SortAsc, SortDesc, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  currentFilter: 'all' | 'easy' | 'medium' | 'hard';
  setCurrentFilter: (value: 'all' | 'easy' | 'medium' | 'hard') => void;
  sortDirection: 'asc' | 'desc';
  toggleSortDirection: () => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  currentFilter,
  setCurrentFilter,
  sortDirection,
  toggleSortDirection,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-2/3">
        <Input
          type="text"
          placeholder="Search words or definitions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white"
        />
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-1/3 md:justify-end">
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center bg-white border-gray-200"
            onClick={() => {
              const dropdown = document.getElementById('difficultyDropdown');
              if (dropdown) dropdown.classList.toggle('hidden');
            }}
          >
            <Filter className="mr-2 h-4 w-4" />
            {currentFilter === 'all' ? 'All Levels' : 
             currentFilter === 'easy' ? 'Easy' : 
             currentFilter === 'medium' ? 'Medium' : 'Hard'}
          </Button>
          
          <div
            id="difficultyDropdown"
            className="hidden absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 py-1 border border-gray-200"
          >
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${
                currentFilter === 'all' ? 'bg-[#8000ff]/10 text-[#8000ff]' : 'text-gray-700'
              }`}
              onClick={() => {
                setCurrentFilter('all');
                document.getElementById('difficultyDropdown')?.classList.add('hidden');
              }}
            >
              All Levels
            </button>
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${
                currentFilter === 'easy' ? 'bg-[#8000ff]/10 text-[#8000ff]' : 'text-gray-700'
              }`}
              onClick={() => {
                setCurrentFilter('easy');
                document.getElementById('difficultyDropdown')?.classList.add('hidden');
              }}
            >
              Easy
            </button>
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${
                currentFilter === 'medium' ? 'bg-[#8000ff]/10 text-[#8000ff]' : 'text-gray-700'
              }`}
              onClick={() => {
                setCurrentFilter('medium');
                document.getElementById('difficultyDropdown')?.classList.add('hidden');
              }}
            >
              Medium
            </button>
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${
                currentFilter === 'hard' ? 'bg-[#8000ff]/10 text-[#8000ff]' : 'text-gray-700'
              }`}
              onClick={() => {
                setCurrentFilter('hard');
                document.getElementById('difficultyDropdown')?.classList.add('hidden');
              }}
            >
              Hard
            </button>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="bg-white border-gray-200"
          onClick={toggleSortDirection}
          title={sortDirection === 'asc' ? 'Sort A-Z' : 'Sort Z-A'}
        >
          {sortDirection === 'asc' ? (
            <SortAsc className="h-4 w-4" />
          ) : (
            <SortDesc className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchFilterBar;
