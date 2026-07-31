import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  BookOpen,
  Clock,
  Copy,
  Check,
  Trash2,
  Loader2,
  AlertCircle,
  Pencil,
  Save,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { useToast } from "../../../context/ToastContext";
import { getNote, deleteNote, updateNote } from "../../../services/noteService";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editError, setEditError] = useState("");
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    async function fetchNote() {
      try {
        setLoading(true);
        setError(null);
        const res = await getNote(id);
        setNote(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load note");
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  const copySummary = () => {
    if (note?.summary) {
      navigator.clipboard.writeText(note.summary);
      setCopied(true);
      addToast("Summary copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      await deleteNote(id);
      addToast("Note deleted successfully", "success");
      navigate("/notes");
    } catch (err) {
      addToast(err?.response?.data?.message || "Failed to delete", "error");
      setDeleting(false);
    }
  };

  const openEdit = () => {
    setEditTitle(note?.title || "");
    setEditError("");
    setEditOpen(true);
  };

  const handleUpdateTitle = async () => {
    const title = editTitle.trim();
    if (!title) {
      setEditError("Title is required.");
      return;
    }

    setSaving(true);
    setEditError("");
    try {
      const res = await updateNote(id, { title });
      setNote(res.data);
      addToast("Note title updated", "success");
      setEditOpen(false);
    } catch (err) {
      setEditError(err?.response?.data?.message || "Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-1/2 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-40 w-full rounded-xl bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30">
          <AlertCircle size={32} className="text-red-500 dark:text-red-400" />
        </div>
        <h2 className="mt-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Note not found
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {error || "This note doesn't exist or has been deleted."}
        </p>
        <Button className="mt-6" onClick={() => navigate("/notes")}>
          <ArrowLeft size={16} />
          Back to Notes
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <button
        onClick={() => navigate("/notes")}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 transition hover:text-emerald-600 dark:hover:text-emerald-400"
      >
        <ArrowLeft size={16} />
        Back to Notes
      </button>

      <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/50 dark:to-emerald-800/30">
              <FileText size={28} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                {note.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {formatDate(note.createdAt)}
                </span>
                {note.pageCount && (
                  <>
                    <span className="text-zinc-300 dark:text-zinc-600">&bull;</span>
                    <span>
                      {note.pageCount} {note.pageCount === 1 ? "page" : "pages"}
                    </span>
                  </>
                )}
                <span className="text-zinc-300 dark:text-zinc-600">&bull;</span>
                <span className="capitalize">{note.originalFileName}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={openEdit}>
              <Pencil size={16} />
              Rename
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
              Delete
            </Button>
          </div>
        </div>
      </div>

      {note.status === "PROCESSING" && (
        <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/50 p-8 text-center shadow-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <Loader2 size={36} className="mx-auto text-amber-500 dark:text-amber-400" />
          </motion.div>
          <h2 className="mt-4 text-lg font-semibold text-amber-800 dark:text-amber-300">
            Processing your notes
          </h2>
          <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">
            AI is analyzing your document and generating a summary. This usually takes a few seconds.
          </p>
        </div>
      )}

      {note.status === "FAILED" && (
        <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50 p-8 text-center shadow-sm">
          <AlertCircle size={36} className="mx-auto text-red-500 dark:text-red-400" />
          <h2 className="mt-4 text-lg font-semibold text-red-800 dark:text-red-300">
            Processing failed
          </h2>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            AI was unable to process this document. Please try uploading again.
          </p>
        </div>
      )}

      {note.status === "READY" && note.summary && (
        <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                AI Summary
              </h2>
            </div>
            <button
              onClick={copySummary}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              {copied ? (
                <Check size={14} className="text-emerald-600" />
              ) : (
                <Copy size={14} />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
            {note.summary}
          </div>
        </div>
      )}

      {note.status === "READY" && note.extractedText && (
        <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Extracted Text
          </h2>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Raw text extracted from your document
          </p>
          <div className="mt-4 max-h-96 overflow-y-auto rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap font-mono">
            {note.extractedText}
          </div>
        </div>
      )}

      <Modal isOpen={editOpen} onClose={() => !saving && setEditOpen(false)} title="Rename Note" size="sm">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
                setEditError("");
              }}
              disabled={saving}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 disabled:opacity-60"
              autoFocus
            />
            {editError && <p className="text-xs font-medium text-red-500">{editError}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setEditOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTitle} disabled={saving || !editTitle.trim()}>
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

export default NoteDetail;
