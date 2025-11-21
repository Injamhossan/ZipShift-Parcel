import React from "react";
import liveTracking from "../../assets/live-tracking.png";
import safeDelivery from "../../assets/safe-delivery.png";
import Support from "../../assets/support.svg"

const highlights = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real time from pick-up to drop-off. Monitor every mile of the journey and get instant status notifications for full peace of mind.",
    image: liveTracking,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "Each parcel is handled with care and delivered securely to its destination. Our proven process keeps every package damage-free and on schedule.",
    image: safeDelivery,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "A dedicated support team is always on standby to assist with questions, updates, or delivery concerns—anytime you need us.",
    image: Support,
  },
];

const SupportHighlights = () => {
  return (
    <section className="pt-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="border-t border-dashed border-[#0e5a4d]/40" />

        <div className="mt-8 flex flex-col gap-6">
          {highlights.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-6 rounded-4xl bg-white px-6 py-8 shadow-sm sm:px-10 md:flex-row md:items-center"
            >
              <div className="mx-auto flex w-full max-w-[220px] items-center justify-center md:mx-0 md:max-w-[260px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[200px] w-full object-contain"
                />
              </div>

              <div className="hidden h-28 w-px border-l border-dashed border-[#0e5a4d]/30 md:block" />

              <div className="text-center md:text-left">
                <h3 className="text-[24px] font-extrabold text-[#0d3f34]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-[#4a5d5a] sm:text-base">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 border-t border-dashed border-[#0e5a4d]/40" />
      </div>
    </section>
  );
};

export default SupportHighlights;

