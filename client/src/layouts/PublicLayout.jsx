import { Outlet, useLocation } from "react-router-dom";
import LandingNavbar from "../components/layout/LandingNavbar";

function PublicLayout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <>
      {isLanding && <LandingNavbar />}
      <Outlet />
    </>
  );
}

export default PublicLayout;
