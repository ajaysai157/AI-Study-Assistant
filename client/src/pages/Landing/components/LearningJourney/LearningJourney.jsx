import { motion } from "framer-motion";
import Section from "../../../../components/ui/Section";
import TimelineItem from "./TimelineItem";
import journey from "./journeyData";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function LearningJourney() {
  return (
    <Section
      id="roadmap"
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
          Learning Journey
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-black text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Your Path to Smarter Learning
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          Every study session follows a simple workflow designed to help you learn faster, retain more, and stay consistent.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mx-auto mt-16 max-w-2xl"
      >
        {journey.map((step, index) => (
          <TimelineItem
            key={step.title}
            {...step}
            last={index === journey.length - 1}
          />
        ))}
      </motion.div>
    </Section>
  );
}

export default LearningJourney;
