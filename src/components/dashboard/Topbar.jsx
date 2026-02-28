const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">

      <div className="text-gray-700">
        Welcome, <span className="font-bold">{user?.name}</span>
      </div>

    </div>
  );
};

export default Topbar;