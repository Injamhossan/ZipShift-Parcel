import api from "../utils/authApi";

const extractData = (response) => response?.data?.data ?? response?.data ?? response;

export const getDashboardSummary = async () => {
  const response = await api.get("/dashboard/summary");
  return extractData(response);
};

export const getParcels = async (params = { status: "all", page: 1 }) => {
  const response = await api.get("/parcels", { params });
  return extractData(response);
};

export const getBillingSnapshot = async () => {
  const response = await api.get("/billing");
  return extractData(response);
};

export const getTrackingSnapshot = async (trackingId) => {
  if (!trackingId) return null;
  const response = await api.get(`/tracking/${trackingId}`);
  return extractData(response);
};

export const getProfileSnapshot = async () => {
  const response = await api.get("/profile");
  return extractData(response);
};

