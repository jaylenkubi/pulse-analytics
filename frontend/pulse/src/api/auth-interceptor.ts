import { AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { AXIOS_INSTANCE } from './axios-client';
import { jwtDecode } from 'jwt-decode';
import { authControllerRefresh } from './generated/auth/auth';

const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000;
const REFRESH_TOKEN_KEY = 'refreshToken';

let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null) => {
  refreshQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  
  refreshQueue = [];
};

// Check if token is expired or will expire soon
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds
    
    return Date.now() >= expirationTime - TOKEN_REFRESH_THRESHOLD;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) return null;

  try {
    const response = await authControllerRefresh({ refreshToken });
    return response.accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

AXIOS_INSTANCE.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.url?.includes('/auth/refresh') || config.url?.includes('/auth/login')) {
      return config;
    }

    let accessToken = localStorage.getItem('accessToken');
    
    // If token exists but is expired or will expire soon, try to refresh it
    if (accessToken && isTokenExpired(accessToken)) {
      if (!isRefreshing) {
        isRefreshing = true;
        
        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;
          
          if (newToken) {
            localStorage.setItem('accessToken', newToken);
            accessToken = newToken;
            processQueue(null, newToken);
          } else {
            // If refresh fails, clear tokens and redirect to login
            localStorage.removeItem('accessToken');
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            processQueue(new Error('Failed to refresh token'), null);
            window.location.href = '/login';
            return Promise.reject('Authentication failed');
          }
        } catch (error) {
          isRefreshing = false;
          processQueue(error, null);
          // Clear tokens and redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          window.location.href = '/login';
          return Promise.reject(error);
        }
      } else {
        // If we're already refreshing, add this request to the queue
        try {
          const newToken = await new Promise<string>((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
          });
          accessToken = newToken;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    // Add the Authorization header if we have a token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 Unauthorized errors
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // If the error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const newToken = await new Promise<string>((resolve, reject) => {
            refreshQueue.push({ resolve, reject });
          });
          
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          } else {
            originalRequest.headers = { Authorization: `Bearer ${newToken}` };
          }
          originalRequest._retry = true;
          return AXIOS_INSTANCE(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      } else {
        originalRequest._retry = true;
        isRefreshing = true;
        
        try {
          const newToken = await refreshAccessToken();
          isRefreshing = false;
          
          if (newToken) {
            localStorage.setItem('accessToken', newToken);
            processQueue(null, newToken);
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            } else {
              originalRequest.headers = { Authorization: `Bearer ${newToken}` };
            }
            return AXIOS_INSTANCE(originalRequest);
          } else {
            processQueue(new Error('Failed to refresh token'), null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            window.location.href = '/login';
            return Promise.reject('Authentication failed');
          }
        } catch (error) {
          isRefreshing = false;
          processQueue(error, null);
          localStorage.removeItem('accessToken');
          localStorage.removeItem(REFRESH_TOKEN_KEY);
          window.location.href = '/login';
          return Promise.reject(error);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default AXIOS_INSTANCE;
