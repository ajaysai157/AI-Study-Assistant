import Button from "../../../../components/ui/Button";
import Section from "../../../../components/ui/Section";

function CTA() {
  return (
    <Section
      className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700"
      padding="py-28"
    >
      <div className="mx-auto max-w-4xl text-center">

        <h2 className="text-4xl font-black text-white lg:text-5xl">
          Ready to Learn Smarter?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-100">
          Join StudyFlow and transform your notes into AI-powered summaries,
          quizzes, flashcards and personalized learning—all completely free.
        </p>

        <div className="mt-12">

          <Button to="/register">
            Start Learning Today →
          </Button>

        </div>

      </div>
    </Section>
  );
}

export default CTA;