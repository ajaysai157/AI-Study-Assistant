import { useNavigate } from "react-router-dom";
import { FileText, ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

const statusColors = {
  READY: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  PROCESSING: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  FAILED: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

function NoteCard({ note }) {
  const navigate = useNavigate();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/notes/${note.id}`)}
      className="group cursor-pointer rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/50 dark:to-emerald-800/30">
          <FileText size={24} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusColors[note.status] || "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          }`}
        >
          {note.status}
        </span>
      </div>

      <h3 className="mt-5 line-clamp-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
        {note.title}
      </h3>

      <div className="mt-3 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
        {note.pageCount && (
          <>
            <span className="text-zinc-300 dark:text-zinc-600">&bull;</span>
            <span>{note.pageCount} pages</span>
          </>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 transition-all group-hover:gap-3">
        View Details
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </motion.article>
  );
}

export default NoteCard;
