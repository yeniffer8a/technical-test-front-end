import axios from "axios";

const API_URL = process.env.API_URL;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/token`, { email, password });
  return response.data;
};

export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/users`, { email, password });
  return response.data;
};
