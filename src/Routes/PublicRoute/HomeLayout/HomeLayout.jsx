import { useRef } from "react";
import AboutUsSection from "../../../Sections/HomeSections/AboutUsSection";
import Banner from "../../../Sections/HomeSections/Banner";
import DonateSection from "../../../Sections/HomeSections/DonateSection";
import InspirationalSection from "../../../Sections/HomeSections/InspirationalSection";
import PetCategorySection from "../../../Sections/HomeSections/PetCategorySection";
import SubscribeSection from "../../../Sections/HomeSections/SubscribeSection";
import CampaignsCarousel from "../../../Sections/HomeSections/CampaignsCarousel";
import AdoptAPet from "../../../Sections/HomeSections/AdoptAPet";
import { useOutletContext } from "react-router-dom";

const HomeLayout = () => {
  const sectionLearnRef = useRef(null);
  const sectionDonateRef = useRef(null);
  const sectionJoinRef = useRef(null);
  const darkMode = useOutletContext();

  // handle scroll
  const handleScroll = (section) => {
    section.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-x-hidden">
      <Banner
        handleScroll={handleScroll}
        sectionDonateRef={sectionDonateRef}
        sectionLearnRef={sectionLearnRef}
        sectionJoinRef={sectionJoinRef}
      />
      <PetCategorySection sectionLearnRef={sectionLearnRef} />
      <AdoptAPet darkMode={darkMode} />
      <InspirationalSection />
      <AboutUsSection />
      <DonateSection sectionDonateRef={sectionDonateRef} />
      <CampaignsCarousel />
      <SubscribeSection sectionJoinRef={sectionJoinRef} />
    </div>
  );
};

export default HomeLayout;
