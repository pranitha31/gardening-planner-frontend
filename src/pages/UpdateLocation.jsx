import { useState } from "react";
//import { useEffect } from "react";
//import { useNavigate } from "react-router-dom";

import API from "../services/api";

const UpdateLocation = () => {
 
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSave = async () => {
    setError("");
    setMessage("");

    if (!country || !state || !city) {
      setError("All fields are required");
      return;
    }

    try {
      await API.put("/users/update-location", {
        country,
        state,
        city,
      });

      setMessage("Location updated successfully ✅");

      // ✅ Refresh after save
      //await fetchLocation();
      setCountry("");
      setState("");
      setCity("");

    } catch (err) {
      setError("Error updating location");
      console.error(err);
    }
  };

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        Update Location 📍
      </h2>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-3xl shadow-xl space-y-6">

        {message && (
          <div className="bg-blue-100 p-3 rounded-lg text-blue-700">
            {message}
          </div>
        )}

        <input
          type="text"
          placeholder="Country"
          className="w-full p-2 border rounded-lg"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <input
          type="text"
          placeholder="State"
          className="w-full p-2 border rounded-lg"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <input
          type="text"
          placeholder="City"
          className="w-full p-2 border rounded-lg"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Save Location
        </button>

      </div>
    </main>


  );
  // };
};
export default UpdateLocation;