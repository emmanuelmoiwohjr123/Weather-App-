import React, { useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import TemperatureToggle from './components/TemperatureToggle';
import ThemeToggle from './components/ThemeToggle';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './context/ThemeContext';
import { getBackgroundGradient } from './services/weatherService';
import { CloudRain, CloudSun } from 'lucide-react';

function App() {
  const { weatherData, loading, error, temperatureUnit, fetchWeather, toggleTemperatureUnit } = useWeather();
  const { isDarkMode, toggleTheme } = useTheme();

  // Get dynamic background based on weather conditions
  const backgroundClass = weatherData
    ? getBackgroundGradient(
        weatherData.weather[0].id,
        weatherData.sys.sunset,
        weatherData.sys.sunrise,
        weatherData.dt
      )
    : 'bg-gradient-to-br from-blue-400 to-blue-300 dark:from-gray-800 dark:to-gray-900';

  // Try to get the user's location on first load
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
              );
              const data = await response.json();
              if (data && data.length > 0) {
                fetchWeather(data[0].name);
              }
            } catch (err) {
              console.error('Error getting location data:', err);
            }
          },
          (err) => {
            console.error('Error getting location:', err);
          }
        );
      }
    };

    // Don't auto-request location to avoid permission dialogs on load
    // getLocation();
  }, []);

  return (
    <div className={`min-h-screen ${backgroundClass} transition-colors duration-500`}>
      <div className="min-h-screen px-4 py-8 md:py-12 bg-transparent transition-all duration-500">
        <header className="max-w-4xl mx-auto flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="bg-white/20 dark:bg-gray-800/30 backdrop-blur-lg p-2 rounded-lg mr-3">
              {isDarkMode ? (
                <CloudRain className="h-7 w-7 text-blue-400" />
              ) : (
                <CloudSun className="h-7 w-7 text-amber-500" />
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white dark:text-white">
              Weather<span className="text-blue-300 dark:text-blue-400">Cast</span>
            </h1>
          </div>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </header>

        <main className="max-w-4xl mx-auto space-y-6">
          <SearchBar onSearch={fetchWeather} isLoading={loading} />
          
          {loading && <LoadingSpinner />}
          
          {error && <ErrorMessage message={error} />}
          
          {!loading && !error && weatherData && (
            <>
              <WeatherCard weather={weatherData} unit={temperatureUnit} />
              <div className="flex justify-center mt-4">
                <TemperatureToggle 
                  unit={temperatureUnit} 
                  onToggle={toggleTemperatureUnit} 
                />
              </div>
            </>
          )}
          
          {!loading && !error && !weatherData && (
            <div className="text-center text-white dark:text-gray-300 mt-16">
              <p className="text-lg">Search for a city to see the weather</p>
            </div>
          )}
        </main>
        
        <footer className="mt-auto pt-8 text-center text-sm text-white/70 dark:text-gray-400">
          <p>
            Powered by{' '}
            <a 
              href="https://openweathermap.org/api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 dark:text-blue-400 hover:underline"
            >
              OpenWeatherMap API
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;