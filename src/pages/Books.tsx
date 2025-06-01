import { useState } from 'react';
import { BookPlus, Filter, Grid3X3, List } from 'lucide-react';
import { useBooks } from '../hooks/useData';
import { BookCard } from '../components/books/BookCard';
import { SearchBar } from '../components/ui/SearchBar';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { BookStatus } from '../types';

export default function Books() {
  const { books, isLoading } = useBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<BookStatus | 'all'>('all');
  const navigate = useNavigate();

  const filteredBooks = books
    .filter(book => filter === 'all' || book.status === filter)
    .filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

  const columns = [
    {
      header: 'Title',
      accessor: 'title',
      sortable: true,
      cell: (book: typeof books[0]) => (
        <div className="flex items-center">
          {book.coverUrl ? (
            <img 
              src={book.coverUrl} 
              alt={book.title} 
              className="h-10 w-8 object-cover rounded mr-3" 
            />
          ) : (
            <div className="h-10 w-8 bg-gray-200 rounded flex items-center justify-center mr-3">
              <span className="text-xs text-gray-500">No img</span>
            </div>
          )}
          <span className="font-medium text-gray-900">{book.title}</span>
        </div>
      ),
    },
    {
      header: 'Author',
      accessor: 'author',
      sortable: true,
    },
    {
      header: 'Genre',
      accessor: 'genre',
      sortable: true,
      cell: (book: typeof books[0]) => (
        <Badge variant="default" size="sm">
          {book.genre}
        </Badge>
      ),
    },
    {
      header: 'Year',
      accessor: 'publicationYear',
      sortable: true,
    },
    {
      header: 'Status',
      accessor: 'status',
      sortable: true,
      cell: (book: typeof books[0]) => (
        <Badge variant={statusColors[book.status]} size="sm">
          {statusText[book.status]}
        </Badge>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Books Catalog</h1>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="primary"
            leftIcon={<BookPlus size={18} />}
            onClick={() => console.log('Add new book')}
          >
            Add Book
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="w-full md:w-auto">
            <SearchBar 
              onSearch={setSearchQuery}
              placeholder="Search by title, author, or genre..."
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select 
                className="text-sm border border-gray-300 rounded-md px-3 py-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value as BookStatus | 'all')}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="borrowed">Borrowed</option>
                <option value="reserved">Reserved</option>
                <option value="processing">Processing</option>
                <option value="lost">Lost</option>
              </select>
            </div>
            
            <div className="border-l border-gray-300 h-6 mx-2 hidden md:block"></div>
            
            <div className="flex rounded-md overflow-hidden border border-gray-300">
              <button
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">Loading books...</p>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No books found matching your search criteria.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredBooks}
            keyExtractor={(book) => book.id}
            onRowClick={(book) => navigate(`/books/${book.id}`)}
          />
        </div>
      )}
    </div>
  );
}