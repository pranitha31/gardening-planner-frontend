import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import API from "../services/api";

const WeatherPlanner = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await API.get("/weather-planner");
      setWeather(res.data);
    } catch (err) {
      setError("Weather fetch failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Smart Weather Planner 🌦️
      </h2>

      {weather ? (
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">

          <h3 className="text-lg font-bold text-green-700">
            📍 Location: {weather.location}
          </h3>

          <p className="text-xl">
            🌡 Temperature: {weather.temperature}°C
          </p>

          <p className="text-xl">
            ☁ Condition: {weather.condition}
          </p>

          <div className="bg-green-100 p-4 rounded-xl text-green-800 font-medium">
            🌱 Smart Advice: {weather.smart_advice}
          </div>

          {weather.forecast && weather.forecast.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              {weather.forecast.map((day, index) => (
                <div key={index} className="bg-white shadow-md p-4 rounded-2xl text-center hover:scale-105 transition-transform">
                  <p className="font-semibold">{day.date}</p>
                  {/* <p>{day.temp}°C</p> */}
                  <p>{day.condition}</p>
                </div>
              ))}
            </div>

          )}
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Refreshing..." : "Refresh Weather"}
          </button>

        </div>
      ) : (
        !error && <p>Loading weather...</p>
      )}
    </main>
  );
};

export default WeatherPlanner;