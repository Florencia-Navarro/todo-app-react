import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./App.css"

function App() {

  const [ tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas")
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : []
  })
  
  const [filtro, setFiltro] = useState("todas")
  const [editandoId, setEditandoId] = useState(null)
  const [nuevoTexto, setNuevoTexto] = useState("")
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "light"
  })

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas))
  }, [tareas])

  useEffect(() => {
    localStorage.setItem("tema", tema)
  }, [tema]
)


  const agregarTarea = (texto) => {

    const nuevaTarea = {
      id: Date.now(),
      texto: texto,
      completed: false
    }

    setTareas(prevTareas => [...tareas, nuevaTarea])
  }

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === "completadas") return tarea.completed
    if (filtro === "pendientes") return !tarea.completed
    return true
  })

  const toggleComplete = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? {...tarea, completed: !tarea.completed} : tarea
    )
    )
  }

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
};

  const tareasPendientes = tareas.filter(t => !t.completed).length
  const tareasCompletadas = tareas.filter(t => t.completed).length

  const borrarTodas = () => {
    const confirmar = window.confirm("¿Seguro que queres borrar todas las tareas")
    if(confirmar) {
      setTareas([])
      
    }
  }


  const empezarEdicion = (tarea) => {
    setEditandoId(tarea.id)
    setNuevoTexto(tarea.texto)
  }

  const guardarEdicion = (id) => {
   setTareas(tareas.map(t => 
    t.id === id ? {...t, texto: nuevoTexto} : t
   ))
   setEditandoId(null)
  }

  const cancelarEdicion = () => {
    setEditandoId(null)
    setNuevoTexto("")
  }

  return (
    <div className= {`app ${tema}`} >
      <h1>Mi Todo App</h1>

      <div>
        <button onClick={() => setTema(tema === "light" ? "dark" : "light")} style={{marginBottom:"15px", backgroundColor: "grey"}}>
         🌙 / ☀️
        </button>
      </div>

      <TodoInput agregarTarea={agregarTarea}/>

      <div className="filtros">

        <button onClick={() => setFiltro("todas")}
          className={filtro === "todas" ? "activo" :""}
        >
            Todas
        </button>

        <button onClick={() => setFiltro("pendientes")}
          className={filtro === "pendientes" ? "activo" : ""}  
        >
            Pendientes
        </button>

        <button onClick={() => setFiltro("completadas")}
          className={filtro === "completadas" ? "activo" : ""}
        >
            Completadas
        </button>

      </div>

      <div>
        <p>Pendientes: {tareasPendientes}</p>
        <p>Completadas: {tareasCompletadas}</p>
      </div>

      <TodoList 
        tareas={tareasFiltradas} 
        eliminarTarea={eliminarTarea}
        toggleComplete={toggleComplete}
        editandoId={editandoId}
        nuevoTexto={nuevoTexto}
        setNuevoTexto={setNuevoTexto}
        empezarEdicion={empezarEdicion}
        guardarEdicion={guardarEdicion}
        cancelarEdicion={cancelarEdicion}
        />

        <div>
          <button onClick={borrarTodas} className="boton-borrar">
            Borrar todas
          </button>
        </div>
    </div>
  );
}

export default App;
