import React, { useState } from "react";

const P7Matematicas3 = ({ nextQuestion }) => {
  // Estados para almacenar lo que se ha soltado en cada una de las 12 celdas de cada operación
  const [droppedValues1, setDroppedValues1] = useState(Array(12).fill(""));
  const [droppedValues2, setDroppedValues2] = useState(Array(12).fill(""));

  // Elementos para arrastrar
  const numbers = ["6", "3", "5", "3", "5", "2", "7", "8", "9"];
  const numbers1 = ["2", "2", "6", "1", "5", "1", "2", "4", "1"];
  const symbols = ["+", "-", "="];

  // Arreglos correctos (definen cómo deben quedar las celdas)
  const expectedGrid1 = ["", "6", "3", "5", "+", "3", "5", "2", "=", "9", "8", "7"];
  const expectedGrid2 = ["", "2", "2", "6", "-", "1", "1", "5", "=", "1", "1", "1"];

  // Manejo del "drop" de los elementos arrastrados
  const handleDrop = (e, index, setValues, values) => {
    const value = e.dataTransfer.getData("text");
    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);
  };

  const handleDragStart = (e, value) => {
    e.dataTransfer.setData("text", value);
  };

  // Renderizado de cada celda (drop zone)
  const renderDropZone = (index, setValues, values) => (
    <div
      onDrop={(e) => handleDrop(e, index, setValues, values)}
      onDragOver={(e) => e.preventDefault()}
      style={{
        width: "50px",
        height: "50px",
        border: "2px dashed #FFB6C1",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#000",
        margin: "0px",
      }}
    >
      {values[index]}
    </div>
  );

  // Renderizado de la operación completa (texto + cuadrícula de 12 celdas)
  const renderOperation = (operation, values, setValues) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        border: "3px solid #FF7043",
        borderRadius: "15px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#E1F5FE",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#7E57C2",
          borderRight: "3px solid #FF7043",
        }}
      >
        <span>{operation}</span>
      </div>
      <div
        style={{
          flex: 2,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          justifyContent: "center",
          alignItems: "center",
          gap: "2px",
          padding: "8px",
        }}
      >
        {Array.from({ length: 12 }).map((_, index) =>
          renderDropZone(index, setValues, values)
        )}
      </div>
    </div>
  );

  // Renderizado de los elementos arrastrables
  const renderDragNumbers = (items) => (
    <div style={{ marginTop: "8px", textAlign: "center" }}>
      <h3 style={{ color: "#FF7043",fontSize: "20px",}}>Números para arrastrar</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        {items.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#FFD54F",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              cursor: "grab",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
  const handleNext = () => {
    let score = 0;
    let isCorrectSuma = true;
    let isCorrectResta = true;
  
    // Verificar la suma
    for (let i = 0; i < expectedGrid1.length; i++) {
      if (expectedGrid1[i] !== "" && droppedValues1[i] !== expectedGrid1[i]) {
        isCorrectSuma = false;
        break; // Si alguna respuesta en la suma es incorrecta, no continuamos verificando
      }
    }
  
    // Verificar la resta
    for (let i = 0; i < expectedGrid2.length; i++) {
      if (expectedGrid2[i] !== "" && droppedValues2[i] !== expectedGrid2[i]) {
        isCorrectResta = false;
        break; // Si alguna respuesta en la resta es incorrecta, no continuamos verificando
      }
    }
  
    // Sumar los puntajes de las respuestas correctas
    if (isCorrectSuma) score += 0.5;
    if (isCorrectResta) score += 0.5;
  
    // Detalle de las respuestas para la suma
    const detalleRespuestasSuma = droppedValues1.map((respuesta, index) => ({
      pregunta: `Celda ${index + 1} (Suma)`,
      respuestaUsuario: respuesta,
      respuestaCorrecta: expectedGrid1[index],
      esCorrecta: respuesta === expectedGrid1[index],
    }));
  
    // Detalle de las respuestas para la resta
    const detalleRespuestasResta = droppedValues2.map((respuesta, index) => ({
      pregunta: `Celda ${index + 1} (Resta)`,
      respuestaUsuario: respuesta,
      respuestaCorrecta: expectedGrid2[index],
      esCorrecta: respuesta === expectedGrid2[index],
    }));
  
    // Generar el mensaje de resultado
    const resultado = {
      correcta: isCorrectSuma && isCorrectResta,
      respuestaCorrecta: isCorrectSuma && isCorrectResta
        ? "Correcto"
        : `:\nSuma: ${expectedGrid1.join(' ')}\nResta: ${expectedGrid2.join(' ')}`,
      puntuacion: score,
      detalleRespuestasSuma: detalleRespuestasSuma,
      detalleRespuestasResta: detalleRespuestasResta,
      respuestasIncorrectas: [
        ...detalleRespuestasSuma.filter((r) => !r.esCorrecta),
        ...detalleRespuestasResta.filter((r) => !r.esCorrecta)
      ],
      mensajeResultado:
        isCorrectSuma && isCorrectResta
          ? "Pregunta 7: CORRECTO"
          : `Pregunta 7: INCORRECTO\nRespuestas incorrectas:\n${
              [
                ...detalleRespuestasSuma.filter((r) => !r.esCorrecta),
                ...detalleRespuestasResta.filter((r) => !r.esCorrecta)
              ]
                .map(
                  (r) =>
                    `${r.pregunta}: Usuario respondió ${r.respuestaUsuario}, Correcto era ${r.respuestaCorrecta}`
                )
                .join("\n")
            }`,
    };
  
    // Guardar el resultado en localStorage
    localStorage.setItem("puntuacionM3_P7", JSON.stringify(resultado));
  
    // Pasar al siguiente cuestionario con el puntaje obtenido
    nextQuestion(score);
  };
  

  return (
    <div style={{ padding: "10px", backgroundColor: "#F3E5F5", minHeight: "85vh" }}>
        <h1 style={{ fontSize: "2.5 em", color: "#FF6347",fontFamily: "'Livvic', sans-serif"}}>🎮📒Pregunta 7🎮📒</h1>   
           <h2 style={{ color: "#8BC34A", textAlign: "center", marginBottom: "20px" }}>
        Resuelve las Operaciones
      </h2>

      {/* Operación 1: Suma */}
      {renderOperation("635 + 352 =", droppedValues1, setDroppedValues1)}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>{renderDragNumbers(numbers.concat(symbols))}</div>
      </div>

      {/* Operación 2: Resta */}
      {renderOperation("226 - 115 =", droppedValues2, setDroppedValues2)}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>{renderDragNumbers(numbers1.concat(symbols))}</div>
      </div>

      {/* Botón Siguiente */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={handleNext}
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
    </div>
  );
};

export default P7Matematicas3;
