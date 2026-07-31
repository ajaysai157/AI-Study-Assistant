import Section from "../../../../components/ui/Section";
import HeroContent from "./HeroContent";

function Hero() {
  return (
    <Section
      className="relative overflow-hidden"
      padding="pt-20 pb-16 lg:pt-28 lg:pb-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-emerald-100/40 dark:bg-emerald-900/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-indigo-100/30 dark:bg-indigo-900/10 blur-3xl" />
        <div className="absolute -left-20 top-1/3 h-64 w-64 rounded-full bg-emerald-50/50 dark:bg-emerald-950/10 blur-3xl" />
      </div>
      <HeroContent />
    </Section>
  );
}

export default Hero;
