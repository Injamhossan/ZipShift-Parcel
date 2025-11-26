# Frontend Setup Guide

## Environment Variables (Vite)

Create `frontend/.env.local` (never commit):

```
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

`src/utils/authApi.js` should read `VITE_API_BASE_URL` when building URLs (append `/api/...`) and always attach the Firebase ID token from your auth store/localStorage.

## Required Headers

```javascript
const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: false
});

authApi.interceptors.request.use((config) => {
  const token = authStore.user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Dashboard Data Flow

| UI section | REST call | Realtime event |
|------------|-----------|----------------|
| Summary cards | `GET /api/dashboard/summary` | `dashboard:summary` |
| Parcels table | `GET /api/parcels?status=all&page=1` | `parcels:created`, `parcels:updated` |
| Create parcel form | `POST /api/parcels` | emits both parcel + summary events |
| Tracking modal | `GET /api/tracking/:trackingId` | — |
| Billing cards/table | `GET /api/billing` | `billing:payout` |
| Support form | `POST /api/support/tickets` | `support:ticket-status` |
| Profile form | `PATCH /api/profile` | — |

## Socket.IO Client

```javascript
import { io } from 'socket.io-client';

export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  auth: { token: authStore.user?.token }
});

socket.on('connect_error', (err) => console.error('Socket error', err));
socket.on('dashboard:summary', dashboardStore.setSummary);
socket.on('parcels:created', parcelStore.prepend);
socket.on('parcels:updated', parcelStore.merge);
socket.on('billing:payout', billingStore.setSnapshot);
socket.on('support:ticket-status', supportStore.updateTicket);
```

Initialize the socket in a root provider/context once, then expose derived state with Zustand/Context so individual sections do not create duplicate connections.

## Common Pitfalls

- **401 errors** → dashboard must send a fresh Firebase ID token; expired tokens will be rejected server-side and by Socket.IO middleware.
- **Mixed base URLs** → always use `VITE_API_BASE_URL` to build REST paths; never hardcode `localhost`.
- **Socket blocked** → ensure the frontend origin is included in `SOCKET_CLIENT_ORIGIN` or update `corsOptions` in `app.js`.

