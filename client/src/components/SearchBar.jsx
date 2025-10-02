import React, { useState } from 'react';

const SearchBar = ({ onSearch, onClear, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contacts by name, email, or phone..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            isLoading || !searchTerm.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 cursor-pointer'
          } text-white`}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-colors cursor-pointer"
            disabled={isLoading}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
