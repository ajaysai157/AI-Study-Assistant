import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "FAQ", href: "#faq" },
];

function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 transition group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-sm group-hover:shadow-md transition-all">
              <BookOpen size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">StudyFlow</h1>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Learn &bull; Practice &bull; Grow</p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 transition hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button to="/login" variant="ghost" size="sm">
              Sign In
            </Button>
            <Button to="/register" size="sm">
              Start Learning
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <Button to="/login" variant="ghost" size="sm" className="flex-1 justify-center">
                  Sign In
                </Button>
                <Button to="/register" size="sm" className="flex-1 justify-center">
                  Start Learning
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default LandingNavbar;
