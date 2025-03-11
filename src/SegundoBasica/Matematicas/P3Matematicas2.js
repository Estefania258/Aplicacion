import React, { useEffect, useState, useRef, useMemo } from "react";
import { jsPlumb } from "jsplumb";

const correctPairs = {
  img1: "img5", // Pie - Zapato
  img2: "img6", // Mano - Guante
  img3: "img4", // Dedo - Anillo
};

const P3Matematicas2 = ({ nextQuestion }) => {
  const containerRef = useRef(null);
  const [disabledImages, setDisabledImages] = useState([]);
  const [connections, setConnections] = useState([]);
  const [mensaje, setMensaje] = useState(null); // Estado para mostrar mensaje
  const instanceRef = useRef(null);

  const leftImages = useMemo(
    () => [
      { id: "img1", label: "", src: "/image/logoPie.png" },
      { id: "img2", label: "", src: "/image/logoMano.png" },
      { id: "img3", label: "", src: "/image/logoDedo.png" },
    ],
    []
  );

  const rightImages = useMemo(
    () => [
      { id: "img4", label: "", src: "/image/logoAnillo.png" },
      { id: "img5", label: "", src: "/image/logoZapato.png" },
      { id: "img6", label: "", src: "/image/logoGuante.png" },
    ],
    []
  );

  useEffect(() => {
    const instance = jsPlumb.getInstance();
    instanceRef.current = instance;

    leftImages.forEach((img) => {
      instance.addEndpoint(img.id, {
        anchors: "Right",
        isSource: true,
        maxConnections: 1,
        connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]],
      });
    });

    rightImages.forEach((img) => {
      instance.addEndpoint(img.id, {
        anchors: "Left",
        isTarget: true,
        maxConnections: 1,
      });
    });

    instance.bind("connection", (info) => {
      const { sourceId, targetId } = info.connection;
      setDisabledImages((prev) => [...prev, sourceId, targetId]);
      setConnections((prev) => [...prev, { sourceId, targetId }]);
    });

    return () => instance.reset();
  }, [leftImages, rightImages]);

  const checkAnswers = () => {
    let responses = [];
    let correctConnections = 0; // Contador para las conexiones correctas

    if (connections.length > 0) {
      connections.forEach(({ sourceId, targetId }) => {
        const connectionCorrect = correctPairs[sourceId] === targetId;
        if (connectionCorrect) {
          correctConnections += 1; // Solo sumamos cuando la conexión es correcta
        }
        responses.push({ source: sourceId, target: targetId, correct: connectionCorrect });
      });
    }

    // Si todas las conexiones son correctas, el puntaje es 1
    const totalScore = correctConnections === 3 ? 1.00 : (correctConnections * 0.33).toFixed(2);

    const mensajeFinal = totalScore === 1.00
      ? `Pregunta 3: CORRECTO! Puntaje: ${totalScore} / 1`
      : `Pregunta 3: INCORRECTO. Respuesta correcta: Pie - Zapato, Mano - Guante, Dedo - Anillo.`;

    // Guardamos el resultado en el localStorage
    localStorage.setItem(
      "puntuacionp_P3",
      JSON.stringify({
        correcta: totalScore === 1.00,
        respuestaCorrecta: ["Pie - Zapato", "Mano - Guante", "Dedo - Anillo"].join(", "),
        puntuacion: totalScore,
        mensajeResultado: mensajeFinal
      })
    );

    // Mostramos el mensaje final
    setMensaje(mensajeFinal);

    // Pasamos el resultado a la siguiente pregunta
    nextQuestion(parseFloat(totalScore), responses);
  }

  return (
    <div ref={containerRef} style={{ position: "relative", width: "50%", margin: "0 auto" }}>
      <h3
        style={{
          fontSize: "34px",
          marginBottom: "10px",
          fontFamily: "Livvic, sans-serif",
          color: "#FF6347",
        }}
      >
        🐱‍🚀Pregunta 3🐱‍🚀
      </h3>
      <p
        style={{
          textAlign: "center",
          color: "#212121",
          fontSize: "25px",
          fontWeight: "bold",
          fontFamily: "'Livvic', sans-serif",
        }}
      >
        Relacione de forma correcta las siguientes imágenes:
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {leftImages.map(({ id, label, src }) => (
            <div
              id={id}
              key={id}
              style={{
                padding: "10px",
                margin: "10px",
                cursor: disabledImages.includes(id) ? "not-allowed" : "pointer",
                border: "2px solid transparent",
                borderRadius: "8px",
              }}
            >
              <img src={src} alt={label} style={{ width: "100px", height: "100px" }} />
              <p>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {rightImages.map(({ id, label, src }) => (
            <div
              id={id}
              key={id}
              style={{
                padding: "10px",
                margin: "10px",
                cursor: disabledImages.includes(id) ? "not-allowed" : "pointer",
                border: "2px solid transparent",
                borderRadius: "8px",
              }}
            >
              <img src={src} alt={label} style={{ width: "100px", height: "100px" }} />
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {mensaje && (
        <p
          style={{
            color: mensaje === "¡Correcto!" ? "green" : "red",
            fontWeight: "bold",
            fontSize: "20px",
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {mensaje}
        </p>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={checkAnswers}
          style={{
            backgroundColor: "#B2EBF2", // Rosa brillante
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
    </div>
  );
};

export default P3Matematicas2;