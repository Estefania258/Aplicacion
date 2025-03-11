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

  useEffect(() => {
    const nombre = sessionStorage.getItem('nombre');
    const apellido = sessionStorage.getItem('apellido');

    setNombreEstudiante(nombre || 'Invitado');
    setApellidoEstudiante(apellido || '');

    const resultados = [];
    let totalPuntuacion = 0; // Inicializamos la puntuación total

    Object.keys(localStorage).forEach((clave) => {
      if (clave.startsWith('puntuacionM3_P')) {
        const valor = JSON.parse(localStorage.getItem(clave));

        // Aseguramos que 'respuestasIncorrectas' sea un arreglo  
        const respuestasIncorrectas = Array.isArray(valor.respuestasIncorrectas)
          ? valor.respuestasIncorrectas
          : [];

        resultados.push({
          pregunta: parseInt(clave.replace('puntuacionM3_P', '')),
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

    html2canvas(input, { backgroundColor: null }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();

      const logoWidth = 50;
      const logoHeight = 15;
      const logoX = (pdf.internal.pageSize.width - logoWidth) / 2;
      const logoY = 10;

      pdf.addImage(LogoUDIPSAI, 'PNG', logoX, logoY, logoWidth, logoHeight);

      pdf.setFontSize(16);
      const textX = pdf.internal.pageSize.width / 2;
      const textY = logoY + logoHeight + 10;
      pdf.text("Evaluación Matemáticas Tercero de Básica", textX, textY, { align: "center" });

      pdf.setFontSize(10);
      pdf.text(`Fecha de descarga: ${fecha}`, 10, textY + 10);
      pdf.text(`Hora: ${hora}`, 10, textY + 14);

      const imgWidth = 180;
      const imgHeight = 250;
      const imgX = (pdf.internal.pageSize.width - imgWidth) / 2;
      const imgY = textY + 20;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);
      pdf.save('resultado_puntuacion.pdf');
    });
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
                const operacionNormalizada = operacion.replace('*', 'x');
                const esIncorrecta = item.respuestasIncorrectas.some((inc) => {
                  const incNormalizada = inc.pregunta.replace('*', 'x').trim();
                  return incNormalizada === operacionNormalizada;
                });
                return !esIncorrecta;
              })
              .join(', ');

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
              </div>
            );
          })
        )}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', gap: '40px' }}>
        <button
          onClick={descargarPDF}
          style={{
            backgroundColor: '#1976D2',
            color: '#fff',
            padding: '18px 30px',
            fontSize: '22px',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          Descargar PDF
        </button>
        <button
          onClick={() => navigate('/materias/4to')}
          style={{
            backgroundColor: '#F44336',
            color: '#fff',
            padding: '18px 30px',
            fontSize: '22px',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default Puntuacion;
