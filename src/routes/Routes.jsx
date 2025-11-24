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
import DashboardOverview from '../pages/Dashboard/sections/DashboardOverview';
import ParcelList from '../pages/Dashboard/sections/ParcelList';
import CreateParcel from '../pages/Dashboard/sections/CreateParcel';
import TrackingCenter from '../pages/Dashboard/sections/TrackingCenter';
import BillingCenter from '../pages/Dashboard/sections/BillingCenter';
import SupportCenter from '../pages/Dashboard/sections/SupportCenter';
import ProfileSettings from '../pages/Dashboard/sections/ProfileSettings';



export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        index: true,
        Component: Home,
      },
      {
        path: 'aboutus',
        Component: AboutUs,
      },
      {
        path: 'services',
        Component: Services,
      },
      {
        path: 'pricing',
        Component: Pricing,
      },
      {
        path: 'coverage',
        Component: Coverage,
      },
      {
        path: 'contactus',
        Component: ContactUs,
      },
      {
        path: 'blog',
        Component: Blog,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="overview" replace />
          },
          {
            path: 'overview',
            element: <DashboardOverview />
          },
          {
            path: 'parcels',
            element: <ParcelList />
          },
          {
            path: 'create-parcel',
            element: <CreateParcel />
          },
          {
            path: 'tracking',
            element: <TrackingCenter />
          },
          {
            path: 'billing',
            element: <BillingCenter />
          },
          {
            path: 'support',
            element: <SupportCenter />
          },
          {
            path: 'profile',
            element: <ProfileSettings />
          },
        ]
      },
    ]
  },
]);