import EmptyState from "./EmptyState";
import NoteCard from "./NoteCard";

function NotesGrid() {
  // Temporary data
  const notes = [
    {
      id: 1,
      title: "Machine Learning",
      pages: 28,
      uploadedAt: "2 days ago",
    },
    {
      id: 2,
      title: "Operating Systems",
      pages: 42,
      uploadedAt: "Yesterday",
    },
    {
      id: 3,
      title: "Computer Networks",
      pages: 31,
      uploadedAt: "1 week ago",
    },
  ];

  if (notes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

export default NotesGrid;
