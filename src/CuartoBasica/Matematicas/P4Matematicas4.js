/* eslint-disable no-unused-vars */

import React, { useState } from "react";

// Componente MathGame
const MathGame = ({ nextQuestion }) => {
  const fixedValues = {
    suma: [
      ["", "UM", "C", "D", "U"],
      ["", "", "1", "", ""],
      ["", "2", "1", "4", "1"],
      ["+", "", "3", "7", "1"],
      ["", "", "", "", ""], // Última fila: respuestas del usuario para Suma
    ],
    resta: [
      ["", "UM", "C", "D", "U"],
      ["", "", "7", "1", ""],
      ["", "9", "8", "2", "6"],
      ["-", "4", "1", "8", "3"],
      ["", "", "", "", ""], // Última fila: respuestas del usuario para Resta
    ],
  };

  const correctAnswers = {
    suma: [
      ["", "UM", "C", "D", "U"],
      ["", "", "1", "", ""],
      ["", "2", "1", "4", "1"],
      ["+", "", "3", "7", "1"],
      ["", "2", "5", "1", "2"],
    ],
    resta: [
      ["", "UM", "C", "D", "U"],
      ["", "", "7", "1", ""],
      ["", "9", "8", "2", "6"],
      ["-", "4", "1", "8", "3"],
      ["", "5", "6", "4", "3"],
    ],
  };

  const [values, setValues] = useState(JSON.parse(JSON.stringify(fixedValues)));

  const handleChange = (event, rowIndex, colIndex, operation) => {
    if (rowIndex !== 4 || colIndex < 1 || colIndex > 4) return;
    const newValues = JSON.parse(JSON.stringify(values));
    newValues[operation][rowIndex][colIndex] = event.target.value;
    setValues(newValues);
  };

  const handleNext = () => {
    let newScore = 0;
    let correctCount = 0;
    let detalleRespuestas = [];
  
    const sumAnswers = values.suma[4].slice(1, 5).map(cell => (cell ? cell.trim() : ""));
    const correctSumAnswers = correctAnswers.suma[4].slice(1);
    const sumCorrect = sumAnswers.every((answer, index) => answer === correctSumAnswers[index]);
    
    detalleRespuestas.push({
      pregunta: "Suma",
      respuestaUsuario: sumAnswers.join(""),
      respuestaCorrecta: ["2512"],
      esCorrecta: sumCorrect
    });
  
    if (sumCorrect) {
      newScore += 0.5;
      correctCount++;
    }
  
    const restAnswers = values.resta[4].slice(1, 5).map(cell => (cell ? cell.trim() : ""));
    const correctRestAnswers = correctAnswers.resta[4].slice(1);
    const restCorrect = restAnswers.every((answer, index) => answer === correctRestAnswers[index]);
  
    detalleRespuestas.push({
      pregunta: "Resta",
      respuestaUsuario: restAnswers.join(""),
      respuestaCorrecta: ["5643"],
      esCorrecta: restCorrect
    });
  
    if (restCorrect) {
      newScore += 0.5;
      correctCount++;
    }
  
    const resultado = {
      correcta: correctCount === 2, // Si ambas respuestas son correctas
      puntuacion: newScore,
      detalleRespuestas: detalleRespuestas,
      respuestaCorrecta: ["SUMA= 2512", "RESTA= 5643"].join(" , "),
      respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
      mensajeResultado: correctCount === 2
        ? "Pregunta 4: CORRECTO"
        : `Pregunta 4: INCORRECTO\nRespuestas incorrectas:\n${
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
    localStorage.setItem("puntuacionM4_P4", JSON.stringify(resultado));
  
    // Pasar a la siguiente pregunta con la puntuación obtenida
    nextQuestion(newScore);
  };
  const renderTable = (operation) => (
    <div className="game-container">
      <h2 className="title">{operation === "suma" ? "Suma" : "Resta"}</h2>
      <table className="math-table">
        <tbody>
          {values[operation].map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="math-cell">
                  {rowIndex === 4 && colIndex >= 1 && colIndex <= 4 ? (
                    <input
                      type="text"
                      className="math-input"
                      value={cell}
                      onChange={(e) => handleChange(e, rowIndex, colIndex, operation)}
                      maxLength="1"
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="game-wrapper">
      <div className="question-header">
        <h1>✏️🧮Pregunta 4✏️🧮</h1>
        <p>¡Suma y resta como un campeón!</p>
      </div>
      
      <div className="tables-container">
        <div className="table-container">{renderTable("suma")}</div>
        <div className="table-container">{renderTable("resta")}</div>
      </div>
      
      <button
        className="next-button"
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
      
      <style>{`
        .game-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 20px;
          min-height: 100vh;
        }
        .question-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .question-header h1 {
          font-size: 32px;
          font-family: "Comic Sans MS", cursive;
          color: #333;
        }
        .question-header p {
          font-size: 18px;
          color: #555;
        }
        .tables-container {
          display: flex;
          justify-content: space-between;
          width: 105%; /* Aumentamos el ancho general */
        }
        .table-container {
          width: 48%; /* Ancho ajustado de cada tabla */
        }
        .game-container {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
          text-align: center;
          width: 100%;
        }
        .title {
          font-family: "Comic Sans MS", cursive;
          font-size: 26px;
          color: #333;
        }
        .math-table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        .math-cell {
          border: 2px solid #555;
          padding: 10px;
          text-align: center;
          font-size: 30px;
          font-weight: bold;
          color: #222;
          background: #f9f9f9;
          width: 60px;
          height: 60px;
        }
        .math-input {
          width: 50px;
          height: 40px;
          font-size: 24px;
          text-align: center;
          border: 2px solid #ff5f6d;
          border-radius: 8px;
          outline: none;
          transition: 0.3s;
        }
        .math-input:focus {
          border-color: #ff2e63;
          transform: scale(1.1);
        }
        .next-button {
          background: #ff5f6d;
          color: white;
          padding: 10px 20px;
          font-size: 18px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          margin-top: 15px;
        }
        .next-button:hover {
          background: #ff2e63;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default MathGame;
