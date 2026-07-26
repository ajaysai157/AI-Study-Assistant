import Section from "../../../../components/ui/Section";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroPreview from "./HeroPreview";

function Hero() {
  return (
    <Section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center">

      <HeroBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white"></div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <HeroContent />
        <HeroPreview />
      </div>

    </Section>
  );
}

export default Hero;