import { useState } from 'react';
import { UserPlus, Filter, Grid3X3, List } from 'lucide-react';
import { useMembers } from '../hooks/useData';
import { MemberCard } from '../components/members/MemberCard';
import { SearchBar } from '../components/ui/SearchBar';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import { MemberStatus } from '../types';
import { formatDistanceToNow } from 'date-fns';

export default function Members() {
  const { members, isLoading } = useMembers();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<MemberStatus | 'all'>('all');
  const navigate = useNavigate();

  const filteredMembers = members
    .filter(member => filter === 'all' || member.status === filter)
    .filter(member => 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const statusColors = {
    active: 'success',
    inactive: 'default',
    suspended: 'danger',
    pending: 'warning',
  } as const;

  const columns = [
    {
      header: 'Member',
      accessor: (member: typeof members[0]) => member.name,
      sortable: true,
      cell: (member: typeof members[0]) => (
        <div className="flex items-center">
          {member.profileImageUrl ? (
            <img 
              src={member.profileImageUrl} 
              alt={member.name} 
              className="h-10 w-10 rounded-full object-cover mr-3" 
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
              <span className="text-primary-600 font-medium">{member.name.charAt(0)}</span>
            </div>
          )}
          <div>
            <div className="font-medium text-gray-900">{member.name}</div>
            <div className="text-gray-500 text-xs">{member.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      sortable: true,
      cell: (member: typeof members[0]) => (
        <Badge variant={statusColors[member.status]} size="sm">
          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
        </Badge>
      ),
    },
    {
      header: 'Books',
      accessor: 'booksCheckedOut',
      sortable: true,
    },
    {
      header: 'Member Since',
      accessor: 'memberSince',
      sortable: true,
      cell: (member: typeof members[0]) => (
        <span>{formatDistanceToNow(member.memberSince, { addSuffix: true })}</span>
      ),
    },
  ];


  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900">Library Members</h1>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="primary"
            leftIcon={<UserPlus size={18} />}
            onClick={() => console.log('Add new member')}
          >
            Add Member
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="w-full md:w-auto">
            <SearchBar 
              onSearch={setSearchQuery}
              placeholder="Search by name or email..."
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter size={16} className="text-gray-500 mr-2" />
              <select 
                className="text-sm border border-gray-300 rounded-md px-3 py-2"
                value={filter}
                onChange={(e) => setFilter(e.target.value as MemberStatus | 'all')}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
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
          <p className="text-gray-500">Loading members...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No members found matching your search criteria.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredMembers}
            keyExtractor={(member) => member.id}
            onRowClick={(member) => navigate(`/members/${member.id}`)}
          />
        </div>
      )}
    </div>
  );
}