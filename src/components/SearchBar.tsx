import React, { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="w-full px-4 py-3 pl-10 rounded-full border border-gray-300 dark:border-gray-700 
                    bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                    placeholder-gray-500 dark:placeholder-gray-400
                    shadow-sm transition-all duration-300"
          disabled={isLoading}
        />
        <Search className="absolute left-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700
                    text-white px-4 py-1.5 rounded-full text-sm font-medium
                    transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;