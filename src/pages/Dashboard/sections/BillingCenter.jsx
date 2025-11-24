import React from "react";

const payouts = [
  { id: "INV-00123", date: "24 Nov 2025", amount: "৳18,500", status: "Paid" },
  { id: "INV-00118", date: "17 Nov 2025", amount: "৳12,960", status: "Paid" },
  { id: "INV-00112", date: "10 Nov 2025", amount: "৳9,420", status: "Processing" },
];

const BillingCenter = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-wide text-black">
            Finance
          </p>
          <h1 className="text-3xl font-bold text-black">
            Billing & payouts
          </h1>
        </div>
        <button className="btn bg-[#CAEB66] border-none text-black">
          Download statement
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Wallet balance", value: "৳6,200", detail: "Ready to withdraw" },
          { label: "Pending COD", value: "৳21,430", detail: "Collected by riders" },
          { label: "Last payout", value: "৳18,500", detail: "24 Nov 2025" },
        ].map((card) => (
          <article
            key={card.label}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <p className="text-sm uppercase tracking-wide text-black">
              {card.label}
            </p>
            <p className="text-3xl font-bold text-black mt-2">{card.value}</p>
            <p className="text-black mt-1">{card.detail}</p>
          </article>
        ))}
      </section>

      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-black mb-4">
          Recent payouts
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="text-black">
                <th>Invoice</th>
                <th>Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((item) => (
                <tr key={item.id}>
                  <td className="font-semibold text-black">{item.id}</td>
                  <td className="text-black">{item.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="font-semibold text-black">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default BillingCenter;

