import axios from 'axios';
import URLs from '../config/urls';
import {store} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Role} from '../utils/enum';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const api = axios.create({
  baseURL: URLs.base,
  headers: {
    Accept: 'application/json',
    Role: Role.USER,
  },
});

api.interceptors.request.use(request => {
  console.log(
    '↓',
    '\n',
    'Request URL ====>',
    URLs.base + request.url,
    '\n',
    '\n',
    'Request Method ====>',
    request.method,
    '\n',
    '\n',
    'Request Data ====>',
    request.data,
    '\n',
    '\n',
    'Request Headers ====>',
    request.headers,
    '\n',
    '↑',
  );
  return request;
});

api.interceptors.response.use(
  response => {
    if (response?.data?.status === true) return response;
    return response;
  },
  async error => {
    const originalRequest = error.config;
    const statusCode = error?.response?.status;

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        console.log('🚀 ~ refreshToken:', refreshToken);
        const response = await axios.post(`${URLs.base}/refreshToken`, {
          refreshToken: refreshToken,
        });
        console.log('🚀 ~ response:111111111', response.data.data);

        const newToken = response.data.data.userToken;
        await AsyncStorage.setItem('token', newToken);
        api.defaults.headers.Authorization = `Bearer ${newToken}`;
        // api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await AsyncStorage.setItem('authorized', 'false');
        await AsyncStorage.multiRemove(['token', 'refreshToken']);
        store.dispatch(authActions.autoLogout());

        toast.show('Session expired. Please log in again.', {type: 'danger'});
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    toast.show(error?.response?.data?.message || 'Something went wrong', {
      type: 'danger',
    });

    return Promise.reject({
      message:
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong',
      status: 'failed',
      statusCode: error?.response?.status ?? 500,
      url: error?.config?.url,
    });
  },
);

export default api;
