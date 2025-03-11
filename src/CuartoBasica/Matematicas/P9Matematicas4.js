import React, { useState } from 'react';

const P9Matematicas = ({ nextQuestion }) => {
  const [values, setValues] = useState({
    multiply1: '',
    multiply2: '',
    multiply3: '',
    divide1: '',
    divide2: '',
    divide3: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  const correctAnswersData = {
    multiply1: 28, // 7 x 4
    multiply2: 48, // 8 x 6
    multiply3: 36, // 4 x 9
    divide1: 9,    // 81 ÷ 9
    divide2: 9,    // 27 ÷ 3
    divide3: 8     // 64 ÷ 8
  };

  const handleChange = (e, question) => {
    setValues({ ...values, [question]: e.target.value });
  };

  const handleSubmit = () => {
    const m1 = parseInt(values.multiply1, 10) === correctAnswersData.multiply1;
    const m2 = parseInt(values.multiply2, 10) === correctAnswersData.multiply2;
    const m3 = parseInt(values.multiply3, 10) === correctAnswersData.multiply3;
    const d1 = parseInt(values.divide1, 10) === correctAnswersData.divide1;
    const d2 = parseInt(values.divide2, 10) === correctAnswersData.divide2;
    const d3 = parseInt(values.divide3, 10) === correctAnswersData.divide3;

    const score =
      (m1 ? 0.16 : 0) +
      (m2 ? 0.16 : 0) +
      (m3 ? 0.16 : 0) +
      (d1 ? 0.16 : 0) +
      (d2 ? 0.16 : 0) +
      (d3 ? 0.16 : 0);

    setSubmitted(true);

    const detalleRespuestas = [
      { pregunta: 'a) 7 x 4', respuestaUsuario: values.multiply1 || "sin respuesta", respuestaCorrecta: correctAnswersData.multiply1, esCorrecta: m1 },
      { pregunta: 'b) 8 x 6', respuestaUsuario: values.multiply2 || "sin respuesta", respuestaCorrecta: correctAnswersData.multiply2, esCorrecta: m2 },
      { pregunta: 'c) 4 x 9', respuestaUsuario: values.multiply3 || "sin respuesta", respuestaCorrecta: correctAnswersData.multiply3, esCorrecta: m3 },
      { pregunta: 'd) 81 ÷ 9', respuestaUsuario: values.divide1 || "sin respuesta", respuestaCorrecta: correctAnswersData.divide1, esCorrecta: d1 },
      { pregunta: 'e) 27 ÷ 3', respuestaUsuario: values.divide2 || "sin respuesta", respuestaCorrecta: correctAnswersData.divide2, esCorrecta: d2 },
      { pregunta: 'f) 64 ÷ 8', respuestaUsuario: values.divide3 || "sin respuesta", respuestaCorrecta: correctAnswersData.divide3, esCorrecta: d3 }
    ];

    const mensajeResultado =
      m1 && m2 && m3 && d1 && d2 && d3
        ? "¡Genial! Todas tus respuestas son correctas."
        : `¡Vaya! Algunas respuestas son incorrectas.
Puntuación: ${score.toFixed(2)}
        
Respuestas incorrectas:
${detalleRespuestas
  .filter((r) => !r.esCorrecta)
  .map((r) => `${r.pregunta} = ${r.respuestaUsuario}, debería ser ${r.respuestaCorrecta}`)
  .join("\n")}
        
Respuestas correctas:
${[
  `a) 7 x 4 = ${correctAnswersData.multiply1}`,
  `b) 8 x 6 = ${correctAnswersData.multiply2}`,
  `c) 4 x 9 = ${correctAnswersData.multiply3}`,
  `d) 81 ÷ 9 = ${correctAnswersData.divide1}`,
  `e) 27 ÷ 3 = ${correctAnswersData.divide2}`,
  `f) 64 ÷ 8 = ${correctAnswersData.divide3}`
].join("\n")}`;

    const p9Result = {
      correcta: m1 && m2 && m3 && d1 && d2 && d3,
      puntuacion: score,
      detalleRespuestas: detalleRespuestas,
      respuestaCorrecta: detalleRespuestas.map(r => `${r.pregunta} = ${r.respuestaCorrecta}`).join(" , "),
      respuestasIncorrectas: detalleRespuestas.filter((r) => !r.esCorrecta),
      mensajeResultado: mensajeResultado
    };

    localStorage.setItem("puntuacion_P9", JSON.stringify(p9Result));

    const responses = { p9: p9Result };
    nextQuestion(score, responses);
    setFeedback(mensajeResultado);
  };

  return (
    <div className="container">
            <h2 style={{ fontSize: "2.5em", color: "#FF6347" }}>✏️🧮Pregunta 9✏️🧮</h2>
      <p className="subheader">¡Resuelve estas operaciones y demuestra lo increíble que eres!</p>

      <div className="columns">
        <div className="column multiplication">
          <h3 className="section-title">Multiplicaciones</h3>
          <div className="input-group">
            <label>1) 7 x 4 =</label>
            <input
              type="number"
              value={values.multiply1}
              onChange={(e) => handleChange(e, 'multiply1')}
              className="input"
            />
          </div>
          <div className="input-group">
            <label>2) 8 x 6 =</label>
            <input
              type="number"
              value={values.multiply2}
              onChange={(e) => handleChange(e, 'multiply2')}
              className="input"
            />
          </div>
          <div className="input-group">
            <label>3) 4 x 9 =</label>
            <input
              type="number"
              value={values.multiply3}
              onChange={(e) => handleChange(e, 'multiply3')}
              className="input"
            />
          </div>
        </div>
        <div className="column division">
          <h3 className="section-title">Divisiones</h3>
          <div className="input-group">
            <label>4) 81 ÷ 9 =</label>
            <input
              type="number"
              value={values.divide1}
              onChange={(e) => handleChange(e, 'divide1')}
              className="input"
            />
          </div>
          <div className="input-group">
            <label>5) 27 ÷ 3 =</label>
            <input
              type="number"
              value={values.divide2}
              onChange={(e) => handleChange(e, 'divide2')}
              className="input"
            />
          </div>
          <div className="input-group">
            <label>6) 64 ÷ 8 =</label>
            <input
              type="number"
              value={values.divide3}
              onChange={(e) => handleChange(e, 'divide3')}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="button-container">
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
      </div>

      {submitted && (
        <div className="feedback-container">
          <pre className="feedback-text">{feedback}</pre>
        </div>
      )}

      <style jsx>{`
        
        .header {
          text-align: center;
          font-size: 2.5rem;
          color: #3f51b5;
          margin-bottom: 10px;
          border-bottom: 3px solid #4caf50;
          padding-bottom: 10px;
        }
        .subheader {
          text-align: center;
          font-size: 1.5rem;
          color: #4caf50;
          margin-bottom: 30px;
        }
        .columns {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .column {
          flex: 1;
          padding: 10px;
          border: 2px solid #4caf50;
          border-radius: 10px;
          background-color: #fefefe;
        }
        .section-title {
          text-align: center;
          font-size: 2rem;
          color: #3f51b5;
          margin-bottom: 15px;
        }
        .input-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          font-size: 1.2rem;
          margin-bottom: 8px;
          color: #555;
        }
        .input {
          width: 100%;
          padding: 12px;
          font-size: 1.2rem;
          border: 2px solid #4caf50;
          border-radius: 8px;
          transition: border-color 0.3s ease;
          outline: none;
        }
        .input:focus {
          border-color: #388e3c;
        }
        .button-container {
          text-align: center;
          margin-top: 30px;
        }
        .submit-button {
          padding: 14px 30px;
          font-size: 1.3rem;
          background-color: #4caf50;
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }
        .submit-button:hover {
          background-color: #388e3c;
          transform: scale(1.05);
        }
        .feedback-container {
          margin-top: 30px;
          padding: 20px;
          background-color: #fafafa;
          border: 2px dotted #4caf50;
          border-radius: 8px;
        }
        .feedback-text {
          font-size: 1.2rem;
          color: #333;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
};

export default P9Matematicas;
