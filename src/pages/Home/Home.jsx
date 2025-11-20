import React from "react";
import Banner from "../../components/Hero/Banner";
import HowItWork from "../../components/HowItWork/HowItWork";
import ServicesShowcase from "../../components/Services/ServicesShowcase";
import Partners from "../../components/Partners/Partners";
import SupportHighlights from "../../components/SupportHighlights/SupportHighlights";

const Home = () => {
  return (
    <div className="mx-auto max-w-[1800px]">
      <Banner />
      <HowItWork />
      <ServicesShowcase />
      <Partners />
      <SupportHighlights />
    </div>
  );
};

export default Home;