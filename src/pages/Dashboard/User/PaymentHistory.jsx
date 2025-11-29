import React, { useEffect, useState } from 'react';
import { parcelApi } from '../../../utils/authApi';

const PaymentHistory = () => {
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaidParcels();
  }, []);

  const fetchPaidParcels = async () => {
    try {
      // Fetching all parcels and filtering for now, ideally backend should support payment history endpoint
      const response = await parcelApi.getAllParcels({ status: 'paid' }); 
      // Also include delivered as they are paid
      // This is a simplification. Real payment history should come from a Payment collection.
      
      if (response.success) {
        // Filter locally if needed or rely on backend filter
        const paidItems = response.data.results.filter(p => p.paymentStatus === 'paid' || p.status === 'paid' || p.status === 'delivered');
        setParcels(paidItems);
      }
    } catch (error) {
      console.error('Failed to fetch payment history', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Payment History</h1>
        <p className="text-gray-500">View your past transactions.</p>
      </header>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Transaction Date</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length > 0 ? (
                parcels.map((parcel) => (
                <tr key={parcel.id}>
                    <td className="text-sm">{new Date(parcel.updatedAt).toLocaleDateString()}</td>
                    <td className="font-mono text-xs">{parcel.trackingId}</td>
                    <td className="font-bold text-green-600">৳{parcel.cost}</td>
                    <td>
                        <div className="badge badge-success gap-2">Paid</div>
                    </td>
                    <td className="text-xs uppercase">Card</td>
                </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400">No payment history found</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
