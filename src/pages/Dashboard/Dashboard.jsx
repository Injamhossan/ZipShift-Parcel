import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { signOutUser } from "../../utils/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutUser();
      logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="mx-auto max-w-[1800px] py-8 px-4 sm:px-6 lg:px-1">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your account and track your activities
          </p>
        </div>

        {/* User Profile Card */}
        <div className="bg-linear-to-r from-[#CAEB66] to-[#a8c94a] rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="avatar">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-gray-800">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>
                    {user?.displayName?.charAt(0)?.toUpperCase() ||
                      user?.name?.charAt(0)?.toUpperCase() ||
                      user?.email?.charAt(0)?.toUpperCase() ||
                      "U"}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.displayName || user?.name || "User"}
              </h2>
              <p className="text-gray-700 mb-2">{user?.email}</p>
              {user?.phoneNumber && (
                <p className="text-gray-700">{user.phoneNumber}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Total Orders
              </h3>
              <div className="bg-[#CAEB66] rounded-lg p-2">
                <i className="fa-solid fa-box text-gray-800"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-2">No orders yet</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Pending Orders
              </h3>
              <div className="bg-[#CAEB66] rounded-lg p-2">
                <i className="fa-solid fa-clock text-gray-800"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-2">All clear</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
              <div className="bg-[#CAEB66] rounded-lg p-2">
                <i className="fa-solid fa-check-circle text-gray-800"></i>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-2">Keep it up!</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/services"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#CAEB66] hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="border-gray-200 border  bg-white rounded-lg p-3">
                  <i className="fa-solid fa-truck text-gray-800 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Book Service</h4>
                  <p className="text-sm text-gray-500">Order delivery</p>
                </div>
              </div>
            </Link>

            <Link
              to="/pricing"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#CAEB66] hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="border-gray-200 border  bg-white rounded-lg p-3">
                  <i className="fa-solid fa-tag text-gray-800 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">View Pricing</h4>
                  <p className="text-sm text-gray-500">Check rates</p>
                </div>
              </div>
            </Link>

            <Link
              to="/coverage"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#CAEB66] hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="border-gray-200 border  bg-white rounded-lg p-3">
                  <i className="fa-solid fa-map-location-dot text-gray-800 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Coverage</h4>
                  <p className="text-sm text-gray-500">Service areas</p>
                </div>
              </div>
            </Link>

            <Link
              to="/contactus"
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#CAEB66] hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="border-gray-200 border  bg-white rounded-lg p-3">
                  <i className="fa-solid fa-headset text-gray-800 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Support</h4>
                  <p className="text-sm text-gray-500">Get help</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Account Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">
                  Profile Information
                </h4>
                <p className="text-sm text-gray-500">
                  Update your personal details
                </p>
              </div>
              <button className="btn btn-outline border-[#CAEB66] text-[#CAEB66] hover:bg-[#CAEB66] hover:text-black">
                Edit
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">Change Password</h4>
                <p className="text-sm text-gray-500">Update your password</p>
              </div>
              <button className="btn btn-outline border-[#CAEB66] text-[#CAEB66] hover:bg-[#CAEB66] hover:text-black">
                Change
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">
                  Notification Settings
                </h4>
                <p className="text-sm text-gray-500">
                  Manage your notifications
                </p>
              </div>
              <button className="btn btn-outline border-[#CAEB66] text-[#CAEB66] hover:bg-[#CAEB66] hover:text-black">
                Settings
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-red-200">
              <div>
                <h4 className="font-semibold text-red-600">Logout</h4>
                <p className="text-sm text-gray-500">
                  Sign out from your account
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="btn bg-red-600 text-white hover:bg-red-700 border-none"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
