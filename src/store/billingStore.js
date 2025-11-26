import { create } from 'zustand';
import api from '../utils/authApi';

const useBillingStore = create((set) => ({
  billing: {
    balance: 0,
    transactions: [],
  },
  loading: false,
  error: null,

  setSnapshot: (data) => set({ billing: data }),

  fetchBilling: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/billing');
      set({ billing: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useBillingStore;
