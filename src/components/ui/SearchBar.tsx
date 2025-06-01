import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClose?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({ 
  onSearch, 
  onClose, 
  placeholder = 'Search for books, members...', 
  autoFocus = false 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          autoFocus={autoFocus}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-12 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 md:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </form>
  );
}