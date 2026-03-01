import { useEffect, useState } from "react";
import API from "../services/api";

import TaskForm from "../components/seasonal/TaskForm";
import TaskCard from "../components/seasonal/TaskCard";

const SeasonalTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);


  const fetchTasks = async () => {
    const res = await API.get("/seasonal-tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await API.delete(`/seasonal-tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Seasonal Tasks 📋
      </h1>
      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-2 rounded ${filter === "All" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Summer")}
          className={`px-4 py-2 rounded ${filter === "Summer" ? "bg-green-600 text-white" : "bg-yellow-200"
            }`}
        >
          Summer
        </button>

        <button
          onClick={() => setFilter("Winter")}
          className={`px-4 py-2 rounded ${filter === "Winter" ? "bg-green-600 text-white" : "bg-blue-200"
            }`}
        >
          Winter
        </button>

        <button
          onClick={() => setFilter("Monsoon")}
          className={`px-4 py-2 rounded ${filter === "Monsoon" ? "bg-green-600 text-white" : "bg-green-200"
            }`}
        >
          Monsoon
        </button>

      </div>

      <TaskForm
        fetchTasks={fetchTasks}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {tasks
          .filter((task) =>
            filter === "All" ? true : task.season === filter
          )
          .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              setEditingTask={setEditingTask}
            />
          ))}
      </div>
    </div>
  );
};

export default SeasonalTasks;