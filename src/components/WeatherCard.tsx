import React from 'react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { getWeatherIconUrl, formatTemperature, formatTime } from '../services/weatherService';
import WeatherDetails from './WeatherDetails';
import { Sunrise, Sunset } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
  unit: TemperatureUnit;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit }) => {
  const currentWeather = weather.weather[0];
  
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 overflow-hidden">
      {/* Main Weather Card */}
      <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10 dark:border-gray-700/30">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
              {weather.name}
              <span className="text-sm ml-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-0.5 px-2 rounded-full">
                {weather.sys.country}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 capitalize mt-1">
              {currentWeather.description}
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <img 
                src={getWeatherIconUrl(currentWeather.icon)} 
                alt={currentWeather.description}
                className="w-16 h-16"
              />
              <span className="text-4xl font-bold text-gray-900 dark:text-white ml-2">
                {formatTemperature(weather.main.temp, unit)}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <span className="font-medium">
                {formatTemperature(weather.main.temp_max, unit)} / {formatTemperature(weather.main.temp_min, unit)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Sunrise/Sunset Info */}
        <div className="flex justify-center items-center space-x-8 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/50">
          <div className="flex items-center space-x-2">
            <Sunrise className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Sunrise</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatTime(weather.sys.sunrise, weather.timezone)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Sunset className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Sunset</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatTime(weather.sys.sunset, weather.timezone)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Weather Details */}
      <WeatherDetails weather={weather} unit={unit} />
    </div>
  );
};

export default WeatherCard;