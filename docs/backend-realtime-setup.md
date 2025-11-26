## ZipShift Dashboard – Backend & Real‑time Setup

Use this guide to plug the dashboard UI into your backend so every card, table, and form works with live data instead of mock placeholders.

---

### 1. Minimum Backend Requirements
- **Stack**: Node.js 18+, Express (or Nest/Fastify), MongoDB/Postgres for persistence.
- **Auth**: Reuse the Firebase JWT you already issue on login. Every protected route should validate it and expose the decoded user id.
- **Real-time transport**: Socket.IO or Pusher/Ably. Examples below assume Socket.IO.

---

### 2. Backend Environment Variables
Create an `.env` inside your backend project:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/zipshift
FIREBASE_PROJECT_ID=xxx
FIREBASE_CLIENT_EMAIL=xxx@xxx.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
JWT_SECRET=supersecretfallback
ALLOWED_ORIGIN=http://localhost:5173
```
Frontend `.env.local` should contain:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```
`src/utils/authApi.js` already centralises fetch helpers—just ensure it reads these vars when building request URLs. The SOCKET url feeds `src/utils/socket.js`.

---

### 3. Directory Structure
```
zipshift-api/
 ├─ src/
 │   ├─ config/
 │   │   ├─ firebase.js        # Admin SDK init (verify tokens)
 │   │   └─ db.js              # Mongo connection
 │   ├─ middleware/
 │   │   ├─ authMiddleware.js  # Verifies Firebase JWT or fallback JWT
 │   │   └─ errorHandler.js
 │   ├─ models/
 │   │   ├─ User.js
 │   │   ├─ Parcel.js
 │   │   ├─ BillingSnapshot.js
 │   │   └─ SupportTicket.js
 │   ├─ routes/
 │   │   ├─ authRoutes.js
 │   │   ├─ dashboardRoutes.js
 │   │   ├─ parcelRoutes.js
 │   │   ├─ billingRoutes.js
 │   │   └─ supportRoutes.js
 │   ├─ services/
 │   │   ├─ dashboardService.js
 │   │   ├─ parcelService.js
 │   │   └─ billingService.js
 │   ├─ sockets/
 │   │   └─ registerParcelHandlers.js
 │   └─ server.js
 ├─ package.json
 └─ .env
```

---

### 3. REST Endpoints to Implement
| UI Section | Method & Path | Payload / Notes |
|------------|---------------|-----------------|
| Dashboard summary cards | `GET /api/dashboard/summary` | Returns totals, pending count, delivered count, etc. |
| Parcel list | `GET /api/parcels?status=all&page=1` | Supports pagination & optional status filters. |
| Create parcel form | `POST /api/parcels` | Accepts `{ customerName, customerPhone, address, weight, cod, note }`. Respond with created parcel. |
| Tracking search | `GET /api/tracking/:trackingId` | Returns hub info, ETA, rider contact, timeline array. |
| Billing cards & table | `GET /api/billing` | `{ walletBalance, pendingCod, lastPayout, payouts[] }`. |
| Support ticket form | `POST /api/support/tickets` | Accepts `{ subject, details }`. |
| Profile settings | `PATCH /api/profile` | Accepts `{ name, phone, company, address, pickupArea }`. |

Standardise the response envelope, e.g.
```json
{
  "success": true,
  "data": { ... },
  "message": ""
}
```

---

### 4. Real-time Channels
Emit events whenever new data should refresh on the dashboard:

| Event | Payload | Consumed By |
|-------|---------|-------------|
| `dashboard:summary` | Latest summary object | Overview cards |
| `parcels:created` | Newly created parcel | Parcel list + counts |
| `parcels:updated` | `{ id, status, timeline }` | Parcel list + tracking timeline |
| `billing:payout` | Updated wallet + payouts | Billing cards/table |
| `support:ticket-status` | Ticket status changes | (optional toast) |

Socket client sample (add inside a store or React context):
```js
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  auth: { token: user?.token },
});

socket.on("dashboard:summary", setSummary);
socket.on("parcels:created", prependParcel);
socket.on("parcels:updated", updateParcel);
```

---

### 5. Frontend Wiring Checklist
1. **Replace mocks** – all hardcoded arrays/stats live in `src/pages/Dashboard/sections/*`. Fetch real data via `useEffect` + SWR/React Query.
2. **Centralise services** – add functions in `src/utils/authApi.js`, e.g. `getDashboardSummary`, `createParcel`, `getParcels`, etc.
3. **Optimistic UI** – when submitting forms (create parcel, support ticket, profile), update UI immediately and roll back on error.
4. **WebSocket hooks** – subscribe once in a higher-level provider, then expose slices of state to individual sections.

---

### 6. Data Contracts
#### Parcel
```ts
type Parcel = {
  id: string;
  trackingId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  weight: number;
  cod: number;
  status: "Pending" | "Picked" | "On the way" | "Delivered" | "Cancelled";
  timeline: Array<{ label: string; time: string; done: boolean }>;
};
```

#### Dashboard Summary
```ts
type Summary = {
  totalShipments: number;
  pendingPickups: number;
  deliveredLast30Days: number;
  completionRate: number;
};
```

Use similar explicit interfaces for billing, payouts, and support tickets so both backend & frontend share the same contract.

---

### 7. Backend Quickstart Snippet
```bash
mkdir zipshift-api && cd zipshift-api
npm init -y
npm install express cors socket.io jsonwebtoken mongoose
```

```js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());

app.get("/api/dashboard/summary", authMiddleware, async (req, res) => {
  const data = await buildSummary(req.user.id);
  res.json({ success: true, data });
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join", (userId) => socket.join(userId));
});

server.listen(5000, () => console.log("API ready on 5000"));
```

Emit events from services whenever documents change:
```js
io.emit("parcels:created", parcel);
```

---

### 8. Deployment Notes
- Expose both REST (`/api`) and Socket endpoints over HTTPS/WSS.
- Keep JWT validation shared between HTTP + WebSocket handshakes.
- Use MongoDB change streams or Postgres NOTIFY/LISTEN to publish live events without polling.

Following this checklist will let you drop a backend behind the current dashboard UI and see the data update in real time as soon as the network responses arrive.

