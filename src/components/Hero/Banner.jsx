import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import BannerImg1 from "../../assets/banner/Ban1.svg";
import BannerImg2 from "../../assets/banner/Ban2.svg";
import BannerImg3 from "../../assets/banner/Ban3.svg";

const slides = [
  {
    id: 1,
    prefix: "We Make Sure Your",
    highlight: "Parcel Arrives On Time",
    suffix: " — No Fuss.",
    description:
      "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
    primaryLabel: "Track Your Parcel",
    secondaryLabel: "Be A Rider",
    image: BannerImg1,
  },
  {
    id: 2,
    prefix: "Delivering Every",
    highlight: "Package With Care",
    suffix: ".",
    description:
      "Live status updates, flexible pick-ups, and dedicated riders keep your parcels safe from door to door.",
    primaryLabel: "Schedule Pickup",
    secondaryLabel: "Explore Services",
    image: BannerImg2,
  },
  {
    id: 3,
    prefix: "Scale Your Business With",
    highlight: "Smarter Logistics",
    suffix: ".",
    description:
      "Integrate Cash on Delivery, SME support, and nationwide coverage into a single dashboard built to grow with you.",
    primaryLabel: "Get Started",
    secondaryLabel: "Talk To Sales",
    image: BannerImg3,
  },
];

const indicatorBase =
  "mx-1 inline-flex h-[6px] rounded-full transition-all duration-300";

export const Banner = () => {
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-0">
        <Carousel
          autoPlay
          infiniteLoop
          emulateTouch
          interval={5000}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          swipeScrollTolerance={10}
          renderIndicator={(onClickHandler, isSelected, index, label) => (
            <button
              type="button"
              key={index}
              onClick={onClickHandler}
              title={label}
              className={`${indicatorBase} ${
                isSelected ? "w-16 bg-[#0d3f34]" : "w-16 bg-[#c5d2d0]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          )}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="rounded-[40px] bg-white p-6 sm:p-10 lg:p-14 shadow-md"
            >
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
                <div className="flex-1 text-center lg:text-left">
                  <p className="text-base font-semibold uppercase tracking-[0.2em] text-[#1f7a6c]">
                    Express Logistics
                  </p>
                  <h1 className="mt-4 text-3xl font-semibold leading-tight text-[#072a25] sm:text-[40px] lg:text-[60px]">
                    {slide.prefix}{" "}
                    <span className="text-[#0f5a4d]">{slide.highlight}</span>
                    {slide.suffix}
                  </h1>
                  <p className="mt-5 text-lg text-[#4c5c5a] sm:text-xl">
                    {slide.description}
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-full bg-[#c4f243] px-10 py-4 text-lg font-semibold text-[#06241f] shadow hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg transition"
                    >
                      {slide.primaryLabel}
                      <span className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#06241f] text-sm text-white">
                        →
                      </span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-full border border-[#cbd8d6] px-10 py-4 text-lg font-semibold text-[#0d3f34] transition hover:bg-[#eef4f3]"
                    >
                      {slide.secondaryLabel}
                    </a>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative mx-auto max-w-[520px] rounded-[40px] p-8">
                    <img
                      src={slide.image}
                      alt="ZipShift hero visual"
                      className="mx-auto h-auto w-[260px] sm:w-[360px] lg:w-[440px] object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Banner;
