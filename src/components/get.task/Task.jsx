import React, { useEffect, useState } from "react";
import "./task.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL = process.env.API_URL;
const Task = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteTask = async (taskId) => {
    await axios
      .delete(`${API_URL}/tasks/${taskId}`)
      .then((response) => {
        setTasks((prevTask) => prevTask.filter((task) => task._id !== taskId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="taskTable">
      <Link to="/add" type="button" class="btn btn-primary">
        Add Task <i class="fa-solid fa-task-plus"></i>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description} </td>
                <td className="actionButtons">
                  <Link
                    to={`/update/` + task._id}
                    type="button"
                    class="btn btn-info"
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Link>

                  <button
                    onClick={() => deleteTask(task._id)}
                    type="button"
                    class="btn btn-danger"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Task;
