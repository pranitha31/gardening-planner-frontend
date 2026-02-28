import { useEffect, useState } from "react";

import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    plants: 0,
    reminders_pending: 0,
    reminders_completed: 0,
    overdue_reminders: 0,
    seasonal_planner: 0,
    seasonal_tasks: 0,
    upcoming_reminders: []
  });

  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch Dashboard Stats
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };
    fetchDashboard();
  }, []);

  // Fetch Location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const res = await API.get("/users/my-location");
        setLocation(res.data?.city ? res.data : null);
      } catch {
        setLocation(null);
      } finally {
        setLocationLoading(false);
      }
    };
    fetchLocation();
  }, []);

  // Fetch Weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await API.get("/weather-planner");
        setWeather(res.data);
      } catch {
        setWeather(null);
      }
    };
    fetchWeather();
  }, []);

  return (
  <div className="space-y-6">

    {/* TITLE */}
    <h2 className="text-3xl font-bold text-green-700">
      Smart Garden Dashboard 🌱
    </h2>

    {/* STAT CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
        <p className="text-sm opacity-80">Total Plants</p>
        <h2 className="text-3xl font-bold">{stats.plants}</h2>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
        <p className="text-sm opacity-80">Active Reminders</p>
        <h2 className="text-3xl font-bold">{stats.reminders_pending}</h2>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
        <p className="text-sm opacity-80">Completed</p>
        <h2 className="text-3xl font-bold">{stats.reminders_completed}</h2>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <p className="text-sm opacity-80">Seasonal Plants</p>
        <h2 className="text-3xl font-bold">{stats.seasonal_planner}</h2>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
        <p className="text-sm opacity-80">Seasonal Tasks</p>
        <h2 className="text-3xl font-bold">{stats.seasonal_tasks}</h2>
      </div>

    </div>

    {/* OVERDUE ALERT */}
    {stats.overdue_reminders > 0 && (
      <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-xl shadow">
        <p className="text-red-700 font-semibold">
          ⚠ You have {stats.overdue_reminders} overdue reminders!
        </p>
      </div>
    )}

    {/* MAIN GRID SECTION */}
    <div className="grid lg:grid-cols-2 gap-6">

      {/* UPCOMING REMINDERS */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold text-green-700 mb-4">
          Upcoming Reminders
        </h3>

        {stats.upcoming_reminders?.length === 0 && (
          <p className="text-gray-500">No upcoming reminders 🌿</p>
        )}

        {stats.upcoming_reminders?.map((r) => (
          <div
            key={r.id}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-3"
          >
            <div>
              <p className="font-semibold">
                {r.plants?.plant_name}
              </p>
              <p className="text-sm text-gray-500">
                {r.reminder_type}
              </p>
            </div>

            <span className="text-xs bg-green-200 text-green-800 px-3 py-1 rounded-full">
              Upcoming
            </span>
          </div>
        ))}
      </div>

      {/* WEATHER CARD */}
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-bold mb-4">
          Today's Weather 🌤
        </h3>

        {weather ? (
          <>
            <p className="text-4xl font-bold">
              {weather.temperature}°C
            </p>
            <p className="text-lg">{weather.condition}</p>
            <p className="text-sm mt-3 opacity-90">
              {weather.smart_advice}
            </p>
          </>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>

    </div>

    {/* LOCATION WARNING */}
    {!locationLoading && !location && (
      <div className="bg-yellow-100 p-4 rounded-xl shadow">
        <p className="text-yellow-800 font-medium">
          Please update your location to enable weather planner.
        </p>

        <button
          onClick={() => navigate("/update-location")}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Update Location
        </button>
      </div>
    )}

  </div>
);
};

export default Dashboard;