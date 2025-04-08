
import React from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface DashboardErrorProps {
  onRefresh: () => Promise<void>;
  isRefreshing: boolean;
}

const DashboardError: React.FC<DashboardErrorProps> = ({ onRefresh, isRefreshing }) => {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTitle>Error loading data</AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <span>There was a problem loading your data. Please try refreshing.</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default DashboardError;
