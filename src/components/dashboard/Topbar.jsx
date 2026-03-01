const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-blue  p-4 flex justify-between items-center">
      <div className="text-gray-700 text-lg">
        Welcome, <span className="font-bold text-green-700">{user?.name || "Gardener"}</span>
      </div>

    </div>
  );
};

export default Topbar;