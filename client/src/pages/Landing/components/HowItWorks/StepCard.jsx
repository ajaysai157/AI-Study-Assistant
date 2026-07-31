import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function StepCard({ icon: Icon, title, description, number }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="absolute right-5 top-5 text-4xl font-black text-zinc-100 dark:text-zinc-800 select-none">
        {number}
      </span>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/50 dark:to-emerald-800/30 text-emerald-600 dark:text-emerald-400">
        <Icon size={24} />
      </div>
      <h3 className="mt-5 text-lg font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </motion.div>
  );
}

export default StepCard;
