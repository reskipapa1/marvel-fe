import apiClient from '@/lib/axios';
import { User, ApiResponse } from '@/types';
import { AxiosResponse } from 'axios';

export const userService = {
  // Get all users (owner only)
  getAll(): Promise<AxiosResponse<ApiResponse<User[]>>> {
    return apiClient.get('/api/users');
  },

  // Update user (owner only, for admin users)
  update(id: number, data: Partial<User>): Promise<AxiosResponse<ApiResponse<User>>> {
    return apiClient.put(`/api/users/${id}`, data);
  },

  // Delete user (owner only, for admin users)
  delete(id: number): Promise<AxiosResponse<ApiResponse<null>>> {
    return apiClient.delete(`/api/users/${id}`);
  }
};