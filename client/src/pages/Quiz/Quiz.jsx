import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ClipboardCheck, Loader2, Sparkles, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getNotes } from "../../services/noteService";
import { deleteQuiz, generateQuiz, getQuizzes, submitQuiz } from "../../services/quizService";
import { useToast } from "../../context/ToastContext";

function Quiz() {
  const { addToast } = useToast();
  const [notes, setNotes] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    async function init() {
      try {
        const [quizRes, notesRes] = await Promise.all([getQuizzes(), getNotes()]);
        setAttempts(quizRes.data || []);
        setNotes(notesRes.data || []);
      } catch {
        setAttempts([]);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const bestScore = useMemo(() => {
    if (attempts.length === 0) return 0;
    return Math.max(...attempts.map((attempt) => attempt.total ? Math.round((attempt.score / attempt.total) * 100) : 0));
  }, [attempts]);

  async function handleGenerate() {
    if (!selectedNoteId) {
      addToast("Choose a note first.", "error");
      return;
    }
    setGenerating(true);
    try {
      const res = await generateQuiz(selectedNoteId, 6);
      setActiveQuiz(res.data);
      setAnswers({});
      addToast("Quiz generated successfully.", "success");
    } catch (error) {
      addToast(error?.response?.data?.message || "Unable to generate quiz.", "error");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSubmit() {
    if (!activeQuiz) return;
    setSubmitting(true);
    try {
      const res = await submitQuiz(activeQuiz.id, answers);
      setActiveQuiz(res.data);
      setAttempts((prev) => [res.data, ...prev.filter((attempt) => attempt.id !== res.data.id)]);
      addToast("Quiz submitted.", "success");
    } catch (error) {
      addToast(error?.response?.data?.message || "Unable to submit quiz.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteQuiz(id);
      setAttempts((prev) => prev.filter((attempt) => attempt.id !== id));
      addToast("Quiz removed.", "success");
    } catch (error) {
      addToast(error?.response?.data?.message || "Unable to delete quiz.", "error");
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="AI Quiz" subtitle="Challenge yourself with AI-generated questions." />

      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Create a quiz</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Use a ready note to generate a focused set of multiple-choice questions.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select value={selectedNoteId} onChange={(e) => setSelectedNoteId(e.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
              <option value="">Select note</option>
              {notes.map((note) => (
                <option key={note.id} value={note.id}>{note.title}</option>
              ))}
            </select>
            <Button onClick={handleGenerate} loading={generating}>
              <Sparkles size={16} />
              Generate Quiz
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <ClipboardCheck size={18} className="text-emerald-600" />
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Current quiz</h3>
          </div>

          {!activeQuiz ? (
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 px-6 py-12 text-center dark:border-zinc-700">
              <Trophy size={36} className="mx-auto text-emerald-600" />
              <h4 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-100">No quiz active</h4>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Generate a quiz to start practicing.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800/40">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{activeQuiz.title}</p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{activeQuiz.questions?.length || 0} questions • {activeQuiz.completed ? "Completed" : "In progress"}</p>
              </div>
              {activeQuiz.questions?.map((question, index) => (
                <div key={question.id} className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-700">
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">{index + 1}. {question.question}</p>
                  <div className="mt-3 space-y-2">
                    {question.options.map((option) => {
                      const selected = answers[question.id] === option;
                      return (
                        <label key={option} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition ${selected ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"}`}>
                          <input type="radio" name={question.id} value={option} checked={selected} onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))} className="h-4 w-4 border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                  {activeQuiz.completed && question.explanation && (
                    <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">{question.explanation}</div>
                  )}
                </div>
              ))}
              {!activeQuiz.completed && (
                <Button onClick={handleSubmit} loading={submitting} className="w-full">Submit Quiz</Button>
              )}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Quiz history</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Best score: {bestScore}%</p>
            </div>
          </div>

          {loading ? (
            <div className="mt-6 flex min-h-[180px] items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/40">
              <Loader2 size={24} className="animate-spin text-emerald-600" />
            </div>
          ) : attempts.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 px-6 py-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">No quiz attempts yet.</div>
          ) : (
            <div className="mt-5 space-y-3">
              {attempts.map((attempt) => (
                <div key={attempt.id} className="rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900/70">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{attempt.title}</p>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{attempt.note?.title || "Generated quiz"}</p>
                    </div>
                    <button onClick={() => handleDelete(attempt.id)} className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40">
                      <CheckCircle2 size={16} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300">
                    <span>{attempt.score}/{attempt.total} correct</span>
                    <span>{attempt.completed ? "Completed" : "Draft"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </motion.div>
  );
}

export default Quiz;
