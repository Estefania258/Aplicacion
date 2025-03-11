import React, { useState, useEffect, useCallback } from "react";
import "./Preguntas.css";

const series = [
  {
    id: "serie1",
    palabras: ["pavo", "tijera", "venado", "león", "delfín"],
    correcta: "tijera",
    color: "#FF6347", // Tomato
    emoji: "✂️"
  },
  {
    id: "serie2",
    palabras: ["rojo", "rosado", "amarillo", "gitana", "verde"],
    correcta: "gitana",
    color: "#4682B4", // Steel Blue
    emoji: "🔮"
  }
];

const P3LectoEscritura2 = ({ onAnswer }) => {
  const [seleccionadas, setSeleccionadas] = useState({
    serie1: {},
    serie2: {}
  });

  const handlePalabraClick = useCallback((serieId, palabra) => {
    setSeleccionadas((prev) => {
      const nuevaSeleccion = { ...prev };
      if (nuevaSeleccion[serieId][palabra]) {
        // Si ya está seleccionada, deseleccionarla
        delete nuevaSeleccion[serieId][palabra];
      } else {
        // Limpiar selecciones previas y seleccionar la nueva palabra
        nuevaSeleccion[serieId] = { [palabra]: true };
      }
      return nuevaSeleccion;
    });
  }, []);

  useEffect(() => {
    onAnswer("pregunta3", seleccionadas);
  }, [seleccionadas, onAnswer]);

  return (
    <div className="pregunta-container pregunta-container-kids">
      <h3 className="titulo-kids">
        ¡Encuentra la palabra intrusa! {" "}
        <span role="img" aria-label="detective">🕵️‍♂️</span>
      </h3>
      
      {series.map((serie, index) => (
        <div key={serie.id} className="serie-container-kids">
          <h4 className="subtitulo-kids">
            Serie {index + 1} {" "}
            <span role="img" aria-label="serie emoji">{serie.emoji}</span>
          </h4>
          <div className="nube-palabras-kids">
            {serie.palabras.map((palabra) => (
              <button
                key={palabra}
                className={`palabra-kids ${seleccionadas[serie.id][palabra] ? "selected-kids" : ""}`}
                style={{
                  backgroundColor: seleccionadas[serie.id][palabra] ? serie.color : "#FFFFFF",
                  color: seleccionadas[serie.id][palabra] ? "#FFFFFF" : "#333333",
                  borderColor: serie.color,
                }}
                onClick={() => handlePalabraClick(serie.id, palabra)}
              >
                {palabra}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default P3LectoEscritura2;
