import API from "./api";

export const registerUser = (userData) => {
  return API.post("/api/auth/register", userData);
};
export const loginUser = (userData) => {
  return API.post("/api/auth/login", userData);
};
