import { BookOpen } from "lucide-react";
import Container from "../../../../components/ui/Container";

function Footer() {
  return (
    <footer className="bg-zinc-900 dark:bg-zinc-950 py-14 border-t border-zinc-800">
      <Container>
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-sm">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">StudyFlow</h3>
              <p className="text-xs text-zinc-400">Learn &bull; Practice &bull; Grow</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-sm text-zinc-400">
            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>
            <a
              href="#roadmap"
              className="transition hover:text-white"
            >
              Learning Journey
            </a>
            <a
              href="#faq"
              className="transition hover:text-white"
            >
              FAQ
            </a>
            <a
              href="https://github.com/ajaysai157/AI-Study-Assistant"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} StudyFlow &mdash; Built for students who love to learn.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
