import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Bookmark, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'member']),
  rememberMe: z.boolean().default(false)
});

type LoginForm = z.infer<typeof loginSchema>;

const DEMO_CREDENTIALS = {
  admin: 'admin@libra.com',
  member: 'john@example.com'
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'member',
      rememberMe: false
    }
  });

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(user.role === 'admin' ? '/admin' : from);
    }
  }, [user, navigate, location]);

  const onSubmit = async (data: LoginForm) => {
    try {
      if (loginAttempts >= 5) {
        setError('Too many login attempts. Please try again later.');
        return;
      }

      setIsLoading(true);
      setError('');
      await login(data);
    } catch (error) {
      setLoginAttempts(prev => prev + 1);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoCredentials = (type: 'admin' | 'member') => {
    setValue('email', DEMO_CREDENTIALS[type]);
    setValue('password', 'password123');
    setValue('role', type);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Bookmark className="h-12 w-12 text-primary-600" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Welcome to Libra
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Library Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <Card.Content>
            {error && (
              <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-md" role="alert">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-error-500 mr-2" aria-hidden="true" />
                  <p className="text-sm text-error-500">{error}</p>
                </div>
              </div>
            )}

            <div className="mb-6 space-y-2">
              <p className="text-sm text-gray-600">Demo Accounts:</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setDemoCredentials('admin')}
                >
                  Admin Login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => setDemoCredentials('member')}
                >
                  Member Login
                </Button>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-error-500" role="alert">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register('password')}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-error-500" role="alert">{errors.password.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  For demo, any password with 6+ characters will work
                </p>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Login as
                </label>
                <select
                  id="role"
                  {...register('role')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                  <option value="member">Member</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    {...register('rememberMe')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link 
                    to="/forgot-password" 
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={loginAttempts >= 5}
                aria-label={isLoading ? 'Signing in...' : 'Sign in'}
              >
                Sign in
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have an account? </span>
                <Link 
                  to="/register" 
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}