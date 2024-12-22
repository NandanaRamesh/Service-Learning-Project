// LoadingSpinner.tsx
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-200 rounded-lg p-4">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 h-12 w-12"></div>
    </div>
  );
};

export default LoadingSpinner;
