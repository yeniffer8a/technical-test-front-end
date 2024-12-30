import React, { useState } from "react";
import "./addtask.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.API_URL;

const AddTask = () => {
  const tasks = {
    title: "",
    description: "",

  };
  const [task, setTask] = useState(tasks);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setTask({ ...task, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post(`${API_URL}/tasks`, task)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addTask">
      <Link to="/" type="button" class="btn btn-secondary">
        <i class="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New Task</h3>
      <form className="addTaskForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={inputHandler}
            name="title"
            autoComplete="off"
            placeholder="Enter task title"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description:</label>
          <input
            type="description"
            id="description"
            onChange={inputHandler}
            name="description"
            autoComplete="off"
            placeholder="Enter task description"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
