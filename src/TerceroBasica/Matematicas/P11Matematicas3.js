import React, { useState } from "react";

const Pregunta11 = ({ nextQuestion }) => {
  const [answers, setAnswers] = useState({ "5x4": "", "3x8": "", "8x6": "" });
  const correctAnswers = { "5x4": 20, "3x8": 24, "8x6": 48 };

  const handleInputChange = (e, key) => {
    const { value } = e.target;
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    const totalQuestions = Object.keys(correctAnswers).length;
    const correctCount = Object.keys(correctAnswers).reduce((acc, key) => {
      return answers[key] === correctAnswers[key].toString() ? acc + 1 : acc;
    }, 0);

    const puntuacion =
      correctCount === totalQuestions
        ? 1
        : parseFloat((correctCount / totalQuestions).toFixed(2));

    const detalleRespuestas = Object.keys(correctAnswers).map((key) => ({
      pregunta: key,
      respuestaUsuario: answers[key],
      respuestaCorrecta: correctAnswers[key].toString(),
      esCorrecta: answers[key] === correctAnswers[key].toString(),
    }));

    const resultado = {
      correcta: correctCount === totalQuestions,
      respuestaCorrecta: "5x4 → 20, 3x8 → 24, 8x6 → 48",
      puntuacion: puntuacion,
      detalleRespuestas: detalleRespuestas,
      respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
      mensajeResultado:
        correctCount === totalQuestions
          ? "Pregunta 11: CORRECTO"
          : `Pregunta 11: INCORRECTO\nRespuestas incorrectas:\n${detalleRespuestas
              .filter((r) => !r.esCorrecta)
              .map(
                (r) =>
                  `${r.pregunta}: Usuario respondió ${r.respuestaUsuario}, Correcto era ${r.respuestaCorrecta}`
              )
              .join("\n")}`,
    };

    localStorage.setItem("puntuacionM3_P11", JSON.stringify(resultado));
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
        🎮📒Pregunta 11🎮📒
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
        🔢 ¡Resuelve las siguientes multiplicaciones!
      </h2>
      <h3
        style={{
          color: "#1565C0",
          fontSize: "26px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Escribe la respuesta para cada multiplicación:
      </h3>
      <div
        style={{
          display: "grid",
          gap: "20px",
          fontSize: "24px",
          marginBottom: "30px",
        }}
      >
        {["5x4", "3x8", "8x6"].map((key) => (
          <div
            key={key}
            style={{ display: "flex", alignItems: "center", gap: "15px" }}
          >
            <span
              style={{
                fontSize: "30px",
                color: "#FF5722",
                fontWeight: "bold",
              }}
            >
              {key} =
            </span>
            <input
              type="number"
              value={answers[key]}
              onChange={(e) => handleInputChange(e, key)}
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

export default Pregunta11;
