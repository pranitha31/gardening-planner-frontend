import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const phrases = [
  "Grow Smarter 🌱",
  "Track Your Plants 🌿",
  "Garden With Confidence 🌼",
  "Smart Gardening Made Easy 🌦",
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-b from-green-50 to-white">

        {/* 🌿 HERO SECTION */}
        <section className="text-center py-24 px-6">
          <h1 className="text-6xl font-extrabold text-green-700 mb-6 transition-all duration-700">
            {phrases[index]}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Plan. Track. Grow. All in one place.
          </p>

          <Link to="/register">
            <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
              Start Your Journey
            </Button>
          </Link>
        </section>

        {/* 🌱 FEATURE GRID */}
        <section className="py-16 px-6 bg-green-50">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
            Features You’ll Love
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              ["🌿 Plant Management", "Track and care with ease."],
              ["⏰ Reminders", "Stay on top of tasks."],
              ["🐛 Pest Tracker", "Log and resolve issues."],
              ["📅 Seasonal Planner", "Plan by season cycles."],
              ["🌦 Weather Smart", "Advice based on location."],
              ["🔒 Secure Profile", "Your data, protected."],
            ].map(([title, desc], i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-2"
              >
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🌸 MOTIVATION SECTION */}
        <section className="py-20 bg-green-700 text-white text-center px-6">
          <h2 className="text-3xl font-bold mb-6">
            "A garden is patience and love."
          </h2>
          <p className="text-lg">
            Let this planner guide your growth — plant by plant, season by season.
          </p>
        </section>

      </main>

      <Footer />
    </div>
  );
}