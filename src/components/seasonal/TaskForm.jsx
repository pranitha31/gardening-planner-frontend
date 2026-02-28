import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ fetchTasks }) => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [formData, setFormData] = useState({
    seasonal_planner_id: "",
    task_type: "",
    start_date: "",
    end_date: ""
  });

  useEffect(() => {
    const fetchPlants = async () => {
      const res = await API.get("/seasonal-planner");
      setPlants(res.data.plants);
    };
    fetchPlants();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/seasonal-tasks", formData);

    fetchTasks();
    

    // 🔥 RESET FORM FIELDS
    setFormData({
      seasonal_planner_id: "",
      task_type: "",
      start_date: "",
      end_date: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* 1️⃣ Select Plant */}
      <select
        className="border p-2 rounded w-full"
        value={formData.seasonal_planner_id}
        onChange={(e) =>
          setFormData({ ...formData, seasonal_planner_id: e.target.value })
        }
        required
      >
        <option value="">Select Seasonal Plant</option>
        {plants.map((p) => (
          <option key={p.id} value={p.id}>
            {p.plant_name}
          </option>
        ))}
      </select>

      {/* 2️⃣ ADD THIS HERE 👇 */}
      <select
        className="border p-2 rounded w-full"
        value={formData.task_type}
        onChange={(e) =>
          setFormData({ ...formData, task_type: e.target.value })
        }
        required
      >
        <option value="">Select Task Type</option>
        <option value="Planting">Planting</option>
        <option value="Pruning">Pruning</option>
        <option value="Harvest">Harvest</option>
        <option value="Preparation">Preparation</option>
      </select>

      {/* 3️⃣ Start Date */}
      <input
        type="date"
        className="border p-2 rounded w-full"
        value={formData.start_date}
        onChange={(e) =>
          setFormData({ ...formData, start_date: e.target.value })
        }
        required
      />

      {/* 4️⃣ End Date */}
      <input
        type="date"
        className="border p-2 rounded w-full"
        value={formData.end_date}
        onChange={(e) =>
          setFormData({ ...formData, end_date: e.target.value })
        }
        required
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Add Task
      </button>

    </form>
  );
};

export default TaskForm;