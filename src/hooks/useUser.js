import { useQuery } from '@tanstack/react-query';
import { authApi } from '../utils/authApi';
import useAuthStore from '../store/authStore';

export const useUser = () => {
  const { token, login, logout } = useAuthStore();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token) return null;
      try {
        const response = await authApi.getCurrentUser();
        // Sync with store
        const user = response.data.user;
        const role = response.data.role || user.role;
        const finalUser = { ...user, role };
        
        // We shouldn't call login() here as it triggers re-renders and might cause loops if not careful.
        // But we can update the user in store if it changed.
        // For now, let's just return the data.
        return finalUser;
      } catch (error) {
        if (error.response?.status === 401) {
            logout();
        }
        throw error;
      }
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false
  });
};
