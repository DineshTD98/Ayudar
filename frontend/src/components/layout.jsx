import Navbar from "./navbar";
import { Outlet, useLocation } from "react-router-dom";
import Infoslide2 from "../assets/infoslideimages/infoslideimage3.jpg";

export default function Layout({ setGetstarted }) {
  const location = useLocation();

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-fixed bg-no-repeat relative overflow-x-hidden"
      style={{ backgroundImage: `url(${Infoslide2})` }}
    >
      {/* Global Dark Overlay to match landing page */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-0"></div>

      <Navbar setGetstarted={setGetstarted} />
      
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
