import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

import Container from "../ui/Container";
import Button from "../ui/Button";

const navItems = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Roadmap",
    href: "#roadmap",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <Container>
        <nav className="flex h-20 items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3 transition duration-300"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <BookOpen size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                StudyFlow
              </h1>

              <p className="text-xs text-slate-500">
                Learn • Practice • Grow
              </p>
            </div>
          </Link>

          {/* Navigation */}

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-medium text-slate-600 transition hover:text-emerald-600"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Buttons */}

          <div className="flex items-center gap-3">
            <Button
              to="/login"
              variant="ghost"
            >
              Sign In
            </Button>

            <Button to="/register">
              Start Learning
            </Button>
          </div>

        </nav>
      </Container>
    </header>
  );
}

export default Navbar;