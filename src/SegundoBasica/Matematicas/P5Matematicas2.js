import React, { useState } from "react";

const P3Matematicas4 = ({ nextQuestion }) => {
  const [answers, setAnswers] = useState([null, null, null]); // Respuestas del usuario

  const correctAnswers = ["=", "<", ">", "="]; // Respuestas correctas

  // Función para actualizar la respuesta seleccionada
  const handleSignClick = (index, sign) => {
    const newAnswers = [...answers];
    newAnswers[index] = sign;
    setAnswers(newAnswers);
  };

  // Función que valida las respuestas y asigna la puntuación
  const handleNext = () => {
    let score = 0;
    let correctCount = 0; // Contador de respuestas correctas

    // Verificación de cada respuesta y cálculo de la puntuación
    answers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        correctCount++;
      }
    });

    // Asignar puntuación de acuerdo a las respuestas correctas
    score = parseFloat((correctCount * 0.25).toFixed(3));  // 0.33 puntos por cada respuesta correcta

    // Detalles de las respuestas
    const detalleRespuestas = answers.map((respuesta, index) => ({
      pregunta: `${["14 = 14", "7 < 11" ,"7 > 3", "8 = 8"][index]}`, // Muestra la comparación completa
      respuestaUsuario: respuesta,
      respuestaCorrecta: correctAnswers[index],
      esCorrecta: respuesta === correctAnswers[index],
    }));

    // Generación del resultado
    const resultado = {
      correcta: correctCount === 4, // Si todas las respuestas son correctas
      respuestaUsuario: answers,
      respuestaCorrecta: ["14 = 14", "7 < 11" ,"7 > 3", "8 = 8"].join(" , "),
      puntuacion: score,
      detalleRespuestas: detalleRespuestas,
      respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
      mensajeResultado: correctCount === 3
        ? "Pregunta 5: CORRECTO"
        : `Pregunta 5: INCORRECTO\nRespuestas incorrectas:\n${
            detalleRespuestas
              .filter((r) => !r.esCorrecta)
              .map(
                (r) =>
                  `${r.pregunta}: Usuario respondió ${r.respuestaUsuario}, Correcto era ${r.respuestaCorrecta}`
              )
              .join("\n")
          }`,
    };

    // Guardar el resultado en localStorage
    localStorage.setItem("puntuacionp_P5", JSON.stringify(resultado));

    // Pasa a la siguiente pregunta con la puntuación obtenida
    nextQuestion(score);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3 style={{ fontSize: "2.5em", color: "#FF6347" }}>🐱‍🚀Pregunta 5🐱‍🚀</h3>
      <h4>Ubique el signo correcto entre los números:</h4>

      <div>
        {[{ left: "14", right: "14" }, { left: "7", right: "11" }, { left: "7", right: "3" } , { left: "8", right: "8" }].map((item, index) => (
          <div key={index} style={{ margin: "20px 0", fontSize: "24px" }}>
            <span>{item.left}</span>
            <span
              style={{
                display: "inline-block",
                margin: "0 10px",
                padding: "10px 20px",
                border: "2px solid #000",
                borderRadius: "5px",
                backgroundColor: "#E0F7FA",
                fontSize: "24px",
              }}
            >
              {answers[index] || "?"} {/* Muestra el signo seleccionado o "?" */}
            </span>
            <span>{item.right}</span>

            <div style={{ marginTop: "10px" }}>
              {["<", ">", "="].map((sign) => (
                <button
                  key={sign}
                  onClick={() => handleSignClick(index, sign)}
                  style={{
                    margin: "0 5px",
                    padding: "10px 15px",
                    fontSize: "18px",
                    backgroundColor: "#F8BBD0",
                    color: "#212121",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {sign}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "#E60073",
            color: "#fff",
            fontSize: "20px",
            padding: "12px 30px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontFamily: "'Comic Sans MS', cursive, sans-serif",
            boxShadow: "0px 8px 15px rgba(249, 247, 246, 0.6)",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          ¡Siguiente!
        </button>
      </div>
    </div>
  );
};

export default P3Matematicas4;
