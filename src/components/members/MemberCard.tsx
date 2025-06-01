import { Link } from 'react-router-dom';
import { User, BookOpen, Calendar } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatDistanceToNow } from 'date-fns';
import { MemberStatus } from '../../types';

interface MemberCardProps {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  status: MemberStatus;
  booksCheckedOut: number;
  memberSince: Date;
}

export function MemberCard({
  id,
  name,
  email,
  profileImageUrl,
  status,
  booksCheckedOut,
  memberSince,
}: MemberCardProps) {
  const statusColors = {
    active: 'success',
    inactive: 'default',
    suspended: 'danger',
    pending: 'warning',
  } as const;

  return (
    <Link to={`/members/${id}`} className="group block">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group-hover:translate-y-[-4px]">
        <div className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt={`${name} profile`}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-600" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                {name}
              </h3>
              <p className="text-sm text-gray-500 truncate">{email}</p>
              
              <div className="flex items-center mt-2">
                <Badge variant={statusColors[status]} size="sm">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-600">{booksCheckedOut} books</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-600">
                {formatDistanceToNow(memberSince, { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}