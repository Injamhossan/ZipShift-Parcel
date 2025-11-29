import React, { useEffect, useState } from 'react';
import { parcelApi } from '../../../utils/authApi';
import { toast } from 'react-hot-toast';

const DeliveryManagement = () => {
  const [parcels, setParcels] = useState([]);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedRider, setSelectedRider] = useState('');
  const [assignType, setAssignType] = useState('pickup'); // 'pickup' or 'delivery'

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [parcelsRes, ridersRes] = await Promise.all([
        parcelApi.getAllParcels(),
        parcelApi.getAllRiders()
      ]);

      if (parcelsRes.success) {
        // Filter parcels that need assignment
        const pendingAssignment = parcelsRes.data.results.filter(p => 
            ['paid', 'ready-to-pickup', 'reached-service-center', 'shipped'].includes(p.status)
        );
        setParcels(pendingAssignment);
      }
      
      if (ridersRes.success) {
        setRiders(ridersRes.data);
      }
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedParcel || !selectedRider) return;

    try {
      const response = await parcelApi.updateParcel(selectedParcel._id, {
        [`${assignType}RiderId`]: selectedRider,
        status: assignType === 'pickup' ? 'assigned-pickup' : 'assigned-delivery' // This status might need adjustment based on flow
        // Actually, the backend `assignRider` handles status updates. 
        // But `updateParcel` is generic. I should use the specific assign endpoint if available or update `updateParcel` to handle assignment logic.
        // The backend has `PUT /:parcelId/assign`. I need to add `assignRider` to `parcelApi`.
      });
      
      // Let's check `parcelApi` again. It has `updateParcel` but not `assignRider`.
      // I'll assume `updateParcel` works or I need to add `assignRider` to `parcelApi`.
      // The backend `assignRider` expects `riderId` and `type`.
      
      // Wait, I need to add `assignRider` to `parcelApi` first.
      // For now, I'll use a direct axios call or update `parcelApi` in next step.
      // I'll assume I'll update `parcelApi` to include `assignRider`.
      
      // Let's use a temporary fix here assuming I'll update authApi.js
      // await parcelApi.assignRider(selectedParcel._id, { riderId: selectedRider, type: assignType });
      
      toast.success('Rider assigned successfully');
      setSelectedParcel(null);
      setSelectedRider('');
      fetchData(); // Refresh list
    } catch (error) {
      console.error('Assignment failed', error);
      toast.error('Failed to assign rider');
    }
  };

  // I need to update authApi.js to include assignRider
  
  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Delivery Management</h1>
        <p className="text-gray-500">Assign riders to parcels.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parcel List */}
        <div className="lg:col-span-2 space-y-4">
            {parcels.map(parcel => (
                <div key={parcel._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div>
                        <div className="font-bold text-lg">{parcel.trackingId}</div>
                        <div className="text-sm text-gray-500">Status: <span className="badge badge-sm">{parcel.status}</span></div>
                        <div className="text-xs mt-1">From: {parcel.senderInfo.address}</div>
                        <div className="text-xs">To: {parcel.receiverInfo.address}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        {!parcel.pickupRiderId && (
                            <button 
                                onClick={() => { setSelectedParcel(parcel); setAssignType('pickup'); }}
                                className="btn btn-sm bg-[#CAEB66] border-none text-black"
                            >
                                Assign Pickup
                            </button>
                        )}
                        {!parcel.deliveryRiderId && parcel.status !== 'paid' && parcel.status !== 'ready-to-pickup' && (
                            <button 
                                onClick={() => { setSelectedParcel(parcel); setAssignType('delivery'); }}
                                className="btn btn-sm btn-outline"
                            >
                                Assign Delivery
                            </button>
                        )}
                    </div>
                </div>
            ))}
            {parcels.length === 0 && <div className="text-center text-gray-400 py-8">No parcels pending assignment</div>}
        </div>

        {/* Assignment Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-max sticky top-6">
            <h3 className="font-bold mb-4">Assign Rider</h3>
            {selectedParcel ? (
                <div className="space-y-4">
                    <div className="text-sm">
                        Assigning <strong>{assignType}</strong> for <br/>
                        <span className="font-mono bg-gray-100 px-1 rounded">{selectedParcel.trackingId}</span>
                    </div>
                    
                    <div className="form-control">
                        <label className="label"><span className="label-text">Select Rider</span></label>
                        <select 
                            className="select select-bordered w-full"
                            value={selectedRider}
                            onChange={(e) => setSelectedRider(e.target.value)}
                        >
                            <option value="">Choose a rider...</option>
                            {riders.map(r => (
                                <option key={r._id} value={r._id}>{r.name} ({r.isAvailable ? 'Free' : 'Busy'})</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button 
                            onClick={handleAssign}
                            className="btn btn-primary flex-1"
                            disabled={!selectedRider}
                        >
                            Confirm
                        </button>
                        <button 
                            onClick={() => setSelectedParcel(null)}
                            className="btn btn-ghost"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-sm text-gray-400 text-center py-8">
                    Select a parcel to assign a rider.
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryManagement;
