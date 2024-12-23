import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = () => {
    // Simulate fetching results from an API
    if (query.trim() !== '') {
      const mockResults = [
        'Post 1 related to ' + query,
        'Post 2 related to ' + query,
        'Post 3 related to ' + query,
      ];
      setResults(mockResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
     
      <div className="flex items-center space-x-2">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Type something to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
        />

        {/* Search Icon */}
        <button
          onClick={handleSearch}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-r-md flex items-center justify-center"
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </div>

      {/* Results Section */}
      <div className="mt-6">
        
        {results.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {results.map((result, index) => (
              <li key={index} className="text-gray-700">
                {result}
              </li>
            ))}
          </ul>
        ) : (
          query && <p className="text-gray-500">No results found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default Search;
