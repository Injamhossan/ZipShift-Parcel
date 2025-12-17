import React from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "../Root/Root";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ErrorPage from "../pages/Error/ErrorPage"
import Home from "../pages/Home/Home"
import AboutUs from "../pages/About Us/AboutUs"
import Services from "../pages/Services/Services"
import Pricing from "../pages/Pricing/Pricing"
import Coverage from "../pages/Coverage/Coverage";
import ContactUs from "../pages/Contact/ContactUs";
import Blog from "../pages/Blog/Blog";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardRedirect from "../pages/Dashboard/sections/DashboardOverview";
import UserHome from "../pages/Dashboard/User/UserHome";
import CreateParcel from "../pages/Dashboard/sections/CreateParcel";
import ParcelToPay from "../pages/Dashboard/User/ParcelToPay";
import PayParcel from "../pages/Dashboard/User/PayParcel";
import ManageParcel from "../pages/Dashboard/User/ManageParcel";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageRiders from "../pages/Dashboard/Admin/ManageRiders";
import DeliveryManagement from "../pages/Dashboard/Admin/DeliveryManagement";
import RiderHome from "../pages/Dashboard/Rider/RiderHome"; 
import ParcelToPickup from "../pages/Dashboard/Rider/ParcelToPickup";
import ParcelToDelivery from "../pages/Dashboard/Rider/ParcelToDelivery";
import Settings from "../pages/Dashboard/Settings";





const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'aboutus', element: <AboutUs /> },
      { path: 'services', element: <Services /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'coverage', element: <Coverage /> },
      { path: 'contactus', element: <ContactUs /> },
      { path: 'blog', element: <Blog /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },

      // Dashboard
      {
path: 'dashboard',
  element: (
    <ProtectedRoute allowedRoles={['user', 'admin', 'rider']}>
      <Dashboard />
    </ProtectedRoute>
  ),
        children: [
          { index: true, element: <DashboardRedirect /> },

          // User
          { path: 'user-overview', element: <ProtectedRoute allowedRoles={['user']}><UserHome /></ProtectedRoute> },
          { path: 'create-parcel', element: <ProtectedRoute allowedRoles={['user']}><CreateParcel /></ProtectedRoute> },
          { path: 'parcel-to-pay', element: <ProtectedRoute allowedRoles={['user']}><ParcelToPay /></ProtectedRoute> },
          { path: 'pay/:id', element: <ProtectedRoute allowedRoles={['user']}><PayParcel /></ProtectedRoute> },
          { path: 'manage-parcel', element: <ProtectedRoute allowedRoles={['user']}><ManageParcel /></ProtectedRoute> },
          { path: 'payment-history', element: <ProtectedRoute allowedRoles={['user']}><PaymentHistory /></ProtectedRoute> },

          // Admin
          { path: 'admin-overview', element: <ProtectedRoute allowedRoles={['admin']}><AdminHome /></ProtectedRoute> },
          { path: 'manage-users', element: <ProtectedRoute allowedRoles={['admin']}><ManageUsers /></ProtectedRoute> },
          { path: 'manage-riders', element: <ProtectedRoute allowedRoles={['admin']}><ManageRiders /></ProtectedRoute> },
          { path: 'delivery-management', element: <ProtectedRoute allowedRoles={['admin']}><DeliveryManagement /></ProtectedRoute> },

          // Rider
          { path: 'rider-overview', element: <ProtectedRoute allowedRoles={['rider']}><RiderHome /></ProtectedRoute> },
          { path: 'parcel-to-pickup', element: <ProtectedRoute allowedRoles={['rider']}><ParcelToPickup /></ProtectedRoute> },
          { path: 'parcel-to-delivery', element: <ProtectedRoute allowedRoles={['rider']}><ParcelToDelivery /></ProtectedRoute> },

          // Shared
          { path: 'settings', element: <Settings /> },
        ],
      },
    ],
  },

  // Fallback
  { path: '*', element: <ErrorPage /> }
]);

export default router;
