import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      // ✅ Store token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // ✅ Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      // alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Login to Your Garden 🌿
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-600 font-medium">
              Register
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}