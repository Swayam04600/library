import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { BookOpen, Users, BookCopy, BarChart3, Calendar, Settings, LogOut, Bookmark, ArmchairIcon as ChairIcon, Car, UserPlus } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = '' }: SidebarProps) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const navItems = [
    { name: 'Dashboard', icon: BarChart3, path: isAdmin ? '/admin' : '/' },
    { name: 'Books', icon: BookOpen, path: isAdmin ? '/admin/books' : '/books' },
    ...(isAdmin ? [
      { name: 'Members', icon: Users, path: '/admin/members' },
      { name: 'All Checkouts', icon: BookCopy, path: '/admin/checkouts' },
      { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ] : [
      { name: 'My Checkouts', icon: BookCopy, path: '/checkouts' },
      { name: 'Seat Reservation', icon: ChairIcon, path: '/seats' },
      { name: 'Parking', icon: Car, path: '/parking' },
    ]),
  ];

  return (
    <aside className={`w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col ${className}`}>
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center">
          <Bookmark className="h-8 w-8 text-primary-600" />
          <h1 className="ml-2 text-2xl font-semibold text-gray-900">Libra</h1>
        </div>
        <p className="text-sm text-gray-500 mt-1">Library Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button 
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => logout()}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Log out
        </button>
      </div>
    </aside>
  );
}