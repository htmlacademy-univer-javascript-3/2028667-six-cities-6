import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from './const';
import { getToken } from './services/token';

const UNAUTHORIZED_STATUS_CODE = 401;

type UnauthorizedHandler = () => void;

export function createAPI(onUnauthorized: UnauthorizedHandler): AxiosInstance {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === UNAUTHORIZED_STATUS_CODE) {
        onUnauthorized();
      }

      return Promise.reject(error);
    }
  );

  return api;
}
