import React, { useState } from "react";

const P4Matematicas2 = ({ nextQuestion }) => {
  const [answers, setAnswers] = useState({
    "17": { anterior: "", posterior: "" },
    "6": { anterior: "", posterior: "" },
    "82": { anterior: "", posterior: "" },
    "71": { anterior: "", posterior: "" },
    "35": { anterior: "", posterior: "" },
    "28": { anterior: "", posterior: "" },
  });
  const [errors, setErrors] = useState({});
  const [score, setScore] = useState(0);
  const [detalleRespuestas, setDetalleRespuestas] = useState([]);

  const correctAnswers = {
    "17": { anterior: "5", posterior: "7" },
    "6": { anterior: "16", posterior: "18" },
    "82": { anterior: "27", posterior: "29" },
    "71": { anterior: "34", posterior: "36" },
    "35": { anterior: "70", posterior: "72" },
    "28": { anterior: "81", posterior: "83" },
  };

  const handleDragStart = (e, value) => {
    e.dataTransfer.setData("text", value);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, number, type) => {
    e.preventDefault();
    const droppedValue = e.dataTransfer.getData("text");
    setAnswers((prev) => ({
      ...prev,
      [number]: { ...prev[number], [type]: droppedValue },
    }));
  };

  const checkAnswers = () => {
    let totalScore = 0; // Inicializamos el puntaje en 0
    let incorrectAnswers = [];
    const newDetalleRespuestas = [];

    // Iterar sobre las respuestas del usuario
    Object.keys(answers).forEach((num) => {
      const correctAnterior = correctAnswers[num].anterior;
      const correctPosterior = correctAnswers[num].posterior;
      const userAnterior = answers[num].anterior;
      const userPosterior = answers[num].posterior;

      const detalle = {
        number: num,
        anterior: userAnterior,
        posterior: userPosterior,
        esCorrecta: true,
        correctAnterior,
        correctPosterior,
      };

      // Verificar respuesta anterior
      if (userAnterior === "") {
        incorrectAnswers.push(`${num}: Usuario respondió sin respuesta, Correcto era ${correctAnterior}`);
        detalle.esCorrecta = false;
      } else if (userAnterior !== correctAnterior) {
        incorrectAnswers.push(`${num}: Anterior incorrecto, debería ser ${correctAnterior}`);
        detalle.esCorrecta = false;
      } else {
        totalScore += 0.08; // Sumar 0.08 por respuesta anterior correcta
      }

      // Verificar respuesta posterior
      if (userPosterior === "") {
        incorrectAnswers.push(`${num}: Usuario respondió sin respuesta, Correcto era ${correctPosterior}`);
        detalle.esCorrecta = false;
      } else if (userPosterior !== correctPosterior) {
        incorrectAnswers.push(`${num}: Posterior incorrecto, debería ser ${correctPosterior}`);
        detalle.esCorrecta = false;
      } else {
        totalScore += 0.08; // Sumar 0.08 por respuesta posterior correcta
      }

      newDetalleRespuestas.push(detalle);
    });

    // Asegurarse que el puntaje no exceda 1
    totalScore = Math.min(totalScore, 1);

    setErrors(newDetalleRespuestas.filter((d) => !d.esCorrecta));
    setScore(totalScore);
    setDetalleRespuestas(newDetalleRespuestas);

    // Mensaje de resultado
    const resultado = {
      correcta: totalScore === 1, // Si el puntaje es 1, la respuesta es correcta
      respuestaUsuario: answers,
      respuestaCorrecta: Object.keys(answers)
        .map((num) => `${correctAnswers[num].anterior} y ${correctAnswers[num].posterior}`)
        .join(" - "),
      respuestasIncorrectas: incorrectAnswers,
      puntuacion: totalScore,
      mensajeResultado:
        totalScore === 1
          ? `Pregunta 4: CORRECTO! Puntaje: ${totalScore} / 1`
          : `Pregunta 4: INCORRECTO. Respuesta correcta: ${Object.keys(answers)
              .map((num) => `${correctAnswers[num].anterior} y ${correctAnswers[num].posterior}`)
              .join(" - ")}. Respuestas incorrectas: ${incorrectAnswers.join(", ")}`,
    };

    localStorage.setItem("puntuacionp_P4", JSON.stringify(resultado));
    nextQuestion(totalScore);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pregunta 4: Completa las Series Numéricas</h2>
      <p style={styles.instruction}>
        Arrastra el número correcto en el recuadro de "Anterior" o "Posterior" para cada círculo.
      </p>

      <div style={styles.grid}>
        {Object.keys(answers).map((num, index) => (
          <div key={num} style={styles.row}>
            <div
              style={styles.dropBox}
              onDrop={(e) => handleDrop(e, num, "anterior")}
              onDragOver={handleDragOver}
            >
              {answers[num].anterior || "Anterior"}
            </div>
            <p style={styles.number}>{num}</p>
            <div
              style={styles.dropBox}
              onDrop={(e) => handleDrop(e, num, "posterior")}
              onDragOver={handleDragOver}
            >
              {answers[num].posterior || "Posterior"}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.options}>
        {Object.keys(answers).map((num) => (
          <div key={num} style={styles.draggableContainer}>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, correctAnswers[num].anterior)}
              style={styles.draggableItem}
            >
              {correctAnswers[num].anterior}
            </div>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, correctAnswers[num].posterior)}
              style={styles.draggableItem}
            >
              {correctAnswers[num].posterior}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.submitButton} onClick={checkAnswers}>
          ¡Siguiente! 🚀
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "10px",
    margin: "30px auto",
    background: "#fafafa",
    borderRadius: "10px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto', sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2.4rem",
    color: "#333",
    marginBottom: "20px",
  },
  instruction: {
    fontSize: "1.5rem",
    color: "#ff9800",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    marginBottom: "30px",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  number: {
    fontSize: "30px",
    fontWeight: "bold",
    backgroundColor: "#ffecd2",
    padding: "20px 25px",
    borderRadius: "50%",
    color: "#ff6f69",
    border: "3px solid #ff6f69",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  dropBox: {
    width: "130px",
    height: "70px",
    border: "3px dashed #ff6f69",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    color: "#333",
    backgroundColor: "rgba(255,255,255,0.9)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  options: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  draggableContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  draggableItem: {
    padding: "12px 18px",
    background: "#f7c1b4",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s ease-in-out",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "30px",
  },
  submitButton: {
    padding: "14px 30px",
    fontSize: "1.3rem",
    background: "linear-gradient(135deg, #ff4081, #f50057)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease, background 0.3s ease",
  },
};

export default P4Matematicas2;