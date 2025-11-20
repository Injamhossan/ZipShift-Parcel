import React from "react";
import serviceIcon from "../../assets/service.png";

const services = [
  {
    id: 1,
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours nationwide. Express services in Dhaka complete within 4–6 hours from pick-up to drop-off.",
  },
  {
    id: 2,
    title: "Nationwide Delivery",
    description:
      "Door-to-door coverage across every district keeps parcels moving so your customers receive products within 48–72 hours.",
    featured: true,
  },
  {
    id: 3,
    title: "Fulfillment Solution",
    description:
      "Inventory management support, online order processing, secure packaging, and dedicated after-sales support in one service.",
  },
  {
    id: 4,
    title: "Cash on Home Delivery",
    description:
      "Offer 100% Cash on Delivery anywhere in Bangladesh with guaranteed parcel security and transparent reconciliation.",
  },
  {
    id: 5,
    title: "Corporate Service / Contract in Logistics",
    description:
      "Custom corporate logistics, warehouse handling, and inventory management for mid-size and enterprise partners.",
  },
  {
    id: 6,
    title: "Parcel Return",
    description:
      "Reverse logistics support to help customers return or exchange products and keep your online reputation thriving.",
  },
];

const ServicesShowcase = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1800px] rounded-[48px] bg-[#052d33] px-6 py-14 text-center text-white shadow-xl md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl rounded-4xl px-8 py-8">
          <h2 className="mt-4 text-3xl font-semibold">Our Services</h2>
          <p className="mt-3 text-base text-[#ddeadf]">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero
            hassle. From personal packages to business shipments — we deliver on
            time, every time.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className={`rounded-4xl border border-dashed border-[#8ecdc1]/70 bg-white p-8 text-left text-[#06241f] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(5,45,51,0.25)] ${
                service.featured
                  ? "bg-[#c4f243] hover:bg-[#d3ff6b]"
                  : "hover:bg-[#d3ff6b]"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5f4]">
                <img
                  src={serviceIcon}
                  alt="service icon"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <h3 className="mt-6 text-[24px] font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm text-[#4b5e5b]">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;

