import { BookOpen, Upload } from "lucide-react";

import Button from "../../../components/ui/Button";

function EmptyState() {
  return (
    <section className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm">
      {/* Icon */}

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <BookOpen
          size={36}
          className="text-emerald-600"
        />
      </div>

      {/* Heading */}

      <h2 className="mt-8 text-3xl font-bold text-slate-900">
        No notes yet
      </h2>

      {/* Description */}

      <p className="mt-4 max-w-xl leading-8 text-slate-600">
        Upload your first study notes and let StudyFlow generate
        AI summaries, flashcards, quizzes, and personalized
        learning recommendations.
      </p>

      {/* Button */}

      <div className="mt-10">
        <Button>
          <Upload size={18} />

          Upload Your First Notes
        </Button>
      </div>
    </section>
  );
}

export default EmptyState;