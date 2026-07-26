import { Link } from "react-router-dom";

import Container from "../ui/Container";
import Button from "../ui/Button";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white shadow-md">
              🎓
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">StudyFlow</h1>

              <p className="text-xs text-slate-500">AI Learning Companion</p>
            </div>
          </Link>

          {/* Navigation */}

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Features
            </a>

            <a
              href="#roadmap"
              className="font-medium text-slate-600 transition hover:text-indigo-600"
            >
              Roadmap
            </a>

            <a
              href="#about"
              className="font-medium text-slate-600 transition hover:text-indigo-600"
            >
              About
            </a>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-4">
            <Button to="/login" variant="secondary">
              Login
            </Button>

            <Button to="/register" variant="primary">
              Get Started
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;
