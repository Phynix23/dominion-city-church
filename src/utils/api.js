// src/utils/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.dominioncity.org/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          toast.error('Session expired. Please login again.');
          localStorage.removeItem('authToken');
          window.location.href = '/';
          break;
        case 403:
          toast.error('You do not have permission to perform this action.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(error.response.data?.message || 'An error occurred');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred');
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const eventsAPI = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  register: (data) => api.post('/events/register', data),
};

export const sermonsAPI = {
  getAll: (params) => api.get('/sermons', { params }),
  getById: (id) => api.get(`/sermons/${id}`),
  getSeries: () => api.get('/sermons/series'),
  incrementViews: (id) => api.post(`/sermons/${id}/view`),
};

export const ministriesAPI = {
  getAll: () => api.get('/ministries'),
  apply: (data) => api.post('/ministries/apply', data),
};

export const donationsAPI = {
  create: (data) => api.post('/donations', data),
  verify: (reference) => api.get(`/donations/verify/${reference}`),
};

export const prayerAPI = {
  submit: (data) => api.post('/prayers', data),
};

export default api;