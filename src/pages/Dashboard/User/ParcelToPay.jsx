import React, { useEffect, useState } from 'react';
import { parcelApi } from '../../../utils/authApi';
import { Link } from 'react-router-dom';

const ParcelToPay = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const response = await parcelApi.getAllParcels({ status: 'unpaid' });
      if (response.success) {
        setParcels(response.data.results);
      }
    } catch (error) {
      console.error('Failed to fetch parcels', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredParcels = parcels.filter(p => 
    p.receiverInfo.contact.includes(searchTerm) || 
    p.receiverInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold">Parcels to Pay</h1>
            <p className="text-gray-500">Total Found: {parcels.length}</p>
        </div>
        <div className="form-control">
            <input 
                type="text" 
                placeholder="Search by phone..." 
                className="input input-bordered w-full max-w-xs" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </header>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Parcel ID</th>
              <th>Receiver</th>
              <th>Address</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.length > 0 ? (
                filteredParcels.map((parcel) => (
                <tr key={parcel.id}>
                    <td className="font-mono text-xs">{parcel.trackingId}</td>
                    <td>
                        <div className="font-bold">{parcel.receiverInfo.name}</div>
                        <div className="text-xs text-gray-500">{parcel.receiverInfo.contact}</div>
                    </td>
                    <td className="max-w-xs truncate">{parcel.receiverInfo.address}</td>
                    <td className="font-bold">৳{parcel.cost}</td>
                    <td className="flex gap-2">
                        <Link to={`/pay/${parcel.id}`} className="btn btn-sm bg-[#CAEB66] border-none text-black">Pay</Link>
                        <button className="btn btn-sm btn-error btn-outline">Delete</button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400">No unpaid parcels found</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParcelToPay;
