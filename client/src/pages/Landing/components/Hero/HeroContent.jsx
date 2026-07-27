import { ArrowRight, Sparkles } from "lucide-react";

import Badge from "../../../../components/ui/Badge";
import Button from "../../../../components/ui/Button";

function HeroContent() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
      {/* Badge */}

      <Badge>
        <Sparkles size={14} />
        <span>AI-Powered Learning Platform</span>
      </Badge>

      {/* Heading */}

      <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">
        Transform Your Notes
        <span className="mt-2 block bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">
          Into Better Learning.
        </span>
      </h1>

      {/* Description */}

      <p className="mt-8 max-w-3xl text-lg leading-9 text-slate-600">
        Upload your study notes once and let StudyFlow transform them into
        AI-powered summaries, flashcards, quizzes, and personalized learning
        paths—so you can spend less time organizing and more time understanding.
      </p>

      {/* CTA Buttons */}

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <Button to="/register">
          Start Learning
          <ArrowRight size={18} />
        </Button>

        <Button variant="secondary">
          <Sparkles size={18} />
          Explore Features
        </Button>
      </div>

      {/* Feature Pills */}

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        {[
          "🤖 AI Powered",
          "📚 Smart Notes",
          "🧠 Flashcards",
          "📝 AI Quiz",
          "📈 Progress Tracking",
        ].map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default HeroContent; 
