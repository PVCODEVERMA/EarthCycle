import Header from "../component/layout/Header.jsx";
import ServicesSection from "./ServicesSection.jsx";
import BusinessSection from "./BusinessSection.jsx";
import WasteServices from "./WasteServices.jsx";
import WasteService from "./WasteService.jsx";
import WhyChooseUs from "./WhyChooseUs.jsx";
import StatsSection from "./StatsSection.jsx";
import TestimonialSlider from "./TestimonialSlider.jsx";

import About from "../components/common/About.jsx";

const Home = () => {
  return (
    <>
      <Header />
      <ServicesSection />
      <BusinessSection />
      <WasteService />
      <WasteServices />
      <StatsSection />
      <WhyChooseUs />
      <TestimonialSlider />
      <About />
    </>
  );
};

export default Home;
