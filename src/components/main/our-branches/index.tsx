import OurBranchesCta from "./OurBranchesCta";
import OurBranchesGrid from "./OurBranchesGrid";
import OurBranchesHero from "./OurBranchesHero";

function OurBranches() {
  return (
    <div className="space-y-20">
      <OurBranchesHero />
      <OurBranchesGrid />
      <OurBranchesCta />
    </div>
  );
}

export default OurBranches;
