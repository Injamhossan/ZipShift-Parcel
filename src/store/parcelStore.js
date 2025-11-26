import { create } from 'zustand';
import { parcelApi } from '../utils/authApi';

const useParcelStore = create((set) => ({
  parcels: [],
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  setParcels: (parcels) => set({ parcels }),

  prepend: (parcel) => set((state) => ({ parcels: [parcel, ...state.parcels] })),

  merge: (updatedParcel) => set((state) => ({
    parcels: state.parcels.map((p) => (p._id === updatedParcel._id ? updatedParcel : p)),
  })),

  fetchParcels: async (params = { page: 1, status: 'all' }) => {
    set({ loading: true, error: null });
    try {
      const data = await parcelApi.getAllParcels(params);
      set({ 
        parcels: data.parcels || [], 
        pagination: data.pagination || {},
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useParcelStore;
