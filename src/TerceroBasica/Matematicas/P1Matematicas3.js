/* eslint-disable no-unused-vars */

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./P1Matematicas3.css"; // Importamos el CSS externo

const P1Matematicas3 = ({ nextQuestion }) => {
  const questionRef = useRef(null);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [resultadoClase, setResultadoClase] = useState("");
  const [inputValues, setInputValues] = useState(["", "", ""]); // Suponiendo 3 respuestas
  const [errors, setErrors] = useState({});
  const [score, setScore] = useState(0);

  // Definir las respuestas correctas
  const correctOrder = ["Respuesta 1", "Respuesta 2", "Respuesta 3"]; // Cambia según tus respuestas correctas

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Livvic&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link); // Eliminar la fuente cuando el componente se desmonte
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      questionRef.current,
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "bounce.out" }
    );
  }, []);

  const handleInputChange = (e, index) => {
    const values = [...inputValues];
    values[index] = e.target.value;
    setInputValues(values);
  };
  const handleCalificacion = (esCorrecta) => {
    let totalScore = esCorrecta ? 1 : 0; // Si es correcto, 1, si es incorrecto, 0
  
    // Resultado
    const resultado = {
      correcta: totalScore === 1,
      puntuacion: totalScore,
      mensajeResultado:
        totalScore === 1
          ? `Pregunta 1: CORRECTO! Puntaje: ${totalScore} / 1`
          : `Pregunta 1: INCORRECTO. Respuesta correcta: ${correctOrder.join(", ")}`,
    };
  
    // Guardar la puntuación en localStorage
    localStorage.setItem("puntuacionM3_P1", JSON.stringify(resultado));
  
    // Pasar el resultado a la siguiente pregunta
    nextQuestion(totalScore);
  }

  return (
    <div className="background-container">
      <div className="question-container">
        <h3 ref={questionRef}>🎮📒Pregunta 1🎮📒</h3>
        <h4>Lectura y Dictado de numeración hasta el 999</h4>

        {mostrarRespuesta && (
          <div className={`resultado-container ${resultadoClase}`}>
            {resultadoClase === "correcta" ? "Correcto" : "Incorrecto"}
          </div>
        )}

        <button className="correcto" onClick={() => handleCalificacion(true)}>
          Correcto
        </button>
        <button className="incorrecto" onClick={() => handleCalificacion(false)}>
          Incorrecto
        </button>
      </div>
    </div>
  );
};

export default P1Matematicas3;
