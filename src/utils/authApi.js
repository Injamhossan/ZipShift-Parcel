import axios from 'axios';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';

// -------- BASE URL --------
const API_URL =
  import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api`
    : 'https://zip-shift-server.vercel.app/api';

// -------- AXIOS INSTANCE --------
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// -------- REQUEST INTERCEPTOR (Attach Token) --------
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// -------- RESPONSE INTERCEPTOR (Handle 401 & 404) --------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;
    const originalRequest = error.config;

    // Check if the request explicitly asked to skip auth redirect
    if (originalRequest?._skipAuthRedirect) {
      return Promise.reject(error);
    }

    if (status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    } else if (status === 404 && data?.code === 'USER_NOT_FOUND') {
      // User authenticated in Firebase but not in DB -> Redirect to Register
      window.location.href = '/register';
    }

    return Promise.reject(error);
  }
);

// -------- SEPARATE INSTANCE FOR FIREBASE REGISTER ONLY --------
const unprotectedApi = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// -------------------------------------------------------------------------
//                                AUTH API
// -------------------------------------------------------------------------
export const authApi = {
  // REGISTER (Firebase token required)
  register: async (userData, firebaseToken) => {
    try {
      const response = await unprotectedApi.post(
        '/auth/register',
        userData,
        {
          headers: firebaseToken
            ? { Authorization: `Bearer ${firebaseToken}` }
            : {},
        }
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Registration failed';

      if (error.response?.status !== 401) toast.error(message);
      throw error;
    }
  },

  // LOGIN
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed';

      if (error.response?.status !== 401) toast.error(message);
      throw error;
    }
  },

  // GET CURRENT USER
  getCurrentUser: async (config = {}) => {
    const res = await api.get('/auth/me', config);
    return res.data;
  },

  // UPDATE PROFILE
  updateProfile: async (userData) => {
    try {
      const res = await api.patch('/profile', userData);
      return res.data;
    } catch (error) {
      if (error.response?.status !== 401) {
        const msg = error.response?.data?.message || 'Update failed';
        toast.error(msg);
      }
      throw error;
    }
  },
};

// -------------------------------------------------------------------------
//                                PARCEL API
// -------------------------------------------------------------------------
export const parcelApi = {
  testConnection: async () => {
    const res = await api.get('/test');
    return res.data;
  },

  healthCheck: async () => {
    const res = await api.get('/health');
    return res.data;
  },

  getAllParcels: async (params = {}) => {
    const res = await api.get('/parcels', { params });
    return res.data;
  },

  getAllRiders: async () => {
    const res = await api.get('/riders');
    return res.data;
  },

  createParcel: async (parcelData) => {
    try {
      const res = await api.post('/parcels', parcelData);
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create parcel';
      if (error.response?.status !== 401) toast.error(msg);
      throw error;
    }
  },

  getParcelById: async (parcelId) => {
    const res = await api.get(`/parcels/${parcelId}`);
    return res.data;
  },

  updateParcel: async (parcelId, parcelData) => {
    try {
      const res = await api.put(`/parcels/${parcelId}`, parcelData);
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update parcel';
      if (error.response?.status !== 401) toast.error(msg);
      throw error;
    }
  },

  deleteParcel: async (parcelId) => {
    try {
      const res = await api.delete(`/parcels/${parcelId}`);
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete parcel';
      if (error.response?.status !== 401) toast.error(msg);
      throw error;
    }
  },

  assignRider: async (parcelId, data) => {
    try {
      const res = await api.put(`/parcels/${parcelId}/assign`, data);
      return res.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to assign rider';
      if (error.response?.status !== 401) toast.error(msg);
      throw error;
    }
  },
};

// -------------------------------------------------------------------------
//                               PAYMENT API
// -------------------------------------------------------------------------
export const paymentApi = {
  createIntent: async (data) => {
    const res = await api.post('/payment/create-intent', data);
    return res.data;
  },

  confirmPayment: async (data) => {
    const res = await api.post('/payment/confirm', data);
    return res.data;
  },
};

// -------------------------------------------------------------------------
//                                STATS API
// -------------------------------------------------------------------------
export const statsApi = {
  getStats: async () => {
    const res = await api.get('/stats');
    return res.data;
  },
};

export default api;
