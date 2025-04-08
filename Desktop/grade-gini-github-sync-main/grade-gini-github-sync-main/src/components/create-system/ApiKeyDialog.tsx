
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  onSave: () => void;
  onContinueWithoutAI: () => void;
}

const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ 
  open, 
  onOpenChange, 
  apiKey, 
  setApiKey, 
  onSave,
  onContinueWithoutAI
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Google AI API Key</DialogTitle>
          <DialogDescription>
            Enter your Google AI API key to generate learning content. You can get one from the Google AI Studio.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Label htmlFor="api-key" className="text-right">
            API Key
          </Label>
          <Input
            id="api-key"
            placeholder="AIza..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="col-span-3"
          />
          <p className="text-xs text-gray-500">
            Your API key will be stored in your browser's local storage. It's only used to make API calls to Google's servers.
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open('https://makersuite.google.com/app/apikey', '_blank')}
            className="self-start"
          >
            Get an API key
          </Button>
        </div>
        <DialogFooter>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onContinueWithoutAI}
          >
            Continue Without AI
          </Button>
          <Button type="submit" onClick={onSave}>Save Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
