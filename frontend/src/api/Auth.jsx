import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerUser = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  localStorage.setItem("token", res.data.token);
  return res;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  localStorage.setItem("token", res.data.token);
  return res;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};