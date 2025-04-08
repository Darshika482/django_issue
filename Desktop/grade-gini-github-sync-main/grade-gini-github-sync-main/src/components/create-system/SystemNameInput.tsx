
import React from 'react';
import { Label } from "@/components/ui/label";

interface SystemNameInputProps {
  systemName: string;
  setSystemName: (name: string) => void;
}

const SystemNameInput: React.FC<SystemNameInputProps> = ({ systemName, setSystemName }) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="system-name">System Name</Label>
      <input
        id="system-name"
        type="text"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder="e.g., Biology 101, Spanish Fluency..."
        value={systemName}
        onChange={(e) => setSystemName(e.target.value)}
      />
    </div>
  );
};

export default SystemNameInput;
