import React from "react";
import bigDeliveryman from "../../assets/big-deliveryman.png";

const values = [
  {
    id: 1,
    title: "Customer-first mindset",
    copy: "We build tools that keep merchants and recipients informed at every step—because transparency builds trust.",
  },
  {
    id: 2,
    title: "Reliable operations",
    copy: "From rider coaching to hub automation, we invest in systems that keep parcels moving safely and on schedule.",
  },
  {
    id: 3,
    title: "Innovation at scale",
    copy: "Our product and engineering teams constantly experiment with new delivery models, from micro-fulfillment to smart locker returns.",
  },
];

const timeline = [
  {
    year: "2018",
    detail: "ZipShift launches with five riders in Dhaka, focused on same-day delivery for local boutiques.",
  },
  {
    year: "2020",
    detail: "Nationwide coverage expands to 40+ districts with dedicated linehaul partners.",
  },
  {
    year: "2022",
    detail: "Introduced Cash on Delivery reconciliation dashboards and merchant APIs.",
  },
  {
    year: "2024",
    detail: "Crossed one million parcels delivered with 500+ merchants on the platform.",
  },
];

const AboutUs = () => {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <section className="grid gap-10 rounded-[40px] bg-white p-8 shadow-lg sm:p-12 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#0f5a4d]">
              About ZipShift
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-[#0b302b]">
              We deliver more than parcels—we deliver peace of mind.
            </h1>
            <p className="mt-4 text-base text-[#4a5d5a]">
              ZipShift connects merchants with every corner of Bangladesh
              through a hybrid network of riders, smart hubs, and technology.
              We combine local expertise with modern tooling so your customers
              receive products faster, safer, and with better communication.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <article
                  key={value.id}
                  className="rounded-3xl border border-dashed border-[#8ecdc1] p-5"
                >
                  <h3 className="text-lg font-semibold text-[#0d3f34]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#4f6260]">{value.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={bigDeliveryman}
              alt="ZipShift team"
              className="w-full max-w-md object-contain"
            />
          </div>
        </section>

        <section className="mt-16 rounded-[40px] bg-[#032f35] px-6 py-10 text-white shadow-lg sm:px-12">
          <h2 className="text-3xl font-semibold">Our journey so far</h2>
          <div className="mt-8 space-y-6">
            {timeline.map((event) => (
              <div
                key={event.year}
                className="rounded-3xl border border-white/20 px-6 py-4"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-[#8ae8d4]">
                  {event.year}
                </p>
                <p className="mt-2 text-base text-[#d7f4ec]">{event.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;