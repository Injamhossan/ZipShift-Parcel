import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { signOutUser } from "../../utils/firebaseAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const userNavItems = [
  { label: "Overview", icon: "fa-gauge", to: "/dashboard/user-overview" },
  { label: "Add Parcel", icon: "fa-plus", to: "/dashboard/create-parcel" },
  { label: "Parcels to Pay", icon: "fa-file-invoice-dollar", to: "/dashboard/parcel-to-pay" },
  { label: "Manage Parcels", icon: "fa-boxes-stacked", to: "/dashboard/manage-parcel" },
  { label: "Payment History", icon: "fa-clock-rotate-left", to: "/dashboard/payment-history" },
  { label: "Settings", icon: "fa-user-gear", to: "/dashboard/settings" },
];

const adminNavItems = [
  { label: "Overview", icon: "fa-gauge", to: "/dashboard/admin-overview" },
  { label: "Manage Users", icon: "fa-users", to: "/dashboard/manage-users" },
  { label: "Manage Riders", icon: "fa-motorcycle", to: "/dashboard/manage-riders" },
  { label: "Delivery Management", icon: "fa-truck-fast", to: "/dashboard/delivery-management" },
  { label: "Settings", icon: "fa-user-gear", to: "/dashboard/settings" },
];

const riderNavItems = [
  { label: "Overview", icon: "fa-gauge", to: "/dashboard/rider-overview" },
  { label: "Parcels to Pickup", icon: "fa-box-open", to: "/dashboard/parcel-to-pickup" },
  { label: "Parcels to Deliver", icon: "fa-truck-ramp-box", to: "/dashboard/parcel-to-delivery" },
  { label: "Settings", icon: "fa-user-gear", to: "/dashboard/settings" },
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

  const getNavItems = () => {
    console.log('Dashboard User:', user);
    switch (user?.role) {
      case 'admin': return adminNavItems;
      case 'rider': return riderNavItems;
      default: return userNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="py-8 px-4 mx-auto max-w-[1850px] ">
      <div className="mx-auto max-w-[1800px]">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-72 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-max">
            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
              <div className="avatar placeholder">
                {user?.photoURL || user?.photo || user?.avatar || user?.image ? (
                  <div className="bg-[#CAEB66] text-black rounded-full w-14 h-14">
                    <img
                      src={user?.photoURL || user?.photo || user?.avatar || user?.image}
                      alt={user?.displayName || user?.name || "User"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-[#CAEB66] text-black rounded-full w-14 h-14 flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {user?.displayName?.charAt(0)?.toUpperCase() ||
                        user?.name?.charAt(0)?.toUpperCase() ||
                        user?.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-black capitalize">{user?.role || 'User'}</p>
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
