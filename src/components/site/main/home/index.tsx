import HeroSection from "./HeroSection";
import NewsSection from "./NewsSection";
import WhoIsVegoSection from "./WhoIsVegoSection";
import WhyVegoSection from "./WhyVegSection";
import WhatWeOfferSection from "./WhatWeOfferSection";
import Faqs from "./Faqs";

function Home() {
  return (
    <>
      <HeroSection />
      <div className="py-20 space-y-20">
        <WhoIsVegoSection />
        <WhyVegoSection />
        <WhatWeOfferSection />
        <NewsSection />
        <Faqs />
      </div>
    </>
  );
}

export default Home;
