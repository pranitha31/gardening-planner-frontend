import { useState, useEffect } from "react";
import API from "../services/api";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    plant_name: "",
    plant_type: "",
    sunlight: "",
    watering_interval_days: "",
  });

  // ✅ Fetch Plants
  const fetchPlants = async () => {
    try {
      const res = await API.get("/plants");
      setPlants(res.data.plants || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setPlants([]);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle Submit (Add + Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("plant_name", formData.plant_name);
      data.append("plant_type", formData.plant_type);
      data.append("sunlight", formData.sunlight);
      data.append("watering_interval_days", formData.watering_interval_days);

      if (selectedImage) {
        data.append("image", selectedImage);
      }

      if (editingId) {
        // UPDATE
        await API.put(`/plants/${editingId}`, data);
        alert("Plant updated successfully 🌿");
      } else {
        // CREATE
        await API.post("/plants", data);
        alert("Plant added successfully 🌱");
      }

      // Reset form
      setFormData({
        plant_name: "",
        species: "",
        sunlight: "",
        watering_interval_days: "",
      });
      setSelectedImage(null);
      setEditingId(null);

      fetchPlants();

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await API.delete(`/plants/${id}`);
      fetchPlants();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ✅ Edit
  const handleEdit = (plant) => {
    setFormData({
      plant_name: plant.plant_name,
      plant_type: plant.plant_type,
      sunlight: plant.sunlight,
      watering_interval_days: plant.watering_interval_days,
    });

    setEditingId(plant.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-10">

      {/* FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          {editingId ? "Edit Plant 🌿" : "Add New Plant 🌱"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            name="plant_name"
            placeholder="Plant Name"
            value={formData.plant_name}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          />

          <select
            name="plant_type"
            value={formData.plant_type}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          >
            <option value="">Select Plant Type</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Flower">Flower</option>
            <option value="Herbs">Herbs</option>
            <option value="Ornamentals">Ornamentals</option>
          </select>

          <select
            name="sunlight"
            value={formData.sunlight}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          >
            <option value="">Select Sunlight</option>
            <option value="Full Sun">Full Sun</option>
            <option value="Partial Sun">Partial Sun</option>
            <option value="Filtered Light">Filtered Light</option>
          </select>
          <select
            name="watering_interval_days"
            value={formData.watering_interval_days}
            onChange={handleChange}
            className="border p-2 rounded-lg"
            required
          >
            <option value="">Select Watering Schedule</option>
            <option value="1">Daily</option>
            <option value="2">Every 2 Days</option>
            <option value="3">Every 3 Days</option>
            <option value="7">Weekly</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            className="md:col-span-4"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 md:col-span-4"
          >
            {editingId ? "Update Plant" : "Add Plant"}
          </button>
        </form>
      </div>

      {/* PLANT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plants.map((plant) => (
          <div
            key={plant.id}
            className="bg-white p-5 rounded-2xl shadow-md"
          >

            {plant.image_url && (
              <img
                src={plant.image_url}
                alt={plant.plant_name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            )}

            <h3 className="text-lg font-bold text-green-700">
              {plant.plant_name}
            </h3>

            <p className="text-gray-600">🌿 {plant.plant_type}</p>
            <p className="text-gray-600">☀ {plant.sunlight}</p>
            <p className="text-gray-600">💧 {plant.watering_interval_days}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(plant)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(plant.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>


  );
};

export default Plants;