import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import useDashboardStore from "../../../store/dashboardStore";

const DashboardOverview = () => {
  const { user } = useAuthStore();
  const { summary } = useDashboardStore();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-black mb-2">
          Welcome back, {user?.displayName || user?.name || "Merchant"}
        </h1>
        <p className="text-black">
          Track your parcel business and take quick actions from here.
        </p>
      </header>

      <section className="bg-linear-to-r from-[#CAEB66] to-[#a8c94a] rounded-2xl p-6">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="avatar">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-black">
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
          <div className="flex-1 min-w-[220px]">
            <h2 className="text-2xl font-bold text-black mb-1">
              {user?.displayName || user?.name || "User"}
            </h2>
            <p className="text-black">{user?.email}</p>
            {user?.phoneNumber && (
              <p className="text-black mt-1">+{user.phoneNumber}</p>
            )}
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/services"
              className="btn bg-white text-black border-none hover:bg-gray-100"
            >
              View Services
            </Link>
            <Link
              to="/pricing"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-black"
            >
              Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Total Shipments",
            value: summary?.totalShipments ?? "--",
            info: "All time",
            icon: "fa-box",
          },
          {
            title: "Pending Pickups",
            value: summary?.pendingPickups ?? "--",
            info: "Awaiting courier",
            icon: "fa-clock",
          },
          {
            title: "Delivered",
            value: summary?.deliveredLast30Days ?? "--",
            info: "Last 30 days",
            icon: "fa-check-circle",
          },
        ].map((card) => (
          <article
            key={card.title}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">
                {card.title}
              </h3>
              <div className="bg-[#CAEB66]/30 rounded-lg p-3">
                <i className={`fa-solid ${card.icon} text-black`}></i>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-black">
              {card.value}
            </p>
            <p className="text-sm text-black mt-2">{card.info}</p>
          </article>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-bold text-black mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Create Parcel",
              to: "/dashboard/create-parcel",
              icon: "fa-person-walking-luggage",
              desc: "Schedule pickup",
            },
            {
              label: "View Parcels",
              to: "/dashboard/parcels",
              icon: "fa-boxes-stacked",
              desc: "Manage orders",
            },
            {
              label: "Track Shipment",
              to: "/dashboard/tracking",
              icon: "fa-location-dot",
              desc: "Live status",
            },
            {
              label: "Billing",
              to: "/dashboard/billing",
              icon: "fa-file-invoice-dollar",
              desc: "Invoices & payouts",
            },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.to}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-[#CAEB66] hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="border-gray-200 border rounded-xl p-3">
                  <i className={`fa-solid ${action.icon} text-xl`}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-black">{action.label}</h4>
                  <p className="text-sm text-black">{action.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardOverview;

