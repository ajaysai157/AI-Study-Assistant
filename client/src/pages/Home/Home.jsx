import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  FileText,
  Upload,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAuth } from "../../context/AuthContext";
import { getNotes } from "../../services/noteService";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, ready: 0 });

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  })();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await getNotes();
        const data = res.data || [];
        if (!cancelled) {
          setNotes(data);
          setStats({
            total: data.length,
            ready: data.filter((n) => n.status === "READY").length,
          });
        }
      } catch {
        // silent
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const quickActions = [
    { icon: Upload, label: "Upload Notes", path: "/notes", desc: "Add new study material" },
    { icon: BookOpen, label: "My Notes", path: "/notes", desc: "Browse your library" },
  ];

  const statCards = [
    { label: "Total Notes", value: stats.total, color: "bg-emerald-500", icon: FileText },
    { label: "Ready to Study", value: stats.ready, color: "bg-indigo-500", icon: Sparkles },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div
        variants={item}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 p-8 text-white shadow-lg"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-0 left-1/2 -mb-8 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />
        <div className="relative flex items-start gap-5">
          <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Sparkles size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              {greeting}, {user?.name?.split(" ")[0] || "there"}!
            </h1>
            <p className="mt-2 max-w-xl text-sm text-emerald-100 sm:text-base">
              {notes.length === 0
                ? "Ready to start learning? Upload your first notes to get AI-powered summaries."
                : `You have ${stats.ready} notes ready to study. Keep up the great work!`}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 shadow-sm"
            >
              <div className={`absolute top-0 right-0 h-24 w-24 rounded-bl-full ${stat.color} opacity-5 dark:opacity-10`} />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    {loading ? <span className="animate-pulse">--</span> : stat.value}
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color === "bg-emerald-500" ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400" : "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"}`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.div variants={item} className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Quick Actions</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      onClick={() => navigate(action.path)}
                      className="group flex items-center gap-4 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 text-left transition-all duration-200 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md bg-white dark:bg-zinc-900/50"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">{action.label}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{action.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Uploads</h2>
              <div className="mt-5 space-y-2">
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
                  ))
                ) : notes.length === 0 ? (
                  <div className="py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    No notes uploaded yet
                  </div>
                ) : (
                  notes.slice(0, 3).map((note) => (
                    <button
                      key={note.id}
                      onClick={() => navigate(`/notes/${note.id}`)}
                      className="flex w-full items-center gap-3 rounded-xl p-3 transition hover:bg-zinc-50 dark:hover:bg-zinc-800 group"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                        <FileText size={16} className="text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {note.title}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="shrink-0 text-zinc-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                      />
                    </button>
                  ))
                )}
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {notes.length === 0 && !loading && (
        <motion.div variants={item}>
          <Card>
            <div className="py-12 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/20">
                <Upload size={36} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Upload your first notes
              </h3>
              <p className="mt-2 max-w-sm mx-auto text-sm text-zinc-500 dark:text-zinc-400">
                Start your learning journey by uploading your study notes and letting AI transform them.
              </p>
              <div className="mt-8">
                <Button onClick={() => navigate("/notes")}>
                  Upload Notes
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Home;
