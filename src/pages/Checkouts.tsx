import { useState } from 'react';
import { BookOpen, Filter, AlertTriangle } from 'lucide-react';
import { useCheckouts } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import { CheckoutListItem } from '../components/checkouts/CheckoutListItem';
import { SearchBar } from '../components/ui/SearchBar';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export default function Checkouts() {
  const { checkouts, isLoading } = useCheckouts();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'overdue' | 'returned'>('all');

  // Filter checkouts based on user role
  const userCheckouts = user?.role === 'admin' 
    ? checkouts 
    : checkouts.filter(checkout => checkout.memberId === user?.id);

  const filteredCheckouts = userCheckouts
    .filter(checkout => {
      if (filter === 'all') return true;
      return checkout.status === filter;
    })
    .filter(checkout => 
      checkout.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkout.memberName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const overdueCount = userCheckouts.filter(c => c.status === 'overdue').length;
  const activeCount = userCheckouts.filter(c => c.status === 'active').length;
  const returnedCount = userCheckouts.filter(c => c.status === 'returned').length;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">
          {user?.role === 'admin' ? 'All Checkouts' : 'My Checkouts'}
        </h1>
        
        {user?.role === 'admin' && (
          <div className="flex items-center space-x-2">
            <Button
              variant="primary"
              leftIcon={<BookOpen size={18} />}
              onClick={() => console.log('New checkout')}
            >
              New Checkout
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div 
          className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
            filter === 'active' ? 'border-primary-500' : 'border-primary-200'
          }`}
          onClick={() => setFilter('active')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Checkouts</p>
              <p className="text-2xl font-semibold text-gray-900">{activeCount}</p>
            </div>
            <Badge variant="primary" size="md">
              {Math.round((activeCount / userCheckouts.length) * 100) || 0}%
            </Badge>
          </div>
        </div>
        
        <div 
          className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
            filter === 'overdue' ? 'border-error-500' : 'border-error-200'
          }`}
          onClick={() => setFilter('overdue')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Overdue Books</p>
              <p className="text-2xl font-semibold text-gray-900">{overdueCount}</p>
            </div>
            {overdueCount > 0 && (
              <div className="flex items-center text-error-500">
                <AlertTriangle size={18} className="mr-1" />
                <span>Action needed</span>
              </div>
            )}
          </div>
        </div>
        
        <div 
          className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
            filter === 'returned' ? 'border-success-500' : 'border-success-200'
          }`}
          onClick={() => setFilter('returned')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Returned Books</p>
              <p className="text-2xl font-semibold text-gray-900">{returnedCount}</p>
            </div>
            <Badge variant="success" size="md">
              {Math.round((returnedCount / userCheckouts.length) * 100) || 0}%
            </Badge>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="w-full md:w-auto">
            <SearchBar 
              onSearch={setSearchQuery}
              placeholder="Search by book title..."
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select 
                className="text-sm border border-gray-300 rounded-md px-3 py-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'overdue' | 'returned')}
              >
                <option value="all">All Checkouts</option>
                <option value="active">Active</option>
                <option value="overdue">Overdue</option>
                <option value="returned">Returned</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">Loading checkouts...</p>
        </div>
      ) : filteredCheckouts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No checkouts found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCheckouts.map((checkout) => (
            <CheckoutListItem 
              key={checkout.id} 
              {...checkout} 
              onRenew={checkout.status === 'active' ? (id) => console.log('Renew', id) : undefined}
              onReturn={checkout.status !== 'returned' ? (id) => console.log('Return', id) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}