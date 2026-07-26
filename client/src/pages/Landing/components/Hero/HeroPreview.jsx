import Card from "../../../../components/ui/Card";

const workflowSteps = [
  {
    icon: "📄",
    title: "Upload Notes",
    description: "PDFs, handwritten notes or text",
  },
  {
    icon: "🤖",
    title: "AI Analysis",
    description: "Extracts key concepts instantly",
  },
  {
    icon: "📝",
    title: "Smart Summary",
    description: "Easy-to-read revision notes",
  },
  {
    icon: "🧠",
    title: "Flashcards",
    description: "Practice important concepts",
  },
  {
    icon: "❓",
    title: "AI Quiz",
    description: "Test your understanding",
  },
  {
    icon: "📈",
    title: "Track Progress",
    description: "Stay consistent every day",
  },
];

function HeroPreview() {
  return (
    <Card className="mx-auto max-w-md shadow-lg">
      <h3 className="text-xl font-bold text-slate-900">
        How StudyFlow Works
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        From study material to better learning in minutes.
      </p>

      <div className="mt-8 space-y-4">
        {workflowSteps.map((step, index) => (
          <div key={step.title}>
            <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                {step.icon}
              </div>

              <div>
                <h4 className="font-semibold text-slate-900">
                  {step.title}
                </h4>

                <p className="text-sm text-slate-500">
                  {step.description}
                </p>
              </div>
            </div>

            {index !== workflowSteps.length - 1 && (
              <div className="ml-6 h-6 w-0.5 bg-slate-300"></div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default HeroPreview;