import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import P1Matematicas3 from './P1Matematicas3';
import P2Matematicas3 from './P2Matematicas3';
import P3Matematicas3 from './P3Matematicas3';
import P4Matematicas3 from './P4Matematicas3';
import P5Matematicas3 from './P5Matematicas3';
import P6Matematicas3 from './P6Matematicas3';
import P7Matematicas3 from './P7Matematicas3';
import P8Matematicas3 from './P8Matematicas3';
import P9Matematicas3 from './P9Matematicas3';
import P10Matematicas3 from './P10Matematicas3';
import P11Matematicas3 from './P11Matematicas3';
import Puntuacion from './Puntuacion3';

const Matematicas3ro = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  const totalPreguntas = 11;
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.5, y: -50 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' }
    );
  }, []);

  const nextQuestion = (puntos) => {
    setPuntuacionTotal((prev) => prev + puntos);
    if (currentQuestion < totalPreguntas + 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(1);
    setPuntuacionTotal(0);
  };

  // Array de componentes de preguntas
  const preguntas = [
    <P1Matematicas3 nextQuestion={nextQuestion} />,
    <P2Matematicas3 nextQuestion={nextQuestion} />,
    <P3Matematicas3 nextQuestion={nextQuestion} />,
    <P4Matematicas3 nextQuestion={nextQuestion} />,
    <P5Matematicas3 nextQuestion={nextQuestion} />,
    <P6Matematicas3 nextQuestion={nextQuestion} />,
    <P7Matematicas3 nextQuestion={nextQuestion} />,
    <P8Matematicas3 nextQuestion={nextQuestion} />,
    <P9Matematicas3 nextQuestion={nextQuestion} />,
    <P10Matematicas3 nextQuestion={nextQuestion} />,
    <P11Matematicas3 nextQuestion={nextQuestion} />,
    <Puntuacion
      restartQuiz={restartQuiz}
      puntuacion={puntuacionTotal}
      totalPreguntas={totalPreguntas}
    />,
  ];

  return (
    <div
      className="container"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <h1 ref={titleRef} className="animated-title">Prueba de Matemáticas</h1>

      {/* Renderiza la pregunta actual */}
      {preguntas[currentQuestion - 1]}

      <style jsx>{`
        .animated-title {
          font-size: 3.5em;
          font-family: 'Fredoka One', sans-serif;
          color: rgb(3, 3, 3);
          margin-bottom: 0px;
          padding: 5px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Matematicas3ro;
