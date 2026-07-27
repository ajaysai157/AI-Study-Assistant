import { BookOpen } from "lucide-react";

import Container from "../../../../components/ui/Container";

function Footer() {
  return (
    <footer className="bg-slate-900 py-16">

      <Container>

        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">

                <BookOpen size={22} />

              </div>

              <div>

                <h3 className="text-xl font-bold text-white">
                  StudyFlow
                </h3>

                <p className="text-sm text-slate-400">
                  Learn • Practice • Grow
                </p>

              </div>

            </div>

          </div>

          {/* Links */}

          <div className="flex flex-wrap items-center gap-8 text-slate-300">

            <a href="#features" className="hover:text-white">
              Features
            </a>

            <a href="#roadmap" className="hover:text-white">
              Learning Journey
            </a>

            <a href="#faq" className="hover:text-white">
              FAQ
            </a>

            <a
              href="https://github.com/ajaysai157/AI-Study-Assistant"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              GitHub
            </a>

          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">

          © 2026 StudyFlow • Built with ❤️ for Students

        </div>

      </Container>

    </footer>
  );
}

export default Footer;