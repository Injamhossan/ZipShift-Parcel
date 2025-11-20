import React from "react";
import amazonLogo from "../../assets/brands/amazon.png";
import casioLogo from "../../assets/brands/casio.png";
import moonstarLogo from "../../assets/brands/moonstar.png";
import randstadLogo from "../../assets/brands/randstad.png";
import starLogo from "../../assets/brands/star.png";
import startPeopleLogo from "../../assets/brands/start_people.png";

const brands = [
  { id: 1, name: "Casio", logo: casioLogo },
  { id: 2, name: "Amazon", logo: amazonLogo },
  { id: 3, name: "Moonstar", logo: moonstarLogo },
  { id: 4, name: "Star+", logo: starLogo },
  { id: 5, name: "Start People", logo: startPeopleLogo },
  { id: 6, name: "Randstad", logo: randstadLogo },
];

const Partners = () => {
  return (
    <section className="py-12">
      <div className="mx-auto flex max-w-[1800px] flex-col items-center gap-6 px-6 text-center lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0f473f]">
          Trusted By Teams
        </p>
        <h3 className="text-2xl font-semibold text-[#0e3b36]">
          We’ve helped thousands of sales teams
        </h3>

        <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-20">
          {brands.map((brand) => (
            <img
              key={brand.id}
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="max-h-12 object-contain opacity-80 transition hover:opacity-100 sm:max-h-14"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;

