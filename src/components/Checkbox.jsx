import React from "react";
import axios from "axios";

const Checkbox = ({ taskId, completed, onChange }) => {

  const handleCheckboxChange = async (e) => {
    const newCompleted = e.target.checked; 
    onChange(newCompleted); 
    // Actualización de la tarea en la base de datos
    try {
      await axios.patch(`http://localhost:8000/api/tasks/${taskId}`, { completed: newCompleted });
    } catch (error) {
      console.log("Error while updating task", error);
    }
  };

  return (
    <input
      type="checkbox"
      checked={completed} 
      onChange={handleCheckboxChange} 
    />
  );
};

export default Checkbox;
