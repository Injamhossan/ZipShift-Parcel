import React, { useEffect, useState } from 'react';
import { statsApi } from '../../../utils/authApi';
import useAuthStore from '../../../store/authStore';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserHome = () => {
  const { user } = useAuthStore();
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
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading stats...</div>;

  const statusData = stats?.statusCounts ? Object.entries(stats.statusCounts).map(([name, value]) => ({ name, value })) : [];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-black">Welcome back, {user?.name || 'User'}!</h1>
        <p className="text-gray-500">Here is an overview of your parcel activities.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Info Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
               <img src={user?.photoURL || user?.photo || "https://placehold.co/100"} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <button className="btn btn-sm btn-outline mt-3">Edit Profile</button>
          </div>
        </div>

        {/* Stats Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-80">
          <h3 className="font-bold mb-4">Parcel Status Distribution</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">No data available</div>
          )}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['unpaid', 'paid', 'in-transit', 'delivered'].map((status) => (
          <div key={status} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <p className="text-sm text-gray-500 capitalize">{status.replace('-', ' ')}</p>
            <p className="text-2xl font-bold">{stats?.statusCounts?.[status] || 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
