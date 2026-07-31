import { BookOpen, Upload } from "lucide-react";
import Button from "../../../components/ui/Button";

function EmptyState({ onUpload }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 px-6 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/20">
        <BookOpen size={32} className="text-emerald-600 dark:text-emerald-400" />
      </div>
      <h2 className="mt-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">No notes yet</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        Upload your first study notes and let StudyFlow generate AI summaries, flashcards, quizzes, and personalized learning recommendations.
      </p>
      {onUpload && (
        <div className="mt-8">
          <Button onClick={onUpload}>
            <Upload size={16} />
            Upload Your First Note
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;
