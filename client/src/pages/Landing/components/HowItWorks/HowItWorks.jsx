import Section from "../../../../components/ui/Section";

import StepCard from "./StepCard";
import steps from "./stepsData";

function HowItWorks() {
  return (
    <Section
      className="bg-white"
      padding="py-24"
    >
      <div className="mx-auto max-w-3xl text-center">

        <p className="font-semibold uppercase tracking-widest text-emerald-600">
          How It Works
        </p>

        <h2 className="mt-4 text-4xl font-black text-slate-900">
          Learn in Three Simple Steps
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          StudyFlow turns your study material into an organized AI-powered learning experience in just a few minutes.
        </p>

      </div>

      <div className="mt-20 grid gap-8 lg:grid-cols-3">

        {steps.map((step, index) => (
          <StepCard
            key={step.title}
            number={`0${index + 1}`}
            {...step}
          />
        ))}

      </div>
    </Section>
  );
}

export default HowItWorks;