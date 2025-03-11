import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import P1Matematicas2 from './P1Matematicas2';
import P2Matematicas2 from './P2Matematicas2';
import P3Matematicas2 from './P3Matematicas2';
import P4Matematicas2 from './P4Matematicas2';
import P5Matematicas2 from './P5Matematicas2';
import P6Matematicas2 from './P6Matematicas2';
import P7Matematicas2 from './P7Matematicas2';
import P8Matematicas2 from './P8Matematicas2';
import P9Matematicas2 from './P9Matematicas2';
import P10Matematicas2 from './P10Matematicas2';
import P11Matematicas2 from './P11Matematicas2';
import Puntuacion from '../../TerceroBasica/Matematicas/Puntuacion3';

const Matematicas2do = () => {
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

  const preguntas = [
    <P1Matematicas2 nextQuestion={nextQuestion} />,
    <P2Matematicas2 nextQuestion={nextQuestion} />,
    <P3Matematicas2 nextQuestion={nextQuestion} />,
    <P4Matematicas2 nextQuestion={nextQuestion} />,
    <P5Matematicas2 nextQuestion={nextQuestion} />,
    <P6Matematicas2 nextQuestion={nextQuestion} />,
    <P7Matematicas2 nextQuestion={nextQuestion} />,
    <P8Matematicas2 nextQuestion={nextQuestion} />,
    <P9Matematicas2 nextQuestion={nextQuestion} />,
    <P10Matematicas2 nextQuestion={nextQuestion} />,
    <P11Matematicas2 nextQuestion={nextQuestion} />,
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

export default Matematicas2do;
