import { useState, useMemo, useCallback } from "react"
import imgVerduras from "../../imagenes/logoVerduras.png"
import "./Preguntas.css"

const oracionOpciones = ["Iván", "vende", "muchas", "verduras", "."] // Declarar fuera del componente

const P4LectoEscritura2 = ({ onAnswer }) => {
  const [respuestas, setRespuestas] = useState({})

  const oracion = {
    opciones: oracionOpciones,
    color: "#FFEB3B", // Color amarillo pastel
  }

  // Usamos useMemo para desordenar las opciones solo una vez
  const opcionesDesordenadas = useMemo(() => {
    return [...oracionOpciones].sort(() => Math.random() - 0.5)
  }, []) // Eliminamos la dependencia 'oracion.opciones'

  const handleDragStart = useCallback((item) => {
    setRespuestas((prev) => ({ ...prev, draggedItem: item }))
  }, [])

  const handleDrop = useCallback(
    (palabraIndex) => {
      setRespuestas((prev) => {
        if (prev.draggedItem) {
          const newRespuestas = {
            ...prev,
            [`respuesta_${palabraIndex}`]: prev.draggedItem,
            draggedItem: null,
          }
          onAnswer("pregunta4", Object.values(newRespuestas).filter(Boolean));
      return newRespuestas;
    }
    return prev;
      })
    },
    [onAnswer],
  )

  return (
    <div className="pregunta-container pregunta-container-kids">
      <h3 className="titulo-kids">
        Ordena las palabras para formar una oración{" "}
        <span role="img" aria-label="libro">
          📚
        </span>
      </h3>

      <div className="imagen-container">
        <img src={imgVerduras || "/placeholder.svg"} alt="Logo de Verduras" className="imagen-guia-verdura" />
      </div>

      <div className="oracion-container-kids">
        <div className="opciones-container">
          {opcionesDesordenadas.map((palabra, i) => (
            <div
              key={i}
              className="palabra-kids draggable-box"
              onDragStart={() => handleDragStart(palabra)}
              draggable
              style={{ backgroundColor: oracion.color }}
            >
              {palabra}
            </div>
          ))}
        </div>

        <div className="respuestas-container" style={{ borderColor: oracion.color }}>
          {oracion.opciones.map((_, i) => (
            <div key={i} className="respuesta-box" onDrop={() => handleDrop(i)} onDragOver={(e) => e.preventDefault()}>
              {respuestas[`respuesta_${i}`] || "Suelta aquí"}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default P4LectoEscritura2
