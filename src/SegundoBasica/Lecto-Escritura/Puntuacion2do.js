import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoUdipsai from "../../imagenes/logoUDIPSAI.jpg";

const compararRespuestas = (respuestas, respuestasCorrectas) => {
  // Verifica que ambos objetos no sean null o undefined antes de proceder
  if (!respuestas || !respuestasCorrectas) return false;

  const clavesRespuestas = Object.keys(respuestas).sort();
  const clavesRespuestasCorrectas = Object.keys(respuestasCorrectas).sort();
  
  // Si las claves no coinciden, la respuesta es incorrecta
  if (clavesRespuestas.length !== clavesRespuestasCorrectas.length) {
    return false;
  }

  // Compara cada valor en las claves
  for (let i = 0; i < clavesRespuestas.length; i++) {
    if (respuestas[clavesRespuestas[i]] !== respuestasCorrectas[clavesRespuestasCorrectas[i]]) {
      return false;
    }
  }

  return true;
};
const compararObjetos = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  return true;
};



const calcularPuntaje = (respuestas, respuestasCorrectas) => {
  let puntaje = 0;

  // Pregunta 1
  if (JSON.stringify(respuestas.pregunta1) === 
     JSON.stringify(respuestasCorrectas.pregunta1)) {
    puntaje += 2;
  }

  // Pregunta 2 - Comparación directa
  let puntajeP2 = 0;
  if (
    respuestas.pregunta2?.["pregunta2-0-0"] === respuestasCorrectas.pregunta2["pregunta2-0-0"] &&
    respuestas.pregunta2?.["pregunta2-0-1"] === respuestasCorrectas.pregunta2["pregunta2-0-1"]
  ) {
    puntajeP2 += 1;
  }
  if (
    respuestas.pregunta2?.["pregunta2-1-0"] === respuestasCorrectas.pregunta2["pregunta2-1-0"] &&
    respuestas.pregunta2?.["pregunta2-1-1"] === respuestasCorrectas.pregunta2["pregunta2-1-1"]
  ) {
    puntajeP2 += 1;
  }
  puntaje += puntajeP2;

  // Pregunta 3
  if (compararObjetos(respuestas.pregunta3?.serie1 || {}, respuestasCorrectas.pregunta3.serie1)) {
    puntaje += 1; // Serie 1 correcta
  }

  if (compararObjetos(respuestas.pregunta3?.serie2 || {}, respuestasCorrectas.pregunta3.serie2)) {
    puntaje += 1; // Serie 2 correcta
  }

  // Pregunta 4 - Validar orden exacto
  if (Array.isArray(respuestas.pregunta4) && 
      respuestas.pregunta4.join(" ") === "Iván vende muchas verduras .") {
    puntaje += 2;
  }

  // Pregunta 5 - Comparación estricta
  let puntajeP5 = 0;

  if (respuestas.pregunta5) {
    console.log("Respuestas recibidas para P5:", respuestas.pregunta5);
    
    Object.entries(respuestasCorrectas.pregunta5).forEach(([key, correctValue]) => {
      if (respuestas.pregunta5[key] === correctValue) {
        puntajeP5 += 1;
        console.log(`✅ Correcto: ${key} -> ${correctValue}`);
      } else {
        console.log(`❌ Incorrecto: ${key} -> esperado ${correctValue}, recibido ${respuestas.pregunta5[key]}`);
      }
    });
  }
  
  // Escalar la puntuación a 2 puntos
  puntaje += (puntajeP5 * 2) / 3;
  

  return puntaje;
};


const Puntuacion2do = ({ respuestas, nombreEstudiante, materia, onFinalizar }) => {
  const [puntajeTotal, setPuntajeTotal] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { nombre, apellido } = location.state || {}; // Obtener el nombre y apellido desde las props
 
  const handleFinalized = () => {
    navigate('/materias/2do'); // Redirige al usuario a la página de materias
  };

  const respuestasCorrectas = useMemo(
    () => ({
      pregunta1: { pregunta_1_respuesta_0: "Mariposa", pregunta_1_respuesta_1: "Nido" },
      pregunta2: {
        "pregunta2-0-0": "nada",
        "pregunta2-0-1": "mañana",
        "pregunta2-1-0": "mono",
        "pregunta2-1-1": "dado"
      },
      pregunta3: { serie1: { tijera: true }, serie2: { gitana: true } },
      pregunta4: ["Iván", "vende", "muchas", "verduras", "."],
      pregunta5: {
        text1: "imgBebidas",
        text2: "imgPavo",
        text3: "imgOveja"
      }
    }), []);

  useEffect(() => {
    const puntaje = calcularPuntaje(respuestas, respuestasCorrectas);
    setPuntajeTotal(puntaje);
  }, [respuestas, respuestasCorrectas]);

  const generarPDF = () => {
    const input = document.getElementById("resumen-evaluacion"); // Captura el contenedor del resumen
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4"); // Crea un nuevo PDF en formato vertical (portrait)
      const imgWidth = 210; // Ancho de la página A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calcula la altura proporcional

     
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight);
     
      pdf.setFontSize(10);
      pdf.text(`Fecha de descarga: ${new Date().toLocaleDateString()}`, 10, imgHeight + 10);
      pdf.text(`Hora de descarga: ${new Date().toLocaleTimeString()}`, 10, imgHeight + 15);

      // Guardar el PDF
    pdf.save(`Evaluacion_Lectura y Escritura 2do_${nombre}_${apellido}.pdf`);
    });
  };

  return (
    <div style={styles.contenedor}>
        
        {/* Título principal */}
        <h1>Evaluación Finalizada</h1>

        {/* Resumen de la evaluación */}
        <div id="resumen-evaluacion" style={styles.resumen}>
           {/* Logo de UDIPSAI */}
        <div style={styles.logoContainer}>
          <img src={logoUdipsai} alt="Logo UDIPSAI" style={styles.logo} />
        </div>
        <h3>Resumen de la Evaluación</h3>
        <p>Estudiante: {`${nombre} ${apellido}`}</p>
        <p>Calificación: {puntajeTotal.toFixed(1)}/10</p>
        
        {/* Pregunta 1 */}
        <div style={styles.respuestaItem}>
          <p style={styles.pregunta}>Pregunta 1</p>
          <p style={styles.respuesta}>
            {JSON.stringify(respuestas.pregunta1) === JSON.stringify(respuestasCorrectas.pregunta1)
              ? "Respuesta correcta"
              : "Respuesta incorrecta"}
          </p>
        </div>
        {/* Pregunta 2 */}
        <div style={styles.respuestaItem}>
          <p style={styles.pregunta}>Pregunta 2</p>
          <p style={styles.respuesta}>
            Oración 1:{" "}
            {`${respuestas.pregunta2?.["pregunta2-0-0"] || ""} ${
              respuestas.pregunta2?.["pregunta2-0-1"]|| ""
            }` === "nada mañana"
            ? "Respuesta correcta"
            : "Respuesta incorrecta"}
          </p>
          <p style={styles.respuesta}>
            Oración correcta: Diana nada en la mañana.
          </p>
          <p style={styles.respuesta}>
            Oración 2:{" "}
            {`${respuestas.pregunta2?.["pregunta2-1-0"] || ""} ${
              respuestas.pregunta2?.["pregunta2-1-1"] || ""
            }` === "mono dado"
              ? "Respuesta correcta"
              : "Respuesta incorrecta"}
          </p>
          <p style={styles.respuesta}>
            Oración correcta: Un mono dañó un dado.
          </p>
        </div>
        {/* Pregunta 3 */}
        <div style={styles.respuestaItem}>
          <p style={styles.pregunta}>Pregunta 3</p>
          <p style={styles.respuesta}>
            Serie 1: Palabra escogida:{" "}
            {Object.keys(respuestas.pregunta3?.serie1 || {})[0] || "Ninguna"}, Palabra correcta:{" "}
            {Object.keys(respuestasCorrectas.pregunta3.serie1)[0]}
          </p>
          <p style={styles.respuesta}>
            Serie 2: Palabra escogida:{" "}
            {Object.keys(respuestas.pregunta3?.serie2 || {})[0] || "Ninguna"}, Palabra correcta:{" "}
            {Object.keys(respuestasCorrectas.pregunta3.serie2)[0]}
          </p>
        </div>
        {/* Pregunta 4 */}
        <div style={styles.respuestaItem}>
          <p style={styles.pregunta}>Pregunta 4</p>
          <p style={styles.respuesta}>
            {Array.isArray(respuestas.pregunta4)
              ? respuestas.pregunta4.join(" ")
              : "Ninguna"}
          </p>
          <p style={styles.respuesta}>
            {JSON.stringify(respuestas.pregunta4) ===
            JSON.stringify(respuestasCorrectas.pregunta4)
              ? "Respuesta correcta"
              : "Respuesta incorrecta"}
          </p>
          <p style={styles.respuesta}>
            Oración correcta: Iván vende muchas verduras.
          </p>
        </div>
        {/* Pregunta 5 */}
        <div style={styles.respuestaItem}>
          <p style={styles.pregunta}>Pregunta 5</p>
          <p style={styles.respuesta}>
            {compararRespuestas(respuestas.pregunta5, respuestasCorrectas.pregunta5)
              ? "Respuesta correcta"
              : "Respuesta incorrecta"}
          </p>
        </div>
      </div>
      <div style={styles.botones}>
        <button onClick={generarPDF} style={styles.botonPDF}>
          Descargar PDF
        </button>
        <button onClick={handleFinalized} style={styles.botonFinalizar}>
          Finalizar Evaluación
        </button>
      </div>
    </div>
  );
};

const styles = {
  contenedor: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "30px",
    backgroundColor: "#f8f9fa",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  resumen: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    marginBottom: "30px",
  },
  respuestaItem: {
    backgroundColor: "#ecf5ff",
    padding: "15px",
    margin: "15px 0",
    borderRadius: "8px",
    borderLeft: "4px solid #3498db",
  },
  pregunta: {
    fontWeight: "bold",
    color: "#2c3e50",
    margin: "5px 0",
  },
  respuesta: {
    margin: "5px 0",
    color: "#7f8c8d",
  },
  botones: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  botonPDF: {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  botonFinalizar: {
    padding: "10px 20px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center", // Centra horizontalmente
    alignItems: "center", // Centra verticalmente (opcional)
    marginBottom: "20px" // Espacio entre el logo y el título
  },
  logo: {
    width: "300px", // Ancho del logo
    height: "auto" // Altura automática para mantener la proporción
  }
  
  
};

export default Puntuacion2do;
