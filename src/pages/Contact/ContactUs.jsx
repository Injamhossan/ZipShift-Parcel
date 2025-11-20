import React from "react";
import communicationIcon from "../../assets/Social/communication.png";
import locationIcon from "../../assets/location-merchant.png";

const channels = [
  {
    title: "Merchant Support",
    info: "support@zipshift.com",
    detail: "Response within 4 working hours",
  },
  {
    title: "Sales & Partnerships",
    info: "+880 1777-123456",
    detail: "Sun–Thu, 9:00 AM – 8:00 PM",
  },
  {
    title: "Logistics Hotline",
    info: "16588",
    detail: "24/7 for urgent delivery queries",
  },
];

const ContactUs = () => {
  return (
    <main className="bg-[#e9eff2] py-16">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <section className="rounded-[40px] bg-white p-8 shadow-lg sm:p-12">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#0f5a4d]">
              Contact
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-[#082f2a]">
              We’re here for merchants and customers 24/7
            </h1>
            <p className="mt-4 text-base text-[#4b5f5c]">
              Reach us via chat, hotline, or email. Our support specialists and
              operations desk work side by side to resolve issues fast.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {channels.map((channel) => (
              <article
                key={channel.title}
                className="rounded-3xl border border-dashed border-[#8ecdc1] p-6 text-center"
              >
                <p className="text-lg font-semibold text-[#0d3f34]">
                  {channel.title}
                </p>
                <p className="mt-2 text-sm text-[#4b5e5c]">{channel.detail}</p>
                <p className="mt-4 text-xl font-semibold text-[#0d3f34]">
                  {channel.info}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="rounded-[32px] border border-[#d9e7e4] p-6">
              <h2 className="text-2xl font-semibold text-[#0d3f34]">
                Send us a message
              </h2>
              <form className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-2xl border border-[#d2e3df] bg-[#f7fbfa] px-4 py-3 outline-none"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-[#d2e3df] bg-[#f7fbfa] px-4 py-3 outline-none"
                />
                <textarea
                  rows="4"
                  placeholder="Tell us about your request"
                  className="w-full rounded-2xl border border-[#d2e3df] bg-[#f7fbfa] px-4 py-3 outline-none"
                />
                <button className="w-full rounded-full bg-[#c4f243] py-3 font-semibold text-[#062f29]">
                  Submit message
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="rounded-[32px] bg-[#032f35] p-6 text-white">
                <h3 className="text-2xl font-semibold">Visit our HQ</h3>
                <p className="mt-3 text-base text-[#d5f5ec]">
                  House 15, Road 11, Banani, Dhaka 1213
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={locationIcon}
                    alt="location pin"
                    className="h-12 w-12 object-contain"
                  />
                  <p className="text-sm text-[#aee8da]">
                    Open Sun–Thu, 9:00 AM – 8:00 PM
                  </p>
                </div>
              </div>
              <div className="rounded-[32px] bg-white p-6 shadow">
                <div className="flex items-center gap-4">
                  <img
                    src={communicationIcon}
                    alt="communication"
                    className="h-14 w-14 object-contain"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-[#0d3f34]">
                      Live chat
                    </h4>
                    <p className="text-sm text-[#4f6260]">
                      Chat with ZipShift support directly in the merchant
                      dashboard.
                    </p>
                  </div>
                </div>
                <button className="mt-6 rounded-full border border-[#0f5a4d] px-6 py-3 text-sm font-semibold text-[#0f5a4d]">
                  Open chat widget
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContactUs;