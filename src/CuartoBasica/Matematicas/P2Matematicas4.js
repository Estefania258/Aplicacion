import React, { useState } from "react";

const P2Matematicas4 = ({ nextQuestion }) => {
  // Respuestas correctas
  const correctAnswers = {
    antes1: "3449",
    entre1: "3450",
    posterior1: "3451",
    antes2: "2347",
    entre2: "2348",
    posterior2: "2349",
    antes3: "4162",
    entre3: "4163",
    posterior3: "4164",
  };

  // Estado inicial con valores predefinidos en la tabla
  const [values, setValues] = useState({
    antes1: "",
    entre1: "3450", // Valor fijo
    posterior1: "",
    antes2: "2347", // Valor fijo
    entre2: "",
    posterior2: "",
    antes3: "",
    entre3: "",
    posterior3: "4164", // Valor fijo
  });

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Función para validar respuestas y registrar puntuación
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ítems a validar (excluyendo los valores fijos)
    const keysToValidate = ["antes1", "posterior1", "entre2", "posterior2", "antes3", "entre3"];
    let countCorrect = 0;
    let respuestasIncorrectas = {};

    keysToValidate.forEach((key) => {
      if (values[key].trim() === correctAnswers[key]) {
        countCorrect++;
      } else {
        respuestasIncorrectas[key] = values[key];
      }
    });

    const score = countCorrect * 0.16;

    // Guardar puntuación y respuestas incorrectas en localStorage
    localStorage.setItem(
      "puntuacionM4_P2",
      JSON.stringify({
        puntuacion: score,
        respuestasCorrectas: countCorrect,
        respuestasIncorrectas: respuestasIncorrectas,
        respuestasUsuario: values,
        respuestasCorrectasTotales: correctAnswers,
      })
    );

    nextQuestion(score);
  };

  return (
    <div style={styles.evaluacionContainer}>
      <h2 style={styles.titulo}>✏️🧮Pregunta 2✏️🧮</h2>
      <p style={styles.instrucciones}>Completa los valores en los espacios vacíos.</p>
      <table style={styles.tabla}>
        <thead>
          <tr>
            <th>Antes</th>
            <th>Entre</th>
            <th>Posterior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="text" name="antes1" value={values.antes1} onChange={handleChange} style={styles.inputCampo} placeholder="Ingresa valor" />
            </td>
            <td>{values.entre1}</td>
            <td>
              <input type="text" name="posterior1" value={values.posterior1} onChange={handleChange} style={styles.inputCampo} placeholder="Ingresa valor" />
            </td>
          </tr>
          <tr>
            <td>{values.antes2}</td>
            <td>
              <input type="text" name="entre2" value={values.entre2} onChange={handleChange} style={styles.inputCampo} placeholder="Ingresa valor" />
            </td>
            <td>
              <input type="text" name="posterior2" value={values.posterior2} onChange={handleChange} style={styles.inputCampo} placeholder="Ingresa valor" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" name="antes3" value={values.antes3} onChange={handleChange} style={styles.inputCampo} placeholder="Ingresa valor" />
            </td>
            <td>
              <input type="text" name="entre3" value={values.entre3} onChange={handleChange} style={styles.inputCampo} placeholder="Ingresa valor" />
            </td>
            <td>{values.posterior3}</td>
          </tr>
        </tbody>
      </table>
      <button style={styles.btnSiguiente} onClick={handleSubmit}>¡Siguiente!</button>
    </div>
  );
};

const styles = {
  evaluacionContainer: { padding: "20px", textAlign: "center", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" },
  titulo: { color: "#ff7f50", fontFamily: "'Livvic', sans-serif", fontSize: "2.5em", marginBottom: "10px" },
  instrucciones: { textAlign: "center", color: "#212121", fontSize: "32px", fontFamily: "'Livvic', sans-serif" },
  tabla: { margin: "0 auto", width: "70%", borderCollapse: "collapse", marginBottom: "20px" },
  inputCampo: { fontSize: "18px", textAlign: "center", padding: "8px", width: "80%", border: "2px solid #ff7f50", borderRadius: "5px" },
  btnSiguiente: { backgroundColor: "#E60073", color: "#fff", fontSize: "20px", padding: "12px 30px", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontFamily: "'Comic Sans MS', cursive, sans-serif", boxShadow: "0px 8px 15px rgba(249, 247, 246, 0.6)", transition: "all 0.3s ease-in-out" },
};

export default P2Matematicas4;