import React, { useState, useEffect } from "react";

const Pregunta11 = ({ nextQuestion }) => {
  const [values, setValues] = useState({
    series1: ["", "", "", "", ""],
    series2: ["", "", "", "", ""],
    series3: ["", "", "", "", ""],
    series4: ["", "", "", "", ""],
  });

  useEffect(() => {
    const savedValues = localStorage.getItem("pregunta11");
    if (savedValues) {
      setValues(JSON.parse(savedValues));
    }
  }, []);

  const handleChange = (e, series, index) => {
    const newValues = { ...values };
    newValues[series][index] = e.target.value;
    setValues(newValues);
  };

  const correctAnswers = {
    series1: [8, 10, 12, 14, 16],
    series2: [9, 12, 15, 18, 21],
    series3: [8, 12, 16, 20, 24],
    series4: [10, 15, 20, 25, 30],
  };

  const finalizar = () => {
    let score = 0;
    let respuestasIncorrectas = {};

    Object.keys(correctAnswers).forEach((serie) => {
      const respuestasUsuario = values[serie].map((val) => (val.trim() === "" ? "sin respuesta" : parseInt(val.trim()))); // Convertimos a números o "sin respuesta"
      const correctas = correctAnswers[serie];

      // Verificamos si todas las respuestas son correctas
      if (respuestasUsuario.every((val, index) => val === correctas[index])) {
        score += 0.25; // Cada serie correcta suma 0.25 puntos
      } else {
        respuestasIncorrectas[serie] = [];
        respuestasUsuario.forEach((val, index) => {
          if (val !== correctas[index]) {
            respuestasIncorrectas[serie].push({
              index,
              respuestaUsuario: val,
              respuestaCorrecta: correctas[index],
            });
          }
        });
      }
    });

    const resultado = {
      correcta: score === 1,
      respuestaUsuario: values,
      respuestaCorrecta: `
        Serie 1: ${correctAnswers.series1.join(", ")} 
        Serie 2: ${correctAnswers.series2.join(", ")} 
        Serie 3: ${correctAnswers.series3.join(", ")} 
        Serie 4: ${correctAnswers.series4.join(", ")}`,
      puntuacion: score,
      mensajeResultado: score === 1
        ? "Pregunta 11: CORRECTO"
        : `Pregunta 11: INCORRECTO\nPuntuación: ${score.toFixed(2)}\n\nRespuestas incorrectas:\n${
            Object.keys(respuestasIncorrectas).length > 0
              ? Object.keys(respuestasIncorrectas)
                  .map((serie) => {
                    return `${serie.toUpperCase()}:\n${respuestasIncorrectas[serie]
                      .map(
                        (r) =>
                          `${String.fromCharCode(97 + r.index)}) Usuario respondió: ${
                            r.respuestaUsuario !== "sin respuesta" ? r.respuestaUsuario : "sin respuesta"
                          }, Correcto era: ${r.respuestaCorrecta}`
                      )
                      .join("\n")}`;
                  })
                  .join("\n\n")
              : "No hubo respuestas incorrectas."
          }\n\nRespuestas correctas:\n${
            Object.keys(correctAnswers)
              .map(
                (serie) =>
                  `${serie.toUpperCase()}: ${correctAnswers[serie].join(", ")}`
              )
              .join("\n")}`,
    };

    // Guardamos las respuestas y el resultado en localStorage
    localStorage.setItem("pregunta11", JSON.stringify(values)); // Guardamos las respuestas
    localStorage.setItem("puntuacionM4_P11", JSON.stringify(resultado)); // Guardamos el resultado

    // Llamamos a nextQuestion para pasar a la siguiente pregunta
    nextQuestion(score, resultado);
  };

  return (
    <>
      <h3 style={{ fontSize: "2.5em", color: "#FF6347", fontFamily: "'Livvic', sans-serif", textAlign: "center" }}>
        ✏️🧮Pregunta 11✏️🧮
      </h3>
      <p className="instruction" style={{ textAlign: "center", fontSize: "1.3em" }}>
        ¡Completa las Series Numéricas!
      </p>

      <div className="series-container">
        <div className="column">
          {[
            { label: "Serie: 2, 4, 6, ", key: "series1", color: "#D1C4E9" },
            { label: "Serie: 3, 6, ", key: "series2", color: "#FFCCBC" },
          ].map((serie, index) => (
            <div key={index} className="series" style={{ backgroundColor: serie.color }}>
              <h4>{serie.label}</h4>
              {values[serie.key].map((value, i) => (
                <input
                  key={i}
                  type="number"
                  value={value}
                  onChange={(e) => handleChange(e, serie.key, i)}
                  placeholder="_"
                  className="input"
                />
              ))}
            </div>
          ))}
        </div>
        <div className="column">
          {[
            { label: "Serie: 4, ", key: "series3", color: "#C8E6C9" },
            { label: "Serie: 5, ", key: "series4", color: "#B3E5FC" },
          ].map((serie, index) => (
            <div key={index} className="series" style={{ backgroundColor: serie.color }}>
              <h4>{serie.label}</h4>
              {values[serie.key].map((value, i) => (
                <input
                  key={i}
                  type="number"
                  value={value}
                  onChange={(e) => handleChange(e, serie.key, i)}
                  placeholder="_"
                  className="input"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={finalizar}
        style={{
          backgroundColor: "#1976D2",
          color: "#fff",
          padding: "15px 25px",
          fontSize: "24px",
          marginTop: "40px",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s, transform 0.2s",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        ✅ Finalizar
      </button>

      <style jsx>{`
        .instruction {
          text-align: center;
          font-size: 1.1em;
          margin-bottom: 15px;
          color: #333;
        }
        .series-container {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 37px;
          padding: 10px;
        }
        .column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 48%;
        }
        .series {
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .input {
          width: 75px;
          height: 45px;
          font-size: 1.5em;
          text-align: center;
          border-radius: 8px;
          border: 2px solid #ff4081;
          margin: 6px;
          outline: none;
          transition: all 0.3s;
        }
        .input:focus {
          border-color: #1976d2;
          box-shadow: 0 0 8px rgba(25, 118, 210, 0.5);
        }
      `}</style>
    </>
  );
};

export default Pregunta11;