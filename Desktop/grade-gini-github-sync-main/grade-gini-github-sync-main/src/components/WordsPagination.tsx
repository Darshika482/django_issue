
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WordsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const WordsPagination: React.FC<WordsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate page buttons
  const getPageButtons = () => {
    // Always show first and last page
    // Show 5 pages around current page
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      // If total pages is 7 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always add first page
      pages.push(1);

      // Add ellipsis after first page if needed
      if (showEllipsisStart) {
        pages.push('ellipsis-start');
      }

      // Add pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }

      // Add ellipsis before last page if needed
      if (showEllipsisEnd) {
        pages.push('ellipsis-end');
      }

      // Always add last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="border-gray-200 text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageButtons().map((page, index) => (
          page === 'ellipsis-start' || page === 'ellipsis-end' ? (
            <span key={`${page}-${index}`} className="px-2">...</span>
          ) : (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              className={currentPage === page 
                ? "bg-[#8000ff] text-white border-[#8000ff] hover:bg-[#7000db]" 
                : "border-gray-200 text-gray-700"}
              onClick={() => typeof page === 'number' && onPageChange(page)}
            >
              {page}
            </Button>
          )
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="border-gray-200 text-gray-700"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default WordsPagination;
