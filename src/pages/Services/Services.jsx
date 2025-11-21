import React from "react";
import serviceIcon from "../../assets/service.png";
import liveTracking from "../../assets/live-tracking.png";
import safeDelivery from "../../assets/safe-delivery.png";

const coreServices = [
  {
    id: 1,
    title: "Express & Standard Delivery",
    description:
      "Same-day within Dhaka metro or 48–72 hour nationwide shipping handled by trained riders and smart routing.",
  },
  {
    id: 2,
    title: "Cash on Delivery & Reconciliation",
    description:
      "Offer COD anywhere in Bangladesh with real-time settlement tracking and transparent payout schedules.",
  },
  {
    id: 3,
    title: "Warehouse & Fulfillment",
    description:
      "Inventory storage, pick & pack, and custom packaging so you can scale without adding fixed overhead.",
  },
  {
    id: 4,
    title: "Corporate & SME Programs",
    description:
      "Dedicated account teams, API integrations, and SLA-backed delivery windows for growing businesses.",
  },
];

const workflow = [
  {
    id: 1,
    title: "Onboard in Minutes",
    copy: "Create your merchant profile, set COD rules, and invite teammates with role-based permissions.",
    icon: liveTracking,
  },
  {
    id: 2,
    title: "Schedule & Track",
    copy: "Book pickups, print labels, and get a single timeline for field riders, hubs, and outbound linehauls.",
    icon: safeDelivery,
  },
  {
    id: 3,
    title: "Delight Customers",
    copy: "Send automated SMS/email updates, offer flexible delivery slots, and resolve issues through our support desk.",
    icon: serviceIcon,
  },
];

const Services = () => {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <section className="rounded-[40px] bg-[#032f35] px-8 py-12 text-white shadow-xl sm:px-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#95ffe1]">
              Services
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              End-to-end logistics built for modern merchants
            </h1>
            <p className="mt-4 text-lg text-[#d6f5ec]">
              ZipShift combines reliable riders, flexible fulfillment, and smart
              software so you can launch new products, run campaigns, and scale
              nationwide with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div>
                <p className="text-4xl font-bold">1M+</p>
                <p className="text-sm text-[#a1dacf]">Parcels delivered</p>
              </div>
              <div>
                <p className="text-4xl font-bold">72</p>
                <p className="text-sm text-[#a1dacf]">District coverage</p>
              </div>
              <div>
                <p className="text-4xl font-bold">500+</p>
                <p className="text-sm text-[#a1dacf]">Merchant partners</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {coreServices.map((service) => (
            <article
              key={service.id}
              className="rounded-[32px] border border-dashed border-[#8ecdc1]/70 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5f4]">
                <img
                  src={serviceIcon}
                  alt="service icon"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#0d3f34]">
                {service.title}
              </h3>
              <p className="mt-3 text-base text-[#4b5e5b]">
                {service.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-[40px] bg-white p-8 shadow-lg sm:p-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0f5a4d]">
              How ZipShift Works
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-[#052f2a]">
              From onboarding to delivery in three steps
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {workflow.map((step) => (
              <article
                key={step.id}
                className="rounded-[28px] border border-[#e2ecea] p-6 text-center"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#eff7f5]">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="h-14 w-14 object-contain"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#0c3d36]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-[#50615f]">{step.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Services;