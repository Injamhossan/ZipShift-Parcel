import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
  console.error("Stripe Publishable Key is missing!");
}

const PaymentModal = ({ isOpen, onClose, clientSecret, onSuccess, amount }) => {
  if (!isOpen || !clientSecret) return null;

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#CAEB66',
      },
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl m-4 animate-in fade-in zoom-in duration-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black">Complete Payment</h2>
          <p className="text-gray-500">Total amount: ৳{amount}</p>
        </div>
        
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm onSuccess={onSuccess} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentModal;
