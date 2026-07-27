import PageHeader from "../../components/ui/PageHeader";

import Toolbar from "./components/Toolbar";
import NotesGrid from "./components/NotesGrid";

function Notes() {
  return (
    <>
      <PageHeader
        title="My Notes"
        subtitle="Manage all your study materials in one place."
      />

      <Toolbar />

      <NotesGrid />
    </>
  );
}

export default Notes;