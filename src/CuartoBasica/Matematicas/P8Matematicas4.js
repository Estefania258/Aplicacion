/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const P8Matematicas = ({ nextQuestion }) => {
  const [values, setValues] = useState({
    "34X10": '',
    "34X100": '',
    "34X1000": '',
    "18X10": '',
    "18X100": '',
    "18X1000": ''
  });

  const [correctAnswerMessage, setCorrectAnswerMessage] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e, level, number) => {
    setValues({ ...values, [`${level}X${number}`]: e.target.value });
  };

  const handleSubmit = () => {
    const correctAnswers = {
      "34X10": 340,
      "34X100": 3400,
      "34X1000": 34000,
      "18X10": 180,
      "18X100": 1800,
      "18X1000": 18000
    };

    let score = 0;
    let respuestasIncorrectas = [];
    let detalleRespuestas = [];
    let correctCount = 0;
    let mensajeResultado = "";

    // Verifica respuestas para el 34
    const keys34 = ['34X10', '34X100', '34X1000'];
    const correct34 = keys34.every(key => parseInt(values[key], 10) === correctAnswers[key]);

    if (correct34) {
      score += 0.5; // Suma 0.5 si todas las respuestas con 34 son correctas
      correctCount++;
    } else {
      keys34.forEach(key => {
        if (parseInt(values[key], 10) !== correctAnswers[key]) {
          respuestasIncorrectas.push({
            pregunta: key,
            respuestaUsuario: values[key],
            respuestaCorrecta: correctAnswers[key]
          });
          detalleRespuestas.push({
            pregunta: key,
            respuestaUsuario: values[key],
            respuestaCorrecta: correctAnswers[key],
            esCorrecta: false
          });
        }
      });
    }

    // Verifica respuestas para el 18
    const keys18 = ['18X10', '18X100', '18X1000'];
    const correct18 = keys18.every(key => parseInt(values[key], 10) === correctAnswers[key]);

    if (correct18) {
      score += 0.5; // Suma 0.5 si todas las respuestas con 18 son correctas
      correctCount++;
    } else {
      keys18.forEach(key => {
        if (parseInt(values[key], 10) !== correctAnswers[key]) {
          respuestasIncorrectas.push({
            pregunta: key,
            respuestaUsuario: values[key],
            respuestaCorrecta: correctAnswers[key]
          });
          detalleRespuestas.push({
            pregunta: key,
            respuestaUsuario: values[key],
            respuestaCorrecta: correctAnswers[key],
            esCorrecta: false
          });
        }
      });
    }

    // Aseguramos que la puntuación máxima no exceda 1
    score = score > 1 ? 1 : score;

    // Genera el mensaje de resultado
    if (respuestasIncorrectas.length === 0) {
      mensajeResultado = "Pregunta 8: CORRECTO";
    } else {
      mensajeResultado = `Pregunta 8: INCORRECTO\nRespuestas incorrectas:\n${respuestasIncorrectas
        .map(r => `${r.pregunta}: Usuario respondió ${r.respuestaUsuario}, Correcto era ${r.respuestaCorrecta}`)
        .join("\n")}`;
    }

    const p8Result = {
      correcta: score === 1,  // Se considera correcta si se obtiene 1 punto
      respuestasUsuario: values,
      respuestaCorrecta: ["34= 340, 3400, 34000", "18= 180, 1800, 18000"].join(" , "),
      puntuacion: score,
      detalleRespuestas: detalleRespuestas,
      respuestasIncorrectas: respuestasIncorrectas,
      mensajeResultado: mensajeResultado
    };

    // Guardar el resultado en localStorage
    localStorage.setItem('puntuacionM4_P8', JSON.stringify(p8Result));

    // Muestra el mensaje de resultado y pasa a la siguiente pregunta
    setCorrectAnswerMessage(mensajeResultado);
    setShowResult(true);

    // Pasa a la siguiente pregunta con la puntuación obtenida
    nextQuestion(score, { p8: p8Result });
  };

  return (
    <motion.div 
      className="question-container" 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    > 
      <h2 style={{ fontSize: "2.5em", color: "#FF6347" }}>✏️🧮Pregunta 8✏️🧮</h2>

      <h3 className="title">¡Completa la tabla de multiplicar!</h3>

      <motion.div className="table-container">
        <table className="multiplication-table">
          <thead>
            <tr>
              <th>x</th>
              <th>34</th>
              <th>18</th>
            </tr>
          </thead>
          <tbody>
            {['10', '100', '1000'].map((number, index) => (
              <motion.tr 
                key={index} 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <td>{number}</td>
                <td>
                  <input
                    type="number"
                    value={values[`34X${number}`]}
                    onChange={(e) => handleChange(e, '34', number)}
                    placeholder="?"
                    className="input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={values[`18X${number}`]}
                    onChange={(e) => handleChange(e, '18', number)}
                    placeholder="?"
                    className="input"
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

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
          padding: 20px;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
        }

        .title {
          color: #212121;
          font-size: 2.5em;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .instruction {
          font-size: 1.2em;
          color: #fff;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .table-container {
          display: flex;
          justify-content: center;
        }

        .multiplication-table {
          width: 120%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          overflow: hidden;
        }

        .multiplication-table th, .multiplication-table td {
          padding: 20px;
          border: 2px solid #ff6699;
          text-align: center;
          font-size: 1.5em;
        }

        .input {
          width: 120px;
          padding: 8px;
          font-size: 1.3em;
          text-align: center;
          border-radius: 5px;
          border: 2px solid #ff6699;
        }

        .submit-button {
          background-color: #ff6699;
          color: white;
          padding: 12px 30px;
          font-size: 1.5em;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          margin-top: 20px;
          transition: all 0.3s ease;
        }

        .submit-button:hover {
          background-color: #ff3366;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </motion.div>
  );
};

export default P8Matematicas;
