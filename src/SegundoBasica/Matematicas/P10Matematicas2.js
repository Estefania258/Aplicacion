
import { useState, useCallback } from "react"

const P10Matematicas2 = ({ nextQuestion }) => {
  const [eduCanicas, setEduCanicas] = useState("")
  const [andresCanicas, setAndresCanicas] = useState("")
  const [totalCanicas, setTotalCanicas] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [correctAnswer] = useState(59)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handleSumar = useCallback(() => {
    const edu = Number.parseInt(eduCanicas, 10) || 0
    const andres = Number.parseInt(andresCanicas, 10) || 0
    const total = edu + andres

    console.log("Valores:", { edu, andres, total, correctAnswer })

    setTotalCanicas(total)
    const correct = total === correctAnswer
    setIsCorrect(correct)

    console.log("¿Es correcto?", correct)
  }, [eduCanicas, andresCanicas, correctAnswer])

 
  const handleNext = () => {
    if (totalCanicas === null) {
      alert("Por favor, suma las canicas antes de continuar.")
      return
    }

    const newScore = isCorrect ? 1 : 0

    const resultData = {
      correcta: isCorrect,
      puntuacion: newScore,
      respuestaCorrecta: String(correctAnswer), // Convertir a string para consistencia
      respuestasIncorrectas: isCorrect
        ? []
        : [
            {
              pregunta: "Suma de canicas",
              respuestaUsuario: String(totalCanicas),
              respuestaCorrecta: String(correctAnswer),
            },
          ],
    }

    console.log("Guardando resultado:", resultData)
    localStorage.setItem("puntuacionp_P10", JSON.stringify(resultData))

    setShowResult(true)
    setScore(newScore)
    nextQuestion(newScore)
  }

  return (
    <div
      style={{
        fontFamily: "'Comic Sans MS', cursive, sans-serif",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f0f8ff",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "20px auto",
      }}
    >
      <h2 style={{ color: "#FF5733", fontSize: "2em" }}>🐱‍🚀Pregunta 10🐱‍🚀</h2>
      <p style={{ fontSize: "25px", color: "#212121" }}>¡Vamos a sumar las canicas!</p>
      <p style={{ fontSize: "25px", color: "#212121" }}>
        Eduardo tiene 18 canicas y Andrés tiene 41 canicas. Ayúdalos a saber cuántas tienen en total.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#e6f7ff",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(253, 253, 253, 0.1)",
        }}
      >
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#E6E6FA",
            borderRadius: "10px",
            fontSize: "20px",
            color: "#000",
          }}
        >
          Eduardo:
          <input
            type="number"
            value={eduCanicas}
            onChange={(e) => setEduCanicas(e.target.value)}
            placeholder="Cantidad"
            style={{
              marginTop: "10px",
              padding: "5px",
              fontSize: "20px",
              width: "80px",
              textAlign: "center",
            }}
          />
        </div>

        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#FAFAD2",
            borderRadius: "10px",
            fontSize: "20px",
            color: "#000",
          }}
        >
          Andrés:
          <input
            type="number"
            value={andresCanicas}
            onChange={(e) => setAndresCanicas(e.target.value)}
              aceholder="Cantidad"
            style={{
              marginTop: "10px",
              padding: "5px",
              fontSize: "20px",
              width: "80px",
              textAlign: "center",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <button
          onClick={handleSumar}
          style={{
            padding: "12px 30px",
            backgroundColor: "#1976D2",
            color: "#FFF",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            marginTop: "20px",
          }}
        >
          Sumar Canicas
        </button>

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
          }}
        >
          ¡Siguiente!🚀
        </button>
      </div>

      {totalCanicas !== null && (
        <div
          style={{
            marginTop: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            color: isCorrect ? "#4CAF50" : "#F44336",
          }}
        >
          El total de canicas es: {totalCanicas}
        </div>
      )}

      {showResult && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            fontSize: "24px",
            fontWeight: "bold",
            color: isCorrect ? "#4CAF50" : "#FF5733",
            backgroundColor: isCorrect ? "#E8F5E9" : "#FFEBEE",
            borderRadius: "10px",
          }}
        >
          <div>Pregunta 10: {isCorrect ? "CORRECTO" : "INCORRECTO"}</div>
          <div style={{ fontSize: "20px", marginTop: "10px" }}>Puntuación: {score}</div>
          {!isCorrect && (
            <>
              <div style={{ fontSize: "20px", marginTop: "10px" }}>Respuesta Incorrecta: {totalCanicas}</div>
              <div style={{ fontSize: "20px", marginTop: "5px" }}>Respuesta correcta: {correctAnswer}</div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default P10Matematicas2

