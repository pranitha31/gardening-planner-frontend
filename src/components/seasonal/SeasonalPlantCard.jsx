const SeasonalPlantCard = ({ plant, deletePlant, setEditingPlant }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-lg">

      {plant.image_url && (
        <img
          src={plant.image_url}
          alt={plant.plant_name}
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}

      <h3 className="text-lg font-bold text-green-700">
        {plant.plant_name}
      </h3>

      <p>Type: {plant.plant_type}</p>
      <p>Season: {plant.season}</p>
      <ul className="mt-2 text-gray-600 list-disc ml-5">
        {plant.care_tips?.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>

      <div className="flex gap-2 mt-4">
        {setEditingPlant && (
          <button
            onClick={() => setEditingPlant(plant)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        )}

        {deletePlant && (
          <button
            onClick={() => deletePlant(plant.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        )}
      </div>

    </div>
  );
};

export default SeasonalPlantCard;