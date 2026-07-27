import Section from "../../../../components/ui/Section";

import TimelineItem from "./TimelineItem";
import journey from "./journeyData";

function LearningJourney() {
  return (
    <Section
      id="roadmap"
      className="bg-white"
      padding="py-24"
    >
      <div className="mx-auto max-w-3xl text-center">

        <p className="font-semibold uppercase tracking-widest text-emerald-600">
          Learning Journey
        </p>

        <h2 className="mt-4 text-4xl font-black text-slate-900">
          Your Path to Smarter Learning
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Every study session follows a simple workflow designed to help
          you learn faster, retain more, and stay consistent.
        </p>

      </div>

      <div className="mx-auto mt-20 max-w-3xl">

        {journey.map((step, index) => (
          <TimelineItem
            key={step.title}
            {...step}
            last={index === journey.length - 1}
          />
        ))}

      </div>
    </Section>
  );
}

export default LearningJourney;