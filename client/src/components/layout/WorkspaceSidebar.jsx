import { NavLink } from "react-router-dom";
import { X, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import navigationData from "./navigationData";

function WorkspaceSidebar({ isOpen, onClose }) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white dark:bg-zinc-900/95 border-r border-zinc-200/70 dark:border-zinc-800 shadow-2xl lg:shadow-none transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-sm">
              <GraduationCap size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">StudyFlow</h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Learning Workspace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-300 lg:hidden transition"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigationData.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`
                }
              >
                <Icon size={20} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-zinc-100 dark:border-zinc-800 p-5">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-4 shadow-sm">
            <p className="text-xs font-semibold text-white/90">Small steps. Big progress.</p>
            <p className="mt-1 text-[11px] text-emerald-200">Consistency builds discipline.</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default WorkspaceSidebar;
