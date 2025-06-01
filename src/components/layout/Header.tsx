import { useState, useEffect } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../ui/SearchBar';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-white md:bg-transparent'
      }`}
    >
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Left side - Mobile menu button and logo */}
        <div className="flex items-center">
          <button
            className="md:hidden p-2 mr-2 rounded-full text-gray-600 hover:bg-gray-100"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
          <div className="md:hidden font-semibold text-xl text-primary-600">Libra</div>
        </div>

        {/* Center - Search bar (appears on mobile when search icon is clicked) */}
        <div className={`absolute left-0 right-0 px-4 md:px-6 md:static md:block ${showSearch ? 'top-0 py-3 bg-white z-50' : 'hidden'}`}>
          {showSearch && (
            <SearchBar 
              onClose={() => setShowSearch(false)}
              onSearch={(query) => {
                navigate(`/books?q=${encodeURIComponent(query)}`);
                setShowSearch(false);
              }}
              autoFocus={true}
            />
          )}
        </div>

        {/* Right side - Action icons */}
        <div className="flex items-center gap-1 md:gap-2">
          <button 
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
            onClick={() => setShowSearch(true)}
          >
            <Search size={20} />
          </button>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-error-500 rounded-full w-2 h-2"></span>
          </button>
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}