import { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom"
import ImgHornero from '../imagenes/logoHornero.jpg';
import jsPDF from "jspdf"
import "jspdf-autotable"
import LogoUDIPSAI from "../imagenes/logoUDIPSAI.jpg"
import './Lectura4to.css';

const Lectura4to = () => {
  const lecturaTexto = `
    El pájaro hornero observó al hombre que llegaba cargado con sus herramientas y bajó a saludarle con su voz simple y buena.
    Luego, como todo buen arquitecto, buscó una horqueta en un tronco propicio y, juntos, ave y hombre iniciaron sus fábricas.
    El pájaro terminó su obra y se lamentaba no poder ayudar al hombre, pero pensaba que él sería feliz al terminar su casa.
    No sucedió así, pues el pájaro ignoraba que aquella casa no era para el obrero que la trabajaba, sino para quien la mandó construir.
  `;

  const preguntas = [
    { id: 1, pregunta: " ¿Quién observó al hombre cargado de herramientas?", opciones: [" Un perro", " Un pájaro", " Un caballo", " Un ratón"], respuestaCorrecta: " Un pájaro" },
    { id: 2, pregunta: " ¿Qué iniciaron el pájaro y el hombre?", opciones: [" Un nido", " Una casa", " Fábricas"], respuestaCorrecta: " Fábricas" },
    { id: 3, pregunta: " ¿Pudo el pájaro ayudar al hombre?", opciones: [" Sí", " No"], respuestaCorrecta: " No" },
    { id: 4, pregunta: " ¿Por qué el pájaro no pudo ayudar al hombre?", opciones: ["El hombre no quiso su ayuda", "El pájaro no podía construir casas para humanos"], respuestaCorrecta: "El pájaro no podía construir casas para humanos" },
    { id: 5, pregunta: " ¿De quién era la casa que construía el obrero?", opciones: [" Del pájaro", " De otra persona"], respuestaCorrecta: " De otra persona" },
    { id: 6, pregunta: " ¿Qué nos enseña esta lectura?", opciones: ["La vida siempre es justa", "Las cosas no siempre son para quien las trabaja"], respuestaCorrecta: "Las cosas no siempre son para quien las trabaja" }
  ];

  const [paginaActual, setPaginaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [finalizado, setFinalizado] = useState(false);
  const [fluidez, setFluidez] = useState({});
  const [apreciacion, setApreciacion] = useState('');
  const location = useLocation()
  const navigate = useNavigate();

  // Función para calcular la nota
  const calcularNota = () => {
    let preguntasCorrectas = 0;
    preguntas.forEach((pregunta) => {
      if (respuestas[pregunta.id] === pregunta.respuestaCorrecta) {
        preguntasCorrectas++;
      }
    });
    const notaSobre12 = preguntasCorrectas * 2; // Cada pregunta vale 2 puntos
    const notaSobre10 = (notaSobre12 * 10) / 12; // Ajustar a escala de 10
    return notaSobre10.toFixed(1); // Redondear a un decimal
  };

  // Función para generar el PDF
  const generarPDF = async () => {
    const pdf = new jsPDF()
    const { nombre, apellido } = location.state || {}
    const pageWidth = pdf.internal.pageSize.width
    let yPos = 10

    // Add UDIPSAI logo
    pdf.addImage(LogoUDIPSAI, "PNG", 10, yPos, 50, 15)
    yPos += 20

    // Add title
    pdf.setFontSize(16)
    pdf.text("Evaluación de Lectura Cuarto de Basica", pageWidth / 2, yPos, { align: "center" })
    yPos += 10

    // Add student name and score
    pdf.setFontSize(12)
    pdf.text(`Estudiante: ${nombre || ""} ${apellido || ""}`, 10, yPos)
    pdf.text(`Nota: ${calcularNota()}/10`, pageWidth - 50, yPos);
    yPos += 10

    // Add Fluidez table
    pdf.setFontSize(12)
    pdf.text("Fluidez de Lectura:", 10, yPos)
    yPos += 5

    const fluidezData = [
      { tipo: "Taquilexia", desc: "Lectura muy rápida" },
      { tipo: "Bradilexia", desc: "Lectura muy lenta" },
      { tipo: "Subintante", desc: "Primero en silencio luego en voz alta" },
      { tipo: "Silabeada", desc: "Lectura en sílabas" },
      { tipo: "Arrastrada", desc: "Se arrastra al final de cada palabra" },
      { tipo: "Disortográfica", desc: "Invierte letras y sílabas" },
      { tipo: "Dislalia", desc: "Mala articulación de palabras" },
      { tipo: "Repetitiva", desc: "Se repite letras, sílabas o palabras" },
      { tipo: "Sigue con el dedo", desc: "" },
      { tipo: "TOTAL SI", desc: "" },
    ]

    const fluidezTableData = fluidezData.map((item) => [item.tipo, item.desc, fluidez[item.tipo] || "No seleccionado"])

    // @ts-ignore
    pdf.autoTable({
      startY: yPos,
      head: [["Dificultad", "Descripción", "¿Presente?"]],
      body: fluidezTableData,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 40 }, 1: { cellWidth: 80 }, 2: { cellWidth: 30 } },
    })
    yPos = pdf.lastAutoTable.finalY + 10

    // Add Apreciación table
    pdf.setFontSize(12)
    pdf.text("Apreciación de Lectura:", 10, yPos)
    yPos += 5

    const apreciacionData = [
      [
        apreciacion === "Muy Buena"
          ? "0"
          : apreciacion === "Buena"
            ? "1-5"
            : apreciacion === "Regular"
              ? "6-9"
              : "10-13",
        apreciacion,
      ],
    ]

    // @ts-ignore
    pdf.autoTable({
      startY: yPos,
      head: [["Cantidad de Dificultades", "Apreciación"]],
      body: apreciacionData,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 40 } },
    })
    yPos = pdf.lastAutoTable.finalY + 5

    pdf.setFontSize(10)
    pdf.text(`Apreciación seleccionada: ${apreciacion}`, 10, yPos)
    yPos += 10

    // Add question summary
    pdf.setFontSize(12)
    pdf.text("Resumen de Preguntas:", 10, yPos)
    yPos += 5

    const questionTableData = preguntas.map((pregunta, index) => {
      const respuesta = Array.isArray(respuestas[pregunta.id])
        ? respuestas[pregunta.id].join(", ")
        : respuestas[pregunta.id] || "No respondida"
      const respuestaCorrecta = Array.isArray(pregunta.respuestaCorrecta)
        ? pregunta.respuestaCorrecta.join(", ")
        : pregunta.respuestaCorrecta
      return [`${index + 1}. ${pregunta.pregunta}`, respuesta, respuestaCorrecta]
    })

    // @ts-ignore
    pdf.autoTable({
      startY: yPos,
      head: [["Pregunta", "Respuesta del estudiante", "Respuesta correcta"]],
      body: questionTableData,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 50 }, 2: { cellWidth: 50 } },
    })
    yPos = pdf.lastAutoTable.finalY + 10

    // Add Apreciación final table
    pdf.setFontSize(12)
    pdf.text("Apreciación final:", 10, yPos)
    yPos += 5

    const apreciacionFinalData = [
      [
        apreciacion === "Mala"
          ? "No responde ninguna pregunta correctamente."
          : apreciacion === "Regular"
            ? "Responde correctamente 1 y 2 preguntas."
            : apreciacion === "Buena"
              ? "Responde correctamente entre 3 y 5 preguntas."
              : "Responde correctamente 6 preguntas.",
        apreciacion,
      ],
    ]

    // @ts-ignore
    pdf.autoTable({
      startY: yPos,
      head: [["Instaladores de Lectura Comprensiva", "Apreciación"]],
      body: apreciacionFinalData,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 1 },
      columnStyles: { 0: { cellWidth: 130 }, 1: { cellWidth: 30 } },
    })

    pdf.save(`Evaluacion_Lectura_4to_${nombre}_${apellido}.pdf`)
  }

  const siguientePagina = () => {
    if (paginaActual < preguntas.length + 2) {
      setPaginaActual((prev) => prev + 1);
    } else {
      setFinalizado(true);
    }
  };

  const anteriorPagina = () => {
    if (paginaActual > 0) {
      setPaginaActual((prev) => prev - 1);
    }
  };

  const manejarRespuesta = (pregunta, respuesta) => {
    setRespuestas({ ...respuestas, [pregunta.id]: respuesta });
  };

  const manejarFluidez = (tipo, valor) => {
    setFluidez({ ...fluidez, [tipo]: valor });
  };

  const manejarApreciacion = (valor) => {
    setApreciacion(valor);
  };
  const handleFinalized = () => {
    navigate('/materias/4to');
  };

  return (
    
    <div className="Hornero">
      <div>
        <h1 className="titulo-principal" style={{ textAlign: "center", fontSize: "2.5em", marginBottom: "20px" }}>
          PRUEBA DE LECTURA 4to
        </h1>
    <div className="lectura-hornero-container">
      <h2 className="lectura-hornero-titulo" style={{ fontSize: '2em' }}>🦜 EL PÁJARO HORNERO</h2>
      {!finalizado ? (
        <>
          {paginaActual === 0 ? (
            <div className="lectura-hornero-texto">
              <img src={ImgHornero} alt="Pájaro Hornero" className="lectura-hornero-imagen" />
              <p style={{ fontSize: '1.5em' }}>{lecturaTexto}</p>
              <button className="lectura-hornero-boton animado" onClick={siguientePagina} style={{ fontSize: '1.5em' }}>
                📖 ¡Comenzar evaluación!
              </button>
            </div>
          ) : paginaActual === 1 ? (
            <div className="lectura-hornero-tablas">
              <h3 style={{ fontSize: '1.8em' }}>FLUIDEZ DE LA LECTURA</h3>
              <table className="tabla-grande-hornero">
                <thead>
                  <tr>
                    <th>Dificultad</th>
                    <th>Descripción</th>
                    <th>¿Presente? (Sí/No)</th>
                  </tr>
                </thead>
                <tbody>
                      {[
                        { tipo: "Taquilexia", desc: "Lectura muy rápida" },
                        { tipo: "Bradilexia", desc: "Lectura muy lenta" },
                        { tipo: "Subintante", desc: "Primero en silencio luego en voz alta" },
                        { tipo: "Silabeada", desc: "Lectura en sílabas" },
                        { tipo: "Arrastrada", desc: "Se arrastra al final de cada palabra" },
                        { tipo: "Disortográfica", desc: "Invierte letras y sílabas" },
                        { tipo: "Dislalia", desc: "Mala articulación de palabras" },
                        { tipo: "Repetitiva", desc: "Se repite letras, sílabas o palabras" },
                        { tipo: "Sigue con el dedo", desc: "" },
                      ].map((item) => (
                        <tr key={item.tipo}>
                          <td>{item.tipo}</td>
                          <td>{item.desc}</td>
                          <td>
                            <button
                              className={`boton-fluidez ${fluidez[item.tipo] === "Sí" ? "boton-si-selected" : "boton-si"}`}
                              onClick={() => manejarFluidez(item.tipo, "Sí")}
                            >
                              Sí
                            </button>
                            <button
                              className={`boton-fluidez ${fluidez[item.tipo] === "No" ? "boton-no-selected" : "boton-no"}`}
                              onClick={() => manejarFluidez(item.tipo, "No")}
                            >
                              No
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td>TOTAL SI</td>
                        <td></td>
                        <td>
                          <input type="text" onChange={(e) => manejarFluidez("TOTAL SI", e.target.value)} />
                        </td>
                      </tr>
                    </tbody>
              </table>
              <br />
              <table className="tabla-pequeña-hornero">
                <thead>
                  <tr>
                    <th>Cantidad de Dificultades</th>
                    <th>Apreciación</th>
                    <th>Seleccionar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0</td>
                    <td>Muy Buena</td>
                    <td><input type="radio" name="apreciacion" value="Muy Buena" onChange={() => manejarApreciacion('Muy Buena')} /></td>
                  </tr>
                  <tr>
                    <td>1-5</td>
                    <td>Buena</td>
                    <td><input type="radio" name="apreciacion" value="Buena" onChange={() => manejarApreciacion('Buena')} /></td>
                  </tr>
                  <tr>
                    <td>6-9</td>
                    <td>Regular</td>
                    <td><input type="radio" name="apreciacion" value="Regular" onChange={() => manejarApreciacion('Regular')} /></td>
                  </tr>
                  <tr>
                    <td>10-13</td>
                    <td>Mala</td>
                    <td><input type="radio" name="apreciacion" value="Mala" onChange={() => manejarApreciacion('Mala')} /></td>
                  </tr>
                </tbody>
              </table>
              <button 
                className="lectura-hornero-boton animado" 
                onClick={siguientePagina} 
                style={{ fontSize: '1.5em' }}
              >
                ➡️ Pasar a las preguntas
              </button>
              <button
                    className="btn-regresar-hornero"
                    onClick={anteriorPagina}
                    style={{
                      background: "#4caf50",
                      color: "white",
                      borderRadius: "50%",
                      padding: "10px 15px",
                      marginLeft: "10px",
                      fontSize: "1.2em",
                    }}
                  >
                    ⬅️
                  </button>
            </div>
          ) : paginaActual > 1 && paginaActual <= preguntas.length + 1 ? (
            <div className="lectura-hornero-pregunta">
              <h3 style={{ fontSize: '1.8em' }}>📝 Pregunta {paginaActual - 1}</h3>
              <p style={{ fontSize: '1.5em' }}>{preguntas[paginaActual - 2].pregunta}</p>
              {preguntas[paginaActual - 2].opciones.map((opcion) => (
                <button 
                  key={opcion}
                  className="lectura-hornero-opcion"
                  onClick={() => manejarRespuesta(preguntas[paginaActual - 2], opcion)}
                  style={{ fontSize: '1.5em' }}
                >
                  {opcion}
                </button>
              ))}
              <button className="lectura-hornero-boton animado" onClick={siguientePagina} style={{ fontSize: '1.5em' }}>
                ➡️ Siguiente
              </button>
              <button className="btn-regresar-hornero" onClick={anteriorPagina} style={{ background: '#4caf50', color: 'white', borderRadius: '50%', padding: '10px 15px', marginLeft: '10px', fontSize: '1.2em' }}>⬅️</button>
            </div>
          ) : (
            <div className="lectura-hornero-finalizado">
              <h3 style={{ fontSize: '1.8em' }}>🎉 ¡Evaluación finalizada!</h3>
              <h4 style={{ fontSize: '1.5em' }}>🔍 Resumen de tus respuestas:</h4>
              <ul>
                {preguntas.map((pregunta) => (
                  <li key={pregunta.id} style={{ fontSize: '1.5em' }}>
                    <strong>{pregunta.pregunta}</strong>
                    <br />
                    <span>💬 Tu respuesta: {respuestas[pregunta.id] || "❓ No respondida"}</span>
                  </li>
                ))}
              </ul>
              <h3>Apreciación final:</h3>
              <table className="tabla-pequeña-preguntas-hornero">
                <thead>
                  <tr>
                    <th>Instaladores de Lectura Comprensiva</th>
                    <th>Apreciación</th>
                    <th>Seleccionar</th>
                  </tr>
                </thead>
                <tbody>
                      <tr>
                        <td>No responde ninguna pregunta correctamente.</td>
                        <td>Mala</td>
                        <td>
                          <input
                            type="radio"
                            name="apreciacionFinal"
                            value="Mala"
                            checked={apreciacion === "Mala"}
                            onChange={() => manejarApreciacion("Mala")}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Responde correctamente entre 1 y 2 preguntas.</td>
                        <td>Regular</td>
                        <td>
                          <input
                            type="radio"
                            name="apreciacionFinal"
                            value="Regular"
                            checked={apreciacion === "Regular"}
                            onChange={() => manejarApreciacion("Regular")}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Responde correctamente entre 3 y 5 preguntas.</td>
                        <td>Buena</td>
                        <td>
                          <input
                            type="radio"
                            name="apreciacionFinal"
                            value="Buena"
                            checked={apreciacion === "Buena"}
                            onChange={() => manejarApreciacion("Buena")}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>Responde correctamente entre 6 preguntas.</td>
                        <td>Muy Buena</td>
                        <td>
                          <input
                            type="radio"
                            name="apreciacionFinal"
                            value="Muy Buena"
                            checked={apreciacion === "Muy Buena"}
                            onChange={() => manejarApreciacion("Muy Buena")}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button onClick={generarPDF} className="lectura-hornero-boton animado" style={{ fontSize: "1.5em" }}>
                    📄 Descargar PDF
                  </button>
                  <button
                  onClick={handleFinalized}
                  className="lectura-hornero-boton animado"
                  style={{ fontSize: "1.5em", marginLeft: "20px", marginRight: "20px" }} // Espacio de 20px a los lados
                >
                  🏁 Finalizado
                </button>
            </div>
          )}
        </>
      ) : null(
        <></>
      )}
       </div>
      </div>
    </div>

  )
}

export default Lectura4to;
