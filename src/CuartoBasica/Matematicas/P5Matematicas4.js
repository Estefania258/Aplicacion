import React, { useState } from "react";

const P5Matematicas = ({ nextQuestion }) => {
  const [values, setValues] = useState({
    numbers: [
      ['', '', '', ''],    // Fila 0: Números que se llevan (carry)
      ['', '', '', ''],    // Fila 1: Primer operando (827)
      ['+', '', '', ''],   // Fila 2: Segundo operando (8)
      ['+', '', '', ''],   // Fila 3: Tercer operando (34)
      ['', '', '', ''],    // Fila 4: Resultado (869)
    ],
  });

  const handleChange = (e, row, col) => {
    const { value } = e.target;
    // Permite sólo un dígito (0-9) en cada celda
    if (/^\d?$/.test(value)) {
      setValues((prev) => {
        const newValues = { ...prev };
        newValues.numbers = prev.numbers.map((r, i) =>
          i === row ? r.map((c, j) => (j === col ? value : c)) : r
        );
        return newValues;
      });
    }
  };
  const handleSubmit = () => {
    // Respuesta correcta para la operación 827 + 8 + 34 = 869
    const correctTable = {
        numbers: [
            ["", "", "1", ""],      // Fila 0: Carry
            ["", "8", "2", "7"],     // Fila 1: Primer operando (827)
            ["+", "", "", "8"],      // Fila 2: Segundo operando (8)
            ["+", "", "3", "4"],     // Fila 3: Tercer operando (34)
            ["", "8", "6", "9"],     // Fila 4: Resultado (869)
        ],
    };

    // Se recorren todas las celdas para identificar respuestas incorrectas
    let respuestasIncorrectas = [];
    for (let i = 0; i < correctTable.numbers.length; i++) {
        for (let j = 0; j < correctTable.numbers[i].length; j++) {
            if (values.numbers[i][j].trim() !== correctTable.numbers[i][j].trim()) {
                respuestasIncorrectas.push({
                    fila: i,
                    columna: j,
                    respuestaUsuario: values.numbers[i][j],
                    respuestaCorrecta: correctTable.numbers[i][j],
                });
            }
        }
    }

    const isCorrect = respuestasIncorrectas.length === 0;
    const newScore = isCorrect ? 1 : 0;

    const resultado = {
        correcta: isCorrect, // Resultado correcto o incorrecto
        puntuacion: newScore,
        respuestaCorrecta: ["827", "8", "34"].join(" + ") + " = 869",
        respuestasIncorrectas: respuestasIncorrectas,
        mensajeResultado: isCorrect
            ? "Pregunta 5: CORRECTO"
            : `Pregunta 5: INCORRECTO\nRespuestas incorrectas:\n${
                  respuestasIncorrectas
                      .map(
                          (r) =>
                              `Fila ${r.fila + 1}, Columna ${r.columna + 1}: Usuario respondió ${r.respuestaUsuario}, Correcto era ${r.respuestaCorrecta}`
                      )
                      .join("\n")
              }\n\nRespuesta correcta:\n${correctTable.numbers
                  .map((row, i) =>
                      row
                          .map((cell, j) => `${cell === '' ? ' ' : cell}`)
                          .join(' ')
                  )
                  .join("\n")}`,
    };

    // Guardar el resultado en localStorage
    localStorage.setItem("puntuacionM4_P5", JSON.stringify(resultado));

    // Pasar a la siguiente pregunta con la puntuación obtenida
    nextQuestion(newScore);
};

  
  
  const renderTable = () => (
    <table>
      <thead>
        <tr>
          <th>Signo</th>
          <th>C</th>
          <th>D</th>
          <th>U</th>
        </tr>
      </thead>
      <tbody>
        {values.numbers.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex}>
                <input
                  type="text"
                  value={cell}
                  onChange={(e) => handleChange(e, rowIndex, colIndex)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="question-container">
      <h3 style={{ fontSize: "2.5em", color: "#FF6347", fontFamily: "'Livvic', sans-serif" }}>✏️🧮Pregunta 5✏️🧮</h3>
      <p style={{ textAlign: "center", color: "#212121", fontSize: "32px", fontFamily: "'Livvic', sans-serif" }}>
        ¡Completa la tabla y gana un tesoro!
      </p>

      {/* Rectángulo llamativo con la operación */}
      <div className="operation-container">
        <p className="operation-text">827 + 8 + 34 = 869</p>
      </div>

      <div className="table-wrapper">
        {renderTable()}
      </div>

      <button
          onClick={handleSubmit}
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
      <style jsx>{`
        .operation-container {
          background-color: #e76f51;
          padding: 5px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .operation-text {
          font-size: 1.5em;
          color: white;
          font-weight: bold;
          text-align: center;
        }
        .table-wrapper {
          display: flex;
          justify-content: center;
          margin: 10px 0;
        }
        table {
          border-collapse: collapse;
          width: 90%;
        }
        th,
        td {
          border: 2px solid #264653;
          padding: 5px;
          text-align: center;
          font-size: 1em;
        }
        input {
          width: 55px;
          height: 26px;
          font-size: 1.5em;  /* Tamaño de la fuente */
          text-align: center;
          font-size: 1em;
        }
        button {
          background-color: #264653;
          color: white;
          padding: 10px 20px;
          font-size: 1.2em;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #2a9d8f;
        }
      `}</style>
    </div>
  );
};

export default P5Matematicas;
