import { useState, useEffect } from 'react';
import { authAPI } from '@/lib/auth-api';
import { User } from '@/types/auth';

export const useAuthHook = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const token = authAPI.getToken();
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await authAPI.getProfile();
      setUser(response.user);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      authAPI.clearToken();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

const login = async (email: string, password: string) => {
  try {
    setError(null);
    setIsLoading(true);
    const response = await authAPI.login({ email, password });
    setUser(response.user);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
      throw err;
    } else {
      setError('An unknown error occurred');
      throw new Error('An unknown error occurred');
    }
  } finally {
    setIsLoading(false);
  }
};

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      authAPI.clearToken();
    }
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    checkAuthStatus,
  };
};
