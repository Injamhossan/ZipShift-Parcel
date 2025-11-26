import { useEffect } from "react";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/authStore";
import useDashboardStore from "../store/dashboardStore";
import {
  getBillingSnapshot,
  getDashboardSummary,
  getParcels,
} from "../services/dashboardService";
import { connectSocket, disconnectSocket, socket } from "../utils/socket";

const RealtimeProvider = ({ children }) => {
  const { token, isAuthenticated } = useAuthStore();
  const { setSummary, setParcels, prependParcel, mergeParcel, setBillingSnapshot } =
    useDashboardStore();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      disconnectSocket();
      return;
    }

    const bootstrap = async () => {
      try {
        const [summary, parcelResponse, billing] = await Promise.all([
          getDashboardSummary().catch(() => null),
          getParcels().catch(() => null),
          getBillingSnapshot().catch(() => null),
        ]);

        if (summary) setSummary(summary);
        const parcelItems =
          parcelResponse?.items ||
          parcelResponse?.data?.items ||
          parcelResponse?.data ||
          parcelResponse;
        if (Array.isArray(parcelItems)) {
          setParcels(parcelItems);
        }
        if (billing) setBillingSnapshot(billing);
      } catch (error) {
        console.error("Initial data bootstrap failed", error);
        toast.error("Failed to load live dashboard data");
      }
    };

    bootstrap();

    connectSocket(token);

    const cleanupHandlers = () => {
      socket.off("dashboard:summary");
      socket.off("parcels:created");
      socket.off("parcels:updated");
      socket.off("billing:payout");
    };

    socket.on("connect_error", (err) => {
      console.error("Socket error", err);
      toast.error("Realtime connection failed");
    });

    socket.on("dashboard:summary", (payload) => {
      setSummary(payload);
    });

    socket.on("parcels:created", (parcel) => {
      prependParcel(parcel);
    });

    socket.on("parcels:updated", (parcel) => {
      mergeParcel(parcel);
    });

    socket.on("billing:payout", (snapshot) => {
      setBillingSnapshot(snapshot);
    });

    return () => {
      cleanupHandlers();
      disconnectSocket();
    };
  }, [isAuthenticated, token, setSummary, setParcels, prependParcel, mergeParcel, setBillingSnapshot]);

  return children;
};

export default RealtimeProvider;

