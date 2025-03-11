/* eslint-disable no-unused-vars */
import React, { useState } from "react";

// Cargar la fuente de Google Fonts
const loadGoogleFont = () => {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Livvic&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

const P2Matematicas2 = ({ nextQuestion }) => { // Recibimos nextQuestion por props
  const [numeros, setNumeros] = useState({ 1: "", 2: "", 3: "" });
  const [total, setTotal] = useState("");
  const [score, setScore] = useState(null);
  const [errors, setErrors] = useState({});

  // Cargar la fuente al renderizar el componente
  React.useEffect(() => {
    loadGoogleFont();
  }, []);

  // Función para manejar el cambio en los inputs de centenas, decenas y unidades
  const handleInputChange = (e, division) => {
    const { value } = e.target;
    setNumeros((prev) => ({
      ...prev,
      [division]: value,
    }));
  };

  // Función para manejar el cambio en el input del total
  const handleTotalChange = (e) => {
    const { value } = e.target;
    setTotal(value);
  };

  // Función que valida las respuestas y asigna la puntuación
  // Función que valida las respuestas y asigna la puntuación
  const handleValidacion = () => {
    const respuestaCentenas = parseInt(numeros[1], 10);
    const respuestaDecenas = parseInt(numeros[2], 10);
    const respuestaUnidades = parseInt(numeros[3], 10);
    const respuestaTotal = parseInt(total, 10);

    let totalScore = 1;
    const newErrors = {};
    let incorrectAnswers = [];

    // Validación de respuestas
    if (respuestaCentenas !== 300) {
      newErrors[1] = true;
      totalScore = 0;
      incorrectAnswers.push("Centenas");
    }
    if (respuestaDecenas !== 40) {
      newErrors[2] = true;
      totalScore = 0;
      incorrectAnswers.push("Decenas");
    }
    if (respuestaUnidades !== 5) {
      newErrors[3] = true;
      totalScore = 0;
      incorrectAnswers.push("Unidades");
    }
    if (respuestaTotal !== 345) {
      newErrors[4] = true;
      totalScore = 0;
      incorrectAnswers.push("Total");
    }

    // Guardamos los errores
    setErrors(newErrors);
    setScore(totalScore);

    // Resultado final
    const resultado = {
      correcta: totalScore === 1,
      respuestaUsuario: { respuestaCentenas, respuestaDecenas, respuestaUnidades, respuestaTotal },
      respuestaCorrecta: "345",
      puntuacion: totalScore,
      mensajeResultado:
        totalScore === 1
          ? `Pregunta 2: CORRECTO! Puntaje: ${totalScore} / 1`
          : `Pregunta 2: INCORRECTO. Respuesta correcta: 345. Respuestas incorrectas: ${incorrectAnswers.join(", ")}`,
    };

    // Guardar la puntuación en localStorage
    localStorage.setItem("puntuacionM3_P2", JSON.stringify(resultado));

    // Llamamos a la siguiente pregunta pasando el puntaje
    nextQuestion(totalScore);
  };

  return (
    <div style={{ fontFamily: "'Livvic', sans-serif", padding: "20px" }}>
      <h3 style={{ color: "#FF6347", textAlign: "center", fontSize: "2.5 em", fontWeight: "bold" }}>
        🎮📒Pregunta 2🎮📒
      </h3>
      <p style={{ textAlign: "center", color: "#FF7F50", fontSize: "32px" }}>
        ¡Ayuda a completar con los números correctos las centenas, decenas y unidades.! 🚀
      </p>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "40px",
        backgroundColor: "#A8C4E1",
        borderRadius: "5px",
        margin: "auto",
        maxWidth: "1300px",
        boxShadow: "0 2px 10px rgba(203, 120, 120, 0.1)",
      }}>
        {/* Centenas */}
        <div style={{ width: "30%", textAlign: "center" }}>
          <h4 style={{ fontSize: "20px", color: "#212121" }}>Centenas</h4>
          <img src="/image/logoCentena.png" alt="Centena" style={{ width: "100px", height: "100px" }} />
          <img src="/image/logoCentena.png" alt="Centena" style={{ width: "100px", height: "100px" }} />
          <img src="/image/logoCentena.png" alt="Centena" style={{ width: "100px", height: "100px" }} />

          <input
            type="number"
            value={numeros[1]}
            onChange={(e) => handleInputChange(e, 1)}
            style={{
              padding: "10px",
              fontSize: "18px",
              border: "2px solid rgb(26, 70, 130",
              borderRadius: "8px",
              textAlign: "center",
              width: "80%",
            }}
          />
        </div>

        {/* Decenas */}
        <div style={{ width: "30%", textAlign: "center" }}>
          <h4 style={{ fontSize: "20px", color: "#212121" }}>Decenas</h4>
          <img src="/image/logoDecenas.png" alt="Decenas" style={{ width: "100px", height: "100px" }} />
          <input
            type="number"
            value={numeros[2]}
            onChange={(e) => handleInputChange(e, 2)}
            style={{
              padding: "10px",
              fontSize: "18px",
              border: "2px solid rgb(26, 70, 130)",
              borderRadius: "8px",
              textAlign: "center",
              width: "80%",
            }}
          />
        </div>

        {/* Unidades */}
        <div style={{ width: "30%", textAlign: "center" }}>
          <h4 style={{ fontSize: "20px", color: "#212121" }}>Unidades</h4>
          <img src="/image/logoUnidad.png" alt="Unidades" style={{ width: "100px", height: "100px" }} />
          <input
            type="number"
            value={numeros[3]}
            onChange={(e) => handleInputChange(e, 3)}
            style={{
              padding: "10px",
              fontSize: "18px",
              border: "2px solid rgb(26, 70, 130",
              borderRadius: "8px",
              textAlign: "center",
              width: "80%",
            }}
          />
        </div>
      </div>

      {/* Recuadro del total */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h4 style={{ color: "#212121", fontSize: "22px", fontWeight: "bold" }}>
          Total:{" "}
          <input
            type="text"
            value={total}
            onChange={handleTotalChange}
            placeholder=" "
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid rgb(26, 70, 130",
              textAlign: "center",
              marginTop: "10px",
            }}
          />
        </h4>
      </div>

      {/* Botón siguiente */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handleValidacion}
          style={{
            backgroundColor: "#E60073", // Rosa brillante
            color: "#fff",
            fontSize: "20px", // Tamaño de letra mayor para hacerlo legible y atractivo
            padding: "12px 30px", // Aumento del padding para mayor tamaño del botón
            border: "none",
            borderRadius: "10px", // Bordes redondeados para hacerlo más suave
            cursor: "pointer",
            fontWeight: "bold", // Letra en negrita
            fontFamily: "'Comic Sans MS', cursive, sans-serif", // Fuente amigable para niños
            boxShadow: "0px 8px 15px rgba(249, 247, 246, 0.6)", // Sombra suave para un toque tridimensional
            transition: "all 0.3s ease-in-out", // Transición suave para efectos
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)"; // Escala el botón para hacerlo un poco más grande al pasar el ratón
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)"; // Restaura el tamaño original
          }}
        >
          ¡Siguiente!
        </button>
      </div>

    </div>
  );
};

export default P2Matematicas2;
