import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.API_URL;
const navigate = useNavigate();

export const getTasks = async (token) => {
  return axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (token, task) => {
  return axios
    .post(`${API_URL}/tasks`, task, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTask = async (token, id, task) => {
  return axios.patch(`${API_URL}/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (token, id) => {
  return axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
