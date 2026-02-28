import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",

    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            // ✅ Show success message
            alert("Registration successful! Please login.");

            // ✅ Redirect to login page
            navigate("/login");

        } catch (error) {
            alert(error.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
            <Navbar />

            <main className="flex-grow flex items-center justify-center px-4">
                <div className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-md">

                    <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
                        Create Your Garden Account 🌿
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        confirmPassword: e.target.value,
                                    })
                                }
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg">
                            Register
                        </Button>
                    </form>

                    <p className="text-center text-sm mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-green-600 font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}