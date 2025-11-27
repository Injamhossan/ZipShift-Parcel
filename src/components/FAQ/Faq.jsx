import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How does ZipShift parcel delivery work?",
    answer:
      "Schedule a pick-up, hand over your package, and track every step in real time. We handle the routing, rider assignment, and secure drop-off so you can focus on your business.",
  },
  {
    id: 2,
    question: "Is it suitable for all business sizes?",
    answer:
      "Yes. From individual sellers to enterprise operations, our flexible service scales with your volume and delivery needs.",
  },
  {
    id: 3,
    question: "Does it really help with COD reconciliation?",
    answer:
      "We provide transparent Cash on Delivery reconciliation and detailed payout reports so you always know what’s owed and when it will arrive.",
  },
  {
    id: 4,
    question: "Do you offer smart alerts for parcels?",
    answer:
      "Yes. You receive live notifications for every delivery milestone, and your customers receive automated updates as well.",
  },
  {
    id: 5,
    question: "How will I know if a product is returned?",
    answer:
      "Our reverse logistics workflow notifies you instantly and lets you schedule next steps directly from the dashboard.",
  },
];

const Faq = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-extrabold text-[#0c3e39]">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[#5a6b69]">
          Get quick answers about coverage, COD, live tracking, and support.
          ZipShift’s help center is built to keep you informed at every step.
        </p>

        <div className="mt-10 space-y-4 text-left">
          {faqs.map((faq) => {
            const isActive = activeId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-3xl border border-[#d2e3df] bg-white shadow-sm ${
                  isActive ? "bg-[#def7f1] border-[#8dd6c6]" : ""
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-6 py-5 text-left text-base font-semibold text-[#12352f]"
                  onClick={() => setActiveId(isActive ? null : faq.id)}
                >
                  {faq.question}
                  <span
                    className={`ml-4 text-2xl transition ${
                      isActive ? "rotate-180 text-[#0f5d52]" : "text-[#6c7f7c]"
                    }`}
                  >
                    ˅
                  </span>
                </button>
                {isActive && (
                  <div className="px-6 pb-6 text-sm text-[#4c5d5b]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <button className="rounded-full bg-[#c4f243] px-8 py-3 text-base font-semibold text-[#06241f] shadow transition hover:-translate-y-0.5 hover:shadow-lg">
            See More FAQ’s
          </button>
        </div>
      </div>
    </section>
  );
};

export default Faq;

