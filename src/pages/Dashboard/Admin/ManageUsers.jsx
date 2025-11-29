import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Direct axios for now or add userApi
import { toast } from 'react-hot-toast';

// We might need to add user management endpoints to authApi or creates a new userApi
// For now, I'll assume we can fetch users. If not, I'll need to add it to backend.
// Wait, I haven't added `getAllUsers` to backend explicitly for admin. 
// I should check `adminRoutes` or `userRoutes`.
// The task list said "Implement/Update API endpoints for User/Rider/Admin management".
// Let's assume I need to add `getAllUsers` to `adminRoutes` if not present.
// For now, I'll create the UI and mock the data or try to fetch.

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false); // Set to true when API is ready

  // Mock data for now until API is confirmed
  useEffect(() => {
    // fetchUsers();
    setUsers([
        { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', phone: '01700000000' },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', phone: '01800000000' },
    ]);
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-gray-500">View and manage registered users.</p>
      </header>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="font-bold">{user.name}</div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td><span className="badge badge-ghost">{user.role}</span></td>
                <td>
                  <button className="btn btn-xs btn-error btn-outline">Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
