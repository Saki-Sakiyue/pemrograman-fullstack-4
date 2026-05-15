import axios, { AxiosError, AxiosResponse } from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';
import { toast } from 'sonner';
import { BaseResponse } from '@/types/api';

// Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add Authorization header
apiClient.interceptors.request.use(
  config => {
    const token = getCookie('templas_token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse<BaseResponse>) => {
    // If 2xx, return
    return response;
  },
  (error: AxiosError<BaseResponse>) => {
    if (error.response) {
      const { data, status } = error.response;

      const errorMessage =
        data.message_user || 'Terjadi kesalahan pada server.';
      toast.error(errorMessage);

      // Custom handling ketika response 401 (unauthorized)
      if (
        status === 401 &&
        (data.code === 'ERR_INVALID_TOKEN' || data.code === 'ERR_UNAUTHORIZED')
      ) {
        deleteCookie('templas_token');

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    } else if (error.request) {
      // Backend tidak merespon
      toast.error('Tidak dapat terhubung ke server. Silakan coba lagi nanti.');
    } else {
      // Error axios
      toast.error('Terjadi kesalahan saat mengirim permintaan.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
