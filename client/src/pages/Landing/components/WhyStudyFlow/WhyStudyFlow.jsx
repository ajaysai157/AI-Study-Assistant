import { motion } from "framer-motion";
import Section from "../../../../components/ui/Section";
import BenefitCard from "./BenefitCard";
import benefits from "./benefitsData";

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

function WhyStudyFlow() {
  const featured = benefits.find((b) => b.featured);
  const others = benefits.filter((b) => !b.featured);

  return (
    <Section
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
        <motion.p variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Why StudyFlow
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-black text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Everything You Need For Better Learning
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          More than an AI tool — StudyFlow is your complete learning workspace built
          to help you stay organized, save time, and learn effectively.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mt-16 grid gap-6 lg:grid-cols-3"
      >
        <BenefitCard {...featured} />
        {others.map((item) => (
          <BenefitCard key={item.title} {...item} />
        ))}
      </motion.div>
    </Section>
  );
}

export default WhyStudyFlow;
