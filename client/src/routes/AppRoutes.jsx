import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import WorkspaceLayout from "../layouts/WorkspaceLayout";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Home from "../pages/Home/Home";
import Notes from "../pages/Notes/Notes";
import Profile from "../pages/Profile/Profile";

import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Route>

      {/* ---------- Workspace Routes ---------- */}

      <Route element={<WorkspaceLayout />}>
        <Route path="/home" element={<Home />} />

        <Route path="/notes" element={<Notes />} />

        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* ---------- Not Found ---------- */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
