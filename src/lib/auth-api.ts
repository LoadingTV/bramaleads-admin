import axios, { AxiosInstance, AxiosError } from 'axios';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';

class AuthAPI {
  private api: AxiosInstance;
  private accessToken: string | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      withCredentials: true, // Important for cookies
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as (typeof error.config & { _retry?: boolean });

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshToken();
            return this.api(originalRequest);
          } catch (refreshError) {
            this.clearToken();
            window.location.href = '/auth/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  setToken(token: string) {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  }

  getToken(): string | null {
    if (this.accessToken) return this.accessToken;
    
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('access_token');
    }
    
    return this.accessToken;
  }

  clearToken() {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>('/auth/login', credentials);
      
      if (response.data.access_token) {
        this.setToken(response.data.access_token);
      }
      
      return response.data;
    } catch (error: unknown) {
      let message = 'Login failed';
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }

  async register(credentials: Omit<RegisterCredentials, 'confirmPassword' | 'acceptTerms'>): Promise<AuthResponse> {
    try {
      const payload = {
        fullName: credentials.fullName,
        email: credentials.email,
        password: credentials.password,
         role: credentials.role ?? 'employee',
      };

      console.log('Sending registration payload:', payload); // Для отладки

      const response = await this.api.post<AuthResponse>('/auth/register', payload);

      if (response.data.access_token) {
        this.setToken(response.data.access_token);
      }

      return response.data;
    } catch (error: unknown) {
      let message = 'Registration failed';
      if (axios.isAxiosError(error)) {
        console.error('Registration error details:', error.response?.data); // Для отладки
        message = error.response?.data?.message || error.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearToken();
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/refresh');
    
    if (response.data.access_token) {
      this.setToken(response.data.access_token);
    }
    
    return response.data;
  }

  async validateToken(): Promise<AuthResponse> {
    const response = await this.api.get<AuthResponse>('/auth/validate');
    return response.data;
  }

  async getProfile(): Promise<AuthResponse> {
    const response = await this.api.get<AuthResponse>('/auth/me');
    return response.data;
  }
}

export const authAPI = new AuthAPI();