import apiClient from '@/lib/axios';
import { User, LoginCredentials, RegisterData, LoginResponse, ApiResponse } from '@/types';
import { AxiosResponse } from 'axios';

export const authService = {
  async register(data: RegisterData): Promise<AxiosResponse<LoginResponse>> {
    const response = await apiClient.post('/api/register', data); // ← tambahkan /api
    if (response.data.accessToken) {
      localStorage.setItem('auth_token', response.data.accessToken);
    }
    return response;
  },

  async login(credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> {
    const response = await apiClient.post('/api/login', credentials); // ← /api/login
    if (response.data.accessToken) {
      localStorage.setItem('auth_token', response.data.accessToken);
    }
    return response;
  },

  async logout(): Promise<AxiosResponse<ApiResponse<null>>> {
    const response = await apiClient.post('/api/logout'); // ← /api/logout
    localStorage.removeItem('auth_token');
    return response;
  },

  async getUser(): Promise<AxiosResponse<User>> {
    return apiClient.get('/api/user'); // route kamu di backend: /user
  },

  getToken(): string | null {
    return typeof window !== 'undefined'
      ? localStorage.getItem('auth_token')
      : null;
  },
};
