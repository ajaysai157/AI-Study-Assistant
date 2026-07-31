import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "../../../../components/ui/Badge";
import Button from "../../../../components/ui/Button";

const featurePills = [
  "AI Powered Summaries",
  "Smart Notes",
  "Flashcards",
  "AI Quiz",
  "Progress Tracking",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto flex max-w-5xl flex-col items-center text-center"
    >
      <motion.div variants={fadeUp}>
        <Badge variant="primary" size="md">
          <Sparkles size={14} />
          <span>AI-Powered Learning Platform</span>
        </Badge>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="mt-8 text-5xl font-black leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 md:text-6xl lg:text-7xl"
      >
        Transform Your Notes
        <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Into Better Learning.
        </span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-8 max-w-3xl text-balance text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
      >
        Upload your study notes once and let StudyFlow transform them into
        AI-powered summaries, flashcards, quizzes, and personalized learning
        paths — so you can spend less time organizing and more time understanding.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <Button to="/register" size="lg">
          Start Learning
          <ArrowRight size={18} />
        </Button>
        <Button variant="secondary" to="#features" size="lg">
          <Sparkles size={18} />
          Explore Features
        </Button>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-12 flex flex-wrap justify-center gap-3"
      >
        {featurePills.map((item) => (
          <span
            key={item}
            className="rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 shadow-sm transition hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700 dark:hover:text-emerald-400"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default HeroContent;
