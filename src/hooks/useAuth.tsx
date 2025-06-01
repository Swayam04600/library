import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'member';
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string; role: 'admin' | 'member'; rememberMe?: boolean }) => Promise<void>;
  logout: () => Promise<void>;
}

// Demo accounts
const DEMO_ACCOUNTS = {
  admin: {
    id: '1',
    email: 'admin@libra.com',
    password: 'password123',
    role: 'admin' as const,
    name: 'Admin User'
  },
  member: {
    id: '2',
    email: 'john@example.com',
    password: 'password123',
    role: 'member' as const,
    name: 'John Smith'
  }
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const userData = JSON.parse(storedAuth);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('auth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: { 
    email: string; 
    password: string; 
    role: 'admin' | 'member';
    rememberMe?: boolean;
  }) => {
    setLoading(true);
    
    try {
      // Demo authentication logic
      const demoUser = Object.values(DEMO_ACCOUNTS).find(
        account => account.email === credentials.email && account.role === credentials.role
      );

      if (!demoUser || credentials.password.length < 6) {
        throw new Error('Invalid credentials');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const userData = {
        id: demoUser.id,
        email: demoUser.email,
        role: demoUser.role,
        name: demoUser.name
      };

      setUser(userData);

      if (credentials.rememberMe) {
        localStorage.setItem('auth', JSON.stringify(userData));
      }

      // Redirect based on role
      const from = location.state?.from?.pathname || '/';
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from === '/login' ? '/' : from);
      }
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}