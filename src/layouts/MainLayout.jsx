import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { Menu } from "lucide-react";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div
        className={`fixed z-40 inset-y-0 left-0 transform s
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        transition duration-300 ease-in-out 
        lg:translate-x-0 lg:static lg:inset-0`}
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
      <div className="flex-1 flex flex-col w-full">

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
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;