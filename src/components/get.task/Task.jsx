// import React, { useEffect, useState } from "react";
// import "./task.css";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// //const API_URL = process.env.API_URL;
// const Task = () => {
//   const [tasks, setTasks] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/tasks");
//         setTasks(response.data);
//       } catch (error) {
//         console.log("Error while fetching data", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const deleteTask = async (taskId) => {
//     await axios
//       .delete(`http://localhost:8000/api/tasks/${taskId}`)
//       .then((response) => {
//         setTasks((prevTask) => prevTask.filter((task) => task._id !== taskId));
//         toast.success(response.data.message, { position: "top-right" });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="taskTable">
//       <Link to="/add" type="button" class="btn btn-primary">
//         Add Task <i class="fa-solid fa-task-plus"></i>
//       </Link>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th scope="col">S.No.</th>
//             <th scope="col">Title</th>
//             <th scope="col">Description</th>
//             <th scope="col">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task, index) => {
//             return (
//               <tr>
//                 <td>{index + 1}</td>
//                 <td>{task.title}</td>
//                 <td>{task.description} </td>
//                 <td className="actionButtons">
//                   <Link
//                     to={`/update/` + task._id}
//                     type="button"
//                     class="btn btn-info"
//                   >
//                     <i class="fa-solid fa-pen-to-square"></i>
//                   </Link>

//                   <button
//                     onClick={() => deleteTask(task._id)}
//                     type="button"
//                     class="btn btn-danger"
//                   >
//                     <i class="fa-solid fa-trash"></i>
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Task;
import React, { useEffect, useState } from "react";
import "./task.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL;

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

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
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr key={task._id}> {/* Agregando key */}
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description} </td>
                <td className="actionButtons">
                  <Link to={`/update/${task._id}`} type="button" className="btn btn-info" aria-label="Edit task">
                    <i className="fa-solid fa-pen-to-square">Update</i>
                  </Link>

                  <button
                    onClick={() => deleteTask(task._id)}
                    type="button"
                    className="btn btn-danger"
                    aria-label="Delete task"
                  >
                    <i className="fa-solid fa-trash">Delete</i>
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
