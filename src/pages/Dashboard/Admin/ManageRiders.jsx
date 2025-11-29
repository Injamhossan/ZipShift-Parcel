import React, { useEffect, useState } from 'react';
import { parcelApi } from '../../../utils/authApi';

const ManageRiders = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = async () => {
    try {
      const response = await parcelApi.getAllRiders();
      if (response.success) {
        setRiders(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch riders', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Manage Riders</h1>
        <p className="text-gray-500">View and manage delivery partners.</p>
      </header>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Vehicle</th>
              <th>Status</th>
              <th>Earnings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.length > 0 ? (
                riders.map((rider) => (
                <tr key={rider._id}>
                    <td>
                        <div className="font-bold">{rider.name}</div>
                        <div className="text-xs text-gray-500">{rider.email}</div>
                    </td>
                    <td>{rider.phone}</td>
                    <td>{rider.vehicleType} - {rider.vehicleNumber}</td>
                    <td>
                        <div className={`badge ${rider.isAvailable ? 'badge-success' : 'badge-warning'}`}>
                            {rider.isAvailable ? 'Available' : 'Busy'}
                        </div>
                    </td>
                    <td>৳{rider.earnings || 0}</td>
                    <td>
                        <button className="btn btn-xs btn-primary btn-outline">Edit</button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-400">No riders found</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRiders;
