
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Key } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import ApiGuideSheet from './ApiGuideSheet';

interface AiToggleProps {
  useAI: boolean;
  setUseAI: (use: boolean) => void;
  openApiKeyDialog: () => void;
  showApiGuide: boolean;
  setShowApiGuide: (show: boolean) => void;
}

const AiToggle: React.FC<AiToggleProps> = ({ 
  useAI, 
  setUseAI, 
  openApiKeyDialog,
  showApiGuide,
  setShowApiGuide
}) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="use-ai"
          checked={useAI}
          onChange={(e) => setUseAI(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
        />
        <Label htmlFor="use-ai" className="flex items-center gap-1 text-sm font-normal cursor-pointer">
          Use AI to generate learning modules and tasks
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              openApiKeyDialog();
            }}
          >
            <Key className="h-3 w-3" />
          </Button>
          <ApiGuideSheet open={showApiGuide} onOpenChange={setShowApiGuide} />
        </Label>
      </div>

      {useAI && (
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle>AI-powered content generation</AlertTitle>
          <AlertDescription>
            Using Google's Gemini AI to generate learning modules and tasks. Make sure you have a valid API key.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default AiToggle;
