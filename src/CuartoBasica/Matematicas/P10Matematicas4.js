import React, { useState } from 'react';

const P10Matematicas = ({ nextQuestion }) => {
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [correctAnswerMessage, setCorrectAnswerMessage] = useState('');

  const handleNext = () => {
    let score = 0;
    let correctCount = 0; // Contador de respuestas correctas

    // Respuestas correctas
    const totalCorrect = 504;
    const recuerdosCorrectos = 18;

    // Verificación de cada respuesta y cálculo de la puntuación
    const answers = [answer1, answer2];
    const correctAnswers = [totalCorrect, recuerdosCorrectos];

    answers.forEach((answer, index) => {
      if (parseInt(answer, 10) === correctAnswers[index]) {
        correctCount++;
      }
    });

    // Asignar puntuación: 1 punto si ambas respuestas son correctas, 0 si no
    if (correctCount === 2) {
      score = 1;
    } else {
      score = 0;
    }

    // Detalles de las respuestas
    const detalleRespuestas = answers.map((respuesta, index) => ({
      pregunta: [
        "¿Cuánto pagó en total por los recuerdos?", 
        "¿Cuántos recuerdos entregó a cada familia?"
      ][index], // Muestra la pregunta completa
      respuestaUsuario: respuesta,
      respuestaCorrecta: correctAnswers[index],
      esCorrecta: parseInt(respuesta, 10) === correctAnswers[index],
    }));

    // Generación del resultado
    const resultado = {
      correcta: correctCount === 2, // Si ambas respuestas son correctas
      respuestaUsuario: answers,
      respuestaCorrecta: [totalCorrect, recuerdosCorrectos].join(" , "),
      puntuacion: score,
      detalleRespuestas: detalleRespuestas,
      respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
      mensajeResultado: correctCount === 2
        ? "Pregunta 10: CORRECTO"
        : `Pregunta 10: INCORRECTO\nRespuestas incorrectas:\n${
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
    localStorage.setItem("puntuacionM4_P10", JSON.stringify(resultado));

    // Muestra el mensaje de resultado y pasa a la siguiente pregunta
    setCorrectAnswerMessage(resultado.mensajeResultado);
    setShowResult(true);

    // Pasa a la siguiente pregunta con la puntuación obtenida
    nextQuestion(score);
  };

  return (
    <div className="question-container">
      <h3>✏️🧮Pregunta 10✏️🧮</h3>
      <p className="instruction">
        Juan compró 168 recuerdos a $3 cada uno y los repartió entre 9 familias. 
        Ayuda a Juan a descubrir cuánto pagó en total y cuántos recuerdos entregó a cada familia.
      </p>

      <div className="question-grid">
        {/* Pregunta 1 */}
        <div className="question-box right">
          <p className="question-text">¿Cuánto pagó en total por los recuerdos?</p>
          <input
            type="text"
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
            placeholder="Escribe tu respuesta"
            className="input"
          />
        </div>

        {/* Pregunta 2 */}
        <div className="question-box left">
          <p className="question-text">¿Cuántos recuerdos entregó a cada familia?</p>
          <input
            type="text"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
            placeholder="Escribe tu respuesta"
            className="input"
          />
        </div>
      </div>

      {showResult && (
        <div className="result">
          <p>{correctAnswerMessage}</p>
        </div>
      )}

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

      <style jsx>{`
        .question-container {
          width: 80%;
          max-width: 1000px;
          padding: 50px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
        }

        h3 {
          color: #ff5733;
          font-size: 3em;
          font-weight: bold;
        }

        .instruction {
          font-size: 1.5em;
          margin-bottom: 20px;
          color: #212121;
        }

        .question-grid {
          display: flex;
          justify-content: space-around;
          margin-top: 30px;
          gap: 20px;
        }

        .question-box {
          width: 48%;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .right {
          background-color: rgb(188, 132, 165);
        }

        .left {
          background-color: rgb(203, 151, 103);
        }

        .question-text {
          font-size: 1.5em;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .input {
          width: 100%;
          padding: 10px;
          font-size: 1.3em;
          text-align: center;
          border-radius: 5px;
          border: 2px solid #ff5733;
        }

        .result {
          margin-top: 20px;
          font-size: 1.5em;
          font-weight: bold;
          color: #28a745;
        }
      `}</style>
    </div>
  );
};

export default P10Matematicas;
