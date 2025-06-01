import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMember } from '../hooks/useData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { CheckoutListItem } from '../components/checkouts/CheckoutListItem';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Edit,
  Trash2,
  AlertTriangle,
  Clock,
  BookCheck,
  FileText,
} from 'lucide-react';
import { format } from 'date-fns';

export default function MemberDetails() {
  const { id } = useParams<{ id: string }>();
  const { member, isLoading } = useMember(id || '');
  const [activeTab, setActiveTab] = useState<'details' | 'checkouts' | 'history'>('details');

  if (isLoading) {
    return (
      <div className="animate-fade-in p-4 text-center">
        <p>Loading member details...</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="animate-fade-in p-4 text-center">
        <p>Member not found.</p>
        <Link to="/members" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
          Return to members list
        </Link>
      </div>
    );
  }

  const statusColors = {
    active: 'success',
    inactive: 'default',
    suspended: 'danger',
    pending: 'warning',
  } as const;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Link
          to="/members"
          className="mr-4 p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Member Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Profile and actions */}
        <div className="lg:col-span-1">
          <Card>
            <Card.Content className="p-6 flex flex-col items-center text-center">
              {member.profileImageUrl ? (
                <img
                  src={member.profileImageUrl}
                  alt={`${member.name} profile`}
                  className="h-32 w-32 rounded-full object-cover shadow-sm"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-primary-100 flex items-center justify-center shadow-sm">
                  <User className="h-16 w-16 text-primary-600" />
                </div>
              )}
              
              <h2 className="text-xl font-semibold text-gray-900 mt-4">{member.name}</h2>
              <p className="text-gray-500">{member.email}</p>
              
              <Badge variant={statusColors[member.status]} className="mt-3">
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </Badge>
              
              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 w-full">
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center justify-center">
                    <BookOpen className="mr-1 h-4 w-4" />
                    Books
                  </dt>
                  <dd className="mt-1 text-xl font-semibold text-gray-900">{member.booksCheckedOut}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500 flex items-center justify-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    Member Since
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-900">
                    {format(member.memberSince, 'MMM d, yyyy')}
                  </dd>
                </div>
              </dl>
            </Card.Content>
            
            <Card.Footer className="flex flex-col space-y-3">
              <Button
                variant="primary"
                fullWidth
                leftIcon={<BookOpen size={18} />}
                onClick={() => console.log('Check out book')}
              >
                Check Out Book
              </Button>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  fullWidth
                  leftIcon={<Edit size={18} />}
                  onClick={() => console.log('Edit member')}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  leftIcon={<Trash2 size={18} className="text-error-500" />}
                  className="text-error-500 hover:bg-error-50"
                  onClick={() => console.log('Delete member')}
                >
                  Remove
                </Button>
              </div>
              
              {member.status === 'active' ? (
                <Button
                  variant="ghost"
                  fullWidth
                  leftIcon={<AlertTriangle size={18} className="text-warning-500" />}
                  className="text-warning-500 hover:bg-warning-50"
                  onClick={() => console.log('Suspend member')}
                >
                  Suspend Member
                </Button>
              ) : member.status === 'suspended' ? (
                <Button
                  variant="ghost"
                  fullWidth
                  leftIcon={<BookCheck size={18} className="text-success-500" />}
                  className="text-success-500 hover:bg-success-50"
                  onClick={() => console.log('Reactivate member')}
                >
                  Reactivate Member
                </Button>
              ) : null}
            </Card.Footer>
          </Card>
        </div>

        {/* Right column - Member details */}
        <div className="lg:col-span-2">
          <Card>
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
                    activeTab === 'checkouts'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('checkouts')}
                >
                  Current Checkouts
                </button>
                <button
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'history'
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  History
                </button>
              </div>
            </div>

            {activeTab === 'details' && (
              <Card.Content>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Personal Information</h3>
                    <dl className="space-y-3">
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-28 flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Name:
                        </dt>
                        <dd className="text-sm text-gray-900">{member.name}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-28 flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          Email:
                        </dt>
                        <dd className="text-sm text-gray-900">{member.email}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-28 flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          Phone:
                        </dt>
                        <dd className="text-sm text-gray-900">{member.phone || 'Not provided'}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-28 flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          Address:
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {member.address || 'Not provided'}
                        </dd>
                      </div>
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-28 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Birthdate:
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {member.birthdate
                            ? format(member.birthdate, 'MMM d, yyyy')
                            : 'Not provided'}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Library Information</h3>
                    <dl className="space-y-3">
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-28 flex items-center">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Books Out:
                        </dt>
                        <dd className="text-sm text-gray-900">{member.booksCheckedOut}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-28 flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          Overdue:
                        </dt>
                        <dd className="text-sm text-gray-900">{member.overdueBooks || 0}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-28 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Join Date:
                        </dt>
                        <dd className="text-sm text-gray-900">{format(member.memberSince, 'MMM d, yyyy')}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-28 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Member ID:
                        </dt>
                        <dd className="text-sm text-gray-900">{member.id}</dd>
                      </div>
                      <div className="flex">
                        <dt className="text-sm font-medium text-gray-500 w-28 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Fees Due:
                        </dt>
                        <dd className="text-sm text-gray-900">${member.feesDue || '0.00'}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {member.notes && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Notes</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {member.notes}
                    </p>
                  </div>
                )}
              </Card.Content>
            )}

            {activeTab === 'checkouts' && (
              <Card.Content>
                {member.currentCheckouts && member.currentCheckouts.length > 0 ? (
                  <div className="space-y-4">
                    {member.currentCheckouts.map((checkout) => (
                      <CheckoutListItem
                        key={checkout.id}
                        {...checkout}
                        onRenew={(id) => console.log('Renew', id)}
                        onReturn={(id) => console.log('Return', id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto" />
                    <p className="mt-2 text-gray-500">No active checkouts</p>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<BookOpen size={16} />}
                      className="mt-4"
                      onClick={() => console.log('Check out book')}
                    >
                      Check Out a Book
                    </Button>
                  </div>
                )}
              </Card.Content>
            )}

            {activeTab === 'history' && (
              <Card.Content>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-900">Checkout History</h3>
                  <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                    <option>All Time</option>
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>

                {member.checkoutHistory && member.checkoutHistory.length > 0 ? (
                  <div className="space-y-4">
                    {member.checkoutHistory.map((checkout) => (
                      <CheckoutListItem key={checkout.id} {...checkout} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-gray-300 mx-auto" />
                    <p className="mt-2 text-gray-500">No checkout history</p>
                  </div>
                )}
              </Card.Content>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}