import Section from "../../../../components/ui/Section";
import FeatureCard from "./FeatureCard";
import features from "./featuresData";

function Features() {
  return (
    <Section id="features" className="bg-slate-50" padding="pt-10 pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-semibold uppercase tracking-widest text-emerald-600">
          Features
        </p>

        <h2 className="mt-4 text-4xl font-black text-slate-900">
          Everything You Need To Study Smarter
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          StudyFlow combines AI-powered tools with an organized workspace,
          helping students spend less time managing notes and more time
          learning.
        </p>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </Section>
  );
}

export default Features;
