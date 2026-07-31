import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../../../components/ui/Button";
import Section from "../../../../components/ui/Section";

function CTA() {
  return (
    <Section
      className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800"
      padding="py-28"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <h2 className="text-4xl font-black text-white lg:text-5xl">
          Ready to Learn Smarter?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-100">
          Join StudyFlow and transform your notes into AI-powered summaries, quizzes, flashcards and personalized learning — all completely free.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button to="/register" size="lg">
            Start Learning Today
            <ArrowRight size={18} />
          </Button>
          <Button
            to="/login"
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 border border-white/20"
          >
            Sign In
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}

export default CTA;
