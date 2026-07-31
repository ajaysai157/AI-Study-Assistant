import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-emerald-400",
  secondary:
    "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-700 disabled:opacity-50",
  ghost:
    "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 disabled:opacity-50",
  danger:
    "bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800 disabled:opacity-60",
  outline:
    "border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 active:bg-emerald-100 dark:active:bg-emerald-900 disabled:opacity-50",
};

const sizes = {
  sm: "px-3.5 py-1.5 text-xs rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-xl",
};

function Button({
  children,
  to,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) {
  const classes = [
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 select-none",
    "hover:-translate-y-0.5 active:translate-y-0",
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
}

export default Button;
