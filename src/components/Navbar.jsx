import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const location = useLocation();

  // Define which paths should hide the auth buttons
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">

      <Link to="/" className="text-2xl font-bold text-green-700">
        🌿 Garden Planner
      </Link>

      {/* Only show these buttons if we are NOT on the login or register page */}
      {!isAuthPage && (
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>

          <Link to="/register">
            <Button className="bg-green-600 hover:bg-green-700">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}