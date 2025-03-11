import React, { useEffect, useState, useRef, useMemo } from "react";
import { jsPlumb } from "jsplumb";

const P3Matematicas3 = ({ nextQuestion }) => {
  const [disabledImages, setDisabledImages] = useState([]);
  const [correctConnections, setCorrectConnections] = useState([]);
  const [incorrectConnections, setIncorrectConnections] = useState([]);
  const instanceRef = useRef(null);

  const loadGoogleFont = () => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Livvic&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  useEffect(() => {
    loadGoogleFont();
  }, []);

  const leftImages = useMemo(() => [
    { id: "sum1", label: "200 + 40 + 1", result: "241" },
    { id: "sum2", label: "400 + 20 + 1", result: "421" },
    { id: "sum3", label: "100 + 20 + 4", result: "124" },
    { id: "sum4", label: "200 + 10 + 4", result: "214" },
  ], []);

  const rightImages = useMemo(() => [
    { id: "num1", label: "421", result: "421" },
    { id: "num2", label: "241", result: "241" },
    { id: "num3", label: "214", result: "214" },
    { id: "num4", label: "124", result: "124" },
  ], []);

  useEffect(() => {
    const instance = jsPlumb.getInstance();
    instanceRef.current = instance;

    leftImages.forEach((img) => {
      instance.addEndpoint(img.id, {
        anchors: [[1.2, 0.5, 1, 0]],
        isSource: true,
        maxConnections: 1,
        connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]],
      });
    });

    rightImages.forEach((img) => {
      instance.addEndpoint(img.id, {
        anchors: [[-0.2, 0.5, -1, 0]],
        isTarget: true,
        maxConnections: 1,
      });
    });

    instance.bind("connection", (info) => {
      const { sourceId, targetId } = info.connection;
      const leftItem = leftImages.find((item) => item.id === sourceId);
      const rightItem = rightImages.find((item) => item.id === targetId);

      if (leftItem && rightItem) {
        const isConnCorrect = leftItem.result === rightItem.result;
        if (isConnCorrect) {
          setCorrectConnections((prev) => [...prev, { sourceId, targetId }]);
          info.connection.getOverlay("Arrow").setPaintStyle({ stroke: "green", strokeWidth: 2 });
        } else {
          setIncorrectConnections((prev) => [...prev, { sourceId, targetId }]);
          info.connection.getOverlay("Arrow").setPaintStyle({ stroke: "red", strokeWidth: 2 });
        }
        setDisabledImages((prev) => [...prev, sourceId, targetId]);
      }
    });

    return () => instance.reset();
  }, [leftImages, rightImages]);

  const handleNext = () => {
    let score = 0;
    let correctCount = 0;

    correctConnections.forEach(() => {
      correctCount++;
    });

    score = parseFloat((correctCount * 0.25).toFixed(2));
    score = Math.min(score, 1); 

    const detalleRespuestas = correctConnections.map(({ sourceId, targetId }) => {
      const leftItem = leftImages.find((item) => item.id === sourceId);
      const rightItem = rightImages.find((item) => item.id === targetId);

      const respuestaCorrecta = String(leftItem.result);  // Convertimos a cadena

      return {
        pregunta: `${leftItem.label} → ${rightItem.label}`,
        respuestaUsuario: rightItem.label,
        respuestaCorrecta: respuestaCorrecta,
        esCorrecta: rightItem.label === respuestaCorrecta,
      };
    });

    const detalleIncorrecto = incorrectConnections.map(({ sourceId, targetId }) => {
      const leftItem = leftImages.find((item) => item.id === sourceId);
      const rightItem = rightImages.find((item) => item.id === targetId);

      const respuestaCorrecta = String(leftItem.result);  // Convertimos a cadena

      return {
        pregunta: `${leftItem.label} → ${rightItem.label}`,
        respuestaUsuario: rightItem.label,
        respuestaCorrecta: respuestaCorrecta,
        esCorrecta: false,
      };
    });

    const resultado = {
      correcta: correctCount === leftImages.length,
      respuestaUsuario: correctConnections.map(({ sourceId, targetId }) => {
        const leftItem = leftImages.find((item) => item.id === sourceId);
        const rightItem = rightImages.find((item) => item.id === targetId);
        return `${leftItem.label} → ${rightItem.label}`;
      }).join("  /  "),
      respuestaCorrecta:correctConnections.map(({ sourceId, targetId }) => {
        const leftItem = leftImages.find((item) => item.id === sourceId);
        const rightItem = rightImages.find((item) => item.id === targetId);
        return `${leftItem.result} → ${rightItem.result}`;
      }).join("  /  "),
      puntuacion: score,
      detalleRespuestas: detalleRespuestas,
      respuestasIncorrectas: detalleIncorrecto,
      mensajeResultado: correctCount === leftImages.length
        ? "Pregunta 3: CORRECTO"
        : `Pregunta 3: INCORRECTO\nRespuestas incorrectas:\n${
            detalleIncorrecto
              .map(
                (r) =>
                  `${r.pregunta}: Usuario respondió ${r.respuestaUsuario}, Correcto era ${r.respuestaCorrecta}`
              )
              .join("\n")
          }`,
    };

    localStorage.setItem("puntuacionM3_P3", JSON.stringify(resultado));
    nextQuestion(score);
  };

  return (
    <div style={{ position: "relative", width: "60%", margin: "0 auto", fontFamily: "'Livvic', sans-serif" }}>
      <h3 style={{ color: "#FF6347", textAlign: "center", fontSize: "2.5em", fontWeight: "bold" }}>
        🎮📒Pregunta 3🎮📒
      </h3>
      <h4 style={{ color: "#FF6347", textAlign: "center", fontSize: "28px", fontWeight: "bold" }}>
        Une las operaciones con los resultados correctos:
      </h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          {leftImages.map(({ id, label }) => (
            <div
              id={id}
              key={id}
              style={{
                padding: "20px",
                margin: "10px",
                cursor: disabledImages.includes(id) ? "not-allowed" : "pointer",
                border: "2px solid transparent",
                borderRadius: "8px",
                backgroundColor: "#FF1493",
                color: "#212121",
                fontWeight: "bold",
                fontSize: "18px",
                width: "150px",
                textAlign: "center",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          {rightImages.map(({ id, label }) => (
            <div
              id={id}
              key={id}
              style={{
                padding: "20px",
                margin: "10px",
                cursor: disabledImages.includes(id) ? "not-allowed" : "pointer",
                border: "2px solid transparent",
                borderRadius: "8px",
                backgroundColor: "#FFF3E0",
                color: "#212121",
                fontWeight: "bold",
                fontSize: "18px",
                width: "150px",
                textAlign: "center",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handleNext} style={{ backgroundColor: "#E60073", color: "#fff" }}>
          ¡Siguiente!
        </button>
      </div>
    </div>
  );
};

export default P3Matematicas3;
