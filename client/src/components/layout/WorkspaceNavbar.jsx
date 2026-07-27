import {
  Bell,
  BookOpen,
  Menu,
  Search,
  CircleUser,
} from "lucide-react";

function WorkspaceNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <BookOpen size={20} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                StudyFlow
              </h1>

              <p className="text-xs text-slate-500">
                Learn Smarter with AI
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="hidden w-full max-w-md items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 lg:flex">
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search notes..."
            className="ml-3 w-full bg-transparent text-sm outline-none"
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 transition hover:bg-slate-100">
            <Bell size={20} />
          </button>

          <button className="rounded-full p-1 transition hover:bg-slate-100">
            <CircleUser
              size={34}
              className="text-slate-700"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default WorkspaceNavbar;