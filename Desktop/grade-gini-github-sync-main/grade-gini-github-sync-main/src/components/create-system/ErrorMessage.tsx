
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="flex items-center space-x-2 text-red-500 text-sm">
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
