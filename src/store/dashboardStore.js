import { create } from "zustand";

const mockSummary = {
  totalShipments: 128,
  pendingPickups: 12,
  deliveredLast30Days: 98,
  completionRate: 0.87,
};

const mockParcels = [
  {
    id: "ZX-12098",
    trackingId: "ZX-12098",
    customerName: "Rafiq Ahmed",
    customerPhone: "+8801***",
    address: "Road 12, Banani",
    status: "On the way",
    cod: 320,
    amount: "৳320",
  },
  {
    id: "ZX-12077",
    trackingId: "ZX-12077",
    customerName: "Nusrat Jahan",
    customerPhone: "+8801***",
    address: "Sholakia, Kishoreganj",
    status: "Picked",
    cod: 450,
    amount: "৳450",
  },
  {
    id: "ZX-12055",
    trackingId: "ZX-12055",
    customerName: "Arif Hossain",
    customerPhone: "+8801***",
    address: "Khilgaon, Dhaka",
    status: "Delivered",
    cod: 280,
    amount: "৳280",
  },
];

const mockBilling = {
  walletBalance: "৳6,200",
  pendingCod: "৳21,430",
  lastPayout: { amount: "৳18,500", date: "24 Nov 2025" },
  payouts: [
    { id: "INV-00123", date: "24 Nov 2025", amount: "৳18,500", status: "Paid" },
    { id: "INV-00118", date: "17 Nov 2025", amount: "৳12,960", status: "Paid" },
    { id: "INV-00112", date: "10 Nov 2025", amount: "৳9,420", status: "Processing" },
  ],
};

const mockTracking = {
  trackingId: "ZX-12098",
  currentHub: "Dhaka Central",
  eta: "Today, 4:30 PM",
  riderContact: "+880 1788-000000",
  timeline: [
    { label: "Parcel created", time: "10:20 AM", done: true },
    { label: "Picked from merchant", time: "12:00 PM", done: true },
    { label: "At Dhaka hub", time: "03:45 PM", done: true },
    { label: "Out for delivery", time: "08:15 AM", done: false },
    { label: "Delivered", time: "--", done: false },
  ],
};

const useDashboardStore = create((set) => ({
  summary: mockSummary,
  parcels: mockParcels,
  billing: mockBilling,
  tracking: mockTracking,

  setSummary: (payload) =>
    set((state) => ({
      summary: {
        ...state.summary,
        ...payload,
      },
    })),

  setParcels: (payload) => set({ parcels: payload }),

  prependParcel: (parcel) =>
    set((state) => ({
      parcels: [parcel, ...state.parcels],
    })),

  mergeParcel: (parcel) =>
    set((state) => ({
      parcels: state.parcels.map((item) =>
        item.id === parcel.id || item.trackingId === parcel.trackingId
          ? { ...item, ...parcel }
          : item
      ),
      tracking:
        state.tracking?.trackingId === parcel.trackingId
          ? { ...state.tracking, ...parcel }
          : state.tracking,
    })),

  setBillingSnapshot: (payload) =>
    set((state) => ({
      billing: {
        ...state.billing,
        ...payload,
        payouts: payload.payouts || state.billing.payouts,
      },
    })),

  setTracking: (payload) =>
    set({
      tracking: payload,
    }),
}));

export default useDashboardStore;
