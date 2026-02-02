import AboutHero from "./AboutHero";
import AboutMissionVision from "./AboutMissionVision";
import AboutValues from "./AboutValues";
import AboutJourney from "./AboutJourney";
import AboutLeadership from "./AboutLeadership";
import AboutSustainability from "./AboutSustainability";

function About() {
  return (
    <div className="space-y-20">
      <AboutHero />
      <AboutJourney />
      <AboutMissionVision />
      <AboutValues />
      <AboutLeadership />
      <AboutSustainability />
    </div>
  );
}

export default About;
