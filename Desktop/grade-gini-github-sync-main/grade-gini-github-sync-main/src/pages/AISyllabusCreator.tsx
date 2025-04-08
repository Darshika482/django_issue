
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, AlertCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { useNavigate } from 'react-router-dom';

const AISyllabusCreator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("text-input");
  const [syllabus, setSyllabus] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSyllabus(e.target.value);
    // Reset any previous errors
    if (errorMessage) setErrorMessage("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    
    // Check file type
    if (!['pdf', 'docx', 'txt'].includes(fileExt || '')) {
      setErrorMessage("Unsupported file format. Please upload PDF, DOCX, or TXT files only.");
      return;
    }
    
    // Check file size (50MB = 52428800 bytes)
    if (file.size > 52428800) {
      setErrorMessage("File too large. Maximum file size is 50MB.");
      return;
    }
    
    setUploadedFile(file);
    setErrorMessage("");
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(Math.floor(progress));
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    
    // Check file type
    if (!['pdf', 'docx', 'txt'].includes(fileExt || '')) {
      setErrorMessage("Unsupported file format. Please upload PDF, DOCX, or TXT files only.");
      return;
    }
    
    // Check file size (50MB = 52428800 bytes)
    if (file.size > 52428800) {
      setErrorMessage("File too large. Maximum file size is 50MB.");
      return;
    }
    
    setUploadedFile(file);
    setErrorMessage("");
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(Math.floor(progress));
    }, 200);
  };

  const handleGenerateTasks = () => {
    if (activeTab === "text-input" && !syllabus.trim()) {
      setErrorMessage("Please enter your syllabus or learning objectives.");
      return;
    }
    
    if (activeTab === "file-upload" && !uploadedFile) {
      setErrorMessage("Please upload a file first.");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to preview page (we'll implement this later)
      navigate('/all-systems');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Breadcrumbs />
          
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8404fc] to-[#4a008e]">
              AI-Powered Learning System Creator
            </h1>
            <p className="text-gray-600 mt-2">
              Upload a syllabus or describe your learning goals, and our AI will generate a structured learning plan for you.
            </p>
          </header>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Create Your Learning System</CardTitle>
              <CardDescription>
                Choose how you want to input your learning materials or objectives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="text-input" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text-input">Text Input</TabsTrigger>
                  <TabsTrigger value="file-upload">File Upload</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text-input" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="syllabus-input">Enter your syllabus or learning objectives</Label>
                    <Textarea
                      id="syllabus-input"
                      placeholder="Paste your syllabus, project goals, or learning objectives here..."
                      className="min-h-[200px]"
                      value={syllabus}
                      onChange={handleTextChange}
                      maxLength={5000}
                    />
                    <div className="text-xs text-gray-500 text-right">
                      {syllabus.length}/5000 characters
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="file-upload" className="mt-6 space-y-4">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errorMessage ? 'border-red-300' : 'border-gray-300'
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    {!uploadedFile ? (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <Upload className="h-12 w-12 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Drag and drop your file here, or click to browse
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Supported formats: PDF, DOCX, TXT (Max: 50MB)
                          </p>
                        </div>
                        <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload File
                        </Button>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx,.txt"
                          onChange={handleFileUpload}
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-center">
                          <FileText className="h-12 w-12 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">{uploadedFile.name}</p>
                          <p className="text-xs text-gray-500">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        
                        {uploadProgress < 100 ? (
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-gradient-to-r from-[#8404fc] to-[#4a008e] h-2.5 rounded-full" 
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        ) : (
                          <Button variant="outline" onClick={() => setUploadedFile(null)}>
                            Replace File
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              
              {errorMessage && (
                <div className="flex items-center space-x-2 text-red-500 mt-4 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errorMessage}</span>
                </div>
              )}
              
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleGenerateTasks}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-[#8404fc] to-[#4a008e] text-white hover:opacity-90"
                >
                  {isProcessing ? "Processing..." : "Generate Learning System"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AISyllabusCreator;
