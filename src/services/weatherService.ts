import { WeatherData, WeatherError } from '../types/weather';

// OpenWeatherMap API key
// Users will need to replace this with their own API key from https://openweathermap.org/api
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  if (!API_KEY) {
    throw new Error(
      'No API key provided. Please add your OpenWeatherMap API key to .env file as VITE_OPENWEATHER_API_KEY'
    );
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }

    const data = await response.json();
    return data as WeatherData;
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error('An unknown error occurred');
  }
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const getBackgroundGradient = (
  weatherId: number, 
  sunset: number, 
  sunrise: number, 
  currentTime: number
): string => {
  const isNight = currentTime > sunset || currentTime < sunrise;
  
  // Weather condition codes: https://openweathermap.org/weather-conditions
  // Thunderstorm: 200-299
  if (weatherId >= 200 && weatherId < 300) {
    return isNight 
      ? 'bg-gradient-to-br from-gray-900 to-gray-700' 
      : 'bg-gradient-to-br from-gray-700 to-gray-500';
  }
  
  // Drizzle: 300-399 or Rain: 500-599
  if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
    return isNight 
      ? 'bg-gradient-to-br from-gray-800 to-blue-900' 
      : 'bg-gradient-to-br from-blue-700 to-blue-500';
  }
  
  // Snow: 600-699
  if (weatherId >= 600 && weatherId < 700) {
    return isNight 
      ? 'bg-gradient-to-br from-indigo-900 to-blue-800' 
      : 'bg-gradient-to-br from-blue-100 to-blue-300';
  }
  
  // Atmosphere (fog, mist, etc): 700-799
  if (weatherId >= 700 && weatherId < 800) {
    return isNight 
      ? 'bg-gradient-to-br from-gray-800 to-gray-600' 
      : 'bg-gradient-to-br from-gray-400 to-gray-300';
  }
  
  // Clear: 800
  if (weatherId === 800) {
    return isNight 
      ? 'bg-gradient-to-br from-blue-900 to-indigo-900' 
      : 'bg-gradient-to-br from-blue-400 to-blue-300';
  }
  
  // Clouds: 801-899
  if (weatherId > 800) {
    return isNight 
      ? 'bg-gradient-to-br from-gray-800 to-gray-700' 
      : 'bg-gradient-to-br from-gray-300 to-blue-200';
  }
  
  // Default fallback
  return isNight 
    ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
    : 'bg-gradient-to-br from-blue-500 to-blue-300';
};

export const formatTime = (timestamp: number, timezone: number): string => {
  // Convert to local time based on timezone offset
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};

export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const formatTemperature = (temp: number, unit: 'celsius' | 'fahrenheit'): string => {
  if (unit === 'fahrenheit') {
    return `${Math.round(celsiusToFahrenheit(temp))}°F`;
  }
  return `${Math.round(temp)}°C`;
};