import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';

const CheckoutForm = ({ onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL is not strictly needed for card payments if we handle it here, 
        // but required for some payment methods.
        // We will handle the success in the same page for now if possible, 
        // but confirmPayment usually redirects. 
        // However, with redirect: 'if_required', we can handle it without redirect for cards.
        return_url: window.location.origin + '/dashboard',
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment succeeded!');
      toast.success('Payment successful!');
      onSuccess(paymentIntent);
    } else {
      setMessage('Unexpected state.');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" />
      {message && <div className="text-red-500 text-sm">{message}</div>}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-ghost"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="btn bg-[#CAEB66] border-none text-black px-6"
        >
          <span id="button-text">
            {isLoading ? <span className="loading loading-spinner"></span> : "Pay now"}
          </span>
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
