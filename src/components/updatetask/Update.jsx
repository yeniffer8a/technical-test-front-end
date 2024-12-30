import React, { useEffect, useState } from "react";
import "./update.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

//const API_URL = process.env.API_URL;

const UpdateTask = () => {
  const tasks = {
    title: "",
    description: "",
    completed: "",
  };
  const [task, setTask] = useState(tasks);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

   setTask({ ...task, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/tasks/${id}`)
      .then((response) => {
       setTask(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8000/api/tasks/${id}`, task)
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

      <h3>Update Task</h3>
      <form className="addTaskForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={task.title}
            onChange={inputHandler}
            name="title"
            autoComplete="off"
            placeholder="Enter task title"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">E-mail:</label>
          <input
            type="description"
            id="description"
            value={task.description}
            onChange={inputHandler}
            name="description"
            autoComplete="off"
            placeholder="Enter task description"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="completed">Task state:</label>
          <input
            type="text"
            id="completed"
            value={task.completed}
            onChange={inputHandler}
            name="completed"
            autoComplete="off"
            placeholder="Enter task state"
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

export default UpdateTask;
