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

                    {editandoId === tarea.id ? (
                    <div className="tarea-editando">
                        <input
                            value={nuevoTexto}
                            onChange={(e) => setNuevoTexto(e.target.value)}
                            onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                guardarEdicion(tarea.id)
                            }
                            }}
                        />  

                        <div className="botones-edicion">
                            <motion.button 
                                onClick={() => guardarEdicion(tarea.id)} 
                                className="btn-guardar"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                Guardar
                            </motion.button>

                            <motion.button 
                                onClick={cancelarEdicion} className="btn-cancelar"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                ❌
                            </motion.button>

                        </div>
                    </div>

          ) : (
                    <div className="tarea-info">
                        <input
                            type="checkbox"
                            checked={tarea.completed}
                            onChange={() => toggleComplete(tarea.id)}
                        />

                        <span 
                            onClick={() => empezarEdicion(tarea)}
                            className={tarea.completed ? "tarea-completa" : ""}
                            style={{ cursor: "pointer"}}
                        >
                            {tarea.texto}
                        </span>

                        <motion.button 
                            onClick={() => eliminarTarea(tarea.id)} className="btn-eliminar"
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}    
                        >
                            Eliminar
                        </motion.button>
                    </div>
      )}

                </motion.li>
  ))}
        </AnimatePresence>
    )
}

export default TodoList