
import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';

interface ApiGuideSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApiGuideSheet: React.FC<ApiGuideSheetProps> = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
          <Info className="h-3 w-3" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Google AI API Guide</SheetTitle>
          <SheetDescription>
            How to get and use your Google AI API key
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4 text-sm">
          <h3 className="font-medium">Getting your API key:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Go to <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google AI Studio</a></li>
            <li>Sign in with your Google account</li>
            <li>Get an API key or create a new one</li>
            <li>Copy the API key</li>
            <li>Paste it in the API key dialog in this app</li>
          </ol>
          <p className="mt-4">Your API key will be stored securely in your browser's local storage and will only be used to make API calls to Google's AI services.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ApiGuideSheet;
