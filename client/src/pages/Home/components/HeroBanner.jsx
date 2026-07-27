import { Sparkles } from "lucide-react";

function HeroBanner() {
  return (
    <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-white shadow-lg">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-white/20 p-3">
          <Sparkles size={28} />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Welcome to StudyFlow
          </h2>

          <p className="mt-3 max-w-2xl text-emerald-50">
            Organize your notes, generate AI summaries, create
            flashcards, practice quizzes, and track your learning—
            all in one intelligent workspace.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;