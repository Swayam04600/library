import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBook } from '../hooks/useData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import {
  ArrowLeft,
  BookOpen,
  BookCopy,
  Users,
  Calendar,
  Clock,
  Bookmark,
  Edit,
  Trash2,
  Share2,
  Heart,
  QrCode,
} from 'lucide-react';

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { book, isLoading } = useBook(id || '');
  const [activeTab, setActiveTab] = useState<'details' | 'history'>('details');

  if (isLoading) {
    return (
      <div className="animate-fade-in p-4 text-center">
        <p>Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="animate-fade-in p-4 text-center">
        <p>Book not found.</p>
        <Link to="/books" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
          Return to books catalog
        </Link>
      </div>
    );
  }

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
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Link
          to="/books"
          className="mr-4 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Book Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Cover and actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-[3/4] relative">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <Badge
                variant={statusColors[book.status]}
                size="md"
                className="absolute top-4 right-4"
              >
                {statusText[book.status]}
              </Badge>
            </div>

            <div className="p-4 space-y-3">
              {book.status === 'available' ? (
                <Button
                  variant="primary"
                  fullWidth
                  leftIcon={<BookCopy size={18} />}
                  onClick={() => console.log('Checkout book')}
                >
                  Check Out Book
                </Button>
              ) : book.status === 'borrowed' ? (
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<Bookmark size={18} />}
                  onClick={() => console.log('Reserve book')}
                >
                  Reserve Book
                </Button>
              ) : null}

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<Edit size={18} />}
                  onClick={() => console.log('Edit book')}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  leftIcon={<Share2 size={18} />}
                  onClick={() => console.log('Share book')}
                >
                  Share
                </Button>
                <Button
                  variant="ghost"
                  leftIcon={<Heart size={18} />}
                  onClick={() => console.log('Add to favorites')}
                >
                  Save
                </Button>
              </div>

              <Button
                variant="ghost"
                fullWidth
                leftIcon={<QrCode size={18} />}
                onClick={() => console.log('Show QR code')}
              >
                Show QR Code
              </Button>

              <Button
                variant="ghost"
                fullWidth
                leftIcon={<Trash2 size={18} className="text-error-500" />}
                className="text-error-500 hover:bg-error-50"
                onClick={() => console.log('Delete book')}
              >
                Delete Book
              </Button>
            </div>
          </div>
        </div>

        {/* Right column - Book details */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <div className="flex flex-col space-y-1">
                <div className="flex items-start justify-between">
                  <Card.Title>{book.title}</Card.Title>
                  <Badge variant="default" size="md">
                    ISBN: {book.isbn || 'N/A'}
                  </Badge>
                </div>
                <p className="text-gray-500">{book.author}</p>
              </div>
            </Card.Header>

            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'details'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'history'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  Checkout History
                </button>
              </div>
            </div>

            {activeTab === 'details' ? (
              <>
                <Card.Content>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Book Information</h3>
                      <dl className="space-y-3">
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-28">Genre:</dt>
                          <dd className="text-sm text-gray-900">
                            <Badge variant="default" size="sm">
                              {book.genre}
                            </Badge>
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-28">Published:</dt>
                          <dd className="text-sm text-gray-900">{book.publicationYear}</dd>
                        </div>
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-28">Publisher:</dt>
                          <dd className="text-sm text-gray-900">{book.publisher || 'Unknown'}</dd>
                        </div>
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-28">Language:</dt>
                          <dd className="text-sm text-gray-900">{book.language || 'English'}</dd>
                        </div>
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-28">Pages:</dt>
                          <dd className="text-sm text-gray-900">{book.pages || 'Unknown'}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Library Information</h3>
                      <dl className="space-y-3">
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-28">Status:</dt>
                          <dd className="text-sm text-gray-900">
                            <Badge variant={statusColors[book.status]} size="sm">
                              {statusText[book.status]}
                            </Badge>
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-28">Added on:</dt>
                          <dd className="text-sm text-gray-900">May 12, 2023</dd>
                        </div>
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-28">Location:</dt>
                          <dd className="text-sm text-gray-900">Section B, Shelf 3</dd>
                        </div>
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-28">Copies:</dt>
                          <dd className="text-sm text-gray-900">2</dd>
                        </div>
                        <div className="flex">
                          <dt className="text-sm font-medium text-gray-500 w-28">Call Number:</dt>
                          <dd className="text-sm text-gray-900">F SCI-FI 2023.45</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Description</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {book.description ||
                        'No description available for this book. Descriptions provide summaries of the book content, themes, and other relevant information to help readers understand what the book is about.'}
                    </p>
                  </div>
                </Card.Content>

                <Card.Footer className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Last updated: June 5, 2023
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="default" size="sm" className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {book.totalCheckouts || 0} checkouts
                    </Badge>
                    <Badge variant="default" size="sm" className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {book.totalReservations || 0} reservations
                    </Badge>
                  </div>
                </Card.Footer>
              </>
            ) : (
              <Card.Content>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Recent Checkout History</h3>
                    <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                      <option>All Time</option>
                      <option>Last 6 Months</option>
                      <option>Last Year</option>
                    </select>
                  </div>

                  {book.checkoutHistory && book.checkoutHistory.length > 0 ? (
                    <div className="space-y-4">
                      {book.checkoutHistory.map((checkout, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between"
                        >
                          <div className="flex items-center mb-2 md:mb-0">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                              <Users className="h-4 w-4 text-primary-600" />
                            </div>
                            <div>
                              <Link
                                to={`/members/${checkout.memberId}`}
                                className="text-sm font-medium text-gray-900 hover:text-primary-600"
                              >
                                {checkout.memberName}
                              </Link>
                              <p className="text-xs text-gray-500">ID: {checkout.memberId}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6">
                            <div>
                              <div className="flex items-center text-xs text-gray-500">
                                <BookCopy className="h-3 w-3 mr-1" />
                                Checked out
                              </div>
                              <p className="text-sm text-gray-900">{checkout.checkedOutDate}</p>
                            </div>

                            <div>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                Due date
                              </div>
                              <p className="text-sm text-gray-900">{checkout.dueDate}</p>
                            </div>

                            <div>
                              <div className="flex items-center text-xs text-gray-500">
                                <BookOpen className="h-3 w-3 mr-1" />
                                Returned
                              </div>
                              <p className="text-sm text-gray-900">
                                {checkout.returnDate || 'Not returned'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-gray-300 mx-auto" />
                      <p className="mt-2 text-gray-500">
                        This book has not been checked out before.
                      </p>
                    </div>
                  )}
                </div>
              </Card.Content>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}