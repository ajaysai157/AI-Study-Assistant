import LandingNavbar from "../../components/layout/LandingNavbar";

import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import WhyStudyFlow from "./components/WhyStudyFlow/WhyStudyFlow";
import LearningJourney from "./components/LearningJourney/LearningJourney";
import FAQ from "./components/FAQ/FAQ";
import CTA from "./components/CTA/CTA";
import Footer from "./components/Footer/Footer";

function Landing() {
  return (
    <>
      <LandingNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      <WhyStudyFlow/>
      <LearningJourney/>
      <FAQ/>
      <CTA/>
      <Footer/>
    </>
  );
}

export default Landing;
