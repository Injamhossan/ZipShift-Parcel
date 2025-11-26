import { create } from 'zustand';
import api from '../utils/authApi';

const useSupportStore = create((set) => ({
  tickets: [],
  loading: false,
  error: null,

  updateTicket: (updatedTicket) => set((state) => ({
    tickets: state.tickets.map((t) => (t._id === updatedTicket._id ? updatedTicket : t)),
  })),

  fetchTickets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/support/tickets');
      set({ tickets: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useSupportStore;
