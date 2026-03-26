import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"

function TodoList ({tareas, eliminarTarea, toggleComplete, editandoId, nuevoTexto, setNuevoTexto, empezarEdicion, guardarEdicion, cancelarEdicion}){


    return(
        
        <AnimatePresence>
            {tareas.map((tarea) => (
                <motion.li
                 key={tarea.id}
                 initial={{opacity: 0, y: -10}}
                 animate={{opacity: 1, y: 0}}
                 exit={{ opacity: 0, x: 50}}
                 transition={{ duration: 0.3 }}
                >
                    <div className="tarea-info">
                        <input
                            type="checkbox"
                            checked={tarea.completed}
                            onChange={() => toggleComplete(tarea.id)}
                        />
                        {editandoId === tarea.id ? (
                            <input 
                            value={nuevoTexto}
                            onChange={(e) => setNuevoTexto(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter"){
                                    guardarEdicion(tarea.id)
                                }
                            }}
                        />
                        ) : (
                            <span 
                            onClick={() => empezarEdicion(tarea)}
                            className={tarea.completed ? "tarea-completa" : ""}
                            style={{ cursor: "pointer"}}
                            >
                                {tarea.texto}
                            </span>
                        )}
                        {/* <span style={{ textDecoration: tarea.completed ? "line-through" : "none" }}>
                            {tarea.texto}
                        </span> */}

                    </div>
                    
                    <button onClick={() => eliminarTarea(tarea.id)}>
                        Eliminar
                    </button>
                    
                    {editandoId === tarea.id && (
                        <>
                        <button onClick={() => guardarEdicion(tarea.id)}> 
                            Guardar
                        </button>
                        <button onClick={cancelarEdicion} style={{marginLeft: "5px"}}>
                            ❌
                        </button>
                        </>
                    )}
                </motion.li>
            ))}
        </AnimatePresence>
    )
}

export default TodoList