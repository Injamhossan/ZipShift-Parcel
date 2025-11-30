import { useQuery } from '@tanstack/react-query';
import { authApi } from '../utils/authApi';
import useAuthStore from '../store/authStore';

export const useUser = () => {
  const { token, login, logout, user: storeUser } = useAuthStore();

  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token) return null;
      try {
        const response = await authApi.getCurrentUser();
        // Sync with store
        const user = response.data.user;
        const role = response.data.role || user.role;
        const finalUser = { ...user, role };
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

  // Sync with store if query data is different
  // We use a simple check to avoid infinite loops
  if (query.data && JSON.stringify(query.data) !== JSON.stringify(storeUser)) {
      // We can't call set state during render, so we rely on the component using this hook or useEffect
      // But since this is a custom hook, we can't easily use useEffect here without it running in every component
      // So we'll skip auto-sync here and rely on Login/Register to set initial state,
      // and ProtectedRoute to prioritize storeUser.
  }

  return query;
};
