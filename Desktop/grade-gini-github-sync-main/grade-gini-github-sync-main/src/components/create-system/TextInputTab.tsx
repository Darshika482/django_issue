
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextInputTabProps {
  syllabus: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  charCount: number;
  maxChars: number;
}

const TextInputTab: React.FC<TextInputTabProps> = ({ 
  syllabus, 
  handleTextChange, 
  charCount, 
  maxChars 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="syllabus-input">Enter your syllabus or learning objectives</Label>
      <Textarea
        id="syllabus-input"
        placeholder="Paste your syllabus, project goals, or learning objectives here..."
        className="min-h-[300px]"
        value={syllabus}
        onChange={handleTextChange}
      />
      <div className="text-xs text-gray-500 text-right">
        {charCount}/{maxChars} characters
      </div>
    </div>
  );
};

export default TextInputTab;
