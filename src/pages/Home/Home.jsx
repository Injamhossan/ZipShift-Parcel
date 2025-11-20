import React from "react";
import Banner from "../../components/Hero/Banner";
import HowItWork from "../../components/HowItWork/HowItWork";
import ServicesShowcase from "../../components/Services/ServicesShowcase";
import SupportHighlights from "../../components/SupportHighlights/SupportHighlights";
import MerchantCta from "../../components/MerchantCta/MerchantCta";
import Partners from "../../components/Partners/Partners";
import Testimonials from "../../components/Testimonials/Testimonials";
import Faq from "../../components/FAQ/Faq";

const Home = () => {
  return (
    <div className="mx-auto max-w-[1800px]">
      <Banner />
      <HowItWork />
      <ServicesShowcase />
      <Partners />
      <SupportHighlights />
      <MerchantCta />
      <Testimonials />
      <Faq />
    </div>
  );
};

export default Home;