import Section from "../../../../components/ui/Section";

import BenefitCard from "./BenefitCard";
import benefits from "./benefitsData";

function WhyStudyFlow() {
  const featured = benefits.find((b) => b.featured);
  const others = benefits.filter((b) => !b.featured);

  return (
    <Section
      className="bg-slate-50"
      padding="py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-semibold uppercase tracking-widest text-emerald-600">
          Why StudyFlow
        </p>

        <h2 className="mt-4 text-4xl font-black text-slate-900">
          Everything You Need For Better Learning
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          More than an AI tool—StudyFlow is your complete learning workspace built
          to help you stay organized, save time, and learn effectively.
        </p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        <BenefitCard {...featured} />

        {others.map((item) => (
          <BenefitCard
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </Section>
  );
}

export default WhyStudyFlow;