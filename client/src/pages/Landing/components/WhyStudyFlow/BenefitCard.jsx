import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function BenefitCard({ icon: Icon, title, description, featured = false }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured
          ? "border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/40 dark:to-zinc-900 p-8 lg:col-span-3"
          : "border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6"
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/50 dark:to-emerald-800/30 text-emerald-600 dark:text-emerald-400">
        <Icon size={24} />
      </div>
      <h3
        className={`mt-5 font-bold text-zinc-900 dark:text-zinc-100 ${
          featured ? "text-xl" : "text-lg"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 ${
          featured ? "max-w-3xl" : ""
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default BenefitCard;
