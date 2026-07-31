function Card({ children, className = "", hover = false }) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
