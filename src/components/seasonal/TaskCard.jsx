import API from "../../services/api";

const TaskCard = ({ task, deleteTask, setEditingTask }) => {
  // Toggle status between Pending and Completed
  const toggleStatus = async () => {
    const newStatus = task.status === "Pending" ? "Completed" : "Pending";

    await API.put(`/seasonal-tasks/${task.id}`, {
      status: newStatus,
    });

    window.location.reload(); // simple refresh for now
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm border border-gray-100">
        
      {/* Plant image */}
      <img
        src={task.seasonal_planner?.image_url}
        alt="plant"
        className="w-full h-48 object-cover"
      />

      {/* Plant name */}
      <h3 className="font-bold mt-2">{task.seasonal_planner?.plant_name}</h3>

      {/* Season */}
      <p className="text-sm text-gray-500 mt-1">Season: {task.season}</p>

      {/* Task type */}
      <p className="text-sm mt-1">Type: {task.task_type}</p>

      {/* Description */}
      <p className="text-gray-600 mt-2">{task.description}</p>

      {/* Date range */}
      <p className="text-sm text-gray-500 mt-2">
        {task.start_date} → {task.end_date}
      </p>

      {/* Status */}
      <p
        className={`mt-2 font-semibold ${
          task.status === "Completed" ? "text-green-600" : "text-yellow-600"
        }`}
      >
        Status: {task.status}
      </p>

      {/* Action buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={toggleStatus}
          className="bg-purple-500 text-white px-3 py-1 rounded-lg"
        >
          Complete
        </button>

        <button
          onClick={() => setEditingTask(task)}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
