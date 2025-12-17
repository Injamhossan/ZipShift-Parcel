import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../utils/authApi';
import useAuthStore from '../store/authStore';

export const useUser = () => {
  const { token, logout, updateUser, user: storeUser } = useAuthStore();

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

  // Sync with store if query data is available and different
  useEffect(() => {
      if (query.data) {
          // Check if key properties are different to avoid unnecessary updates
          if (!storeUser || storeUser.role !== query.data.role || storeUser.email !== query.data.email) {
              updateUser(query.data);
          }
      }
  }, [query.data, updateUser, storeUser]);

  return query;
};
