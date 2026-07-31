import { motion } from "framer-motion";
import Section from "../../../../components/ui/Section";
import FAQItem from "./FAQItem";
import faqs from "./faqData";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function FAQ() {
  return (
    <Section
      id="faq"
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
          FAQ
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-black text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Frequently Asked Questions
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          Everything you need to know before getting started with StudyFlow.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="mx-auto mt-12 max-w-3xl space-y-3"
      >
        {faqs.map((faq) => (
          <FAQItem key={faq.question} {...faq} />
        ))}
      </motion.div>
    </Section>
  );
}

export default FAQ;
