import { StrictMode } from 'react'
import './index.css'

import { router } from './routes/Routes.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import RealtimeProvider from './providers/RealtimeProvider.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RealtimeProvider>
      <RouterProvider router={router} />
    </RealtimeProvider>
    <ToastContainer position="top-right" autoClose={2000} />
    <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
  </StrictMode>,
)



