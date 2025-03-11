import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import P1LectoEscritura2 from "./P1LectoEscritura2";
import P2LectoEscritura2 from "./P2LectoEscritura2";
import P3LectoEscritura2 from "./P3LectoEscritura2";
import P4LectoEscritura2 from "./P4LectoEscritura2";
import P5LectoEscritura2 from "./P5LectoEscritura2";
import Puntuacion2do from "./Puntuacion2do";
import "./Preguntas.css";


const LectoEscritura = ({ materia, nombreEstudiante }) => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [evaluacionFinalizada, setEvaluacionFinalizada] = useState(false);
  const navigate = useNavigate();

  const guardarRespuesta = (pregunta, respuesta) => {
    setRespuestas(prev => ({ ...prev, [pregunta]: respuesta }));
  };

  const finalizarEvaluacion = () => {
    setEvaluacionFinalizada(true);
  };

  const irSiguiente = () => {
    if (preguntaActual < 4) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      finalizarEvaluacion();
    }
  };

  return evaluacionFinalizada ? (


    <Puntuacion2do
      respuestas={respuestas}
      nombreEstudiante={nombreEstudiante}
      materia={materia}
      onFinalizar={() => navigate('/materias')}
    />

  ) : (

    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Evaluación de Lecto-Escritura</h1>
      <h2>{materia}</h2>

      <div>
        {preguntaActual === 0 && <P1LectoEscritura2 onAnswer={guardarRespuesta} />}
        {preguntaActual === 1 && <P2LectoEscritura2 onAnswer={guardarRespuesta} />}
        {preguntaActual === 2 && <P3LectoEscritura2 onAnswer={guardarRespuesta} />}
        {preguntaActual === 3 && <P4LectoEscritura2 onAnswer={guardarRespuesta} />}
        {preguntaActual === 4 && <P5LectoEscritura2 onAnswer={guardarRespuesta} />}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setPreguntaActual(preguntaActual - 1)}
          disabled={preguntaActual === 0}
        >
          Anterior
        </button>
        <button
          onClick={irSiguiente}
          disabled={preguntaActual === 4 && evaluacionFinalizada}
        >
          {preguntaActual === 4 ? "Finalizar" : "Siguiente"}
        </button>
      </div>
    </div>


  );
};


export default LectoEscritura;