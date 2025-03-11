import React, { useState } from "react";
import ImgBotellas from "../../imagenes/logoBotellas.png"; // Asegúrate de que la ruta sea correcta

const P8Matematicas3 = ({ nextQuestion }) => {
  // Estado para la cuadrícula de 12 celdas (3 filas x 4 columnas)
  const [grid, setGrid] = useState(Array(12).fill(""));

  // Lista de elementos arrastrables para formar la operación  
  const draggables = ["3", "9", "7", "4", "9", "6", "8", "9", "3", "+", "="];

  // Arreglo esperado para la cuadrícula (3 filas x 4 columnas)
  const expectedGrid = ["", "3", "9", "7", "+", "4", "9", "6", "=", "8", "9", "3"];

  // Manejo del arrastre
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text", item);
  };

  // Permitir drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Manejar el drop en una celda
  const handleDrop = (e, index) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text");
    // Solo colocamos el item si la celda está vacía
    if (grid[index] === "") {
      const newGrid = [...grid];
      newGrid[index] = item;
      setGrid(newGrid);
    }
  };

  // Función para crear la cuadrícula de 12 celdas
  const createGrid = () => {
    return grid.map((cell, index) => (
      <div
        key={index}
        onDrop={(e) => handleDrop(e, index)}
        onDragOver={handleDragOver}
        style={{
          width: "60px",
          height: "60px",
          border: "2px solid #1976D2",
          borderRadius: "10px",
          margin: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
          backgroundColor: "#fff",
        }}
      >
        {cell}
      </div>
    ));
  };

  // Renderiza los elementos arrastrables
  const renderDraggables = () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        justifyItems: "center",
        fontSize: "22px",
        fontFamily: "Comic Sans MS",
      }}
    >
      {draggables.map((item, index) => (
        <div
          key={index + "-" + item}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          style={{
            padding: "10px",
            backgroundColor: "#FF7043",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
            width: "60px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );

  const handleNext = () => {
    let score = 0;
    let isCorrect = true;
  
    // Verificar que cada celda en la cuadrícula coincida con la respuesta esperada
    for (let i = 0; i < expectedGrid.length; i++) {
      if (expectedGrid[i] !== "" && grid[i] !== expectedGrid[i]) {
        isCorrect = false;
        break; // Si alguna respuesta es incorrecta, no continuamos verificando
      }
    }
  
    // Si todas las respuestas son correctas, la puntuación será 1
    if (isCorrect) score = 1;
  
    // Detalle de las respuestas (puedes modificar este objeto si es necesario)
    const detalleRespuestas = grid.map((respuesta, index) => ({
      pregunta: `Celda ${index + 1}`,
      respuestaUsuario: respuesta,
      respuestaCorrecta: expectedGrid[index],
      esCorrecta: respuesta === expectedGrid[index],
    }));
  
    // Generar el mensaje de resultado
    const resultado = {
      correcta: isCorrect,
      respuestaCorrecta: isCorrect
        ? "Correcto"
        : `La respuesta correcta es: ${expectedGrid.slice(0, 4).join('')} ${expectedGrid.slice(4, 8).join('')}  ${expectedGrid.slice(8, 12).join('')}`,
      puntuacion: score,
      detalleRespuestas: detalleRespuestas,
      respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
      mensajeResultado:
        isCorrect
          ? "Pregunta 8: CORRECTO"
          : `Pregunta 8: INCORRECTO\nRespuestas incorrectas:\n${detalleRespuestas
              .filter((r) => !r.esCorrecta)
              .map(
                (r) =>
                  `${r.pregunta}: Usuario respondió ${r.respuestaUsuario}, Correcto era ${r.respuestaCorrecta}`
              )
              .join("\n")}`,
    };
  
    // Guardar el resultado en localStorage
    localStorage.setItem("puntuacionM3_P8", JSON.stringify(resultado));
  
    // Pasar al siguiente cuestionario con el puntaje obtenido
    nextQuestion(score);
  };
  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Comic Sans MS",
      }}
    >
      <h1 style={{color: "#FF6347" , marginBottom: "20px", fontSize: "2.5em", fontFamily: "'Livvic', sans-serif" }}>
      🎮📒Pregunta 8🎮📒
      </h1>
  
  
      {/* Contenedor de imagen y texto del problema */}
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", maxWidth: "80%", textAlign: "center", marginBottom: "20px" }}>
  {/* Imagen a la izquierda */}
  <img
    src={ImgBotellas}
    alt="Botellas"
    style={{ width: "250px", height: "250px", marginRight: "10px" }} // Reducido el margen derecho
  />

  {/* Texto a la derecha */}
  <div style={{ maxWidth: "60%" }}>
    {/* Título */}
    <h2 style={{ color: "#8B0000", marginBottom: "25px", fontSize: "34px", fontFamily: "'Livvic', sans-serif" }}>
      ¡Resuelve el siguiente problema!
    </h2>

    {/* Cuerpo del problema */}
    <h3
      style={{
        color: "#0D47A1",
        fontSize: "30px",
        lineHeight: "1.4",
        maxWidth: "100%",  // Asegura que el texto ocupe todo el espacio disponible
        textAlign: "left", // El texto se mantiene alineado a la izquierda
      }}
    >
      Andrea recogió 397 botellas de plástico y Julián 496 botellas.{" "}
      <strong>¿Cuántas botellas recogieron en total?</strong>
    </h3>
  </div>
</div>


      {/* Contenedor flex con la cuadrícula a la izquierda y los números arrastrables a la derecha */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around", // Cambié space-between por space-around
          alignItems: "flex-start",
          width: "100%",
          marginTop: "20px",
        }}
      >
        {/* Cuadrícula de arrastre a la izquierda */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "5px", // Reducido el gap entre celdas
            justifyItems: "center",
            fontFamily: "Comic Sans MS",
          }}
        >
          {createGrid()}
        </div>

        {/* Elementos arrastrables a la derecha */}
        <div style={{ width: "40%" }}>
          {renderDraggables()}
        </div>
      </div>
  
      {/* Botón Siguiente */}
      <div style={{ textAlign: "center", marginTop: "30px" }}>
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

export default P8Matematicas3;
