import React, { useState } from "react";

const P6Matematicas = ({ nextQuestion }) => {
  const [answers, setAnswers] = useState({
    "14+23": "",
    "47+32": "",
    "59-34": "",
    "25-13": "",
  });

  const [resultMessage, setResultMessage] = useState(""); // Para mostrar el resultado

  const correctAnswers = {
    "14+23": "37",
    "47+32": "79",
    "59-34": "25",
    "25-13": "12",
  };

  const correctAnswersString = Object.values(correctAnswers).join(", "); // Cadena de respuestas correctas
  const detalleRespuestas = []; // Para almacenar detalles de respuestas

  const handleDrop = (event, operation) => {
    const value = event.dataTransfer.getData("text");
    setAnswers((prev) => ({ ...prev, [operation]: value }));
  };

  const handleDragStart = (event, value) => {
    event.dataTransfer.setData("text", value);
  };

  const handleNext = () => {
    checkAnswers(); // Verificar las respuestas
    nextQuestion(); // Pasar a la siguiente pregunta
  };

  const checkAnswers = () => {
    let totalScore = 0;
    let incorrectAnswers = [];

    // Verificar cada respuesta
    for (const [operation, answer] of Object.entries(answers)) {
      const isCorrect = answer.trim() === correctAnswers[operation];
      if (isCorrect) {
        totalScore += 0.25; // Sumar 0.25 por cada respuesta correcta
      } else {
        // Aquí se incluye correctamente la operación en el mensaje de respuesta incorrecta
        incorrectAnswers.push(
          `${operation}: Usuario respondió ${answer || 'sin respuesta'}, Correcto era ${correctAnswers[operation]}`
        );
      }
      
      // Guardar detalle de la respuesta
      detalleRespuestas.push({
        pregunta: operation,  // Se guarda directamente la operación como una cadena
        respuestaCorrecta: correctAnswers[operation],
        respuestaUsuario: answer,
        esCorrecta: isCorrect,
      });
    }

    // Resultado global
    const resultado = {
      correcta: totalScore === 1,
      respuestaUsuario: answers,
      respuestaCorrecta: correctAnswersString,
      respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
      puntuacion: totalScore,
      mensajeResultado:
        totalScore === 1
          ? `Pregunta 6: CORRECTO! Puntaje: ${totalScore} / 1`
          : `Pregunta 6: INCORRECTO. Respuesta correcta: ${correctAnswersString}. ${
              incorrectAnswers.length > 0
                ? `Respuestas incorrectas: ${incorrectAnswers.join(", ")}`
                : "No hubo respuestas incorrectas"
            }`,
    };

    // Mostrar el resultado
    setResultMessage(resultado.mensajeResultado);

    // Guardar puntuación en localStorage
    localStorage.setItem("puntuacionp_P6", JSON.stringify(resultado));
  };

  return (
    <div>
      <h3 style={{ fontSize: "2.5em", color: "#FF6347" }}>🐱‍🚀Pregunta 6🐱‍🚀</h3>
      <h4>Ubique el signo correcto entre los números:</h4>

      <div className="big-row">
        {[{ op: "14+23", num1: "14", num2: "23", result: "37" },
          { op: "47+32", num1: "47", num2: "32", result: "79" },
          { op: "59-34", num1: "59", num2: "34", result: "25" },
          { op: "25-13", num1: "25", num2: "13", result: "12" }
        ].map(({ op, num1, num2, result }) => (
          <div key={op} className="row-item">
            <div className="number-grid">
              <div className="cell empty"></div>
              <div className="cell">{num1[0]}</div>
              <div className="cell">{num1[1]}</div>
              <div className="cell operator">{op.includes("+") ? "+" : "-"}</div>
              <div className="cell">{num2[0]}</div>
              <div className="cell">{num2[1]}</div>
            </div>
            <div className="line"></div>

            <div
              className="answer-box"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, op)}
            >
              {answers[op] || "Respuesta"}
            </div>

            <div className="choices">
              {[result, result - 1, result + 2].map((choice) => (
                <div
                  key={choice}
                  className="choice"
                  draggable
                  onDragStart={(event) => handleDragStart(event, choice)}
                >
                  {choice}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
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

      <div>
        <h4>{resultMessage}</h4> {/* Mostrar resultado */}
      </div>

      <style jsx>{`
        h3 {
          color: #2a9d8f;
          font-size: 1.5em;
        }

        .big-row {
          display: flex;
          flex-wrap: nowrap;
          justify-content: center;
          gap: 10px;
          overflow-x: auto;
          margin: 20px auto;
        }

        .row-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #e9f5f5;
          border: 4px solid #2a9d8f;
          padding: 10px;
        }

        .number-grid {
          display: grid;
          grid-template-columns: repeat(3, 70px);
          gap: 10px;
          justify-content: center;
          align-items: center;
        }

        .cell {
          width: 70px;
          height: 70px;
          border: 3px solid #2a9d8f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5em;
          background-color: #fff;
        }

        .operator {
          font-size: 2.5em;
          font-weight: bold;
          color: #264653;
        }

        .empty {
          background: none;
          border: none;
        }

        .line {
          width: 300px;
          height: 6px;
          background-color: #2a9d8f;
          margin: 10px 0;
        }

        .answer-box {
          width: 200px;
          height: 70px;
          border: 3px dashed #264653;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2em;
          background-color: #f8f9fa;
          cursor: pointer;
        }

        .choices {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }

        .choice {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #2a9d8f;
          color: white;
          font-size: 1.8em;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
        }

        .next-button {
          color: white;
          padding: 15px 30px;
          font-size: 1.5em;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          margin-top: 20px;
          transition: background-color 0.3s ease;
        }

        .next-button:hover {
          background-color: #2a9d8f;
        }
      `}</style>
    </div>
  );
};

export default P6Matematicas;
