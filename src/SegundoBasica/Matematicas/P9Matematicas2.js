/* eslint-disable no-unused-vars */

import React, { useState } from "react";

// Componente para mostrar el número
const Numero = () => {
  return (
    <div className="seccion">
      <h3 className="titulo">Número</h3>
      <div className="numero">31</div>
    </div>
  );
};

// Componente para la descomposición
const Descomposicion = ({ decenas, setDecenas, unidades, setUnidades }) => {
  return (
    <div className="seccion">
      <h3 className="titulo">Descomposición</h3>
      <div className="inputs">
        <label>D: </label>
        <input
          type="number"
          value={decenas}
          onChange={(e) => setDecenas(e.target.value)}
        />
        <label>U: </label>
        <input
          type="number"
          value={unidades}
          onChange={(e) => setUnidades(e.target.value)}
        />
      </div>
    </div>
  );
};

// Componente para el ábaco
const Abaco = ({ abacoD, setAbacoD, abacoU, setAbacoU }) => {
  const generarCirculos = (cantidad, color) => {
    return Array.from({ length: cantidad }, (_, index) => (
      <div
        key={index}
        className="circulo"
        style={{
          backgroundColor: color, // Aplicando color dinámicamente
        }}
      ></div>
    ));
  };

  return (
    <div className="seccion">
      <h3 className="titulo">Ábaco</h3>
      <div className="inputs">
        <label>D: </label>
        <input
          type="number"
          value={abacoD}
          onChange={(e) => setAbacoD(e.target.value)}
        />
        <label>U: </label>
        <input
          type="number"
          value={abacoU}
          onChange={(e) => setAbacoU(e.target.value)}
        />
      </div>
      <div className="abaco">
        <div className="columna">{generarCirculos(Number(abacoD), "blue")}</div>
        <div className="columna">{generarCirculos(Number(abacoU), "tomato")}</div>
      </div>
    </div>
  );
};


// Componente principal Pregunta9
const Pregunta9 = ({ nextQuestion }) => {
  const [decenas, setDecenas] = useState("");
  const [unidades, setUnidades] = useState("");
  const [abacoD, setAbacoD] = useState("");
  const [abacoU, setAbacoU] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  // Respuesta correcta para validación
  const correctDecenas = 30;  // Descomposición correcta en decenas
  const correctUnidades = 1;  // Descomposición correcta en unidades

  // Respuesta correcta para validación en el ábaco
  const correctAbacoD = 3;  // Ábaco, 3 círculos en la columna de decenas
  const correctAbacoU = 1;  // Ábaco, 1 círculo en la columna de unidades

  // Lógica para validar la respuesta
  const validateAnswer = () => {
    const isDecenasCorrect = Number(decenas) === correctDecenas;
    const isUnidadesCorrect = Number(unidades) === correctUnidades;
    const isAbacoDCorrect = Number(abacoD) === correctAbacoD;
    const isAbacoUCorrect = Number(abacoU) === correctAbacoU;

    return isDecenasCorrect && isUnidadesCorrect && isAbacoDCorrect && isAbacoUCorrect;
  };

  const handleNext = () => {
    const isCorrect = validateAnswer();
    setSubmitted(true);
    setCorrect(isCorrect);

    const newScore = isCorrect ? 1 : 0;
    const responses = [
      {
        question: "Descomposición de 31",
        decenas: "30",  // Descomposición correcta
        unidades: "1",  // Descomposición correcta
        isCorrect,  // Resultado de la validación
      },
      {
        question: "Ábaco",
        abacoD: 3,  // Ábaco: 3 para decenas
        abacoU: 1,  // Ábaco: 1 para unidades
        isCorrect,  // Resultado de la validación
      }
    ];

    const resultadoP9 = {
      correcta: correct,  // Aquí validas si la respuesta es correcta o no
      respuestaUsuario: [
        { descomposicion: `${decenas},${unidades}` },
        { abaco: `${abacoD},${abacoU}` },
      ],
      respuestaCorrecta: ["Ábaco=30,1" ,"Descomposición=3,1"].join(" , "),  // Descomposición correcta: 30 decenas y 1 unidad, Ábaco: 3 decenas y 1 unidad
      puntuacion: correct ? 1 : 0,  // Si la respuesta es correcta, se otorga 1 punto
      mensajeResultado:
        correct
          ? `Pregunta 9: CORRECTO! Puntaje: 1 / 1`
          : `Pregunta 9: INCORRECTO. Respuesta correcta: Descomposición=30,1, Ábaco=3,1. Respuestas incorrectas: ${
              decenas !== "30" || unidades !== "1" || abacoD !== "3" || abacoU !== "1"
                ? "Sí"
                : "No"
            }`,
    };
    
    localStorage.setItem("puntuacionp_P9", JSON.stringify(resultadoP9));
    nextQuestion(correct ? 1 : 0);  // Pasar al siguiente question con la puntuación obtenida
  };

  return (
    <>
      <style>
        {`
          .contenedor {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
            padding: 40px;
          }

          .contenedor > p {
            font-size: 1.5rem;
            margin-bottom: 20px;
          }

          .contenedor > .secciones {
            display: flex;
            justify-content: center;
            gap: 70px;
            width: 200%;
            flex-wrap: wrap;
          }

          .seccion {
            width: 300px;
            padding: 50px;
            background-color:rgb(249, 249, 249);
            border-radius: 10px;
            border: 2px solid #ccc;
            box-sizing: border-box;
            text-align: center;
          }

          .titulo {
            font-size: 1.8rem;
            margin-bottom: 10px;
            font-weight: bold;
          }

          .inputs {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
          }

          .inputs input {
            width: 80px;
            text-align: center;
            font-size: 2.5rem;
          }

          .abaco {
            display: flex;
            font-size: 2.5rem;
            justify-content: space-between;
            margin-top: 10px;
          }

          .columna {
            display: flex;
            flex-direction: column-reverse;
            align-items: center;
            height: 100px;
            width: 50px;
            border: 2px solid #555;
            padding: 5px;
          }

          .circulo {
            width: 15px;
            height: 15px;
            background-color: blue;
            border-radius: 50%;
            margin: 2px;
          }

          .resultado {
            margin-top: 30px;
            font-size: 1.4rem;
            font-weight: bold;
          }
          .numero {
          font-size: 4rem;  /* Tamaño del número 31 */
          font-weight: bold;
        }
        `}
      </style>

      <div className="contenedor">
      <h2 style={{ color: "#FF5733", fontSize: "2em" }}>
      🐱‍🚀Pregunta 9🐱‍🚀
      </h2>
        <p>Orden de la pregunta: ¿Cuál es la descomposición de 31?</p>

        <div className="secciones">
          <Numero />
          <Descomposicion
            decenas={decenas}
            setDecenas={setDecenas}
            unidades={unidades}
            setUnidades={setUnidades}
          />
          <Abaco
            abacoD={abacoD}
            setAbacoD={setAbacoD}
            abacoU={abacoU}
            setAbacoU={setAbacoU}
          />
        </div>

        <button
        onClick={handleNext}
        style={{
          backgroundColor: "#B2EBF2", // Rosa brillante
      color: "#212121",
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
        ¡Siguiente!🚀
      </button>
      </div>
    </>
  );
};

export default Pregunta9;
