import { useState, useEffect } from "react"

const P7Matematicas2 = ({ nextQuestion }) => {
  const [order, setOrder] = useState([null, null, null])
  const [draggedNumber, setDraggedNumber] = useState(null)
  const [shuffledImages, setShuffledImages] = useState([])
  const [resultado, setResultado] = useState(null)

  const correctOrder = {
    ["/image/logoNido.jpeg"]: 1,
    ["/image/logoHuevoR.png"]: 2,
    ["/image/logoPato.png"]: 3,
  }

  useEffect(() => {
    const images = ["/image/logoNido.jpeg", "/image/logoHuevoR.png", "/image/logoPato.png"]
    setShuffledImages(images.sort(() => Math.random() - 0.5))
  }, [])

  const handleDragStart = (e, number) => {
    setDraggedNumber(number)
  }

  const handleDrop = (e, index) => {
    e.preventDefault()
    if (draggedNumber === null || order.includes(draggedNumber)) return
    const newOrder = [...order]
    newOrder[index] = draggedNumber
    setOrder(newOrder)
    setDraggedNumber(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }
  const handleNext = () => {
    // Verificar si el orden es correcto
    const isCorrect = order.every((num, index) => num === correctOrder[shuffledImages[index]]);
    const totalScore = isCorrect ? 1 : 0;

    // Generar las respuestas
    const respuestaUsuario = order.filter((num) => num !== null).join("-") || "No ingresó ninguna respuesta";
    const respuestaCorrecta = Object.values(correctOrder).join("-");

    // Crear el mensaje de resultado
    const mensajeResultado = `Pregunta 7: ${isCorrect ? "¡CORRECTO!" : "INCORRECTO"} \nPuntuación: ${totalScore} / 1`;

    // Guardar el resultado en localStorage
    const resultado = {
      correcta: isCorrect,
      respuestaUsuario: respuestaUsuario,
      respuestaCorrecta: ["Huevo", "Nido", "Pato"].join("-"),
      puntuacion: totalScore,
      mensajeResultado: mensajeResultado,
    };

    localStorage.setItem("puntuacionp_P7", JSON.stringify(resultado));

    // Llamar a la función nextQuestion con la puntuación obtenida
    nextQuestion(totalScore);
  };



  return (
    <div
      style={{
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h3 style={{ fontSize: "2.5em", color: "#FF6347" }}>🐱‍🚀Pregunta 7🐱‍🚀</h3>
      <h4>Ubique el signo correcto entre los números:</h4>

      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        {shuffledImages.map((img, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            style={{
              position: "relative",
              width: "180px",
              height: "160px",
              border: "3px dashed #FFA500",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFBEA",
            }}
          >
            <img src={img} alt={`Evento ${index}`} style={{ width: "120px", height: "120px" }} />
            {order[index] !== null && (
              <div
                style={{
                  position: "absolute",
                  top: "5px",
                  left: "5px",
                  width: "35px",
                  height: "35px",
                  backgroundColor: "#FFD700",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid #FF4500",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {order[index]}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        {[1, 2, 3].map((number) => (
          <div
            key={number}
            draggable
            onDragStart={(e) => handleDragStart(e, number)}
            style={{
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ADD8E6",
              borderRadius: "50%",
              cursor: "grab",
              border: "2px solid #000",
              color: "#000",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {number}
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        style={{
          backgroundColor: "#B2EBF2",
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

      {/* Mostrar el mensaje de resultado */}
      {resultado && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: resultado.correcta ? "#D4EDDA" : "#F8D7DA",
            border: "1px solid",
            borderColor: resultado.correcta ? "#C3E6CB" : "#F5C6CB",
            borderRadius: "10px",
            color: resultado.correcta ? "#155724" : "#721C24",
            fontWeight: "bold",
          }}
        >
        </div>
      )}
    </div>
  )
}

export default P7Matematicas2
