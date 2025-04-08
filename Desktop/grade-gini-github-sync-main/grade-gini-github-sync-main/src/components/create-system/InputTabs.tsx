
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextInputTab from './TextInputTab';
import FileUploadTab from './FileUploadTab';

interface InputTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  syllabus: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  charCount: number;
  maxChars: number;
  uploadedFile: File | null;
  uploadProgress: number;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setUploadedFile: (file: File | null) => void;
  errorMessage: string;
}

const InputTabs: React.FC<InputTabsProps> = ({
  activeTab,
  setActiveTab,
  syllabus,
  handleTextChange,
  charCount,
  maxChars,
  uploadedFile,
  uploadProgress,
  handleDragOver,
  handleDrop,
  handleFileUpload,
  setUploadedFile,
  errorMessage
}) => {
  return (
    <Tabs defaultValue="text-input" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="text-input">Text Input</TabsTrigger>
        <TabsTrigger value="file-upload">File Upload</TabsTrigger>
      </TabsList>
      
      <TabsContent value="text-input" className="mt-6 space-y-4">
        <TextInputTab 
          syllabus={syllabus} 
          handleTextChange={handleTextChange} 
          charCount={charCount} 
          maxChars={maxChars}
        />
      </TabsContent>
      
      <TabsContent value="file-upload" className="mt-6 space-y-4">
        <FileUploadTab 
          uploadedFile={uploadedFile}
          uploadProgress={uploadProgress}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileUpload={handleFileUpload}
          setUploadedFile={setUploadedFile}
          errorMessage={errorMessage}
          activeTab={activeTab}
        />
      </TabsContent>
    </Tabs>
  );
};

export default InputTabs;
