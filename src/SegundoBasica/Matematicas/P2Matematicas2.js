import React, { useState, useEffect } from "react";

const loadGoogleFont = () => {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Livvic&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

const P2Matematicas2 = ({ nextQuestion }) => {
  const [currentQuestion] = useState(2);
  const [answers, setAnswers] = useState({ drop1_1: null, drop1_2: null, drop2_1: null, drop2_2: null });

  useEffect(() => {
    loadGoogleFont();
  }, []);

  const correctAnswers = {
    drop1_1: "orangeSquare1",
    drop1_2: "orangeSquare2",
    drop2_1: "skyblueCircle",
    drop2_2: "tomatoRectangle"
  };

  const drag = (event) => {
    event.dataTransfer.setData("text", event.target.id);
  };

  const allowDrop = (event) => {
    event.preventDefault();
    event.target.style.border = "2px dashed #4CAF50";
  };

  const drop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    if (event.target.classList.contains("dropzone")) {
      event.target.innerHTML = ""; // Limpiar el contenedor antes de insertar
      event.target.appendChild(draggedElement);
      setAnswers((prev) => ({
        ...prev,
        [event.target.id]: data,
      }));
    }

    event.target.style.border = "2px dashed gray";
  };

  const leaveDropZone = (event) => {
    event.target.style.border = "2px dashed gray";
  };

  const checkAnswers = () => {
    let score = 0;
     // Depuración: Ver los valores de las respuestas
  console.log("Respuestas del usuario: ", answers);
  console.log("Respuestas correctas: ", correctAnswers);

    // Comprobamos las respuestas y sumamos la puntuación correspondiente
    Object.keys(correctAnswers).forEach((key) => {
      if (answers[key] === correctAnswers[key]) {
        score += 0.25; // Cada patrón vale 0.5 puntos
      }
    });

    // Resultado final
    const resultado = {
      correcta: score === 1,
      respuestaUsuario: answers,
      respuestaCorrecta: ["cuadrado, cuadrado", "círculo, rectagulo"].join(", "),
      puntuacion: score,
      mensajeResultado:
        score === 1
          ? `Pregunta 2: CORRECTO! Puntaje: ${score} / 1`
          : `Pregunta 2: INCORRECTO. Respuesta correcta: ${Object.values(correctAnswers).join("-")}.`,
    };

    // Guardar resultado en localStorage
    localStorage.setItem("puntuacionp_P2", JSON.stringify(resultado));

    // Llamar a nextQuestion con el puntaje
    nextQuestion(score);
  };
  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        maxWidth: "1600px",
        margin: "0 auto",
      }}
    >
      {currentQuestion === 2 && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <h3
            style={{
              fontSize: "34px",
              marginBottom: "10px",
              fontFamily: "Livvic, sans-serif",
              color: "#FF6347",
            }}
          >
            🐱‍🚀Pregunta 2🐱‍🚀
          </h3>
          <h3
            style={{
              fontSize: "24px",
              marginBottom: "10px",
              fontFamily: "Livvic, sans-serif",
              color: "#212121",
              fontWeight: "bold",
            }}
          >
            Completar los siguientes patrones:
          </h3>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* Primer Patrón */}
            <div
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "5px solid rgb(9, 7, 99)",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h4
                style={{
                  fontSize: "20px",
                  margin: "10px 0",
                  fontFamily: "Livvic, sans-serif",
                }}
              >
                a. Primer Patrón
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* Secuencia inicial */}
                {[
                  "orange",
                  "orange",
                  "darkmagenta",
                  "darkmagenta",
                  "orange",
                  "orange",
                  "darkmagenta",
                  "darkmagenta",
                ].map((color, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      width: "50px",
                      height: "50px",
                      backgroundColor: color,
                      clipPath:
                        color === "darkmagenta"
                          ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                          : "none",
                    }}
                  />
                ))}
                {/* Espacios en blanco para completar */}
                {[1, 2].map((num) => (
                  <div
                    key={num}
                    id={`drop1_${num}`}
                    className="dropzone"
                    onDrop={drop}
                    onDragOver={allowDrop}
                    onDragLeave={leaveDropZone}
                    style={{
                      display: "inline-block",
                      width: "50px",
                      height: "50px",
                      border: "2px dashed gray",
                    }}
                  />
                ))}
              </div>
              <h4
                style={{
                  marginTop: "15px",
                  fontSize: "18px",
                  fontFamily: "Livvic, sans-serif",
                }}
              >
                Arrastra la figura correcta:
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { id: "orangeSquare1", color: "orange", shape: "square" },
                  { id: "darkmagentaStar", color: "darkmagenta", shape: "star" },
                  { id: "orangeSquare2", color: "orange", shape: "square" },
                ].map(({ id, color, shape }) => (
                  <div
                    key={id}
                    id={id}
                    draggable
                    onDragStart={drag}
                    style={{
                      display: "inline-block",
                      width: "50px",
                      height: "50px",
                      backgroundColor: color,
                      borderRadius: shape === "circle" ? "50%" : "0",
                      clipPath:
                        shape === "star"
                          ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                          : "none",
                      cursor: "grab",
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Segundo Patrón */}
            <div
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "5px solid rgb(9, 7, 99)",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h4
                style={{
                  fontSize: "20px",
                  margin: "10px 0",
                  fontFamily: "Livvic, sans-serif",
                }}
              >
                b. Segundo Patrón
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {[
                  "tomato",
                  "tomato",
                  "skyblue",
                  "tomato",
                  "tomato",
                  "skyblue",
                  "tomato",
                  "tomato",
                ].map((color, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      width: "50px",
                      height: color === "skyblue" ? "50px" : "100px",
                      backgroundColor: color,
                      borderRadius: color === "skyblue" ? "50%" : "0",
                    }}
                  />
                ))}
                {[1, 2].map((num) => (
                  <div
                    key={num}
                    id={`drop2_${num}`}
                    className="dropzone"
                    onDrop={drop}
                    onDragOver={allowDrop}
                    onDragLeave={leaveDropZone}
                    style={{
                      display: "inline-block",
                      width: "50px",
                      height: "90px",
                      border: "2px dashed gray",
                    }}
                  />
                ))}
              </div>
              <h4
                style={{
                  marginTop: "15px",
                  fontSize: "18px",
                  fontFamily: "Livvic, sans-serif",
                }}
              >
                Arrastra la figura correcta:
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { id: "tomatoRectangle", color: "tomato", shape: "rectangle" },
                  { id: "skyblueCircle", color: "skyblue", shape: "circle" },
                ].map(({ id, color, shape }) => (
                  <div
                    key={id}
                    id={id}
                    draggable
                    onDragStart={drag}
                    style={{
                      display: "inline-block",
                      width: "50px",
                      height: shape === "circle" ? "50px" : "100px",
                      backgroundColor: color,
                      borderRadius: shape === "circle" ? "50%" : "0",
                      cursor: "grab",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={checkAnswers}
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
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            ¡Siguiente! 🚀
          </button>
        </div>
      )}
    </div>
  );
};

export default P2Matematicas2;
