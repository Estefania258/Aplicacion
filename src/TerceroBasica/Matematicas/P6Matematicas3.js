import React, { useState } from "react";

const P6Matematicas3 = ({ nextQuestion }) => {
  const correctAnswers = {
    circulo3: "66",
    circulo5: "78",
    circulo6: "84",
    circulo8: "96",
  };

  const [answers, setAnswers] = useState({
    circulo3: "",
    circulo5: "",
    circulo6: "",
    circulo8: "",
  });
  const [errors, setErrors] = useState({
    circulo3: false,
    circulo5: false,
    circulo6: false,
    circulo8: false,
  });
  const [score, setScore] = useState(null);

  const handleInputChange = (circle, value) => {
    const newAnswers = { ...answers };
    newAnswers[circle] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    let totalScore = 1;
    const newErrors = {};
    let incorrectAnswers = []; // Almacena las respuestas incorrectas

    // Validar cada respuesta requerida
    Object.entries(correctAnswers).forEach(([circle, correctAnswer]) => {
      const userAnswer = answers[circle].trim();

      if (userAnswer === "") {
        newErrors[circle] = true; // Respuesta vacía es incorrecta
        totalScore = 0;
        incorrectAnswers.push(`Círculo ${circle.slice(-1)}: Vacío`);
      } else if (userAnswer !== correctAnswer) {
        newErrors[circle] = true; // Respuesta incorrecta
        totalScore = 0;
        incorrectAnswers.push(`Círculo ${circle.slice(-1)}: ${userAnswer}`);
      } else {
        newErrors[circle] = false; // Respuesta correcta
      }
    });

    setErrors(newErrors);
    setScore(totalScore);

    // Mensaje final de resultado
    const resultado = {
      correcta: totalScore === 1,
      respuestaUsuario: answers,
      respuestaCorrecta: Object.values(correctAnswers).join("-"),
      puntuacion: totalScore,
      mensajeResultado:
        totalScore === 1
          ? `Pregunta 6: CORRECTO! Puntaje: ${totalScore} / 1`
          : `Pregunta 6: INCORRECTO. Respuesta correcta: ${Object.values(
              correctAnswers
            ).join("-")}. Respuestas incorrectas: ${
              incorrectAnswers.length > 0
                ? incorrectAnswers.join(", ")
                : "No hubo respuestas incorrectas"
            }`,
    };

    localStorage.setItem("puntuacionM3_P6", JSON.stringify(resultado));
    nextQuestion(totalScore);
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        fontFamily: "'Livvic', sans-serif",
      }}
    >
      <h2 style={{ fontSize: "2.5em", color: "#FF6347", fontWeight: "bold" }}>
        🎮📒Pregunta 6🎮📒
      </h2>
      <h3
        style={{
          fontSize: "38px",
          fontWeight: "bold",
          color: "#FFB6C1",
          marginBottom: "20px",
        }}
      >
        ¡Completa la secuencia numérica!
      </h3>
      <p style={{ fontSize: "22px", color: "#212121", marginBottom: "30px" }}>
        Para completar la serie, debes sumar 6 en cada paso. ¡Diviértete!
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "25px" }}>
        {[54, 60, "?", 72, "?", "?", 90, "?"].map((num, index) => {
          const circle = `circulo${index + 1}`;
          const isError = errors[circle];

          return (
            <div
              key={index}
              style={{
                position: "relative",
                width: "90px",
                height: "90px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "26px",
                color: isError ? "red" : "black",
                backgroundColor: isError ? "#FFCCCB" : "#FFD1DC",
                borderRadius: "50%",
                transition: "transform 0.3s ease",
              }}
            >
              {num === "?" ? (
                <input
                  type="text"
                  value={answers[circle]}
                  onChange={(e) => handleInputChange(circle, e.target.value)}
                  style={{
                    fontSize: "22px",
                    width: "60px",
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    borderRadius: "15px",
                    backgroundColor: "white",
                  }}
                  placeholder="?"
                />
              ) : (
                num
              )}
            </div>
          );
        })}
      </div>

      {score === 0 && (
        <div style={{ color: "#FF6347", marginTop: "20px" }}>
          <p>
            {Object.values(correctAnswers).join("-")} es la respuesta correcta.
          </p>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
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

export default P6Matematicas3;