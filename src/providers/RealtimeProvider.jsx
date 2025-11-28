import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/authStore";
import useDashboardStore from "../store/dashboardStore";
import useParcelStore from "../store/parcelStore";
import useBillingStore from "../store/billingStore";
import useSupportStore from "../store/supportStore";
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
  const { prepend, merge } = useParcelStore();
  const { setSnapshot } = useBillingStore();
  const { updateTicket } = useSupportStore();
  
  // Ref to track if we've already shown a connection error recently


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
        // Suppress initial bootstrap error to avoid spam on login
        // toast.error("Failed to load live dashboard data");
      }
    };

    bootstrap();

    connectSocket(token);

    const cleanupHandlers = () => {
      socket.off("dashboard:summary");
      socket.off("parcels:created");
      socket.off("parcels:updated");
      socket.off("billing:payout");
      socket.off("support:ticket-status");
      socket.off("connect_error");
    };

    // socket.on("connect_error", (err) => {
    //   console.error("Socket error", err);
    // });

    socket.on("dashboard:summary", (payload) => {
      setSummary(payload);
    });

    socket.on("parcels:created", (parcel) => {
      prependParcel(parcel); // Dashboard store
      prepend(parcel);       // Parcel store
    });

    socket.on("parcels:updated", (parcel) => {
      mergeParcel(parcel);   // Dashboard store
      merge(parcel);         // Parcel store
    });

    socket.on("billing:payout", (snapshot) => {
      setBillingSnapshot(snapshot); // Dashboard store
      setSnapshot(snapshot);        // Billing store
    });
    
    socket.on("support:ticket-status", (ticket) => {
      updateTicket(ticket);
    });

    return () => {
      cleanupHandlers();
      disconnectSocket();
    };
  }, [isAuthenticated, token, setSummary, setParcels, prependParcel, mergeParcel, setBillingSnapshot, prepend, merge, setSnapshot, updateTicket]);

  return children;
};

export default RealtimeProvider;

