import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./P1Matematicas2.css"; // Importamos el CSS externo

const P1Matematicas2 = ({ nextQuestion }) => {
  const questionRef = useRef(null);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [resultadoClase, setResultadoClase] = useState("");
  
  
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

  
  const handleCalificacion = (esCorrecta) => {
    let totalScore = esCorrecta ? 1 : 0;
    setMostrarRespuesta(true); // ✅ Ahora se usa setMostrarRespuesta
    setResultadoClase(esCorrecta ? "correcta" : "incorrecta"); // ✅ Ahora se usa setResultadoClase
  
    const resultado = {
      correcta: totalScore === 1,
      puntuacion: totalScore,
      mensajeResultado:
        totalScore === 1
          ? `Pregunta 1: CORRECTO! Puntaje: ${totalScore} / 1`
          : `Pregunta 1: INCORRECTO. Respuesta correcta: ${correctOrder.join(", ")}`,
    };
  
    localStorage.setItem("puntuacionp_P1", JSON.stringify(resultado));
    nextQuestion(totalScore);
  };

  return (
    <div className="background-container">
      <div className="question-container">
        <h3 ref={questionRef}>🐱‍🚀Pregunta 1🐱‍🚀</h3>
        <h4>Lectura y Dictado de numeración hasta el 99</h4>
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

export default P1Matematicas2;
