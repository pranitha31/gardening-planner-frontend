import axios from "axios";

const API = axios.create({
  baseURL: "https://gardening-planner-backend.onrender.com/api",
  timeout: 60000,
  withCredentials: true
});

// 🔐 Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  console.log("TOKEN BEING SENT:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;