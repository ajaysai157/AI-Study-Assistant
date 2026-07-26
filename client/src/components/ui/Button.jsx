import { Link } from "react-router-dom";

function Button({ children, to, variant = "primary" }) {
  const baseClasses =
    "rounded-xl px-6 py-3 font-medium transition duration-200";

  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "border border-slate-300 text-slate-700 hover:bg-slate-100",
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
