import React from "react";

const supportOptions = [
  {
    title: "Live chat",
    desc: "Connect with our merchant success team instantly.",
    action: "Start chat",
  },
  {
    title: "Merchant hotline",
    desc: "Call 09638111111 for urgent delivery issues.",
    action: "Call now",
  },
  {
    title: "Knowledge base",
    desc: "Browse common questions and onboarding guides.",
    action: "Browse articles",
  },
];

const SupportCenter = () => {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm uppercase tracking-wide text-black">
          Support
        </p>
        <h1 className="text-3xl font-bold text-black">
          Need help with parcels?
        </h1>
        <p className="text-black max-w-2xl">
          Our rider management and merchant support team is available 7 days a
          week to solve delivery, COD, or payout issues.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportOptions.map((option) => (
          <article
            key={option.title}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col gap-4"
          >
            <div>
              <h2 className="text-xl font-semibold text-black">
                {option.title}
              </h2>
              <p className="text-black">{option.desc}</p>
            </div>
            <button className="btn btn-outline border-[#CAEB66] text-black hover:bg-[#CAEB66]">
              {option.action}
            </button>
          </article>
        ))}
      </section>

      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="text-xl font-semibold text-black">
          Raise a support ticket
        </h2>
        <form className="space-y-4">
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-black">
                Subject
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered bg-gray-50"
              placeholder="Missing COD amount"
              required
            />
          </div>
          <div className="form-control space-y-2">
            <label className="label">
              <span className="label-text font-medium text-black">
                Details
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered bg-gray-50"
              placeholder="Describe your issue"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button className="btn bg-[#CAEB66] border-none text-black px-8">
              Submit ticket
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SupportCenter;

