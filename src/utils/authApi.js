import axios from 'axios';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';

// Update this with your backend API URL
const API_URL = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api` : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  // Register user
  register: async (userData) => {
    try {
      console.log('Sending registration request to backend:', {
        url: `${API_URL}/auth/register`,
        data: { ...userData, password: userData.password ? '***' : undefined },
      });
      
      const response = await api.post('/auth/register', userData);
      
      console.log('Backend registration response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Registration API error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      
      const message = error.response?.data?.message || error.response?.data?.error || 'Registration failed';
      toast.error(message);
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      toast.error(message);
      throw error;
    }
  },
};

// General API functions for testing and parcel management
export const parcelApi = {
  // Test server connection
  testConnection: async () => {
    try {
      const response = await api.get('/test');
      return response.data;
    } catch (error) {
      console.error('Connection test error:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  },

  // Get all parcels
  getAllParcels: async (params = {}) => {
    try {
      const response = await api.get('/parcels', { params });
      return response.data;
    } catch (error) {
      console.error('Get parcels error:', error);
      throw error;
    }
  },

  // Get all riders
  getAllRiders: async () => {
    try {
      const response = await api.get('/riders');
      return response.data;
    } catch (error) {
      console.error('Get riders error:', error);
      throw error;
    }
  },

  // Create parcel
  createParcel: async (parcelData) => {
    try {
      const response = await api.post('/parcels', parcelData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create parcel';
      toast.error(message);
      throw error;
    }
  },

  // Get parcel by ID
  getParcelById: async (parcelId) => {
    try {
      const response = await api.get(`/parcels/${parcelId}`);
      return response.data;
    } catch (error) {
      console.error('Get parcel error:', error);
      throw error;
    }
  },

  // Update parcel
  updateParcel: async (parcelId, parcelData) => {
    try {
      const response = await api.put(`/parcels/${parcelId}`, parcelData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update parcel';
      toast.error(message);
      throw error;
    }
  },

  // Delete parcel
  deleteParcel: async (parcelId) => {
    try {
      const response = await api.delete(`/parcels/${parcelId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete parcel';
      toast.error(message);
      throw error;
    }
  },
};

export default api;


