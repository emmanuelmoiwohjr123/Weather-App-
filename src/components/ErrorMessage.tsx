import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-center shadow-sm my-4 max-w-md mx-auto">
      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;