import {
  Upload,
  Brain,
  ClipboardCheck,
  BookOpen,
} from "lucide-react";

const actions = [
  {
    icon: Upload,
    title: "Upload",
  },
  {
    icon: Brain,
    title: "Flashcards",
  },
  {
    icon: ClipboardCheck,
    title: "Quiz",
  },
  {
    icon: BookOpen,
    title: "Summaries",
  },
];

function QuickActions() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900">
        Quick Actions
      </h3>

      <div className="mt-6 grid gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-emerald-500 hover:bg-emerald-50"
            >
              <div className="rounded-xl bg-emerald-100 p-3">
                <Icon
                  size={20}
                  className="text-emerald-600"
                />
              </div>

              <span className="font-medium text-slate-700">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;