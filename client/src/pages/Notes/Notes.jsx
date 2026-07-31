import { useState, useEffect, useRef } from "react";
import { Upload, FileText, Loader2, AlertCircle } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import Toolbar from "./components/Toolbar";
import NotesGrid from "./components/NotesGrid";
import EmptyState from "./components/EmptyState";
import Modal from "../../components/ui/Modal";
import { getNotes, uploadNote } from "../../services/noteService";
import { motion } from "framer-motion";

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await getNotes();
        if (!cancelled) setNotes(res.data || []);
      } catch {
        if (!cancelled) setNotes([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = notes
    .filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sort) {
        case "oldest": return new Date(a.createdAt) - new Date(b.createdAt);
        case "az": return a.title.localeCompare(b.title);
        case "za": return b.title.localeCompare(a.title);
        default: return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  async function handleUpload() {
    if (!uploadFile) return;
    if (!uploadTitle.trim()) {
      setUploadError("Title is required.");
      return;
    }

    if (uploadFile.type !== "application/pdf") {
      setUploadError("Only PDF files are supported right now.");
      return;
    }

    if (uploadFile.size > MAX_UPLOAD_SIZE) {
      setUploadError("File size must be 10MB or less.");
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadProgress(0);
    setUploadSuccess(false);

    const interval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 85));
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("title", uploadTitle.trim());
      await uploadNote(formData);
      clearInterval(interval);
      setUploadProgress(100);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadOpen(false);
        setUploadFile(null);
        setUploadTitle("");
        setUploadProgress(0);
        setUploadSuccess(false);
        getNotes().then((res) => setNotes(res.data || [])).catch(() => {});
      }, 800);
    } catch (err) {
      clearInterval(interval);
      setUploadProgress(0);
      setUploadError(err?.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function closeUpload() {
    if (uploading) return;
    setUploadOpen(false);
    setUploadFile(null);
    setUploadTitle("");
    setUploadError("");
    setUploadProgress(0);
    setUploadSuccess(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Notes"
        subtitle="Manage all your study materials in one place."
      />

      <Toolbar
        search={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={notes.length}
        sort={sort}
        onSortChange={setSort}
        onUploadClick={() => setUploadOpen(true)}
      />

      {loading ? (
        <NotesGrid loading />
      ) : filtered.length === 0 ? (
        <EmptyState onUpload={() => setUploadOpen(true)} />
      ) : (
        <motion.div layout>
          <NotesGrid notes={filtered} />
        </motion.div>
      )}

      <Modal isOpen={uploadOpen} onClose={closeUpload} title="Upload Notes" size="md">
        <div className="space-y-6">
          <div
            onClick={() => !uploading && fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all duration-200 ${
              uploadFile
                ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20"
                : "border-zinc-200 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/30 hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20"
            }`}
          >
            {uploadFile ? (
              <>
                <FileText size={48} className="text-emerald-600 dark:text-emerald-400" />
                <p className="mt-4 font-medium text-zinc-900 dark:text-zinc-100">{uploadFile.name}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {(uploadFile.size / 1024).toFixed(1)} KB
                </p>
                {!uploading && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadFile(null);
                      setUploadError("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="mt-3 text-sm font-medium text-red-500 hover:text-red-600 transition"
                  >
                    Remove file
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-800/20 mb-4">
                  <Upload size={28} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  Drop a file here or click to browse
                </p>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Supports PDF files up to 10MB
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files[0] || null;
                setUploadFile(file);
                setUploadError("");
                if (file && !uploadTitle) {
                  setUploadTitle(file.name.replace(/\.pdf$/i, ""));
                }
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Title
            </label>
            <input
              type="text"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              disabled={uploading}
              placeholder="Give this note a title"
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 disabled:opacity-60"
            />
          </div>

          {uploadProgress > 0 && !uploadSuccess && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                />
              </div>
            </div>
          )}

          {uploadSuccess && (
            <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
              <Loader2 size={16} className="animate-spin shrink-0" />
              <span>Note uploaded successfully! Refreshing...</span>
            </div>
          )}

          {uploadError && (
            <div className="flex items-start gap-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeUpload}
              disabled={uploading}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={!uploadFile || !uploadTitle.trim() || uploading}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-emerald-700 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Upload
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Notes;
