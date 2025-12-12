import apiClient from '@/lib/axios';
import { User, LoginCredentials, RegisterData, LoginResponse, ApiResponse } from '@/types';
import { AxiosResponse } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
    console.error("❌ NEXT_PUBLIC_API_URL is not defined");
}

export const authService = {
    async register(data: RegisterData): Promise<AxiosResponse<LoginResponse>> {
        const response = await apiClient.post(`${BASE_URL}/auth/register`, data);

        if (response.data.accessToken) {
            localStorage.setItem("auth_token", response.data.accessToken);
        }

        return response;
    },

    async login(credentials: LoginCredentials): Promise<AxiosResponse<LoginResponse>> {
        const response = await apiClient.post(`${BASE_URL}/auth/login`, credentials);

        if (response.data.accessToken) {
            localStorage.setItem("auth_token", response.data.accessToken);
        }

        return response;
    },

    async logout(): Promise<AxiosResponse<ApiResponse<null>>> {
        const token = localStorage.getItem("auth_token");

        const response = await apiClient.post(
            `${BASE_URL}/auth/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        localStorage.removeItem("auth_token");
        return response;
    },

    async getUser(): Promise<AxiosResponse<User>> {
        const token = localStorage.getItem("auth_token");

        return apiClient.get(`${BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    getToken(): string | null {
        return (typeof window !== 'undefined') ? localStorage.getItem('auth_token') : null;
    }
};
