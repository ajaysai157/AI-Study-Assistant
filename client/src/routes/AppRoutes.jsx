import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import WorkspaceLayout from "../layouts/WorkspaceLayout";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Home from "../pages/Home/Home";
import Notes from "../pages/Notes/Notes";
import Profile from "../pages/Profile/Profile";
import NoteDetail from "../pages/Notes/NoteDetail";
import Flashcards from "../pages/Flashcards/Flashcards";
import Quiz from "../pages/Quiz/Quiz";
import Planner from "../pages/Planner/Planner";
import Settings from "../pages/Settings/Settings";

import NotFound from "../pages/NotFound/NotFound";
import ErrorBoundary from "../components/ErrorBoundary";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<WorkspaceLayout />}>
        <Route path="/home" element={<ErrorBoundary><Home /></ErrorBoundary>} />
        <Route path="/notes" element={<ErrorBoundary><Notes /></ErrorBoundary>} />
        <Route path="/notes/:id" element={<ErrorBoundary><NoteDetail /></ErrorBoundary>} />
        <Route path="/profile" element={<ErrorBoundary><Profile /></ErrorBoundary>} />
        <Route path="/flashcards" element={<ErrorBoundary><Flashcards /></ErrorBoundary>} />
        <Route path="/quiz" element={<ErrorBoundary><Quiz /></ErrorBoundary>} />
        <Route path="/planner" element={<ErrorBoundary><Planner /></ErrorBoundary>} />
        <Route path="/settings" element={<ErrorBoundary><Settings /></ErrorBoundary>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
