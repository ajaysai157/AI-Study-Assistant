import Section from "../../../../components/ui/Section";
import HeroContent from "./HeroContent";

function Hero() {
  return (
    <Section
      className="relative overflow-hidden bg-slate-50"
      padding="pt-24 pb-20 lg:pt-28 lg:pb-24"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />
      </div>

      {/* Hero Content */}

      <HeroContent />
    </Section>
  );
}

export default Hero;
