import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({
  label,
  error,
  type = "text",
  className = "",
  id,
  icon: Icon,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon size={18} className="text-zinc-400 dark:text-zinc-500" />
          </div>
        )}
        <input
          id={inputId}
          type={inputType}
          className={`w-full rounded-xl border bg-white dark:bg-zinc-900/50 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all duration-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 ${
            error
              ? "border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : "border-zinc-200 dark:border-zinc-700"
          } ${Icon ? "pl-10" : "px-4"} ${isPassword ? "pr-11" : ""} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-zinc-400 dark:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
