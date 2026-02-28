import { useState, useEffect } from "react";
import API from "../../services/api";
const SeasonalPlantForm = ({ fetchPlants, editingPlant, setEditingPlant }) => {
  const [formData, setFormData] = useState({
    image: null,
    plant_name: "",
    plant_type: "",
    season: "",
    care_tips: ""
  });

  useEffect(() => {
    if (editingPlant) {
      setFormData(editingPlant);
    }
  }, [editingPlant]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("plant_name", formData.plant_name);
    data.append("season", formData.season);
    data.append("plant_type", formData.plant_type);
    data.append("care_tips", JSON.stringify(formData.care_tips));

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingPlant) {
        await API.put(`/seasonal-planner/${editingPlant.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingPlant(null);
      } else {
        await API.post("/seasonal-planner", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchPlants();
      // reset form
      setFormData({
        image: null,
        plant_name: "",
        plant_type: "",
        season: "",
        care_tips: "",
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md grid gap-4">

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setFormData({ ...formData, image: e.target.files[0] })
        }
      />
      <input
        placeholder="Plant Name"
        value={formData.plant_name}
        onChange={(e) =>
          setFormData({ ...formData, plant_name: e.target.value })
        }
        className="border p-2 rounded"
        required
      />

      <select
        value={formData.plant_type}
        onChange={(e) =>
          setFormData({ ...formData, plant_type: e.target.value })
        }
        className="border p-2 rounded"
        required
      >
        <option value="">Select Plant Type</option>
        <option value="Vegetable">Vegetable</option>
        <option value="Fruit">Fruit</option>
        <option value="Flowering">Flower</option>

      </select>

      <select
        value={formData.season}
        onChange={(e) =>
          setFormData({ ...formData, season: e.target.value })
        }
        className="border p-2 rounded"
        required
      >
        <option value="">Select Season</option>
        <option value="Summer">Summer</option>
        <option value="Winter">Winter</option>
        <option value="Monsoon">Monsoon</option>
      </select>

      <div>
        <label className="font-semibold">Care Tips</label>

        {[
          "Water regularly",
          "Provide full sunlight",
          "Use well-drained soil",
          "Fertilize monthly",
          "Avoid overwatering",
          "Prune regularly",
          "Protect from pests"
        ].map((tip) => (
          <div key={tip}>
            <input
              type="checkbox"
              value={tip}
              checked={formData.care_tips.includes(tip)}
              onChange={(e) => {
                if (e.target.checked) {
                  setFormData({
                    ...formData,
                    care_tips: [...formData.care_tips, tip],
                  });
                } else {
                  setFormData({
                    ...formData,
                    care_tips: formData.care_tips.filter(t => t !== tip),
                  });
                }
              }}
            />
            <span className="ml-2">{tip}</span>
          </div>
        ))}
      </div>

      <button className="bg-green-600 text-white py-2 rounded">
        {editingPlant ? "Update Plant" : "Add Plant"}
      </button>
    </form>
  );
};

export default SeasonalPlantForm;