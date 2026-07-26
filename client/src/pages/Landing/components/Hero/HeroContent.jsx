import Badge from "../../../../components/ui/Badge";
import Button from "../../../../components/ui/Button";

function HeroContent() {
  return (
    <div>
      <Badge>✨ AI Learning Companion</Badge>

      <h1 className="mt-6 text-5xl font-black leading-tight text-slate-900 lg:text-7xl">
        Study Smarter.
        <br />
        Learn Better.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
        Your notes, AI summaries, flashcards, quizzes, and study progress—
        all organized in one intelligent workspace designed to help you focus
        on learning, not managing files.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button to="/register">
          Start Learning Free
        </Button>

        <Button variant="secondary">
          Explore Features
        </Button>
      </div>

      <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium text-slate-700">
        <span>✓ AI Notes</span>
        <span>✓ Flashcards</span>
        <span>✓ AI Quizzes</span>
        <span>✓ Progress Tracking</span>
      </div>
    </div>
  );
}

export default HeroContent;