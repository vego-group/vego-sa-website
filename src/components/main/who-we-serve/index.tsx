import WhoWeServeHero from "./WhoWeServeHero";
import WhoWeServeSection from "./WhoWeServeSection";
import WhoWeServeSustainable from "./WhoWeServeSustainable";

function WhoWeServe() {
  return (
    <div className="space-y-20">
      <WhoWeServeHero />
      <WhoWeServeSection />
      <WhoWeServeSustainable />
    </div>
  );
}

export default WhoWeServe;
