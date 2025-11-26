import React from "react";
import useDashboardStore from "../../../store/dashboardStore";

const TrackingCenter = () => {
  const { tracking } = useDashboardStore();
  const timeline = tracking?.timeline || [];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-black">
          Live tracking
        </p>
        <h1 className="text-3xl font-bold text-black">
          Track your shipment
        </h1>
      </header>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Tracking ID (e.g. ZX-12098)"
            className="input text-black input-bordered flex-1 bg-gray-50"
          />
          <button className="btn bg-[#CAEB66] border-none text-black px-10">
            Track
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Current hub", value: tracking?.currentHub || "--" },
            { label: "Estimated delivery", value: tracking?.eta || "--" },
            { label: "Rider contact", value: tracking?.riderContact || "--" },
          ].map((info) => (
            <article
              key={info.label}
              className="rounded-xl border border-gray-100 p-4 bg-gray-50"
            >
              <p className="text-sm uppercase tracking-wide text-black">
                {info.label}
              </p>
              <p className="text-lg font-semibold text-black">
                {info.value}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-black mb-4">
          Status timeline
        </h2>
        <ol className="space-y-4">
          {timeline.map((step, index) => (
            <li key={step.label} className="flex items-start gap-4">
              <span
                className={`mt-1 h-4 w-4 rounded-full border-2 ${
                  step.done ? "bg-[#CAEB66] border-[#CAEB66]" : "border-gray-300"
                }`}
              ></span>
              <div>
                <p className="font-medium text-black">{step.label}</p>
                <p className="text-sm text-black">{step.time}</p>
                {index < timeline.length - 1 && (
                  <div className="border-l border-dashed border-gray-300 h-6 ml-2"></div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TrackingCenter;

