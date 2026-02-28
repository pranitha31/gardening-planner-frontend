import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Leaf, Bell, Calendar, ListTodo, MapPin, CloudSun, LogOut } from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkClass =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";

  const activeClass = "bg-green-800 text-white";
  const inactiveClass = "hover:bg-green-600 text-white";

  return (
    <div className="w-64 bg-green-700 text-white min-h-screen p-5 shadow-lg flex flex-col justify-between">

      {/* Logo */}
      <div>
        <h2 className="text-2xl font-bold mb-8">🌿 Smart Garden</h2>

        <nav className="space-y-2">

          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/plants"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Leaf size={18} />
            Plants
          </NavLink>

          <NavLink
            to="/reminders"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Bell size={18} />
            Reminders
          </NavLink>

          <NavLink
            to="/seasonal-planner"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <Calendar size={18} />
            Seasonal Planner
          </NavLink>

          <NavLink
            to="/seasonal-tasks"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <ListTodo size={18} />
            Seasonal Tasks
          </NavLink>

          <NavLink
            to="/update-location"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <MapPin size={18} />
            Update Location
          </NavLink>

          <NavLink
            to="/weather-planner"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <CloudSun size={18} />
            Weather Planner
          </NavLink>

        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200"
      >
        <LogOut size={18} />
        Logout
      </button>

    </div>
  );
};

export default Sidebar;