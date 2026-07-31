import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, Plus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { createPlan, deletePlan, getPlans, updateTask } from "../../services/plannerService";
import { useToast } from "../../context/ToastContext";

function Planner() {
  const { addToast } = useToast();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ subject: "", targetExam: "", availableHours: 4, startDate: "", endDate: "" });

  useEffect(() => {
    async function load() {
      try {
        const res = await getPlans();
        setPlans(res.data || []);
      } catch {
        setPlans([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleCreate() {
    if (!form.subject || !form.targetExam || !form.startDate || !form.endDate) {
      addToast("Please fill in all fields.", "error");
      return;
    }

    try {
      const res = await createPlan(form);
      setPlans((prev) => [res.data, ...prev]);
      setForm({ subject: "", targetExam: "", availableHours: 4, startDate: "", endDate: "" });
      addToast("Study plan created.", "success");
    } catch (error) {
      addToast(error?.response?.data?.message || "Unable to create study plan.", "error");
    }
  }

  async function handleToggleTask(taskId, completed) {
    try {
      const res = await updateTask(taskId, !completed);
      setPlans((prev) => prev.map((plan) => ({ ...plan, tasks: plan.tasks.map((task) => task.id === taskId ? { ...task, completed: res.data?.completed ?? !completed, completedAt: res.data?.completedAt ?? new Date().toISOString() } : task) })));
    } catch (error) {
      addToast(error?.response?.data?.message || "Unable to update task.", "error");
    }
  }

  async function handleDeletePlan(id) {
    try {
      await deletePlan(id);
      setPlans((prev) => prev.filter((plan) => plan.id !== id));
      addToast("Plan deleted.", "success");
    } catch (error) {
      addToast(error?.response?.data?.message || "Unable to delete plan.", "error");
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Study Planner" subtitle="Build a realistic study schedule for each subject." />

      <Card className="p-6">
        <div className="grid gap-4 lg:grid-cols-4">
          <input value={form.subject} onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))} placeholder="Subject" className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
          <input value={form.targetExam} onChange={(e) => setForm((prev) => ({ ...prev, targetExam: e.target.value }))} placeholder="Target exam" className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
          <input type="number" min="1" max="12" value={form.availableHours} onChange={(e) => setForm((prev) => ({ ...prev, availableHours: Number(e.target.value) }))} placeholder="Hours" className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
          <div className="flex gap-2">
            <input type="date" value={form.startDate} onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
            <input type="date" value={form.endDate} onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleCreate}>
            <Plus size={16} /> Create plan
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {loading ? (
          <Card className="p-10 text-center text-sm text-zinc-500 dark:text-zinc-400">Loading plans…</Card>
        ) : plans.length === 0 ? (
          <Card className="p-10 text-center text-sm text-zinc-500 dark:text-zinc-400">No plans yet.</Card>
        ) : plans.map((plan) => (
          <Card key={plan.id} className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-emerald-600" />
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{plan.subject}</h3>
                </div>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{plan.targetExam} • {plan.availableHours} hrs • {new Date(plan.startDate).toLocaleDateString()} → {new Date(plan.endDate).toLocaleDateString()}</p>
              </div>
              <Button variant="ghost" onClick={() => handleDeletePlan(plan.id)}>Delete plan</Button>
            </div>
            <div className="mt-5 space-y-3">
              {plan.tasks?.map((task) => (
                <div key={task.id} className="flex items-start justify-between rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900/70">
                  <div className="flex gap-3">
                    <button onClick={() => handleToggleTask(task.id, task.completed)} className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border ${task.completed ? "border-emerald-500 bg-emerald-500" : "border-zinc-300 dark:border-zinc-600"}`}>
                      {task.completed && <CheckCircle2 size={14} className="text-white" />}
                    </button>
                    <div>
                      <p className={`font-medium ${task.completed ? "text-zinc-400 line-through dark:text-zinc-500" : "text-zinc-900 dark:text-zinc-100"}`}>{task.title}</p>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{task.description}</p>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{task.duration} min</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

export default Planner;
