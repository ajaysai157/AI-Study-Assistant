import { useEffect, useState } from "react";
import { Bell, Moon, Palette, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../services/profileService";

function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user, refreshSession } = useAuth();
  const { addToast } = useToast();
  const [notifications, setNotifications] = useState(user?.notificationsEnabled ?? true);
  const [language, setLanguage] = useState(user?.language === "hi" ? "Hindi" : "English");
  const [timezone, setTimezone] = useState(user?.timezone || "Asia/Kolkata");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNotifications(user?.notificationsEnabled ?? true);
    setLanguage(user?.language === "hi" ? "Hindi" : "English");
    setTimezone(user?.timezone || "Asia/Kolkata");
  }, [user]);

  async function handleSave() {
    setSaving(true);
    try {
      await updateProfile({
        notificationsEnabled: notifications,
        language: language === "Hindi" ? "hi" : "en",
        timezone,
      });
      await refreshSession();
      addToast("Preferences saved.", "success");
    } catch (error) {
      addToast(error?.response?.data?.message || "Unable to save preferences.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Settings" subtitle="Tailor your workspace to your study habits." />

      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-emerald-600" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Appearance</h3>
        </div>
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">Theme</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Switch between light and dark mode.</p>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>
            <Moon size={16} />
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-emerald-600" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Notifications</h3>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">Study reminders</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Receive gentle nudges for upcoming tasks.</p>
            </div>
            <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
          </label>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">Language</p>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-3 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">Timezone</p>
          <input value={timezone} onChange={(e) => setTimezone(e.target.value)} className="mt-3 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-emerald-600" />
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Security & preferences</h3>
        </div>
        <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">Study preferences</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Fine-tune how the experience adapts to your routine.</p>
          </div>
          <Button onClick={handleSave} loading={saving}>
            <SlidersHorizontal size={16} />
            Save Preferences
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export default Settings;
