import { Link } from "react-router-dom";

function Button({ children, to, variant = "primary" }) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-emerald-600 text-white shadow-md shadow-emerald-200 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md",

    secondary:
      "border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md active:scale-[0.98]",

    ghost: "text-slate-700 hover:bg-slate-100",
  };

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${variants[variant]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
}

export default Button;
