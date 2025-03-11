/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";

const P4Matematicas3 = ({ nextQuestion }) => {
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadGoogleFont();
  }, []);

  const loadGoogleFont = () => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Livvic&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  const numbers = [346, 985, 464, 863, 596];
  const correctOrder = [985, 863, 596, 464, 346];

  const handleInputChange = (e, index) => {
    const value = e.target.value.trim();
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  const handleNext = () => {
    let totalScore = 1;
    const newErrors = {};
    let incorrectAnswers = []; // Almacena las respuestas incorrectas

    // Validar cada respuesta en función del orden correcto
    inputValues.forEach((userAnswer, index) => {
      const correctAnswer = correctOrder[index].toString().trim(); // Obtener la respuesta correcta como string

      if (userAnswer === "") {
        newErrors[index] = true; // Respuesta vacía es incorrecta
        totalScore = 0;
        incorrectAnswers.push(`Posición ${index + 1}: Vacío`);
      } else if (userAnswer !== correctAnswer) {
        newErrors[index] = true; // Respuesta incorrecta
        totalScore = 0;
        incorrectAnswers.push(`Posición ${index + 1}: ${userAnswer}`);
      } else {
        newErrors[index] = false; // Respuesta correcta
      }
    });

    setErrors(newErrors); // Establecer los errores en el estado
    setScore(totalScore); // Establecer el puntaje

    // Mensaje final de resultado
    const resultado = {
      correcta: totalScore === 1,
      respuestaUsuario: inputValues,
      respuestaCorrecta: correctOrder.join(", "),
      puntuacion: totalScore,
      mensajeResultado:
        totalScore === 1
          ? `Pregunta 4: CORRECTO! Puntaje: ${totalScore} / 1`
          : `Pregunta 4: INCORRECTO. Respuesta correcta: ${correctOrder.join(", ")}. ${
              incorrectAnswers.length > 0
                ? `Respuestas incorrectas: ${incorrectAnswers.join(", ")}`
                : "No hubo respuestas incorrectas"
            }`,
    };

    // Guardar la puntuación en localStorage
    localStorage.setItem("puntuacionM3_P4", JSON.stringify(resultado));
    // Pasar el resultado a la siguiente pregunta
    nextQuestion(totalScore);
  };

  return (
    <div style={{ fontFamily: "'Livvic', sans-serif", textAlign: "center", padding: "20px" }}>
      <h3 style={{ fontSize: "2.5em", color: "#FF6347" }}>🎮📒Pregunta 4🎮📒</h3>
      <h4 style={{ fontSize: "38px", color: "#FF6347" }}>
        Ordena los números de mayor a menor. 🤔
      </h4>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center", margin: "20px 0" }}>
        {inputValues.map((num, index) => (
          <input
            key={index}
            type="number"
            value={num}
            onChange={(e) => handleInputChange(e, index)}
            style={{
              width: "70px",
              height: "70px",
              backgroundColor: "#FFFBEA",
              border: "3px dashed #FFA500",
              borderRadius: "10px",
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#000",
            }}
            placeholder={`#${index + 1}`}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: "30px", justifyContent: "center", margin: "20px 0" }}>
        {numbers.map((number) => (
          <div
            key={number}
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ADD8E6",
              borderRadius: "50%",
              border: "2px solid #000",
              color: "#000",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            {number}
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

export default P4Matematicas3;
