import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const P11Matematicas2 = () => {
  const [order, setOrder] = useState([17, 19, null, null, null, null]); // Los dos primeros valores fijos
  const [draggedNumber, setDraggedNumber] = useState(null);

  // Números a arrastrar y completar la serie
  const numbers = [21, 23, 25, 27];
  const correctOrder = [21, 23, 25, 27]; // Orden correcto de los números arrastrados
  const navigate = useNavigate();

  // Manejo del drag & drop
  const handleDragStart = (e, number) => {
    setDraggedNumber(number);
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedNumber === null) return;
    if (order.includes(draggedNumber)) return; // Evita duplicados
    const newOrder = [...order];
    newOrder[index] = draggedNumber;
    setOrder(newOrder);
    setDraggedNumber(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  const finalizar = () => {
    const draggedNumbers = order.slice(2); // Extrae solo los valores ingresados por el usuario
    
    // Filtramos los valores para evitar comparar con null
    const respuestasUsuario = draggedNumbers.map(num => num !== null ? num : "X");

    // Verificación de la respuesta
    const correctCount = respuestasUsuario.every((value, index) => value === correctOrder[index]) ? 1 : 0;

    const detalleRespuestas = respuestasUsuario.map((value, index) => ({
      pregunta: `Posición ${index + 1}`,
      respuestaUsuario: value,
      respuestaCorrecta: correctOrder[index],
      esCorrecta: value === correctOrder[index],
    }));

    const resultado = {
      correcta: correctCount === 1, // Si todas las respuestas son correctas
      respuestaUsuario: respuestasUsuario.join("-"),
      respuestaCorrecta: correctOrder.join("-"),
      puntuacion: correctCount,
      detalleRespuestas: detalleRespuestas,
      respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
      mensajeResultado: correctCount === 1
        ? "Pregunta 11: CORRECTO"
        : `Pregunta 11: INCORRECTO\nRespuestas incorrectas:\n${
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
    localStorage.setItem("puntuacionp_P11", JSON.stringify(resultado));

    // Redirigir a la página de puntuación
    navigate("/puntuacion");
  };

  return (
    <div style={{
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#FFC1CC",
      borderRadius: "15px",
      boxShadow: "0 0 15px rgba(0,0,0,0.2)",
      maxWidth: "700px",
      margin: "20px auto",
    }}>
      <h2 style={{ color: "#FF5733", fontSize: "2.5em" }}>🐱‍🚀Pregunta 11🐱‍🚀</h2>
      <p style={{ fontSize: "25px", color: "#333" }}>
        Arrastra los números faltantes a los espacios para completar la serie con el patrón de +2.
      </p>

      {/* Contenedor de respuestas */}
      <div style={{ display: "flex", gap: "15px", justifyContent: "center", margin: "20px 0" }}>
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
            }}>
            {num !== null ? num : "🔲"}
          </div>
        ))}
      </div>

      {/* Números arrastrables */}
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
            }}>
            {number}
          </div>
        ))}
      </div>

      <button
        onClick={finalizar}
        style={{
          backgroundColor: "#1976D2",
          color: "#fff",
          padding: "15px 25px",
          fontSize: "24px",
          marginTop: "40px",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s, transform 0.2s",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        ✅ Finalizar
      </button>
    </div>
  );
};

export default P11Matematicas2;
