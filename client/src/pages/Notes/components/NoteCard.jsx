import {
  BookOpen,
  Brain,
  ClipboardCheck,
  FileText,
  ArrowRight,
} from "lucide-react";

function NoteCard({ note }) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg">

      {/* File Type */}

      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
          <FileText
            size={24}
            className="text-emerald-600"
          />
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          PDF
        </span>
      </div>

      {/* Title */}

      <h3 className="mt-6 line-clamp-2 text-xl font-bold text-slate-900">
        {note.title}
      </h3>

      {/* Meta */}

      <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
        <span>{note.pages} Pages</span>

        <span>•</span>

        <span>{note.uploadedAt}</span>
      </div>

      {/* AI Features */}

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          <BookOpen size={14} />

          Summary
        </span>

        <span className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
          <Brain size={14} />

          Flashcards
        </span>

        <span className="flex items-center gap-1 rounded-lg bg-purple-50 px-3 py-2 text-xs font-medium text-purple-700">
          <ClipboardCheck size={14} />

          Quiz
        </span>
      </div>

      {/* Action */}

      <button className="mt-8 flex items-center gap-2 font-semibold text-emerald-600 transition group-hover:gap-3">
        Open Workspace

        <ArrowRight size={18} />
      </button>

    </article>
  );
}

export default NoteCard;