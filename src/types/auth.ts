export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'manager' | 'employee' | 'intern';
  isActive: boolean;
  lastLoginAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user: User;
  access_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: 'admin' | 'manager' | 'employee' | 'intern';
  acceptTerms: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}