import React, { useState } from "react";

const P8Matematicas2 = ({ nextQuestion }) => {
  const [order, setOrder] = useState(Array(8).fill(null)); 
  const [draggedNumber, setDraggedNumber] = useState(null);

  const numbers = [18, 16, 91, 25, 68, 73, 52, 76];
  const correctOrder = [...numbers].sort((a, b) => b - a);

  const handleDragStart = (e, number) => {
    setDraggedNumber(number);
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedNumber === null || order.includes(draggedNumber)) return;
    const newOrder = [...order];
    newOrder[index] = draggedNumber;
    setOrder(newOrder);
    setDraggedNumber(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleNext = () => {
    const isCorrect = order.every((num, index) => num === correctOrder[index]);
    const totalScore = isCorrect ? 1 : 0;
    
    const respuestaUsuario = order.filter((num) => num !== null).join("-") || "No ingresó ninguna respuesta";
    const respuestaCorrecta = correctOrder.join("-");

    const resultado = {
      correcta: isCorrect,
      respuestaUsuario: respuestaUsuario,
      respuestaCorrecta: respuestaCorrecta,
      puntuacion: totalScore,
      mensajeResultado: `Pregunta 8: ${isCorrect ? "¡CORRECTO!" : "INCORRECTO"} \nPuntuación: ${totalScore} / 1`,
    };

    localStorage.setItem("puntuacionp_P8", JSON.stringify(resultado));
    nextQuestion(totalScore);
  };

  return (
    <div
      style={{
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        textAlign: "center",
        padding: "70px",
        backgroundColor: "#FFC1CC",
        borderRadius: "15px",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        maxWidth: "900px",
        margin: "20px auto",
      }}
    >
      <h2 style={{ color: "#FF5733", fontSize: "2em" }}>🐱‍🚀Pregunta 8🐱‍🚀</h2>
      <p style={{ fontSize: "20px", color: "#333", fontWeight: "bold" }}>
        Arrastra los números a los espacios para ordenarlos de mayor a menor.
      </p>

      <div style={{ display: "flex", gap: "15px", justifyContent: "center", margin: "20px 0", flexWrap: "nowrap", overflowX: "auto" }}>
        {order.map((num, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: num !== null ? "" : "#FFFBEA",
              border: num !== null ? "3px solid rgb(231, 46, 110)" : "3px dashed rgb(207, 143, 193)",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#000",
              boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            {num !== null ? num : "🔲"}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "24px", justifyContent: "center", margin: "20px 0", flexWrap: "wrap" }}>
        {numbers.map((number) => (
          <div
            key={number}
            draggable
            onDragStart={(e) => handleDragStart(e, number)}
            onDragEnd={handleDragEnd}
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#E6E6FA",
              borderRadius: "50%",
              cursor: "grab",
              border: "3px solid #000",
              fontWeight: "bold",
              fontSize: "20px",
              boxShadow: "2px 2px 5px rgba(0,0,0,0.3)",
              transition: "transform 0.2s ease",
            }}
          >
            {number}
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        style={{
          backgroundColor: "#B2EBF2",
          color: "#212121",
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
        ¡Siguiente!🚀
      </button>
    </div>
  );
};

export default P8Matematicas2;
