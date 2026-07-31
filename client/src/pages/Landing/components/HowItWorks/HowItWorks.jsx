import { motion } from "framer-motion";
import Section from "../../../../components/ui/Section";
import StepCard from "./StepCard";
import steps from "./stepsData";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function HowItWorks() {
  return (
    <Section
      className="bg-white dark:bg-zinc-950"
      padding="py-24"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          How It Works
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-black text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Learn in Three Simple Steps
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          StudyFlow turns your study material into an organized AI-powered learning experience in just a few minutes.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mt-16 grid gap-6 lg:grid-cols-3"
      >
        {steps.map((step, index) => (
          <StepCard key={step.title} number={`0${index + 1}`} {...step} />
        ))}
      </motion.div>
    </Section>
  );
}

export default HowItWorks;
