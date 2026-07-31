import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/ui/Toast";

function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await register({ name: form.name.trim(), email: form.email, password: form.password });
      addToast("Account created! Please sign in.", "success");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden flex-1 flex-col justify-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 p-16 text-white lg:flex"
      >
        <div className="mx-auto max-w-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm mb-8">
            <BookOpen size={32} />
          </div>
          <h2 className="text-4xl font-bold leading-tight">Start learning smarter today</h2>
          <p className="mt-6 text-lg leading-relaxed text-emerald-100">
            Join thousands of students who use AI to transform their study materials into interactive learning experiences.
          </p>
          <div className="mt-10 space-y-4">
            {[
              "Upload any PDF or text",
              "Get instant AI summaries",
              "Create flashcards & quizzes",
              "Track your progress",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-emerald-50">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-1 items-center justify-center px-4 py-12"
      >
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-sm group-hover:shadow-md transition-all">
                <BookOpen size={24} />
              </div>
              <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">StudyFlow</span>
            </Link>
          </div>

          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Create an account</h1>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">Start your AI-powered learning journey.</p>

            {error && <Alert message={error} type="error" className="mt-6" />}

            <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
              <Input
                label="Full Name"
                type="text"
                icon={User}
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={errors.name}
                autoComplete="name"
              />
              <Input
                label="Email"
                type="email"
                icon={Mail}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={errors.email}
                autoComplete="email"
              />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <Lock size={18} className="text-zinc-400 dark:text-zinc-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className={`w-full rounded-xl border bg-white dark:bg-zinc-900/50 px-4 py-3 pl-11 pr-11 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 ${
                      errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-200 dark:border-zinc-700"
                    }`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs font-medium text-red-500">{errors.password}</p>}
              </div>
              <Button type="submit" loading={loading} className="w-full" size="lg">
                Create Account
              </Button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
