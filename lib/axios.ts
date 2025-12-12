import axios, { AxiosInstance, AxiosError } from 'axios';

const rawBaseURL = process.env.NEXT_PUBLIC_API_URL;

if (!rawBaseURL) {
  console.warn('NEXT_PUBLIC_API_URL is not defined');
}

// PENTING: pastikan selalu ada /api
const baseURL = rawBaseURL?.endsWith('/api')
  ? rawBaseURL
  : `${rawBaseURL}/api`;

const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true as any,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error(
      'API Error:',
      error.response?.status,
      error.message,
      error.response?.config?.url,
    );

    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }

    return Promise.reject(error);
  },
);

export default apiClient;
