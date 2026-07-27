import { Upload, ArrowRight } from "lucide-react";

import Button from "../../../components/ui/Button";

function WelcomeState() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
        <Upload
          size={30}
          className="text-emerald-600"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        Upload your first notes
      </h2>

      <p className="mt-3 max-w-2xl leading-7 text-slate-600">
        Start your learning journey by uploading your study notes.
        StudyFlow will automatically generate AI summaries,
        flashcards, quizzes, and personalized study suggestions.
      </p>

      <div className="mt-8">
        <Button>
          Upload Notes
          <ArrowRight size={18} />
        </Button>
      </div>
    </section>
  );
}

export default WelcomeState;