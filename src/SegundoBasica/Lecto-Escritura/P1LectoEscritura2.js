import React, { useState, useEffect } from "react";
import ImgMariposa from "../../imagenes/logoMariposa.png";
import ImgNido from "../../imagenes/logoNido.png";
import "./Preguntas.css";

const P1LectoEscritura2 = ({ onAnswer }) => {
  const [respuestas, setRespuestas] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);

  const opciones = [
    { id: "mariposa", label: "Mariposa" },
    { id: "nido", label: "Nido" },
  ];
  
  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDrop = (preguntaId, index) => {
    if (draggedItem) {
      setRespuestas((prev) => ({
        ...prev,
        [`pregunta_${preguntaId}_respuesta_${index}`]: draggedItem.label,
      }));
      setDraggedItem(null);
    }
  };

  useEffect(() => {
    if (Object.keys(respuestas).length === 2) {
      onAnswer("pregunta1", respuestas);
    }
  }, [respuestas, onAnswer]);
  

  return (
    <div className="pregunta-container">
      <h3>Arrastra el nombre correcto a la imagen</h3>
      
      <div className="opciones-container">
        {opciones.map((opcion) => (
          <div
            key={opcion.id}
            className="draggable-option"
            draggable
            onDragStart={() => handleDragStart(opcion)}
          >
            {opcion.label}
          </div>
        ))}
      </div>

      <div className="imagenes-container">
        <div className="imagen-target">
          <img src={ImgMariposa} alt="Mariposa" />
          <div
            className="drop-zone"
            onDrop={() => handleDrop(1, 0)}
            onDragOver={(e) => e.preventDefault()}
          >
            {respuestas.pregunta_1_respuesta_0 || "Suelta aquí"}
          </div>
        </div>

        <div className="imagen-target">
          <img src={ImgNido} alt="Nido" />
          <div
            className="drop-zone"
            onDrop={() => handleDrop(1, 1)}
            onDragOver={(e) => e.preventDefault()}
          >
            {respuestas.pregunta_1_respuesta_1 || "Suelta aquí"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default P1LectoEscritura2;
