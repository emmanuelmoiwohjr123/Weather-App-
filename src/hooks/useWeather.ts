import { useState } from 'react';
import { WeatherData, TemperatureUnit } from '../types/weather';
import { fetchWeatherData } from '../services/weatherService';

interface UseWeatherReturn {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  temperatureUnit: TemperatureUnit;
  fetchWeather: (city: string) => Promise<void>;
  toggleTemperatureUnit: () => void;
}

export const useWeather = (): UseWeatherReturn => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');

  const fetchWeather = async (city: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (err) {
      setWeatherData(null);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleTemperatureUnit = (): void => {
    setTemperatureUnit(prev => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  return {
    weatherData,
    loading,
    error,
    temperatureUnit,
    fetchWeather,
    toggleTemperatureUnit
  };
};