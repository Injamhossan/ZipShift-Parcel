import React from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from '../Root/Root';
import Home from '../pages/Home/Home';
import ErrorPage from '../pages/Error/ErrorPage';
import Services from '../pages/Services/Services';
import Pricing from '../pages/Pricing/Pricing';
import Coverage from '../pages/Coverage/Coverage';
import ContactUs from '../pages/Contact/ContactUs';
import Blog from '../pages/Blog/Blog';
import AboutUs from '../pages/About Us/AboutUs';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

// User Pages
import UserHome from '../pages/Dashboard/User/UserHome';
import CreateParcel from '../pages/Dashboard/sections/CreateParcel';
import ParcelToPay from '../pages/Dashboard/User/ParcelToPay';
import ManageParcel from '../pages/Dashboard/User/ManageParcel';
import PaymentHistory from '../pages/Dashboard/User/PaymentHistory';

// Admin Pages
import AdminHome from '../pages/Dashboard/Admin/AdminHome';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';
import ManageRiders from '../pages/Dashboard/Admin/ManageRiders';
import DeliveryManagement from '../pages/Dashboard/Admin/DeliveryManagement';

// Rider Pages
import RiderHome from '../pages/Dashboard/Rider/RiderHome';
import ParcelToPickup from '../pages/Dashboard/Rider/ParcelToPickup';
import ParcelToDelivery from '../pages/Dashboard/Rider/ParcelToDelivery';

// Shared Pages
import Settings from '../pages/Dashboard/Settings';
import useAuthStore from '../store/authStore';

const DashboardRedirect = () => {
  const { user } = useAuthStore();
  
  if (user?.role === 'admin') return <Navigate to="admin-overview" replace />;
  if (user?.role === 'rider') return <Navigate to="rider-overview" replace />;
  if (user?.role === 'user') return <Navigate to="user-overview" replace />;
  
  return <Navigate to="user-overview" replace />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            // Public Routes
            { index: true, element: <Home /> }, 
            { path: 'aboutus', element: <AboutUs /> },
            { path: 'services', element: <Services /> },
            { path: 'pricing', element: <Pricing /> },
            { path: 'coverage', element: <Coverage /> },
            { path: 'contactus', element: <ContactUs /> },
            { path: 'blog', element: <Blog /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
        ],
    },
    // Protected Dashboard Route
    {
        path: 'dashboard',
        element: <ProtectedRoute allowedRoles={['user', 'admin', 'rider']}><Dashboard /></ProtectedRoute>, 
        children: [
            // Smart Redirect based on role
            { index: true, element: <DashboardRedirect /> }, 
            
            // User Routes
            { path: 'user-overview', element: <ProtectedRoute allowedRoles={['user']}><UserHome /></ProtectedRoute> },
            { path: 'create-parcel', element: <ProtectedRoute allowedRoles={['user']}><CreateParcel /></ProtectedRoute> },
            { path: 'parcel-to-pay', element: <ProtectedRoute allowedRoles={['user']}><ParcelToPay /></ProtectedRoute> },
            { path: 'manage-parcel', element: <ProtectedRoute allowedRoles={['user']}><ManageParcel /></ProtectedRoute> },
            { path: 'payment-history', element: <ProtectedRoute allowedRoles={['user']}><PaymentHistory /></ProtectedRoute> },
            
            // Admin Routes
            { path: 'admin-overview', element: <ProtectedRoute allowedRoles={['admin']}><AdminHome /></ProtectedRoute> },
            { path: 'manage-users', element: <ProtectedRoute allowedRoles={['admin']}><ManageUsers /></ProtectedRoute> },
            { path: 'manage-riders', element: <ProtectedRoute allowedRoles={['admin']}><ManageRiders /></ProtectedRoute> },
            { path: 'delivery-management', element: <ProtectedRoute allowedRoles={['admin']}><DeliveryManagement /></ProtectedRoute> },

            // Rider Routes
            { path: 'rider-overview', element: <ProtectedRoute allowedRoles={['rider']}><RiderHome /></ProtectedRoute> },
            { path: 'parcel-to-pickup', element: <ProtectedRoute allowedRoles={['rider']}><ParcelToPickup /></ProtectedRoute> },
            { path: 'parcel-to-delivery', element: <ProtectedRoute allowedRoles={['rider']}><ParcelToDelivery /></ProtectedRoute> },

            // Shared
            { path: 'settings', element: <Settings /> },
        ],
    },
    // Fallback
    { path: '*', element: <ErrorPage /> }
]);

export default router;