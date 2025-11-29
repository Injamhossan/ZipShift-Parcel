import React, { useEffect, useState } from 'react';
import { statsApi } from '../../../utils/authApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminHome = () => {
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
        console.error('Failed to fetch admin stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading stats...</div>;

  const chartData = [
    { name: 'Users', count: stats?.totalUsers || 0 },
    { name: 'Riders', count: stats?.totalRiders || 0 },
    { name: 'Parcels', count: stats?.totalParcels || 0 },
    { name: 'Delivered', count: stats?.deliveredParcels || 0 },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
        <p className="text-gray-500">System overview and statistics.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat bg-white shadow-sm border border-gray-100 rounded-2xl">
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{stats?.totalUsers}</div>
          <div className="stat-desc">Registered customers</div>
        </div>
        <div className="stat bg-white shadow-sm border border-gray-100 rounded-2xl">
          <div className="stat-title">Total Riders</div>
          <div className="stat-value text-secondary">{stats?.totalRiders}</div>
          <div className="stat-desc">Active delivery partners</div>
        </div>
        <div className="stat bg-white shadow-sm border border-gray-100 rounded-2xl">
          <div className="stat-title">Total Parcels</div>
          <div className="stat-value">{stats?.totalParcels}</div>
          <div className="stat-desc">All time bookings</div>
        </div>
        <div className="stat bg-white shadow-sm border border-gray-100 rounded-2xl">
          <div className="stat-title">Total Earnings</div>
          <div className="stat-value text-success">৳{stats?.totalEarnings}</div>
          <div className="stat-desc">Revenue generated</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96">
        <h3 className="font-bold mb-4">System Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#CAEB66" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminHome;
