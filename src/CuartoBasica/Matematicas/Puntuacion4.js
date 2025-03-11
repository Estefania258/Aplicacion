/* eslint-disable no-unused-vars */



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import LogoUDIPSAI from "../../imagenes/logoUDIPSAI.jpg"; // Asegúrate de que la imagen esté en la carpeta correcta  

const Puntuacion = () => {
  const navigate = useNavigate();
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [apellidoEstudiante, setApellidoEstudiante] = useState('');
  const [puntuacion, setPuntuacion] = useState([]);
  const [puntuacionTotal, setPuntuacionTotal] = useState(0); // Para almacenar el total de puntuación
  const [puntuacionPregunta2, setPuntuacionPregunta2] = useState(null); // Puntuación de la Pregunta 2
  const [respuestasUsuarioP2, setRespuestasUsuarioP2] = useState({}); // Respuestas del usuario en Pregunta 2
  const [respuestasCorrectasP2, setRespuestasCorrectasP2] = useState({}); // Respuestas correctas de Pregunta 2

  useEffect(() => {
    const nombre = sessionStorage.getItem('nombre');
    const apellido = sessionStorage.getItem('apellido');

    setNombreEstudiante(nombre || 'Invitado');
    setApellidoEstudiante(apellido || '');

    const resultados = [];
    let totalPuntuacion = 0; // Inicializamos la puntuación total

    Object.keys(localStorage).forEach((clave) => {
      if (clave.startsWith('puntuacionM4_P')) {
        const valor = JSON.parse(localStorage.getItem(clave));

        // Aseguramos que 'respuestasIncorrectas' sea un arreglo  
        const respuestasIncorrectas = Array.isArray(valor.respuestasIncorrectas)
          ? valor.respuestasIncorrectas
          : [];

        // Si es la Pregunta 2, guardar sus datos
        if (clave === "puntuacionM4_P2") {
          setPuntuacionPregunta2(valor.puntuacion);
          setRespuestasUsuarioP2(valor.respuestasUsuario);
          setRespuestasCorrectasP2(valor.respuestasCorrectasTotales);
        }

        resultados.push({
          pregunta: parseInt(clave.replace('puntuacionM4_P', '')),
          estado: valor.correcta ? 'Correcto' : 'Incorrecto',
          respuestaCorrecta: valor.respuestaCorrecta,
          puntuacion: valor.puntuacion,
          respuestasIncorrectas: respuestasIncorrectas,
        });

        // Sumar la puntuación de cada pregunta (si no es numérica se suma 0)
        let score = valor.puntuacion;
        if (typeof score === 'string') {
          score = score.replace(',', '.');
        }
        totalPuntuacion += parseFloat(score) || 0;
      }
    });

    resultados.sort((a, b) => a.pregunta - b.pregunta);
    setPuntuacion(resultados);
    setPuntuacionTotal(totalPuntuacion); // Actualizamos el total de puntuación
  }, []);

  const descargarPDF = () => {
    const input = document.getElementById('puntuacion-container');
    const fechaHora = new Date();
    const fecha = fechaHora.toLocaleDateString();
    const hora = fechaHora.toLocaleTimeString();
  
    // Capturamos el contenedor completo (sin alterar su tamaño ni recortarlo)
    html2canvas(input, {
      backgroundColor: null,
      // Con estos parámetros se asegura capturar la totalidad sin depender de scroll
      scrollX: 0,
      scrollY: 0,
      width: input.scrollWidth,
      height: input.scrollHeight,
      x: 0,
      y: 0
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // Usamos jsPDF en formato A4 vertical
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      // -------------------
      // Encabezado del PDF
      // -------------------
      const margin = 10; // margen lateral
      const logoWidth = 50;
      const logoHeight = 15;
      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 10;
      pdf.addImage(LogoUDIPSAI, 'PNG', logoX, logoY, logoWidth, logoHeight);
  
      pdf.setFontSize(16);
      const textX = pageWidth / 2;
      const textY = logoY + logoHeight + 10;
      pdf.text("Evaluación Matemáticas Segundo de Básica", textX, textY, { align: "center" });
  
      pdf.setFontSize(10);
      const fechaHoraX = margin;
      const fechaHoraY = textY + 10;
      pdf.text(`Fecha de descarga: ${fecha}`, fechaHoraX, fechaHoraY);
      pdf.text(`Hora: ${hora}`, fechaHoraX, fechaHoraY + 4);
  
      // -------------------------------
      // Cálculo para agregar la imagen
      // -------------------------------
      // Se deja un espacio para el encabezado; el contenido comenzará justo debajo.
      const startY = fechaHoraY + 10;
      // Se ajusta el ancho de la imagen al ancho de la página (con márgenes)
      const imgWidth = pageWidth - 2 * margin;
      // Se mantiene la relación de aspecto original de la captura
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // En la primera página, el área disponible para la imagen es:
      const availablePageHeight = pageHeight - startY;
      // Se calcula cuánto de la imagen (en altura) excede la primera página
      let remainingHeight = imgHeight - availablePageHeight;
  
      // Se agrega la imagen completa (en tamaño escalado) a la primera página
      // Nota: jsPDF "pinta" toda la imagen, pero gracias a un offset negativo en páginas siguientes
      pdf.addImage(imgData, 'PNG', margin, startY, imgWidth, imgHeight);
  
      // Mientras quede parte de la imagen sin mostrar, se agregan nuevas páginas
      while (remainingHeight > 0) {
        pdf.addPage();
        /* 
          En cada página nueva se utiliza el mismo imgData pero se cambia el parámetro 'y'
          para mostrar la siguiente porción de la imagen. El truco consiste en aplicar
          un offset negativo que "sube" la imagen.
        */
        const offset = -(imgHeight - remainingHeight) + margin;
        pdf.addImage(imgData, 'PNG', margin, offset, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
      }
  
      pdf.save('resultado_puntuacion.pdf');
    });
  };

  // Función para obtener el estilo de las celdas de la tabla
  const getCellStyle = (respuestaUsuario, respuestaCorrecta) => {
    if (respuestaUsuario === respuestaCorrecta) {
      return { backgroundColor: "green", color: "white" };
    } else {
      return { backgroundColor: "red", color: "white" };
    }
  };

  return (
    <div
      id="puntuacion-container"
      style={{
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Poppins, sans-serif',
        padding: '30px 20px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        borderRadius: '20px',
      }}
    >
      <h3
        style={{
          color: '#3F51B5',
          fontSize: '36px',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '30px',
        }}
      >
        {nombreEstudiante} {apellidoEstudiante}, tu puntuación total es:
      </h3>
      <div
        style={{
          fontSize: '80px',
          fontWeight: 'bold',
          color: '#388E3C',
          margin: '20px 0',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        }}
      >
        {puntuacionTotal} / {puntuacion.length} {/* Número total de preguntas */}
      </div>
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '900px',
          marginBottom: '40px',
        }}
      >
        {puntuacion.length === 0 ? (
          <p
            style={{
              fontSize: '20px',
              fontWeight: '500',
              color: '#9E9E9E',
            }}
          >
            No se encontraron puntuaciones.
          </p>
        ) : (
          puntuacion.map((item, index) => {
            const filteredRespuestaCorrecta = (typeof item.respuestaCorrecta === 'string' ? item.respuestaCorrecta : '')
              .split(',')
              .map((part) => part.trim())
              .filter((part) => {
                const operacion = part.split('→')[0].trim();
                
                // Aquí debes verificar si la operación está en las respuestas incorrectas
                const esIncorrecta = item.respuestasIncorrectas.some((inc) => {
                  return inc === operacion; // Compara si la respuesta incorrecta contiene la operación
                });
          
                return !esIncorrecta; // Filtra las respuestas incorrectas
              })
              .join(', ');
          
            // Tu lógica adicional aquí
          
            return (
              <div
                key={index}
                style={{
                  backgroundColor: item.estado === 'Correcto' ? '#C8E6C9' : '#FFCDD2',
                  padding: '25px',
                  marginBottom: '20px',
                  borderRadius: '15px',
                  textAlign: 'left',
                  fontSize: '22px',
                  transition: 'background-color 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              >
                <strong
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                  }}
                >
                  Pregunta {item.pregunta}:
                </strong>
                <span
                  style={{
                    color: item.estado === 'Correcto' ? '#388E3C' : '#D32F2F',
                    fontSize: item.estado === 'Correcto' ? '30px' : '22px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    marginLeft: '10px',
                    transition: 'all 0.3s ease',
                    transform: item.estado === 'Correcto' ? 'scale(1.1)' : 'none',
                  }}
                >
                  {item.estado}
                </span>
                {/* Se muestra la puntuación individual de la pregunta sin alterar el diseño */}
                <p style={{ fontSize: '18px', fontWeight: '500', marginTop: '5px' }}>
                  Puntuación: {item.puntuacion}
                </p>

                {item.estado === 'Incorrecto' && (
                  <div style={{ marginTop: '10px' }}>
                    <strong>Respuesta Incorrecta:</strong>
                    {item.respuestasIncorrectas.length > 0 ? (
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {item.respuestasIncorrectas.map((respuesta, idx) => (
                          <li key={idx} style={{ color: '#D32F2F', fontSize: '16px' }}>
                            {respuesta.pregunta}: Usuario respondió{' '}
                            {respuesta.respuestaUsuario ? respuesta.respuestaUsuario : 'sin respuesta'}, Correcto era{' '}
                            {respuesta.respuestaCorrecta}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ color: '#D32F2F', fontSize: '16px' }}></p>
                    )}

                    <p
                      style={{
                        color: '#212121',
                        fontSize: '18px',
                        fontWeight: '500',
                      }}
                    >
                      Respuesta correcta: {filteredRespuestaCorrecta}
                    </p>
                  </div>
                )}
                {/* Mostrar la tabla solo para la Pregunta 2 */}
                {item.pregunta === 2 && (
                  <div style={{ marginTop: '20px' }}>
                    <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>
                      Respuestas de la Pregunta 2:
                    </h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                      <thead>
                        <tr>
                          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Antes</th>
                          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Entre</th>
                          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Posterior</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ ...getCellStyle("antes1"), padding: '10px', border: '1px solid #ddd' }}>
                            {respuestasUsuarioP2.antes1}
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{respuestasUsuarioP2.entre1}</td>
                          <td style={{ ...getCellStyle("posterior1"), padding: '10px', border: '1px solid #ddd' }}>
                            {respuestasUsuarioP2.posterior1}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            {respuestasUsuarioP2.antes2}
                          </td>
                          <td style={{ ...getCellStyle("entre2"), padding: '10px', border: '1px solid #ddd' }}>
                            {respuestasUsuarioP2.entre2}
                          </td>
                          <td style={{ ...getCellStyle("posterior2"), padding: '10px', border: '1px solid #ddd' }}>
                            {respuestasUsuarioP2.posterior2}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ ...getCellStyle("antes3"), padding: '10px', border: '1px solid #ddd' }}>
                            {respuestasUsuarioP2.antes3}
                          </td>
                          <td style={{ ...getCellStyle("entre3"), padding: '10px', border: '1px solid #ddd' }}>
                            {respuestasUsuarioP2.entre3}
                          </td>
                          <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            {respuestasUsuarioP2.posterior3}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <button
        onClick={descargarPDF}
        style={{
          backgroundColor: '#3F51B5',
          color: '#FFFFFF',
          padding: '12px 30px',
          fontSize: '20px',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        Descargar PDF
      </button>
      <button
          onClick={() => navigate('/materias/4to')}
          style={{
            backgroundColor: '#FF5722',
            color: '#fff',
            padding: '15px 30px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          Regresar
        </button>
    </div>
  );
};

export default Puntuacion;
