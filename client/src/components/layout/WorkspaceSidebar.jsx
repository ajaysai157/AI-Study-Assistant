import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

import navigationData from "./navigationData";

function WorkspaceSidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-white shadow-xl border-r border-slate-200 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">StudyFlow</h2>

            <p className="text-sm text-slate-500">Learning Workspace</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 p-4 space-y-2">
          {navigationData.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />

                <span className="font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}

        <div className="border-t border-slate-200 p-5">
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-700">
              📚 Small steps. Big progress.
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Consistency builds discipline.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default WorkspaceSidebar;
