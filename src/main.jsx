import { StrictMode } from 'react'
import './index.css'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import RealtimeProvider from './providers/RealtimeProvider.jsx';



import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './routes/Routes.jsx';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RealtimeProvider>
        <RouterProvider router={router} />
      </RealtimeProvider>
      <ToastContainer position="top-right" autoClose={2000} />
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </QueryClientProvider>
  </StrictMode>,
)



