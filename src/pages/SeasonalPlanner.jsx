import { useEffect, useState } from "react";
import API from "../services/api";
import SeasonalPlantForm from "../components/seasonal/SeasonalPlantForm";
import SeasonalPlantCard from "../components/seasonal/SeasonalPlantCard";

const SeasonalPlanner = () => {
    const [plants, setPlants] = useState([]);
    const [editingPlant, setEditingPlant] = useState(null);

    const fetchPlants = async () => {
        try {
            const res = await API.get("/seasonal-planner");
            setPlants(res.data.plants);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPlants();
    }, []);
    const deletePlant = async (id) => {
        try {
            await API.delete(`/seasonal-planner/${id}`);
            fetchPlants(); // refresh list
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">
                Seasonal Planner 🌱
            </h2>

            <SeasonalPlantForm
                fetchPlants={fetchPlants}
                editingPlant={editingPlant}
                setEditingPlant={setEditingPlant}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {plants.map((plant) => (
                    <SeasonalPlantCard
                        key={plant.id}
                        plant={plant}
                        deletePlant={deletePlant}
                        setEditingPlant={setEditingPlant}
                    />
                ))}
            </div>
        </div>
    );
};

export default SeasonalPlanner;