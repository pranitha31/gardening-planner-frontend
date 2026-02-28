import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Plants from "./pages/Plants";
import Reminder from "./pages/Reminders";
import SeasonalPlanner from "./pages/SeasonalPlanner";
import SeasonalTasks from "./pages/SeasonalTasks";
import WeatherPlanner from "./pages/WeatherPlanner";
import UpdateLocation from "./pages/UpdateLocation";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/reminders" element={<Reminder />} />
          <Route path="/seasonal-planner" element={<SeasonalPlanner />} />
          <Route path="/seasonal-tasks" element={<SeasonalTasks />} />
          <Route path="/weather-planner" element={<WeatherPlanner />} />
          <Route path="/update-location" element={<UpdateLocation />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;