'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/auth-api';
import { User, AuthContextType, LoginCredentials, RegisterCredentials } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = authAPI.getToken();
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Validate token and get user profile
      const response = await authAPI.getProfile();
      setUser(response.user);
    } catch (error) {
      console.error('Auth initialization error:', error);
      authAPI.clearToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(credentials);
      setUser(response.user);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message || 'Login failed');
      }
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
  try {
    setIsLoading(true);

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (!credentials.acceptTerms) {
      throw new Error('You must accept the terms of service');
    }

    const response = await authAPI.register({
  fullName: credentials.fullName,
  email: credentials.email,
  password: credentials.password,
  role: credentials.role,
});


    setUser(response.user);
    router.push('/');
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Registration failed');
    }
    throw new Error('Registration failed');
  } finally {
    setIsLoading(false);
  }
};

  const logout = async () => {
    try {
      setIsLoading(true);
      await authAPI.logout();
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAuth = async () => {
    try {
      const response = await authAPI.refreshToken();
      setUser(response.user);
    } catch (error) {
      console.error('Auth refresh error:', error);
      setUser(null);
      authAPI.clearToken();
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};