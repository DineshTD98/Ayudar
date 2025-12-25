import Navbar from "./navbar";
import { Outlet } from "react-router-dom";
export default function Layout({ setGetstarted }) {
  return (
    <>
      <Navbar setGetstarted={setGetstarted} />
      <div>
        <Outlet />
      </div>
    </>
  );
}
