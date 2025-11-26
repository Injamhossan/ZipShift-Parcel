import React from "react";
import useDashboardStore from "../../../store/dashboardStore";

const statusColor = {
  "On the way": "badge-info",
  Picked: "badge-warning",
  Delivered: "badge-success",
};

const ParcelList = () => {
  const { parcels } = useDashboardStore();
  const totalParcels = parcels.length;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-black">All Parcels</h1>
        <p className="text-black">
          Monitor every shipment created from your merchant panel.
        </p>
      </header>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-black">
              Summary
            </p>
            <h2 className="text-2xl font-semibold text-black">
              {totalParcels} Parcels
            </h2>
          </div>
          <button className="btn bg-[#CAEB66] border-none text-black">
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-black">
                <th>ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Status</th>
                <th>COD</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel.id}>
                  <td className="font-semibold text-black">{parcel.id}</td>
                  <td>
                    <div>
                      <p className="font-medium text-black">
                        {parcel.customerName || parcel.customer}
                      </p>
                      <p className="text-sm text-black">+8801***</p>
                    </div>
                  </td>
                  <td className="text-black">{parcel.address}</td>
                  <td>
                    <span className={`badge ${statusColor[parcel.status]}`}>
                      {parcel.status}
                    </span>
                  </td>
                  <td className="font-semibold text-black">
                    {parcel.amount || `৳${parcel.cod}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParcelList;

