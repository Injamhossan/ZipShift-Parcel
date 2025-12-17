import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { useUser } from '../../hooks/useUser';
import { Loader1 } from '../Loader/Loader';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user: storeUser, token } = useAuthStore();
  const { data: queryUser, isLoading, isError } = useUser();

  // Prioritize storeUser because it's the source of truth for UI (Sidebar, Redirects)
  // queryUser is used for background validation/updates
  const user = queryUser || storeUser;

  const isRoleMissing = user && !user.role;
  
  // Wait if:
  // 1. We have a token (authentication claimed)
  // 2. AND we are either still loading the query
  // 3. OR we have a user but no role yet (and query is still running or we just entered)
  if (token && (isLoading || !user || isRoleMissing)) {
     // But don't wait forever if query failed or finished without giving us a role
     if (!isLoading && user && !user.role) {
         // Fall through to access denied
     } else {
         return <div className="h-screen flex items-center justify-center"><Loader1 /></div>;
     }
  }

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles) {
    const userRole = user?.role?.toLowerCase();
    const hasRole = allowedRoles.some(role => role.toLowerCase() === userRole);
    
    if (!hasRole) {
      // If user is loaded but role is missing/wrong
      if (user) {
          console.warn(`Access denied. User role '${userRole}' not in [${allowedRoles}]`);
          return <Navigate to="/" replace />;
      }
      // If user is not loaded yet (should be covered by isLoading, but just in case)
      return null; 
    }
  }

  return children;
};

export default ProtectedRoute;

