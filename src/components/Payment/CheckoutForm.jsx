import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';

const CheckoutForm = ({ onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet.");
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/dashboard",
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setMessage(error.message);
    } else if (paymentIntent?.status === "succeeded") {
      toast.success("Payment successful!");
      onSuccess(paymentIntent);
    } else {
      setMessage("Unexpected state.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" />

      {message && <p className="text-sm text-red-500">{message}</p>}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="btn btn-ghost text-black px-6 border border-gray-300 hover:bg-gray-100"
          disabled={isLoading}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading || !stripe || !elements}
          className="btn bg-[#CAEB66] border-none text-black px-6"
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Pay now"
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
