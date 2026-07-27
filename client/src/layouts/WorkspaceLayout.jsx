import { Outlet } from "react-router-dom";
import { useState } from "react";

import WorkspaceNavbar from "../components/layout/WorkspaceNavbar";
import WorkspaceSidebar from "../components/layout/WorkspaceSidebar";

function WorkspaceLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <WorkspaceNavbar
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      <WorkspaceSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default WorkspaceLayout;