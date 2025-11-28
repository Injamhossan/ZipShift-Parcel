import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import useDashboardStore from "../store/dashboardStore";
import {
  getBillingSnapshot,
  getDashboardSummary,
  getParcels,
} from "../services/dashboardService";

const RealtimeProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuthStore();
  const { setSummary, setParcels, setBillingSnapshot } = useDashboardStore();

  // Eager data fetching removed as per user request.
  // Components will fetch their own data when mounted.
  
  return children;


};

export default RealtimeProvider;
