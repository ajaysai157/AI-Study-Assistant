import NoteCard from "./NoteCard";
import { SkeletonCard } from "../../../components/ui/Skeleton";

function NotesGrid({ notes, loading, skeletons = 6 }) {
  if (loading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: skeletons }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (notes.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NotesGrid;
