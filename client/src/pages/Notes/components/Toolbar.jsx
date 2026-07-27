import { Search, Plus, SlidersHorizontal } from "lucide-react";

import Button from "../../../components/ui/Button";

function Toolbar() {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      
      {/* Search */}

      <div className="flex flex-1 items-center rounded-xl border border-slate-200 px-4 py-3">
        <Search
          size={18}
          className="text-slate-400"
        />

        <input
          type="text"
          placeholder="Search your notes..."
          className="ml-3 w-full bg-transparent outline-none"
        />
      </div>

      {/* Actions */}

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
          <SlidersHorizontal size={18} />

          Filter
        </button>

        <Button>
          <Plus size={18} />

          Upload Notes
        </Button>
      </div>
    </div>
  );
}

export default Toolbar;