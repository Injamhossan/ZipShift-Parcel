import React from "react";

const zones = [
  {
    title: "Dhaka Metro",
    details: [
      "Same-day pickup & delivery",
      "Dedicated rider fleet",
      "COD settlement within 24h",
    ],
  },
  {
    title: "North & East Hub",
    details: ["Rajshahi", "Rangpur", "Sylhet", "Mymensingh", "Bogura corridor"],
  },
  {
    title: "South & Coastal",
    details: ["Chattogram", "Barishal", "Khulna", "Cox's Bazar & coastal belts"],
  },
];

const metrics = [
  { label: "Districts covered", value: "72" },
  { label: "Pickup hubs", value: "35" },
  { label: "Active riders", value: "800+" },
  { label: "Linehaul trips / day", value: "120" },
];

const Coverage = () => {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <section className="rounded-[40px] bg-white p-8 shadow-lg sm:p-12">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#0f5a4d]">
              Coverage
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-[#0b322d]">
              We cover every corner of Bangladesh
            </h1>
            <p className="mt-4 text-base text-[#4a5d5b]">
              ZipShift's hybrid network combines metro riders, regional hubs,
              and long-haul partners. Whether you ship to busy city centers or
              coastal upazilas, your parcels stay visible from pickup to drop.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {zones.map((zone) => (
                <article
                  key={zone.title}
                  className="rounded-3xl border border-dashed border-[#8ecdc1] p-5"
                >
                  <h3 className="text-lg font-semibold text-[#0d3f34]">
                    {zone.title}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-[#4f6260]">
                    {zone.details.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[40px] bg-[#032f35] px-6 py-10 text-white shadow-lg sm:px-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/15 p-6 text-center"
              >
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className="mt-2 text-sm text-[#aee8da]">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Coverage;
