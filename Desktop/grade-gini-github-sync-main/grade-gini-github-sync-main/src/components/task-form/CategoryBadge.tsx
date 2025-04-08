
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  category: string;
}

const categoryColors: Record<string, {bg: string, text: string}> = {
  work: { bg: 'bg-blue-100', text: 'text-blue-800' },
  personal: { bg: 'bg-purple-100', text: 'text-purple-800' },
  study: { bg: 'bg-green-100', text: 'text-green-800' },
  health: { bg: 'bg-red-100', text: 'text-red-800' },
  finance: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  social: { bg: 'bg-pink-100', text: 'text-pink-800' },
  other: { bg: 'bg-gray-100', text: 'text-gray-800' }
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const lowerCategory = category.toLowerCase();
  const colors = categoryColors[lowerCategory] || categoryColors.other;
  
  return (
    <Badge className={`${colors.bg} ${colors.text} hover:${colors.bg} border-0`}>
      {category}
    </Badge>
  );
};

export default CategoryBadge;
