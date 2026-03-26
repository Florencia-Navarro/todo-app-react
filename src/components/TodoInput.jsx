import { useState } from "react";

function TodoInput({agregarTarea}) {

  const [tarea, setTarea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(tarea.trim() === "") return
    agregarTarea(tarea)
    setTarea("")
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
      />

      <button>Agregar</button>
    </form>
  );
}

export default TodoInput;
