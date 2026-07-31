import { useEffect, useState } from "react";
import { Calendar, Mail, Settings2, Shield, User } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../services/profileService";
import { useToast } from "../../context/ToastContext";

function Profile() {
  const { user, refreshSession } = useAuth();
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", language: user?.language || "en", timezone: user?.timezone || "Asia/Kolkata", notificationsEnabled: user?.notificationsEnabled ?? true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      language: user?.language || "en",
      timezone: user?.timezone || "Asia/Kolkata",
      notificationsEnabled: user?.notificationsEnabled ?? true,
    });
  }, [user]);

  async function handleSave() {
    setSaving(true);
    try {
      await updateProfile(form);
      await refreshSession();
      addToast("Profile updated.", "success");
    } catch (error) {
      addToast(error?.response?.data?.message || "Unable to update profile.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Profile" subtitle="Manage your account details and preferences." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <div className="p-8 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/50 dark:to-emerald-800/30">
                <User size={40} className="text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="mt-5 text-xl font-bold text-zinc-900 dark:text-zinc-100">{user?.name}</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{user?.email}</p>
              <div className="mt-6 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100 px-4 py-3 dark:from-emerald-900/30 dark:to-emerald-800/20">
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Premium study workspace</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center gap-2">
              <Settings2 size={18} className="text-emerald-600" />
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Account details</h3>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full name</label>
                <input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                <input value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Language</label>
                <select value={form.language} onChange={(e) => setForm((prev) => ({ ...prev, language: e.target.value }))} className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Timezone</label>
                <input value={form.timezone} onChange={(e) => setForm((prev) => ({ ...prev, timezone: e.target.value }))} className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
              </div>
            </div>
            <label className="mt-6 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-300">
              <input type="checkbox" checked={form.notificationsEnabled} onChange={(e) => setForm((prev) => ({ ...prev, notificationsEnabled: e.target.checked }))} className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
              Enable study reminders and notifications
            </label>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} loading={saving}>Save changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Account overview</h3>
            <div className="mt-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"><User size={20} /></div>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Full name</p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"><Mail size={20} /></div>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Email</p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"><Calendar size={20} /></div>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Joined</p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"><Shield size={20} /></div>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Status</p>
                  <p className="font-medium text-emerald-600 dark:text-emerald-400">Verified student account</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

export default Profile;
