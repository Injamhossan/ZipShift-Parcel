import React, { useEffect, useState } from 'react';
import { parcelApi } from '../../../utils/authApi';
import { toast } from 'react-hot-toast';

const ParcelToPickup = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await parcelApi.getAllParcels(); // Backend filters for rider
      if (response.success) {
        // Filter locally for pickup tasks just in case
        // Ideally backend should return only assigned tasks.
        // The controller `getAllParcels` for rider returns parcels where `pickupRiderId` OR `deliveryRiderId` matches.
        // So we need to filter for pickup tasks here.
        // Pickup tasks are those where `pickupRiderId` is current rider (we can't easily check ID here without user context, but we can check status)
        // Statuses for pickup: 'assigned', 'paid' (if assigned), 'ready-to-pickup'
        // Let's rely on the fact that if it's in the list and status is early stage, it's a pickup.
        
        // Actually, better to check if `pickupRiderId` is populated and matches user. 
        // But `getAllParcels` populates it.
        // Let's just list all and show action button based on status.
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
        <h1 className="text-2xl font-bold text-black">Parcels to Pickup</h1>
      </header>

      <div className="space-y-4">
        {parcels.filter(p => ['paid', 'assigned-pickup', 'ready-to-pickup'].includes(p.status)).map(parcel => (
            <div key={parcel._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                    <div className="font-bold text-lg">{parcel.trackingId}</div>
                    <div className="text-sm">Sender: {parcel.senderInfo.name} ({parcel.senderInfo.contact})</div>
                    <div className="text-xs text-gray-500">{parcel.senderInfo.address}</div>
                    <div className="badge badge-warning mt-2">{parcel.status}</div>
                </div>
                <div>
                    <button 
                        onClick={() => handleStatusUpdate(parcel._id, 'picked-up')}
                        className="btn btn-sm bg-[#CAEB66] border-none text-black"
                    >
                        Confirm Pickup
                    </button>
                </div>
            </div>
        ))}
         {parcels.filter(p => ['paid', 'assigned-pickup', 'ready-to-pickup'].includes(p.status)).length === 0 && (
            <div className="text-center text-gray-400 py-8">No pending pickups</div>
         )}
      </div>
    </div>
  );
};

export default ParcelToPickup;
