import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function TimelineItem({ icon: Icon, title, description, last = false }) {
  return (
    <motion.div variants={fadeUp} className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/50 dark:to-emerald-800/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
          <Icon size={20} />
        </div>
        {!last && (
          <div className="mt-2 h-16 w-0.5 bg-emerald-200 dark:bg-emerald-800" />
        )}
      </div>
      <div className={last ? "pb-0" : "pb-10"}>
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="mt-1 max-w-lg text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default TimelineItem;
