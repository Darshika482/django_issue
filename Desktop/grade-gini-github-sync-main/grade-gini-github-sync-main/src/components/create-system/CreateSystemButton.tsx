
import React from 'react';
import { Button } from "@/components/ui/button";

interface CreateSystemButtonProps {
  isProcessing: boolean;
  onClick: () => void;
  useAI: boolean;
}

const CreateSystemButton: React.FC<CreateSystemButtonProps> = ({ 
  isProcessing, 
  onClick, 
  useAI 
}) => {
  return (
    <div className="mt-8 flex justify-end">
      <Button
        onClick={onClick}
        disabled={isProcessing}
        className="bg-gradient-to-r from-[#8404fc] to-[#4a008e] text-white hover:opacity-90 py-2 px-6"
      >
        {isProcessing ? "Processing..." : useAI ? "Generate AI Learning System" : "Create Learning System"}
      </Button>
    </div>
  );
};

export default CreateSystemButton;
