import { Link } from 'react-router-dom';
import { Book, Heart, BookOpen } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { BookStatus } from '../../types';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  status: BookStatus;
  genre: string;
  publicationYear: number;
}

export function BookCard({
  id,
  title,
  author,
  coverUrl,
  status,
  genre,
  publicationYear,
}: BookCardProps) {
  const statusColors = {
    available: 'success',
    borrowed: 'warning',
    processing: 'secondary',
    reserved: 'primary',
    lost: 'danger',
  } as const;

  const statusText = {
    available: 'Available',
    borrowed: 'Borrowed',
    processing: 'Processing',
    reserved: 'Reserved',
    lost: 'Lost',
  };

  return (
    <Link 
      to={`/books/${id}`} 
      className="group block"
    >
      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 h-full hover:shadow-md group-hover:translate-y-[-4px]">
        <div className="aspect-[2/3] overflow-hidden relative">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`${title} cover`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <Book className="h-12 w-12 text-gray-400" />
            </div>
          )}
          <Badge 
            variant={statusColors[status]} 
            size="sm" 
            className="absolute top-2 right-2"
          >
            {statusText[status]}
          </Badge>
          {status === 'available' && (
            <button 
              className="absolute bottom-2 right-2 p-1.5 rounded-full bg-white bg-opacity-90 text-primary-500 hover:text-primary-600"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add to wishlist/favorites
              }}
            >
              <Heart className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{author}</p>
          
          <div className="flex items-center justify-between mt-3">
            <Badge variant="default" size="sm" className="mr-2">
              {genre}
            </Badge>
            <div className="flex items-center text-xs text-gray-500">
              <BookOpen className="h-3 w-3 mr-1" />
              {publicationYear}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}