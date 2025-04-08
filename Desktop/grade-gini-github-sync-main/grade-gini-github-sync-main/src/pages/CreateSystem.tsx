
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { useCreateSystem } from '@/components/create-system/hooks/useCreateSystem';
import SystemNameInput from '@/components/create-system/SystemNameInput';
import AiToggle from '@/components/create-system/AiToggle';
import InputTabs from '@/components/create-system/InputTabs';
import ErrorMessage from '@/components/create-system/ErrorMessage';
import CreateSystemButton from '@/components/create-system/CreateSystemButton';
import ApiKeyDialog from '@/components/create-system/ApiKeyDialog';

const CreateSystem = () => {
  const {
    activeTab,
    setActiveTab,
    systemName,
    setSystemName,
    syllabus,
    uploadedFile,
    setUploadedFile,
    uploadProgress,
    isProcessing,
    errorMessage,
    charCount,
    apiKeyDialogOpen,
    setApiKeyDialogOpen,
    geminiApiKey,
    setGeminiApiKey,
    savedApiKey,
    useAI,
    setUseAI,
    showApiGuide,
    setShowApiGuide,
    MAX_CHARS,
    handleTextChange,
    handleFileUpload,
    handleDragOver,
    handleDrop,
    saveApiKey,
    handleGenerateSystem
  } = useCreateSystem();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs />
          
          <header className="mb-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8404fc] to-[#4a008e]">
              Create Your Learning System
            </h1>
            <p className="text-gray-600 mt-2">
              Choose how you want to input your learning materials or objectives
            </p>
          </header>

          <Card className="shadow-lg border-0">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <SystemNameInput 
                  systemName={systemName} 
                  setSystemName={setSystemName} 
                />

                <AiToggle 
                  useAI={useAI} 
                  setUseAI={setUseAI} 
                  openApiKeyDialog={() => setApiKeyDialogOpen(true)}
                  showApiGuide={showApiGuide}
                  setShowApiGuide={setShowApiGuide}
                />

                <InputTabs 
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  syllabus={syllabus}
                  handleTextChange={handleTextChange}
                  charCount={charCount}
                  maxChars={MAX_CHARS}
                  uploadedFile={uploadedFile}
                  uploadProgress={uploadProgress}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                  handleFileUpload={handleFileUpload}
                  setUploadedFile={setUploadedFile}
                  errorMessage={errorMessage}
                />
                
                <ErrorMessage message={errorMessage} />
                
                <CreateSystemButton 
                  isProcessing={isProcessing} 
                  onClick={handleGenerateSystem} 
                  useAI={useAI} 
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <ApiKeyDialog 
        open={apiKeyDialogOpen}
        onOpenChange={setApiKeyDialogOpen}
        apiKey={geminiApiKey}
        setApiKey={setGeminiApiKey}
        onSave={saveApiKey}
        onContinueWithoutAI={() => {
          setUseAI(false);
          setApiKeyDialogOpen(false);
        }}
      />
    </div>
  );
};

export default CreateSystem;
