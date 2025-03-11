/* eslint-disable no-unused-vars */

import React, { useState } from 'react';

const P6Matematicas = ({ nextQuestion }) => {
  const [values, setValues] = useState({
    dmToMm: '',
    mmToM: '',
    mToCm: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(false);

  const correctAnswersData = {
    dmToMm: 3940,
    mmToM: 4,
    mToCm: 7500
  };

  const handleChange = (e, question) => {
    setValues({ ...values, [question]: e.target.value });
  };

  const handleOptionClick = (value, question) => {
    setValues({ ...values, [question]: value });
  };

  const handleSubmit = () => {
    const dmToMmCorrect = parseInt(values.dmToMm, 10) === correctAnswersData.dmToMm;
    const mmToMCorrect = parseInt(values.mmToM, 10) === correctAnswersData.mmToM;
    const mToCmCorrect = parseInt(values.mToCm, 10) === correctAnswersData.mToCm;

    const correctCount = [dmToMmCorrect, mmToMCorrect, mToCmCorrect].filter(Boolean).length;
    setCorrectAnswers(correctCount === 3);
    setSubmitted(true);

    const newScore = (dmToMmCorrect ? 0.33 : 0) + (mmToMCorrect ? 0.33 : 0) + (mToCmCorrect ? 0.33 : 0);

    let detalleRespuestas = [
      { pregunta: '1. dm a Mm', respuestaUsuario: values.dmToMm, respuestaCorrecta: correctAnswersData.dmToMm, esCorrecta: dmToMmCorrect },
      { pregunta: '2. mm a M', respuestaUsuario: values.mmToM, respuestaCorrecta: correctAnswersData.mmToM, esCorrecta: mmToMCorrect },
      { pregunta: '3. m a Cm', respuestaUsuario: values.mToCm, respuestaCorrecta: correctAnswersData.mToCm, esCorrecta: mToCmCorrect }
    ];

    const resultado = {
      correcta: correctCount === 3,
      puntuacion: newScore,
      detalleRespuestas: detalleRespuestas,
      respuestaCorrecta: ["394dm a mm 3940", "4000mm a m 4", "75m a cm 7500"].join(" , "),
      respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
      mensajeResultado: correctCount === 3
        ? "Pregunta 6: CORRECTO"
        : `Pregunta 6: INCORRECTO\nRespuestas incorrectas:\n${
            detalleRespuestas
              .filter((r) => !r.esCorrecta)
              .map(
                (r) =>
                  `${r.pregunta}: Usuario respondió ${r.respuestaUsuario}, Correcto era ${r.respuestaCorrecta}`
              )
              .join("\n")
          }`,
    };

    localStorage.setItem("puntuacionM4_P6", JSON.stringify(resultado));
    console.log("Puntuación guardada en localStorage:", resultado);

    nextQuestion(newScore, { p6: resultado });
  };

  return (
    <div className="question-container">
      <h3 style={{ fontSize: "2.5em", color: "#FF6347", fontFamily: "'Livvic', sans-serif" }}>
        ✏️🧮Pregunta 6✏️🧮
      </h3>
      <p className="instruction">
        ¡Ayuda a nuestro amigo el robot a hacer algunas conversiones de medidas!
      </p>

      <div className="questions-container">
        <div className="question">
          <p className="question-text">
            a) Convierte 394 dm a mm.
          </p>
          <input
            type="text"
            value={values.dmToMm}
            onChange={(e) => handleChange(e, 'dmToMm')}
            placeholder="Escribe tu respuesta"
            className="input"
          />
          <div className="options">
            <button onClick={() => handleOptionClick(3940, 'dmToMm')}>3940</button>
            <button onClick={() => handleOptionClick(4000, 'dmToMm')}>4000</button>
            <button onClick={() => handleOptionClick(3900, 'dmToMm')}>3900</button>
          </div>
        </div>

        <div className="question">
          <p className="question-text">
            b) Convierte 4000 mm a m.
          </p>
          <input
            type="text"
            value={values.mmToM}
            onChange={(e) => handleChange(e, 'mmToM')}
            placeholder="Escribe tu respuesta"
            className="input"
          />
          <div className="options">
            <button onClick={() => handleOptionClick(4, 'mmToM')}>4</button>
            <button onClick={() => handleOptionClick(3, 'mmToM')}>3</button>
            <button onClick={() => handleOptionClick(5, 'mmToM')}>5</button>
          </div>
        </div>

        <div className="question">
          <p className="question-text">
            c) Convierte 75 m a cm.
          </p>
          <input
            type="text"
            value={values.mToCm}
            onChange={(e) => handleChange(e, 'mToCm')}
            placeholder="Escribe tu respuesta"
            className="input"
          />
          <div className="options">
            <button onClick={() => handleOptionClick(7500, 'mToCm')}>7500</button>
            <button onClick={() => handleOptionClick(7000, 'mToCm')}>7000</button>
            <button onClick={() => handleOptionClick(7600, 'mToCm')}>7600</button>
          </div>
        </div>
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
        .question-container {
          padding: 40px;
          border-radius: 10px;
          text-align: center;
          max-width: 1200px;
          margin: auto;
          background-color: #D4E6F1;
        }
        h3 {
          color: #154360;
          font-size: 2.5em;
        }
        .instruction {
          font-size: 1.3em;
          color: #1ABC9C;
        }
        .questions-container {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .question {
          background-color: #A9CCE3;
          padding: 20px;
          border-radius: 10px;
          flex: 1;
          min-width: 250px;
        }
        .question-text {
          font-size: 1.4em;
          color: #154360;
        }
        .input {
          width: 100%;
          padding: 12px;
          font-size: 1.3em;
          text-align: center;
          border-radius: 8px;
          border: 2px solid #1ABC9C;
        }
        .options {
          display: flex;
          justify-content: space-around;
          margin-top: 10px;
        }
        button {
          background-color: #1ABC9C;
          color: white;
          padding: 10px 20px;
          font-size: 1.2em;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #16A085;
        }
        .submit-button {
          background-color: #154360;
          color: white;
          padding: 12px 24px;
          font-size: 1.3em;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          margin-top: 20px;
        }
        .submit-button:hover {
          background-color: #1ABC9C;
        }
      `}</style>
    </div>
    
  );
};

export default P6Matematicas;
