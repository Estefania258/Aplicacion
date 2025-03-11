import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import jsPDF from "jspdf"
import "jspdf-autotable"
import "./Lectura3ro.css"

const Lectura3ro = () => {
  const lectura1 = `Todos los sábados, Pablo y Flavio acompañaban a su padre a pescar.
  Este sábado tuvieron suerte. Una gran cantidad de peces se habían acercado a la orilla.
  Apenas lanzaron las redes, los peces saltaron, unos de gusto y otros de susto.
  Papi, pira los peces, dijo Pablito. Y son grandes, gritó emocionado Flavio.
  Ahí van, dijo contento don Antonio. Vamos a tener una buena pesca. ¡Qué suerte!, gritaron todos.
  La pesca fue abundante. Toda la familia se alegró porque tuvieron comida para algunos días.`

  const preguntas = [
    {
      id: 1,
      pregunta: "¿Quiénes salían de pesca los sábados?",
      opciones: ["Andrés", "Pablo", "Fernando", "Flavio"],
      respuestaCorrecta: ["Pablo", "Flavio"],
    },
    {
      id: 2,
      pregunta: "¿Este sábado tuvieron o no suerte en la pesca?",
      opciones: ["Sí", "No"],
      respuestaCorrecta: "Sí",
    },
    {
      id: 3,
      pregunta: "¿Qué sucedió con los peces cuando lanzaron las redes?",
      opciones: [
        "Los peces saltaron, unos de gusto y otros de susto.",
        "Los peces se escondieron en el fondo del río.",
        "Los peces escaparon antes de que las redes llegaran al agua.",
      ],
      respuestaCorrecta: "Los peces saltaron, unos de gusto y otros de susto.",
    },
    {
      id: 4,
      pregunta: "¿Por qué se alegró la familia?",
      opciones: [
        "Porque encontraron un tesoro en el fondo del río.",
        "Porque vendieron todos los peces en el mercado.",
        "Porque la pesca fue abundante y tendrían comida para algunos días.",
      ],
      respuestaCorrecta: "Porque la pesca fue abundante y tendrían comida para algunos días.",
    },
  ]

  const [paginaActual, setPaginaActual] = useState(0)
  const [respuestas, setRespuestas] = useState({})
  const [finalizado, setFinalizado] = useState(false)
  const [fluidez, setFluidez] = useState({})
  const [apreciacion, setApreciacion] = useState("")
  const location = useLocation()
  const navigate = useNavigate();

  // Función para calcular la nota
  const calcularNota = () => {
    let preguntasCorrectas = 0
    preguntas.forEach((pregunta) => {
      if (Array.isArray(pregunta.respuestaCorrecta)) {
        // Pregunta con múltiples respuestas correctas
        const respuestaUsuario = respuestas[pregunta.id]
        if (respuestaUsuario && pregunta.respuestaCorrecta.includes(respuestaUsuario)) {
          preguntasCorrectas++
        }
      } else {
        // Pregunta de respuesta única
        if (respuestas[pregunta.id] === pregunta.respuestaCorrecta) {
          preguntasCorrectas++
        }
      }
    })
    return preguntasCorrectas * 2.5
  }

  // Función para generar el PDF
  const generarPDF = async () => {
    const pdf = new jsPDF()
    const { nombre, apellido } = location.state || {}
    const pageWidth = pdf.internal.pageSize.width
    let yPos = 10

    // Add UDIPSAI logo
    pdf.addImage("/image/logoUDIPSAI.jpg", "PNG", 10, yPos, 50, 15)
    yPos += 20

    // Add title
    pdf.setFontSize(16)
    pdf.text("Evaluación de Lectura Tercero de Basica", pageWidth / 2, yPos, { align: "center" })
    yPos += 10

    // Add student name and score
    pdf.setFontSize(12)
    pdf.text(`Estudiante: ${nombre || ""} ${apellido || ""}`, 10, yPos)
    pdf.text(`Nota: ${calcularNota().toFixed(1)}/10`, pageWidth - 50, yPos)
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
            ? "Responde correctamente 1 pregunta."
            : apreciacion === "Buena"
              ? "Responde correctamente entre 2 y 3 preguntas."
              : "Responde correctamente 4 preguntas.",
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

    pdf.save(`Evaluacion_Lectura_${nombre}_${apellido}.pdf`)
  }

  const siguientePagina = () => {
    if (paginaActual < preguntas.length + 3) {
      setPaginaActual((prev) => prev + 1)
    } else {
      setFinalizado(true)
    }
  }

  const anteriorPagina = () => {
    if (paginaActual > 0) {
      setPaginaActual((prev) => prev - 1)
    }
  }

  const manejarRespuesta = (pregunta, respuesta) => {
    setRespuestas({ ...respuestas, [pregunta.id]: respuesta })
  }

  const manejarFluidez = (tipo, valor) => {
    setFluidez({ ...fluidez, [tipo]: valor })
  }

  const manejarApreciacion = (valor) => {
    setApreciacion(valor)
  }

  const handleFinalized = () => {
    navigate('/materias/3ro');
  };

  return (
    <div className="Pesca">
      <div>
        <h1 className="titulo-principal" style={{ textAlign: "center", fontSize: "2.5em", marginBottom: "20px" }}>
          PRUEBA DE LECTURA 3ro
        </h1>
        <div className="lectura-pesca-container">
          <h2 className="lectura-pesca-titulo" style={{ fontSize: "2em" }}>
            🌊 La Pesca
          </h2>
          {!finalizado ? (
            <>
              {paginaActual === 0 ? (
                <div className="lectura-pesca-texto">
                  <img src="/image/logoPescar.png" alt="Pesca" className="lectura-pesca-imagen" />
                  <p style={{ fontSize: "1.5em" }}>{lectura1}</p>
                  <button
                    className="lectura-pesca-boton animado"
                    onClick={siguientePagina}
                    style={{ fontSize: "1.5em" }}
                  >
                    📖 ¡Comenzar evaluación!
                  </button>
                </div>
              ) : paginaActual === 1 ? (
                <div className="lectura-pesca-tablas">
                  <h3 style={{ fontSize: "1.8em" }}>FLUIDEZ DE LA LECTURA</h3>
                  <table className="tabla-grande-pesca">
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
                  <button
                    className="lectura-pesca-boton animado"
                    onClick={siguientePagina}
                    style={{ fontSize: "1.5em" }}
                  >
                    ➡️ Siguiente tabla
                  </button>
                  <button
                    className="btn-regresar-pesca"
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
              ) : paginaActual === 2 ? (
                <div className="lectura-pesca-tablas">
                  <h3>Apreciación de la Lectura</h3>
                  <table className="tabla-pequeña-pesca">
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
                        <td>
                          <input
                            type="radio"
                            name="apreciacion"
                            value="Muy Buena"
                            onChange={() => manejarApreciacion("Muy Buena")}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>1-5</td>
                        <td>Buena</td>
                        <td>
                          <input
                            type="radio"
                            name="apreciacion"
                            value="Buena"
                            onChange={() => manejarApreciacion("Buena")}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>6-9</td>
                        <td>Regular</td>
                        <td>
                          <input
                            type="radio"
                            name="apreciacion"
                            value="Regular"
                            onChange={() => manejarApreciacion("Regular")}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>10-13</td>
                        <td>Mala</td>
                        <td>
                          <input
                            type="radio"
                            name="apreciacion"
                            value="Mala"
                            onChange={() => manejarApreciacion("Mala")}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <button
                    className="lectura-pesca-boton animado"
                    onClick={siguientePagina}
                    style={{ fontSize: "1.5em" }}
                  >
                    ➡️ Pasar a las preguntas
                  </button>
                  <button
                    className="btn-regresar-pesca"
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
              ) : paginaActual > 2 && paginaActual <= preguntas.length + 2 ? (
                <div className="lectura-pesca-pregunta">
                  <h3 style={{ fontSize: "1.8em" }}>📝 Pregunta {paginaActual - 2}</h3>
                  <p style={{ fontSize: "1.5em" }}>{preguntas[paginaActual - 3].pregunta}</p>
                  {preguntas[paginaActual - 3].opciones.map((opcion) => (
                    <button
                      key={opcion}
                      className="lectura-pesca-opcion"
                      onClick={() => manejarRespuesta(preguntas[paginaActual - 3], opcion)}
                      style={{ fontSize: "1.5em" }}
                    >
                      {opcion}
                    </button>
                  ))}
                  <button
                    className="lectura-pesca-boton animado"
                    onClick={siguientePagina}
                    style={{ fontSize: "1.5em" }}
                  >
                    ➡️ Siguiente
                  </button>
                  <button
                    className="btn-regresar-pesca"
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
              ) : (
                <div className="lectura-pesca-finalizado">
                  <h3 style={{ fontSize: "1.8em" }}>🎉 ¡Evaluación finalizada!</h3>

                  <h4 style={{ fontSize: "1.5em" }}>🔍 Resumen de tus respuestas:</h4>
                  <ul>
                    {preguntas.map((pregunta) => (
                      <li key={pregunta.id} style={{ fontSize: "1.5em" }}>
                        <strong>{pregunta.pregunta}</strong>
                        <br />
                        <span>💬 Tu respuesta: {respuestas[pregunta.id] || "❓ No respondida"}</span>
                      </li>
                    ))}
                  </ul>
                  <h3>Apreciación final:</h3>
                  <table className="tabla-pequeña-preguntas-pesca">
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
                        <td>Responde correctamente entre 1 pregunta.</td>
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
                        <td>Responde correctamente entre 2 y 3 preguntas.</td>
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
                        <td>Responde correctamente entre 4 preguntas.</td>
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
                  <button onClick={generarPDF} className="lectura-pesca-boton animado" style={{ fontSize: "1.5em" }}>
                    📄 Descargar PDF
                  </button>
                  <button
                    onClick={handleFinalized}
                    className="lectura-pesca-boton animado"
                    style={{ fontSize: "1.5em", marginLeft: "20px", marginRight: "20px" }} // Espacio de 20px a los lados
                  >
                    🏁 Finalizado
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Lectura3ro




