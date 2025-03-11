import React, { useState } from "react";

const Pregunta10 = ({ nextQuestion }) => {
  const [answers, setAnswers] = useState({ 7: "", 26: "" });
  const correctAnswers = { 7: 14, 26: 52 };

  const handleInputChange = (e, number) => {
    const { value } = e.target;
    setAnswers((prev) => ({
      ...prev,
      [number]: value,
    }));
  };

  const handleNext = () => {
    // Se cuenta cuántas respuestas son correctas
    const correctCount = Object.keys(correctAnswers).reduce((acc, question) => {
      return answers[question] === correctAnswers[question].toString() ? acc + 1 : acc;
    }, 0);

    // Cada respuesta correcta vale 0.5; si las dos son correctas, la puntuación es 1.
    const puntuacion = correctCount === 2 ? 1 : parseFloat((correctCount * 0.5).toFixed(2));

    // Se arma un detalle de respuestas para informar cuáles fueron correctas e incorrectas
    const detalleRespuestas = Object.keys(correctAnswers).map((question) => ({
      pregunta: question,
      respuestaUsuario: answers[question],
      respuestaCorrecta: correctAnswers[question].toString(),
      esCorrecta: answers[question] === correctAnswers[question].toString(),
    }));

    const resultado = {
      correcta: correctCount === 2,
      respuestaCorrecta: "7 → 14, 26 → 52",
      puntuacion: puntuacion,
      detalleRespuestas: detalleRespuestas,
      respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
      mensajeResultado:
        correctCount === 2
          ? "Pregunta 10: CORRECTO"
          : `Pregunta 10: INCORRECTO\nRespuestas incorrectas:\n${detalleRespuestas
              .filter((r) => !r.esCorrecta)
              .map(
                (r) =>
                  `${r.pregunta}: Usuario respondió ${r.respuestaUsuario}, Correcto era ${r.respuestaCorrecta}`
              )
              .join("\n")}`,
    };

    localStorage.setItem("puntuacionM3_P10", JSON.stringify(resultado));
    nextQuestion();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Comic Sans MS', cursive",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#FF6347",
          marginBottom: "20px",
          fontSize: "2.5em",
          fontFamily: "'Livvic', sans-serif",
        }}
      >
        🎮📒Pregunta 10🎮📒
      </h1>
      <h2
        style={{
          color: "#D84315",
          fontSize: "34px",
          fontFamily: "'Livvic', sans-serif",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        🔢 ¡Resuelve esto!
      </h2>
      <h3
        style={{
          color: "#1565C0",
          fontSize: "26px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        ¿Cuál es el doble de estos números?
      </h3>
      <div
        style={{
          display: "grid",
          gap: "20px",
          fontSize: "24px",
        }}
      >
        {[7, 26].map((num) => (
          <div
            key={num}
            style={{ display: "flex", alignItems: "center", gap: "15px" }}
          >
            <span
              style={{
                fontSize: "30px",
                color: "#FF5722",
                fontWeight: "bold",
              }}
            >
              {num} →
            </span>
            <input
              type="number"
              value={answers[num]}
              onChange={(e) => handleInputChange(e, num)}
              style={{
                fontSize: "24px",
                padding: "8px",
                width: "90px",
                textAlign: "center",
                borderRadius: "12px",
                border: "3px solid #4CAF50",
                backgroundColor: "#fff",
                transition: "all 0.3s ease-in-out",
                fontWeight: "bold",
              }}
            />
          </div>
        ))}
      </div>
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
  );
};

export default Pregunta10;
