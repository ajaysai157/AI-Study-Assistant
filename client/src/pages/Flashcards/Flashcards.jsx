import { useEffect, useMemo, useState } from "react";
import { Brain, Loader2, RotateCcw, Search, Sparkles, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { getNotes } from "../../services/noteService";
import { deleteFlashcard, generateFlashcards, getFlashcards } from "../../services/flashcardService";
import { useToast } from "../../context/ToastContext";

function Flashcards() {
  const { addToast } = useToast();
  const [cards, setCards] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState("");
  const [generating, setGenerating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const [flashcardsRes, notesRes] = await Promise.all([getFlashcards(), getNotes()]);
        setCards(flashcardsRes.data || []);
        setNotes(notesRes.data || []);
      } catch {
        setCards([]);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const filteredCards = useMemo(() => {
    if (!search.trim()) return cards;
    const term = search.toLowerCase();
    return cards.filter((card) => `${card.question} ${card.answer}`.toLowerCase().includes(term));
  }, [cards, search]);

  const visibleCards = filteredCards.length > 0 ? filteredCards : cards;

  async function handleGenerate() {
    if (!selectedNoteId) {
      addToast("Choose a note first.", "error");
      return;
    }

    setGenerating(true);
    try {
      const res = await generateFlashcards(selectedNoteId, 8, true);
      setCards(res.data || []);
      setActiveIndex(0);
      setFlipped(false);
      addToast("Flashcards generated successfully.", "success");
    } catch (error) {
      addToast(error?.response?.data?.message || "Unable to generate flashcards.", "error");
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteFlashcard(id);
      setCards((prev) => prev.filter((card) => card.id !== id));
      addToast("Flashcard removed.", "success");
    } catch (error) {
      addToast(error?.response?.data?.message || "Unable to delete flashcard.", "error");
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <PageHeader title="Flashcards" subtitle="Review your AI-generated study cards." />

      <Card className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Generate from a note</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Create fresh cards from any ready note in your library.</p>
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
              Generate
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Study deck</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Flip through your cards and track your progress.</p>
            </div>
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cards" className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 sm:w-56" />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-zinc-50 dark:bg-zinc-800/40">
                <Loader2 size={24} className="animate-spin text-emerald-600" />
              </div>
            ) : visibleCards.length === 0 ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 px-6 text-center dark:border-zinc-700">
                <Brain size={32} className="text-emerald-600" />
                <h4 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-100">No flashcards yet</h4>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Generate your first deck from a ready note.</p>
              </div>
            ) : (
              <>
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
                  <div className="mb-3 flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
                    <span>Card {Math.min(activeIndex + 1, visibleCards.length)} of {visibleCards.length}</span>
                    <span>{visibleCards[activeIndex]?.source || "Study note"}</span>
                  </div>
                  <button onClick={() => setFlipped((prev) => !prev)} className="flex min-h-[220px] w-full items-center justify-center rounded-2xl bg-white p-6 text-center text-lg font-medium text-zinc-900 shadow-sm transition hover:shadow-md dark:bg-zinc-900 dark:text-zinc-100">
                    {flipped ? visibleCards[activeIndex]?.answer : visibleCards[activeIndex]?.question}
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => { setActiveIndex((prev) => (prev > 0 ? prev - 1 : visibleCards.length - 1)); setFlipped(false); }}>
                      <RotateCcw size={16} />
                      Previous
                    </Button>
                    <Button variant="secondary" onClick={() => { setActiveIndex((prev) => (prev + 1) % visibleCards.length); setFlipped(false); }}>
                      Next
                    </Button>
                  </div>
                  <Button variant="outline" onClick={() => setFlipped((prev) => !prev)}>
                    {flipped ? "Show question" : "Show answer"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Deck list</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Manage your current cards.</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {visibleCards.map((card, index) => (
              <div key={card.id} className="flex items-start justify-between rounded-2xl border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900/70">
                <button onClick={() => { setActiveIndex(index); setFlipped(false); }} className="flex-1 pr-3 text-left">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{card.question}</p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{card.source || "Generated card"}</p>
                </button>
                <button onClick={() => handleDelete(card.id)} className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

export default Flashcards;
