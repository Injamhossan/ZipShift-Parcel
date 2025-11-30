import React, { useEffect, useState } from 'react';
import { parcelApi } from '../../../utils/authApi';
import { toast } from 'react-hot-toast';

const ParcelToDelivery = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await parcelApi.getAllParcels();
      if (response.success) {
        setParcels(response.data.results);
      }
    } catch (error) {
      console.error('Failed to fetch parcels', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (parcelId, newStatus) => {
    try {
        await parcelApi.updateParcel(parcelId, { status: newStatus });
        toast.success(`Status updated to ${newStatus}`);
        fetchParcels();
    } catch (error) {
        console.error('Update failed', error);
        toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-black">Parcels to Deliver</h1>
      </header>

      <div className="space-y-4">
        {parcels.filter(p => ['shipped', 'ready-for-delivery', 'out-for-delivery', 'assigned-delivery'].includes(p.status)).map(parcel => (
            <div key={parcel._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                    <div className="font-bold text-lg">{parcel.trackingId}</div>
                    <div className="text-sm">Receiver: {parcel.receiverInfo.name} ({parcel.receiverInfo.contact})</div>
                    <div className="text-xs text-gray-500">{parcel.receiverInfo.address}</div>
                    <div className="badge badge-info mt-2">{parcel.status}</div>
                </div>
                <div className="flex flex-col gap-2">
                    {parcel.status !== 'out-for-delivery' && (
                        <button 
                            onClick={() => handleStatusUpdate(parcel._id, 'out-for-delivery')}
                            className="btn btn-sm btn-outline"
                        >
                            Start Delivery
                        </button>
                    )}
                    <button 
                        onClick={() => handleStatusUpdate(parcel._id, 'delivered')}
                        className="btn btn-sm bg-[#CAEB66] border-none text-black"
                    >
                        Confirm Delivery
                    </button>
                </div>
            </div>
        ))}
         {parcels.filter(p => ['shipped', 'ready-for-delivery', 'out-for-delivery', 'assigned-delivery'].includes(p.status)).length === 0 && (
            <div className="text-center text-gray-400 py-8">No pending deliveries</div>
         )}
      </div>
    </div>
  );
};

export default ParcelToDelivery;
