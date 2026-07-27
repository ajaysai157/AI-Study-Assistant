function Badge({ children }) {
  return (
    <span
      className="
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-emerald-200
        bg-emerald-50
        px-5
        py-2
        text-sm
        font-semibold
        text-emerald-700
        shadow-sm
      "
    >
      {children}
    </span>
  );
}

export default Badge;