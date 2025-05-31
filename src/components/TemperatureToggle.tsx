import React from 'react';
import { TemperatureUnit } from '../types/weather';

interface TemperatureToggleProps {
  unit: TemperatureUnit;
  onToggle: () => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="flex items-center justify-center space-x-2 mt-2">
      <span className={`text-sm ${unit === 'celsius' ? 'font-bold text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
        °C
      </span>
      <button
        onClick={onToggle}
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800"
        aria-pressed={unit === 'fahrenheit'}
      >
        <span
          className={`${
            unit === 'fahrenheit' ? 'bg-blue-500 dark:bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
          } inline-block h-6 w-11 rounded-full transition-colors duration-200 ease-in-out`}
        />
        <span
          className={`${
            unit === 'fahrenheit' ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
        />
      </button>
      <span className={`text-sm ${unit === 'fahrenheit' ? 'font-bold text-blue-500 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
        °F
      </span>
    </div>
  );
};

export default TemperatureToggle;