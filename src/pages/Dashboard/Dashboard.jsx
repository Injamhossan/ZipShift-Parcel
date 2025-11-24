import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { signOutUser } from "../../utils/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const navItems = [
  { label: "Overview", icon: "fa-gauge", to: "/dashboard/overview" },
  { label: "Parcels", icon: "fa-boxes-stacked", to: "/dashboard/parcels" },
  { label: "Create Parcel", icon: "fa-plus", to: "/dashboard/create-parcel" },
  { label: "Tracking", icon: "fa-location-dot", to: "/dashboard/tracking" },
  { label: "Billing", icon: "fa-file-invoice-dollar", to: "/dashboard/billing" },
  { label: "Support", icon: "fa-headset", to: "/dashboard/support" },
  { label: "Profile", icon: "fa-user", to: "/dashboard/profile" },
];

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
    <div className="py-8 px-4 mx-auto max-w-[1850px] ">
      <div className="mx-auto max-w-[1800px]">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-72 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-max">
            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
              <div className="avatar placeholder">
                <div className="bg-[#CAEB66] text-black rounded-full w-14">
                  <span className="text-xl font-bold">
                    {user?.displayName?.charAt(0)?.toUpperCase() ||
                      user?.name?.charAt(0)?.toUpperCase() ||
                      user?.email?.charAt(0)?.toUpperCase() ||
                      "U"}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-black">Merchant</p>
                <h2 className="font-semibold text-black">
                  {user?.displayName || user?.name || "ZipShift User"}
                </h2>
                <p className="text-xs text-black">{user?.email}</p>
              </div>
            </div>

            <nav className="py-6 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                      isActive
                        ? "bg-[#CAEB66]/20 text-black"
                        : "text-black hover:bg-gray-100"
                    }`
                  }
                >
                  <i className={`fa-solid ${item.icon}`}></i>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="pt-6 border-t border-gray-100 space-y-3">
              <button className="btn btn-sm hover:bg-[#CAEB66] btn-outline w-full border-[#CAEB66] text-black">
                Merchant Guide
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-red-500 border-none text-white w-full"
              >
                Logout
              </button>
            </div>
          </aside>

          <main className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
