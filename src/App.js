import "./App.css";
import AddTask from "./components/addtask/AddTask";
import Task from "./components/get.task/Task";
import UpdateTask from "./components/updatetask/Update";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Task />,
    },
    {
      path: "/add",
      element: <AddTask />,
    },
    {
      path: "/update/:id",
      element: <UpdateTask />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
