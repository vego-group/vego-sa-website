import HeroSection from "./HeroSection";
import NewsSection from "./NewsSection";
import WhoIsVegoSection from "./WhoIsVegoSection";
import WhyVegoSection from "./WhyVegSection";
import WhatWeOfferSection from "./WhatWeOfferSection";

function Home() {
  return (
    <>
      <HeroSection />
      <div className="py-20 space-y-20">
        <WhoIsVegoSection />
        <WhyVegoSection />
        <WhatWeOfferSection />
        <NewsSection />
      </div>
    </>
  );
}

export default Home;
