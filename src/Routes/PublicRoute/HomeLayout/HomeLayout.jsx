import { useRef } from "react";
import AboutUsSection from "../../../Sections/HomeSections/AboutUsSection";
import Banner from "../../../Sections/HomeSections/Banner";
import DonateSection from "../../../Sections/HomeSections/DonateSection";
import InspirationalSection from "../../../Sections/HomeSections/InspirationalSection";
import PetCategorySection from "../../../Sections/HomeSections/PetCategorySection";
import SubscribeSection from "../../../Sections/HomeSections/SubscribeSection";
import CampaignsCarousel from "../../../Sections/HomeSections/CampaignsCarousel";


const HomeLayout = () => {
    const sectionLearnRef = useRef(null)
    const sectionDonateRef = useRef(null)
    const sectionJoinRef = useRef(null)

    // handle scroll
    const handleScroll = (section) => {
        section.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="overflow-x-hidden">
            <Banner handleScroll={handleScroll} sectionDonateRef={sectionDonateRef} sectionLearnRef={sectionLearnRef} sectionJoinRef={sectionJoinRef} />
            <PetCategorySection sectionLearnRef={sectionLearnRef} />
            <InspirationalSection />
            <AboutUsSection />
            <DonateSection sectionDonateRef={sectionDonateRef} />
            <CampaignsCarousel />
            <SubscribeSection sectionJoinRef={sectionJoinRef} />
        </div>
    );
};

export default HomeLayout;