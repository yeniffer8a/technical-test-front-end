
import React, { useEffect, useState } from "react";
import "./task.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Checkbox from "../Checkbox"; 

const API_URL = process.env.REACT_APP_API_URL;

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtener las tareas al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Eliminar tarea
  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks((prevTask) => prevTask.filter((task) => task._id !== taskId));
      toast.success(response.data.message, { position: "top-right" });
    } catch (error) {
      console.log("Error while deleting task", error);
      toast.error("Error deleting task", { position: "top-right" });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Muestra el estado de carga
  }

  return (
    <div className="taskTable">
      <Link to="/add" type="button" className="btn btn-primary">
        Add Task <i className="fa-solid fa-task-plus"></i>
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Creation date</th>
            <th scope="col">Actions</th>
            <th scope="col">Select</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr key={task._id}> 
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description} </td>
                <td>{task.createdAt} </td>
                <td className="actionButtons">
                  <Link to={`/update/${task._id}`} type="button" className="btn btn-info" aria-label="Edit task">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>

                  <button
                    onClick={() => deleteTask(task._id)}
                    type="button"
                    className="btn btn-danger"
                    aria-label="Delete task"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
                <td>
                  {/* Uso el componente Checkbox y pasamos las props necesarias */}
                  <Checkbox
                    taskId={task._id}
                    completed={task.completed}
                    onChange={(newCompleted) => {
       
                      setTasks(prevTasks =>
                        prevTasks.map(t =>
                          t._id === task._id ? { ...t, completed: newCompleted } : t
                        )
                      );
                    }}
                  />
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
