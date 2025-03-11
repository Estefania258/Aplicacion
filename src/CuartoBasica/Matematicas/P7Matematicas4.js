import React, { useState } from 'react';

const P7Matematicas = ({ nextQuestion }) => {
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [correctAnswerMessage, setCorrectAnswerMessage] = useState('');

  const handleSubmit = () => {

    let score = 0;
    let correctCount = 0; // Contador de respuestas correctas

    const totalCorrect = 5325; // 5325
    const differenceCorrect = 2035; // 2035

    const answers = [answer1, answer2];
    const correctAnswers = [totalCorrect, differenceCorrect];

  
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
          "¿Cuánto se debe pagar si se compran los dos productos?",
          "¿Cuál es la diferencia entre el costo de la moto y el cuadrón?",
        ][index], // Muestra la pregunta completa
        respuestaUsuario: respuesta,
        respuestaCorrecta: correctAnswers[index],
        esCorrecta: parseInt(respuesta, 10) === correctAnswers[index],
      }));
  
      // Generación del resultado
      const resultado = {
        correcta: correctCount === 2, // Si ambas respuestas son correctas
        respuestaUsuario: answers,
        respuestaCorrecta: [totalCorrect, differenceCorrect].join(" , "),
        puntuacion: score,
        detalleRespuestas: detalleRespuestas,
        respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
        mensajeResultado: correctCount === 2
          ? "Pregunta 7: CORRECTO"
          : `Pregunta 7: INCORRECTO\nRespuestas incorrectas:\n${
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
      localStorage.setItem("puntuacionM4_P7", JSON.stringify(resultado));
  
      // Muestra el mensaje de resultado y pasa a la siguiente pregunta
      setCorrectAnswerMessage(resultado.mensajeResultado);
      setShowResult(true);
  
      // Pasa a la siguiente pregunta con la puntuación obtenida
      nextQuestion(score);
    };

  return (
    <div className="question-container">
      <h3>✏️🧮Pregunta 7✏️🧮</h3>
      <p className="instruction">
        Resuelve el siguiente problema matemático.
      </p>
      <h4>Un cuadrón cuesta $1645 y una moto $3680.</h4>

      <div className="question-grid">
        {/* Pregunta 1 */}
        <div className="question-box right">
          <p className="question-text">¿Cuánto se debe pagar si se compran los dos productos?</p>
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
          <p className="question-text">¿Cuál es la diferencia entre el costo de la moto y el cuadrón?</p>
          <input
            type="text"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
            placeholder="Escribe tu respuesta"
            className="input"
          />
        </div>
      </div>

      {showResult && <div className="result"><p>{correctAnswerMessage}</p></div>}

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

export default P7Matematicas;
