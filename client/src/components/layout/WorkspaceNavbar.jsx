import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, BookOpen, Menu, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ui/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

function WorkspaceNavbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden text-zinc-600 dark:text-zinc-400"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-sm">
              <BookOpen size={18} />
            </div>
            <div>
              <h1 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">StudyFlow</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <ThemeToggle />
          <button
            className="relative rounded-xl p-2 text-zinc-500 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-500 text-sm font-semibold text-white shadow-sm">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-2 shadow-xl z-50"
                >
                  <div className="border-b border-zinc-100 dark:border-zinc-800 px-4 py-3">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {user?.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => { navigate("/profile"); setDropdownOpen(false); }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <User size={16} className="text-zinc-400" />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

export default WorkspaceNavbar;
