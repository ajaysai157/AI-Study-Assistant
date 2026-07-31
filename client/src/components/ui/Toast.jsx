/* eslint-disable react-refresh/only-export-components */
import { useState, useCallback, createContext, useContext } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors = {
  success: "border-l-emerald-500",
  error: "border-l-red-500",
  info: "border-l-emerald-500",
  warning: "border-l-amber-500",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.type];
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 80, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`pointer-events-auto flex items-start gap-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3.5 shadow-lg border-l-4 ${
                  colors[toast.type]
                }`}
              >
                <Icon size={20} className="mt-0.5 shrink-0 text-zinc-900 dark:text-zinc-100" />
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="ml-2 shrink-0 rounded-lg p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                >
                  <X size={16} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
