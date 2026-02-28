const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">

      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold text-green-700 mt-2">
            {value}
          </h2>
        </div>

        <div className="text-3xl">
          {icon}
        </div>
      </div>

    </div>
  );
};

export default StatCard;