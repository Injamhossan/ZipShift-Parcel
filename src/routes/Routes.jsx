import React from 'react';
import { createBrowserRouter, Navigate } from "react-router-dom";



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
