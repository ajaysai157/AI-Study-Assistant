import { useNavigate } from "react-router-dom";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4"
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-zinc-100 dark:bg-zinc-800">
        <FileQuestion size={48} className="text-zinc-400 dark:text-zinc-500" />
      </div>
      <h1 className="mt-8 text-4xl font-bold text-zinc-900 dark:text-zinc-100">
        Page not found
      </h1>
      <p className="mt-3 text-center text-zinc-500 dark:text-zinc-400 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8">
        <Button onClick={() => navigate("/")}>
          <ArrowLeft size={16} />
          Go Home
        </Button>
      </div>
    </motion.div>
  );
}

export default NotFound;
