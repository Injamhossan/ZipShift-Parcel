import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import reviewQuote from "../../assets/customer-top.png";

const testimonials = [
  {
    id: 1,
    quote:
      "ZipShift keeps us updated in real time. Our customers love the transparency and we love the reliable deliveries.",
    name: "Awlad Hossin",
    role: "Senior Product Designer",
  },
  {
    id: 2,
    quote:
      "From pick-up to drop-off, the experience stays consistent. The team always handles parcels with care.",
    name: "Nasir Uddin",
    role: "CEO",
  },
  {
    id: 3,
    quote:
      "Their support makes same-day delivery possible for us. It transformed how we run our operations.",
    name: "Rasel Ahamed",
    role: "CTO",
  },
];

const dotBase =
  "mx-1 inline-flex h-1 rounded-full transition-all duration-300 bg-[#c4d5d2]";

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
        <img
          src={reviewQuote}
          alt="reviews illustration"
          className="mx-auto h-24 w-auto object-contain"
        />

        <h2 className="mt-6 text-[40px] font-extrabold text-[#072f29]">
          What our customers are saying
        </h2>
        <p className="mt-3 text-base text-[#4d6260]">
          ZipShift helps thousands of merchants with seamless shipping,
          real-time tracking, and a support team always on call.
        </p>

        <div className="mt-10">
          <Carousel
            autoPlay
            infiniteLoop
            emulateTouch
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            interval={6000}
            renderIndicator={(onClickHandler, isSelected, index, label) => (
              <button
                type="button"
                aria-label={label}
                key={index}
                onClick={onClickHandler}
                className={`${dotBase} ${
                  isSelected ? "w-8 bg-[#0c3c35]" : "w-4"
                }`}
              />
            )}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="pb-8">
                <article className="mx-auto max-w-[640px] rounded-4xl bg-white px-8 py-10 text-left shadow-lg">
                  <div className="text-4xl text-[#8bd5c4]">“</div>
                  <p className="mt-4 text-lg text-[#163330]">
                    {testimonial.quote}
                  </p>
                  <div className="mt-8 border-t border-dashed border-[#c0d5d1]" />
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#0d3f34]">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-[#5b6f6c]">
                        {testimonial.role}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d3f34] text-white">
                      ●
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

