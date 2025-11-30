import React, { useEffect, useState } from 'react';
import { statsApi } from '../../../utils/authApi';

const RiderHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statsApi.getStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch rider stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading stats...</div>;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-black">Rider Dashboard</h1>
        <p className="text-gray-500">Your performance and tasks.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat bg-white shadow-sm border border-gray-100 rounded-2xl">
          <div className="stat-title text-black">Total Earnings</div>
          <div className="stat-value text-success">৳{stats?.earnings || 0}</div>
          <div className="stat-desc text-black">Lifetime earnings</div>
        </div>
        <div className="stat bg-white shadow-sm border border-gray-100 rounded-2xl">
          <div className="stat-title text-black">To Pickup</div>
          <div className="stat-value text-primary">{stats?.parcelsToPickup || 0}</div>
          <div className="stat-desc text-black">Pending pickups</div>
        </div>
        <div className="stat bg-white shadow-sm border border-gray-100 rounded-2xl">
          <div className="stat-title text-black">To Deliver</div>
          <div className="stat-value text-secondary">{stats?.parcelsToDeliver || 0}</div>
          <div className="stat-desc text-black">Pending deliveries</div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-4 text-black">Total Deliveries Completed</h3>
        <div className="text-4xl font-bold text-black">{stats?.totalDeliveries || 0}</div>
      </div>
    </div>
  );
};

export default RiderHome;
