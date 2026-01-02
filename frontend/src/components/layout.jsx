import Navbar from "./navbar";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout({ setGetstarted }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <>
      {!isHomePage && <Navbar setGetstarted={setGetstarted} />}
      <div className={!isHomePage ? "mt-20" : ""}>
        <Outlet />
      </div>
    </>
  );
}
