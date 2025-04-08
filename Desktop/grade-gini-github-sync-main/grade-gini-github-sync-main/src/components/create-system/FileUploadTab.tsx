
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText } from 'lucide-react';

interface FileUploadTabProps {
  uploadedFile: File | null;
  uploadProgress: number;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setUploadedFile: (file: File | null) => void;
  errorMessage: string;
  activeTab: string;
}

const FileUploadTab: React.FC<FileUploadTabProps> = ({
  uploadedFile,
  uploadProgress,
  handleDragOver,
  handleDrop,
  handleFileUpload,
  setUploadedFile,
  errorMessage,
  activeTab
}) => {
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        errorMessage && activeTab === "file-upload" ? 'border-red-300' : 'border-gray-300'
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
  );
};

export default FileUploadTab;
