import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { parcelApi, paymentApi } from '../../../utils/authApi';
import PaymentModal from '../../../components/Payment/PaymentModal';
import { toast } from 'react-hot-toast';

const PayParcel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchParcel();
  }, [id]);

  const fetchParcel = async () => {
    try {
      const response = await parcelApi.getParcelById(id);
      if (response.success) {
        setParcel(response.data);
        // Automatically initiate payment intent if unpaid
        if (response.data.paymentStatus === 'pending' || response.data.status === 'unpaid') {
            initiatePayment(response.data.cost);
        }
      }
    } catch (error) {
      console.error('Failed to fetch parcel', error);
      toast.error('Failed to load parcel details');
    } finally {
      setLoading(false);
    }
  };

  const initiatePayment = async (amount) => {
    try {
      console.log('Initiating payment for amount:', amount, 'Parcel ID:', id);
      const response = await paymentApi.createIntent({ 
        amount, 
        currency: 'bdt',
        parcelId: id 
      });
      console.log('Payment intent response:', response);
      if (response.clientSecret) {
        setClientSecret(response.clientSecret);
        setShowModal(true);
      } else {
        console.error('No client secret received');
        toast.error('Failed to initialize payment: No client secret');
      }
    } catch (error) {
      console.error('Payment init failed', error);
      toast.error('Failed to initialize payment');
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
        console.log('Payment succeeded, confirming with backend:', paymentIntent.id);
        await paymentApi.confirmPayment({
            paymentIntentId: paymentIntent.id,
            parcelId: id
        });
        
        toast.success('Payment successful!');
        navigate('/dashboard/payment-history');
    } catch (error) {
        console.error('Failed to update payment status', error);
        toast.error('Payment successful but failed to update system. Please contact support.');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!parcel) return <div className="p-8 text-center">Parcel not found</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-black">Pay for Parcel</h1>
        <p className="text-black text-sm text-grays">Tracking ID: {parcel.trackingId}</p>
      </header>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between border-b pb-4">
            <span className="text-gray-500">Amount to Pay</span>
            <span className="text-2xl font-bold text-black">৳{parcel.cost}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
                <p className="text-gray-500">Sender</p>
                <p className="font-semibold text-black">{parcel.senderInfo.name}</p>
            </div>
            <div>
                <p className="text-gray-500">Receiver</p>
                <p className="font-semibold text-black">{parcel.receiverInfo.name}</p>
            </div>
            <div className="col-span-2">
                <p className="text-gray-500">From</p>
                <p className="text-black">{parcel.senderInfo.address}</p>
            </div>
             <div className="col-span-2">
                <p className="text-gray-500">To</p>
                <p className="text-black">{parcel.receiverInfo.address}</p>
            </div>
        </div>

        <div className="pt-4">
            {parcel.paymentStatus === 'paid' ? (
                <div className="alert alert-success">
                    <span>This parcel is already paid.</span>
                </div>
            ) : (
                <button 
                    onClick={() => setShowModal(true)} 
                    className="btn bg-[#CAEB66] border-none text-black w-full"
                    disabled={!clientSecret}
                >
                    Pay Now
                </button>
            )}
        </div>
      </div>

      <PaymentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        clientSecret={clientSecret}
        amount={parcel.cost}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default PayParcel;
