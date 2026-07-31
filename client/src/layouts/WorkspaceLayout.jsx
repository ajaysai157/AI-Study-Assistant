import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import WorkspaceNavbar from "../components/layout/WorkspaceNavbar";
import WorkspaceSidebar from "../components/layout/WorkspaceSidebar";
import PageTransition from "../components/PageTransition";

function WorkspaceLayout() {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <WorkspaceSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="lg:pl-72 min-h-screen flex flex-col">
        <WorkspaceNavbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 w-full max-w-7xl mx-auto">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
}

export default WorkspaceLayout;
