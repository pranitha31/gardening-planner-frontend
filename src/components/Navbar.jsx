import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">

      <Link to="/" className="text-2xl font-bold text-green-700">
        🌿 Garden Planner
      </Link>

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
    </nav>
  )
}