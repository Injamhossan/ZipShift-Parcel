import React, { useEffect, useState } from 'react';
import { parcelApi } from '../../../utils/authApi';
import { Link } from 'react-router-dom';

const ManageParcel = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

  const filteredParcels = parcels.filter(p => {
    const matchesSearch = p.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.receiverInfo.contact.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
        case 'delivered': return 'badge-success';
        case 'cancelled': return 'badge-error';
        case 'unpaid': return 'badge-warning';
        case 'paid': return 'badge-info';
        default: return 'badge-ghost';
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-2xl text-black -font-bold">Manage Parcels</h1>
            <p className="text-black">Total Parcels: {parcels.length}</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <select 
                className="select select-bordered bg-white border border-gray-300 text-black w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="all">All Status</option>
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <input 
                type="text" 
                placeholder="Search ID or Phone..." 
                className="input input-bordered bg-white border border-gray-300 w-full text-black" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </header>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr>
              <th className='text-black'>Tracking ID</th>
              <th className='text-black'>Date</th>
              <th className='text-black'>Receiver</th>
              <th className='text-black'>Status</th>
              <th className='text-black'>Cost</th>
              <th className='text-black'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.length > 0 ? (
                filteredParcels.map((parcel) => (
                <tr key={parcel.id}>
                    <td className="font-mono text-xs font-bold text-black">{parcel.trackingId}</td>
                    <td className="text-xs text-black">{new Date(parcel.createdAt).toLocaleDateString()}</td>
                    <td>
                        <div className="font-bold text-black">{parcel.receiverInfo.name}</div>
                        <div className="text-xs text-gray-500">{parcel.receiverInfo.contact}</div>
                    </td>
                    <td>
                        <div className={`badge ${getStatusColor(parcel.status)} gap-2 capitalize`}>
                            {parcel.status}
                        </div>
                    </td>
                    <td className="font-bold text-black">৳{parcel.cost}</td>
                    <td>
                        <Link to={`/dashboard/tracking?id=${parcel.trackingId}`} className="btn btn-xs btn-ghost bg-[#CAEB66] border-none text-black">Track</Link>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-400">No parcels found</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageParcel;
