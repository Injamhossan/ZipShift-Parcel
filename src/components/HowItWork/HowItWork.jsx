import React from "react";
import bookingIcon from "../../assets/bookingIcon.png";

const steps = [
  {
    id: 1,
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 2,
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 3,
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    id: 4,
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const HowItWork = () => {
  return (
    <section className="w-full py-16">
      <div className="mx-auto max-w-[1600px] px-6">
        <h2 className="text-3xl font-extrabold text-[#103b36]">How it Works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e1f3ed]">
                <img
                  src={bookingIcon}
                  alt="booking icon"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-[#0b3e3a]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-[#4b6160]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWork;

