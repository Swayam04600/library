import { Dialog, Transition } from './Transition';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  BookCopy, 
  BarChart3, 
  Calendar, 
  Settings, 
  LogOut,
  Bookmark,
  X,
  ArmchairIcon as ChairIcon,
  Car
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const handleNavigation = () => {
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 md:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose} />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col w-full max-w-xs bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-4">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={onClose}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4 mb-5">
                <Bookmark className="h-8 w-8 text-primary-600" />
                <span className="ml-2 text-xl font-semibold">Libra</span>
              </div>

              <nav className="mt-5 px-2 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    className={({ isActive }) =>
                      `group flex items-center px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                    onClick={handleNavigation}
                  >
                    <item.icon className="mr-4 flex-shrink-0 h-6 w-6" />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                className="flex items-center px-4 py-2 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-100 w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-4 flex-shrink-0 h-6 w-6" />
                Log out
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}