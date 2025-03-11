import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import "jspdf-autotable";
import LogoUDIPSAI from "../imagenes/logoUDIPSAI.jpg";
import { useLocation, useNavigate } from 'react-router-dom';
import logoLibro from '../imagenes/logoLibro.gif';
import sol from '../imagenes/logoLectura4.png';

import './Escritura4to.css';

const MiCard = ({ children, className }) => {
  return (
    <div className={`${className} bg-white shadow-md rounded-lg p-6 space-y-4`}>
      {children}
    </div>
  );
};

const MiBotonImprimir = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="imprimir4to-btn"
      style={{ marginBottom: "10px" }} // Agrega margen inferior para separar los botones
    >
      Descargar PDF
    </button>
  );
};

const MiBotonFinalizar = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="finalizar4to-btn"
      
      style={{ marginBottom: "10px" }} // Agrega margen inferior para separar los botones
    >
      Finalizar
    </button>
  );
};


const Escritura4to = () => {
  const pdfRef = useRef();
  const location = useLocation();
  const { nombre, apellido } = location.state || {}; // Obtener el nombre y apellido desde las props
  const navigate = useNavigate();

  // Estado para manejar los datos que el docente ingresa
  const [evaluacionTexto, setEvaluacionTexto] = useState("");
  const [errores, setErrores] = useState({
    contaminaciones: "",
    disociaciones: "",
    confusiones: "",
    adiciones: "",
    sustituciones: "",
    inversiones: "",
    omisiones: ""
  });

  // Estado para caligrafía y ortografía
  const [caligrafia, setCaligrafia] = useState("");
  const [ortografia, setOrtografia] = useState("");

  // Generación del PDF con jsPDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height; 
    let yPos = 10;

    // Agregar logo de UDIPSAI
  const logoWidth = 50;
  const logoHeight = 15;
  const logoX = (pageWidth - logoWidth) / 2; // Calcula posición X para centrar
  doc.addImage(LogoUDIPSAI, "PNG", logoX, yPos, logoWidth, logoHeight);
  yPos += logoHeight + 5;

    // Título del PDF
    doc.setFontSize(16);
    doc.text("Evaluación de Escritura Cuarto de Básica", pageWidth / 2, yPos, { align: "center" });
    yPos += 10;

    // Nombre del estudiante y nota
    doc.setFontSize(12);
    doc.text(`Estudiante: ${nombre || ""} ${apellido || ""}`, 10, yPos);
    yPos += 10;

    // Caligrafía
    doc.setFontSize(12);
    doc.text("Caligrafía:", 10, yPos);
    doc.text(caligrafia, 50, yPos);
    yPos += 10;

    // Ortografía
    doc.text("Ortografía:", 10, yPos);
    doc.text(ortografia, 50, yPos);
    yPos += 10;

    // Uso de signos de puntuación
    doc.text("Uso de signos de puntuación:", 10, yPos);
    doc.text(evaluacionTexto, 10, yPos + 10);
    yPos += 20;

    // Errores en la escritura
    doc.setFontSize(12);
    doc.text("Errores en la escritura:", 10, yPos);
    yPos += 10;

    const erroresData = Object.keys(errores).map((key) => [
      key.charAt(0).toUpperCase() + key.slice(1),
      errores[key] || "No especificado",
    ]);

    // @ts-ignore
    doc.autoTable({
      startY: yPos,
      head: [["Tipo de Error", "Descripción"]],
      body: erroresData,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 100 } },
    });

    // Fecha y hora al final del documento
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString();
  const hora = ahora.toLocaleTimeString();
  
  doc.setFontSize(10);
  // Posicionar a 2 cm del final de la página
  const footerY = pageHeight - 20;
  
  doc.text(`Fecha de descarga: ${fecha}`, pageWidth - 10, footerY, {
    align: "right"
  });
  
  doc.text(`Hora: ${hora}`, pageWidth - 10, footerY + 5, {
    align: "right"
  });

    // Guardar el PDF
    doc.save(`Evaluacion_Escritura_4to_${nombre}_${apellido}.pdf`);
  };

  // Manejo de los cambios en los campos de texto
  const handleTextoChange = (e) => {
    setEvaluacionTexto(e.target.value);
  };

  const handleErroresChange = (e) => {
    setErrores({ ...errores, [e.target.name]: e.target.value });
  };

  // Manejo de la selección de caligrafía y ortografía
  const handleCaligrafiaChange = (e) => {
    setCaligrafia(e.target.value);
  };

  const handleOrtografiaChange = (e) => {
    setOrtografia(e.target.value);
  };

  const handleFinalized = () => {
    navigate('/materias/4to');
  };

  return (
    <div className="escritura-page p-6 space-y-6">
      <h1 className="titulo-principal-E" style={{ textAlign: "center", fontSize: "2.5em", marginBottom: "20px" }}>
          PRUEBA DE ESCRITURA 4to
        </h1>
      <div ref={pdfRef} className="space-y-6">
        {/* Bloque de Lectura */}
        <MiCard className="lectura-card">
          <h1 className="escritura-title text-2xl font-bold text-center">EL CASAMIENTO</h1>
          <img src={sol} alt="Casamiento" className="lectura-casamiento-imagen" />
          <p className="escritura-description text-lg">
            Hace mucho tiempo el Sol decidió contraer matrimonio y le pareció justo hacerlo con una montaña. 
            Pensó que una montaña sería una buena representante de la Pacha Mama, o sea de la Tierra. Al 
            enterarse de esa noticia, las montañas se emocionaron. Creían que era un altísimo honor ser la 
            esposa del Sol. Se emocionaron especialmente la de los Andes ya que, por ser las favoritas del 
            astro rey, pensaron que éste las escogería.
            El viento llevaba los rumores y cuchicheos que se escuchaban en esta parte del mundo acerca del 
            casamiento.
          </p>
        </MiCard>

        {/* Bloque de Evaluación */}
        <MiCard className="evaluacion-card">
          <h2 className="escritura-subtitle text-xl font-bold text-center">Evaluación de Escritura</h2>
          <img src={logoLibro} alt="Simulación de escritura" className="imagen-escritura" />

          <div className="evaluacion-opciones">
            <h3>Caligrafía:</h3>
            <label>
              <input type="radio" name="caligrafia" value="Muy buena" onChange={handleCaligrafiaChange} /> Muy buena
            </label>
            <label>
              <input type="radio" name="caligrafia" value="Buena" onChange={handleCaligrafiaChange} /> Buena
            </label>
            <label>
              <input type="radio" name="caligrafia" value="Regular" onChange={handleCaligrafiaChange} /> Regular
            </label>
            <label>
              <input type="radio" name="caligrafia" value="Mala" onChange={handleCaligrafiaChange} /> Mala
            </label>
            <label>
              <input type="radio" name="caligrafia" value="Legible" onChange={handleCaligrafiaChange} /> Legible
            </label>
          </div>

          <div className="evaluacion-opciones">
            <h3>Ortografía:</h3>
            <label>
              <input type="radio" name="ortografia" value="Muy buena" onChange={handleOrtografiaChange} /> Muy buena
            </label>
            <label>
              <input type="radio" name="ortografia" value="Buena" onChange={handleOrtografiaChange} /> Buena
            </label>
            <label>
              <input type="radio" name="ortografia" value="Regular" onChange={handleOrtografiaChange} /> Regular
            </label>
            <label>
              <input type="radio" name="ortografia" value="Mala" onChange={handleOrtografiaChange} /> Mala
            </label>
          </div>

          <div className="evaluacion-opciones">
            <h3>Uso de signos de puntuación:</h3>
            <textarea
              value={evaluacionTexto}
              onChange={handleTextoChange}
              placeholder="Escribe tu evaluación aquí..."
            />
          </div>

          {/* Errores en la escritura */}
          <h3 className="escritura-description font-bold mt-4">Errores en la escritura:</h3>
          <div className="errores-escritura">
            {Object.keys(errores).map((key) => (
              <label key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: 
                <input
                  type="text"
                  name={key}
                  value={errores[key]}
                  onChange={handleErroresChange}
                />
              </label>
            ))}
          </div>

          {/* Mostrar nombre del estudiante */}
          <p className="escritura-description text-lg font-bold">
            Estudiante: {nombre ? `${nombre} ${apellido}` : "Nombre y apellido no proporcionados"}
          </p>
        </MiCard>
      </div>

      <MiBotonImprimir onClick={handleDownloadPDF} />
      
      <MiBotonFinalizar onClick={handleFinalized}/>
    </div>
    
  );
};

export default Escritura4to;