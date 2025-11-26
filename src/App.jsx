import { useEffect } from 'react';
import { socket } from './socket';
import useAuthStore from './store/authStore';
import useDashboardStore from './store/dashboardStore';
import useParcelStore from './store/parcelStore';
import useBillingStore from './store/billingStore';
import useSupportStore from './store/supportStore';
import './App.css';

function App() {
  const { user } = useAuthStore();
  const { setSummary } = useDashboardStore();
  const { prepend, merge } = useParcelStore();
  const { setSnapshot } = useBillingStore();
  const { updateTicket } = useSupportStore();

  useEffect(() => {
    if (user?.token) {
      socket.auth = { token: user.token };
      socket.connect();

      socket.on('dashboard:summary', setSummary);
      socket.on('parcels:created', prepend);
      socket.on('parcels:updated', merge);
      socket.on('billing:payout', setSnapshot);
      socket.on('support:ticket-status', updateTicket);

      return () => {
        socket.off('dashboard:summary');
        socket.off('parcels:created');
        socket.off('parcels:updated');
        socket.off('billing:payout');
        socket.off('support:ticket-status');
        socket.disconnect();
      };
    }
  }, [user, setSummary, prepend, merge, setSnapshot, updateTicket]);

  return (
    <>
    
    </>
  );
}

export default App;
