import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { Menu } from "lucide-react";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div className="flex min-h-screen bg-gray-100">
    // Change min-h-screen to h-full or ensure the container allows growth
    <div className="flex min-h-screen bg-gray-100 items-stretch">

      {/* SIDEBAR */}
      <div
        className={`fixed z-50 inset-y-0 left-0 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition duration-300 ease-in-out 
        lg:translate-x-0 lg:static lg:block`}
      >
        <Sidebar closeSidebar={() => setIsOpen(false)} />
      </div>


      {/* OVERLAY (Mobile Only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TOPBAR */}
        <div className="flex items-center bg-white shadow px-4 py-3">

          {/* Hamburger (Mobile Only) */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden mr-4"
          >
            <Menu size={28} />
          </button>

          <Topbar />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;