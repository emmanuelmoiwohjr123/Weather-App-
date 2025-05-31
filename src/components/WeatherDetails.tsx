import React from 'react';
import { Wind, Droplets, Thermometer } from 'lucide-react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { formatTemperature } from '../services/weatherService';

interface WeatherDetailsProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather, unit }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mx-auto mt-6">
      <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-3 shadow-sm border border-white/10 dark:border-gray-700/30">
        <div className="bg-blue-500/20 dark:bg-blue-500/10 p-2 rounded-full">
          <Thermometer className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Feels Like</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatTemperature(weather.main.feels_like, unit)}
          </p>
        </div>
      </div>

      <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-3 shadow-sm border border-white/10 dark:border-gray-700/30">
        <div className="bg-green-500/20 dark:bg-green-500/10 p-2 rounded-full">
          <Droplets className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Humidity</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {weather.main.humidity}%
          </p>
        </div>
      </div>

      <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-3 shadow-sm border border-white/10 dark:border-gray-700/30">
        <div className="bg-purple-500/20 dark:bg-purple-500/10 p-2 rounded-full">
          <Wind className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Wind Speed</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {Math.round(weather.wind.speed * 3.6)} km/h
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;