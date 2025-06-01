import { BookOpen, UserCircle, Calendar, AlertCircle } from 'lucide-react';
import { formatDistanceToNow, format, isPast, isWithinDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface CheckoutListItemProps {
  id: string;
  bookId: string;
  bookTitle: string;
  bookCover?: string;
  memberId: string;
  memberName: string;
  checkedOutDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'active' | 'overdue' | 'returned';
  onRenew?: (id: string) => void;
  onReturn?: (id: string) => void;
}

export function CheckoutListItem({
  id,
  bookId,
  bookTitle,
  bookCover,
  memberId,
  memberName,
  checkedOutDate,
  dueDate,
  returnDate,
  status,
  onRenew,
  onReturn,
}: CheckoutListItemProps) {
  const isOverdue = status === 'overdue' || (status === 'active' && isPast(dueDate));
  const isNearlyDue = status === 'active' && !isPast(dueDate) && isWithinDays(dueDate, new Date(), 3);
  
  const statusColors = {
    active: isNearlyDue ? 'warning' : 'primary',
    overdue: 'danger',
    returned: 'success',
  } as const;

  const statusText = {
    active: isNearlyDue ? 'Due Soon' : 'Active',
    overdue: 'Overdue',
    returned: 'Returned',
  };

  function isWithinDays(date: Date, baseDate: Date, days: number) {
    const diffTime = date.getTime() - baseDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= days;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            {bookCover ? (
              <img
                src={bookCover}
                alt={bookTitle}
                className="h-16 w-12 object-cover rounded"
              />
            ) : (
              <div className="h-16 w-12 bg-gray-200 rounded flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">
              <Link to={`/books/${bookId}`} className="hover:text-primary-600 transition-colors">
                {bookTitle}
              </Link>
            </h3>
            
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <UserCircle className="h-4 w-4 mr-1.5" />
              <Link to={`/members/${memberId}`} className="hover:text-primary-600 transition-colors">
                {memberName}
              </Link>
            </div>
          </div>
        </div>
        
        <Badge variant={statusColors[status]} size="md">
          {statusText[status]}
        </Badge>
      </div>
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-y-2 text-sm">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-700">Checked out: </span>
          <span className="ml-1 text-gray-900">{format(checkedOutDate, 'MMM d, yyyy')}</span>
        </div>
        
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-gray-700">Due: </span>
          <span className={`ml-1 ${isOverdue ? 'text-error-600 font-medium' : 'text-gray-900'}`}>
            {format(dueDate, 'MMM d, yyyy')}
            {isOverdue && (
              <span className="ml-1.5">
                ({formatDistanceToNow(dueDate, { addSuffix: true })})
              </span>
            )}
          </span>
        </div>
        
        {returnDate && (
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-gray-700">Returned: </span>
            <span className="ml-1 text-gray-900">{format(returnDate, 'MMM d, yyyy')}</span>
          </div>
        )}
        
        {isOverdue && !returnDate && (
          <div className="flex items-center text-error-600">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span>Overdue fee may apply</span>
          </div>
        )}
      </div>
      
      {status !== 'returned' && (
        <div className="mt-4 flex space-x-3 justify-end">
          {status === 'active' && onRenew && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRenew(id)}
            >
              Renew
            </Button>
          )}
          
          {onReturn && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onReturn(id)}
            >
              Return
            </Button>
          )}
        </div>
      )}
    </div>
  );
}