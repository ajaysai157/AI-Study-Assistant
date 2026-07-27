import PageHeader from "../../components/ui/PageHeader";

import HeroBanner from "./components/HeroBanner";
import QuickActions from "./components/QuickActions";
import WelcomeState from "./components/WelcomeState";

function Home() {
  const hasNotes = false;

  return (
    <>
      <PageHeader
        title="Good Morning 👋"
        subtitle="Ready to make today a productive study session?"
      />

      <HeroBanner />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WelcomeState />
        </div>

        <QuickActions />
      </div>
    </>
  );
}

export default Home;