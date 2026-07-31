import { Search, Upload } from "lucide-react";
import Button from "../../../components/ui/Button";

function Toolbar({ search, onSearchChange, onUploadClick, totalCount, sort, onSortChange }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
        />
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 py-2.5 pl-10 pr-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-2.5">
        {totalCount !== undefined && (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {totalCount} note{totalCount !== 1 ? "s" : ""}
          </span>
        )}
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 px-3 py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-colors cursor-pointer"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">A &rarr; Z</option>
          <option value="za">Z &rarr; A</option>
        </select>
        <Button onClick={onUploadClick} size="sm">
          <Upload size={15} />
          Upload
        </Button>
      </div>
    </div>
  );
}

export default Toolbar;
