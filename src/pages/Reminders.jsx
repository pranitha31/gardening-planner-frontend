import { useEffect, useState } from "react";
import API from "../services/api";

const Reminder = () => {

  const [reminders, setReminders] = useState([]);
  const [plants, setPlants] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    plant_id: "",
    reminder_type: "",
    reminder_date: "",
  });

  const fetchReminders = async () => {
    try {
      const res = await API.get("/reminders");
      setReminders(res.data.reminders || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPlants = async () => {
    try {
      const res = await API.get("/plants");
      setPlants(res.data.plants || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReminders();
    fetchPlants();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/reminders/${editingId}`, formData);
        setEditingId(null);
      } else {
        await API.post("/reminders", formData);
      }

      setFormData({ plant_id: "", reminder_type: "", reminder_date: "" });
      fetchReminders();


    } catch (err) {
      console.error(err);
    }
  };

  const deleteReminder = async (id) => {
    await API.delete(`/reminders/${id}`);
    fetchReminders();
  };

  const completeReminder = async (id) => {
    await API.put(`/reminders/${id}/complete`);
    fetchReminders();
  };

  return (
    <div className="space-y-6">

      {/* FILTER BUTTONS */}
      <div className="flex gap-3 mb-6">
        <button onClick={() => setFilter("all")} className="px-3 py-1 bg-gray-300 rounded">
          All
        </button>
        <button onClick={() => setFilter("pending")} className="px-3 py-1 bg-yellow-300 rounded">
          Pending
        </button>
        <button onClick={() => setFilter("completed")} className="px-3 py-1 bg-green-300 rounded">
          Completed
        </button>
      </div>

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          {editingId ? "Edit Reminder ✏️" : "Add Reminder ⏰"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          <select
            name="plant_id"
            value={formData.plant_id}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          >
            <option value="">Select Plant</option>
            {plants.map((p) => (
              <option key={p.id} value={p.id}>
                {p.plant_name}
              </option>
            ))}
          </select>

          <select
            name="reminder_type"
            value={formData.reminder_type}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          >
            <option value="">Select Type</option>
            <option value="Watering">Watering</option>
            <option value="Fertilizing">Fertilizing</option>
            <option value="Pruning">Pruning</option>
          </select>

          <input
            type="date"
            name="reminder_date"
            value={formData.reminder_date}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg md:col-span-3"
          >
            {editingId ? "Update Reminder" : "Add Reminder"}
          </button>
        </form>
      </div>
      {/* REMINDER CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reminders
          .filter((r) =>
            filter === "all" ? true : r.status === filter
          )
          .map((rem) => {
            const isOverdue =
              rem.status === "pending" &&
              new Date(rem.reminder_date) < new Date();

            return (
              <div
                key={rem.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-xl ${isOverdue ? "border-2 border-red-500" : ""
                  }`}
              >
                {/* Plant Image */}
                <img
                  src={rem.plants?.image_url}
                  alt={rem.plants?.plant_name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-bold text-green-700 mb-2">
                    {rem.reminder_type}
                  </h3>

                  <p className="text-gray-700">
                    🌿 {rem.plants?.plant_name}
                  </p>

                  <p className="text-gray-700">
                    📅 {new Date(rem.reminder_date).toLocaleDateString()}
                  </p>

                  <p className="mt-2 font-semibold">
                    Status:
                    <span
                      className={`ml-2 ${rem.status === "completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                        }`}
                    >
                      {rem.status}
                    </span>
                  </p>

                  <div className="flex gap-2 mt-4 flex-wrap">
                    {rem.status !== "completed" && (
                      <button
                        onClick={() => completeReminder(rem.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        Complete
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setEditingId(rem.id);
                        setFormData({
                          plant_id: rem.plant_id,
                          reminder_type: rem.reminder_type,
                          reminder_date: rem.reminder_date,
                        });
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteReminder(rem.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

    </div>


  );
};

export default Reminder;