import { motion } from "framer-motion";
import Section from "../../../../components/ui/Section";
import FeatureCard from "./FeatureCard";
import features from "./featuresData";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Features() {
  return (
    <Section
      id="features"
      className="bg-zinc-50 dark:bg-zinc-900/50"
      padding="py-24"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.p variants={fadeUp} className="font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 text-sm">
          Features
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 text-4xl font-black text-zinc-900 dark:text-zinc-100">
          Everything You Need To Study Smarter
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          StudyFlow combines AI-powered tools with an organized workspace,
          helping students spend less time managing notes and more time learning.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </motion.div>
    </Section>
  );
}

export default Features;
