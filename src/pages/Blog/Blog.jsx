import React from "react";
import riderImg from "../../assets/tiny-deliveryman.png";
import brandImg from "../../assets/brand.png";
import liveTracking from "../../assets/live-tracking.png";

const posts = [
  {
    id: 1,
    category: "Merchant Tips",
    title: "5 ways to reduce failed deliveries this festive season",
    summary:
      "Learn how proactive communication, smart routing, and flexible time windows can lift first-attempt success.",
    author: "Team ZipShift",
    image: riderImg,
  },
  {
    id: 2,
    category: "Product Updates",
    title: "Introducing smart COD reconciliation inside your dashboard",
    summary:
      "We’ve launched payout schedules, dispute tracking, and downloadable ledgers to make cash flow predictable.",
    author: "Product & Ops",
    image: liveTracking,
  },
  {
    id: 3,
    category: "Customer Stories",
    title: "How StartPeople scaled nationwide hiring with ZipShift",
    summary:
      "The HR-tech startup shares how dependable logistics helped them deliver contracts and kits across 60 districts.",
    author: "Case Study",
    image: brandImg,
  },
];

const Blog = () => {
  return (
    <main className="bg-[#e9eff2] py-16">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
        <section className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#0f5a4d]">
            Blog
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-[#082f2a]">
            Insights from the ZipShift team
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#4b5f5c]">
            Strategies, customer stories, and product updates to help you run a
            resilient logistics operation.
          </p>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col rounded-[32px] bg-white shadow-lg"
            >
              <div className="h-56 w-full overflow-hidden rounded-t-[32px] bg-[#f5fbfa] flex items-center justify-center">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-32 w-auto object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f5a4d]">
                  {post.category}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-[#0d3f34]">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm text-[#4f6260]">
                  {post.summary}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[#0d3f34]">
                    {post.author}
                  </p>
                  <button className="rounded-full border border-[#0f5a4d] px-4 py-2 text-xs font-semibold text-[#0f5a4d]">
                    Read Story
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Blog;