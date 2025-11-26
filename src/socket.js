import { io } from 'socket.io-client';
import useAuthStore from './store/authStore';

export const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
  auth: { token: useAuthStore.getState().user?.token || useAuthStore.getState().token },
  autoConnect: false // Connect manually when needed or in App.jsx
});

socket.on('connect_error', (err) => console.error('Socket error', err));
