import "./App.css";
import AddTask from "./components/addtask/AddTask";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const route = createBrowserRouter([{ path: "/", element: <AddTask /> }]);
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
