import React from "react";
import merchantIllustration from "../../assets/location-merchant.png";

const MerchantCta = () => {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6">
        <div className="border-[#0e5a4d]/40" />
        <div className="mt-8 overflow-hidden rounded-[48px] bg-[#012f36] text-white shadow-lg">
          <div className="relative flex flex-col gap-10 px-8 py-12 sm:px-12 lg:flex-row lg:items-center">
            <div className="absolute inset-0">
              <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(118,214,255,0.4),transparent_55%)]" />
            </div>

            <div className="relative flex-1 text-center lg:text-left">
              <p className="text-sm uppercase tracking-[0.35em] text-[#94ffd6]">
                Merchant & Customer First
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-snug sm:text-4xl">
                Merchant and Customer Satisfaction is Our First Priority
              </h2>
              <p className="mt-4 text-base text-[#daefe9]">
                We offer the lowest delivery charges without compromising safety.
                ZipShift Courier ensures every parcel reaches every corner of
                Bangladesh on time with maximum care.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <button className="rounded-full bg-[#c4f243] px-8 py-3 text-base font-semibold text-[#06342d] shadow-lg transition hover:-translate-y-0.5 hover:shadow-2xl">
                  Become a Merchant
                </button>
                <button className="rounded-full border border-[#5ed1b3] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#063c34]">
                  Earn with ZapShift Courier
                </button>
              </div>
            </div>

            <div className="relative flex-1">
              <div className="mx-auto max-w-[360px]">
                <img
                  src={merchantIllustration}
                  alt="Parcel boxes illustration"
                  className="w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MerchantCta;

