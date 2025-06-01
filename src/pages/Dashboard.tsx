import { BookOpen, Users, BookCheck, Clock, BookMarked, BarChart } from 'lucide-react';
import { StatCard } from '../components/stats/StatCard';
import { BookCard } from '../components/books/BookCard';
import { CheckoutListItem } from '../components/checkouts/CheckoutListItem';
import { useBooks, useCheckouts, useMembers } from '../hooks/useData';
import { format, addDays, subDays } from 'date-fns';

export default function Dashboard() {
  const { books } = useBooks();
  const { checkouts } = useCheckouts();
  const { members } = useMembers();
  
  const recentBooks = books.slice(0, 4);
  const upcomingReturns = checkouts
    .filter(checkout => checkout.status === 'active')
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .slice(0, 3);

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Books"
          value={books.length}
          icon={<BookOpen className="h-5 w-5" />}
          change={4}
        />
        <StatCard
          title="Active Members"
          value={members.filter(m => m.status === 'active').length}
          icon={<Users className="h-5 w-5" />}
          change={2}
        />
        <StatCard
          title="Books Borrowed"
          value={checkouts.filter(c => c.status === 'active').length}
          icon={<BookCheck className="h-5 w-5" />}
          change={-1}
        />
        <StatCard
          title="Overdue Books"
          value={checkouts.filter(c => c.status === 'overdue').length}
          icon={<Clock className="h-5 w-5" />}
          change={-3}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Monthly Statistics</h2>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-2">
                <option>Last 30 days</option>
                <option>Last 60 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-12 w-12 text-gray-300 mx-auto" />
                <p className="text-gray-500 mt-2">Chart visualization would appear here</p>
                <p className="text-sm text-gray-400">Showing data from {format(subDays(new Date(), 30), 'MMM d')} to {format(new Date(), 'MMM d')}</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Returns</h2>
              <a href="/checkouts" className="text-sm text-primary-600 hover:text-primary-700">
                View all
              </a>
            </div>
            
            <div className="space-y-4">
              {upcomingReturns.length > 0 ? (
                upcomingReturns.map(checkout => (
                  <CheckoutListItem
                    key={checkout.id}
                    {...checkout}
                    onRenew={(id) => console.log('Renew', id)}
                    onReturn={(id) => console.log('Return', id)}
                  />
                ))
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <BookCheck className="h-8 w-8 text-gray-300 mx-auto" />
                  <p className="mt-2 text-gray-500">No upcoming returns</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recently Added Books</h2>
            <a href="/books" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {recentBooks.map(book => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
          
          <div className="mt-6 bg-primary-50 rounded-lg p-4 border border-primary-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <BookMarked className="h-5 w-5 text-primary-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-primary-800">New Acquisitions</h3>
                <p className="mt-1 text-sm text-primary-700">
                  10 new books will be added to the collection next week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}