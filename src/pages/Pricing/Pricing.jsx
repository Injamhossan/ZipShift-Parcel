import React from "react";

const plans = [
  {
    id: 1,
    name: "Starter",
    price: "৳65 / parcel",
    summary: "Perfect for new merchants shipping up to 200 parcels per month.",
    features: [
      "Dhaka metro pickup & delivery",
      "Cash on Delivery support",
      "Tracking links for customers",
      "Email support",
    ],
  },
  {
    id: 2,
    name: "Growth",
    price: "৳55 / parcel",
    summary: "Scale nationwide with discounted rates and priority support.",
    featured: true,
    features: [
      "Nationwide delivery (72 districts)",
      "Next-day metro SLA",
      "Automated COD reconciliation",
      "Dedicated account manager",
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    summary:
      "Tailored pricing, APIs, and logistics consulting for high-volume teams.",
    features: [
      "Custom fulfillment workflows",
      "API & webhook integrations",
      "Advanced analytics & reports",
      "24/7 priority support",
    ],
  },
];

const Pricing = () => {
  return (
    <main className="py-16">
      <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
        <p className="text-sm uppercase tracking-[0.35em] text-[#0f5a4d]">
          Pricing
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-[#0a302b]">
          Flexible plans built for growing businesses
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#4b5f5c]">
          Pay only for the parcels you ship, unlock lower rates as you scale, and
          customize services to match your customer promise.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={`flex flex-col rounded-4xl border border-[#d2e3df] bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                plan.featured ? "bg-[#0f4036] text-white" : ""
              }`}
            >
              <p className="text-sm uppercase text-black tracking-[0.3em]">
                {plan.name}
              </p>
              <p className="mt-4 text-4xl text-[#03373D] font-bold">{plan.price}</p>
              <p
                className={`mt-3 text-base ${
                  plan.featured ? "text-black" : "text-black"
                }`}
              >
                {plan.summary}
              </p>
              <div className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <p
                    key={feature}
                    className={`flex items-center gap-3 text-sm ${
                      plan.featured ? "text-[#4f6260]" : "text-[#4f6260]"
                    }`}
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c4f243] text-[#062f29] text-xs font-bold">
                      ✓
                    </span>
                    {feature}
                  </p>
                ))}
              </div>
              <button
                className={`mt-8 rounded-full px-6 py-3 text-sm font-semibold ${
                  plan.featured
                    ? "bg-[#c4f243] text-[#062f29]"
                    : "border border-[#0f5a4d] text-[#0f5a4d]"
                }`}
              >
                {plan.featured ? "Start Growth Plan" : "Choose Plan"}
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Pricing;