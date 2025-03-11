import { useState, useEffect, useCallback } from "react";
import ImgNadar from "../../imagenes/logoNadar.png";
import ImgAmanecer from "../../imagenes/logoAmanecer.png";
import ImgMono from "../../imagenes/logoMono.jpg";
import ImgDado from "../../imagenes/logoDado.jpg";
import "./Preguntas.css";

const oraciones = [
  {
    textoOriginal: "Diana [ImgNadar] en la [ImgAmanecer]",
    textoEditable: "Diana [ ] en la [ ]",
    opciones: ["nada", "mañana"],
    imagenes: [ImgNadar, ImgAmanecer],
    correctas: { 0: "nada", 1: "mañana" },
    color: "#FF6347",
  },
  {
    textoOriginal: "Un [ImgMono] dañó un [ImgDado]",
    textoEditable: "Un [ ] dañó un [ ]",
    opciones: ["mono", "dado"],
    imagenes: [ImgMono, ImgDado],
    correctas: { 0: "mono", 1: "dado" },
    color: "#4682B4",
  },
];

const P2LectoEscritura2 = ({ onAnswer }) => {
  const [respuestas, setRespuestas] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = useCallback((palabra, oracionIndex) => {
    setDraggedItem({ palabra, oracionIndex });
  }, []);

  const handleDrop = useCallback((oracionIndex, posicion) => {
    if (!draggedItem || draggedItem.oracionIndex !== oracionIndex) return;
    
    setRespuestas(prev => {
      const newKey = `pregunta2-${oracionIndex}-${posicion}`;
      const newState = { 
        ...prev, 
        [newKey]: draggedItem.palabra 
      };
      
      // Verificar si todas las respuestas están completas
      const totalEsperado = oraciones.reduce((acc, oracion) => 
        acc + (oracion.textoEditable.match(/\[ \]/g) || []).length, 0);
      
      if (Object.keys(newState).length === totalEsperado) {
        onAnswer("pregunta2", newState);
      }

      return newState;
    });
    
    setDraggedItem(null);
  }, [draggedItem, onAnswer]);

  const renderOracion = useCallback((oracion, indexOracion) => {
    let posicion = 0;
    return oracion.textoEditable.split(/(\[ \])/g).map((fragmento, i) => {
      if (fragmento === "[ ]") {
        const currentPos = posicion++;
        const respuestaKey = `pregunta2-${indexOracion}-${currentPos}`;
        return (
          <div
            key={`pos-${indexOracion}-${currentPos}`}
            className={`drop-zone ${respuestas[respuestaKey] ? "filled" : ""}`}
            onDrop={() => handleDrop(indexOracion, currentPos)}
            onDragOver={(e) => e.preventDefault()}
          >
            {respuestas[respuestaKey] || "Suelta aquí"}
          </div>
        );
      }
      return <span key={i} className="palabra-fija">{fragmento}</span>;
    });
  }, [respuestas, handleDrop]);

  useEffect(() => {
    const totalRespuestas = oraciones.reduce((acc, oracion) => 
      acc + (oracion.textoEditable.match(/\[ \]/g) || []).length, 0);
    
    if (Object.keys(respuestas).length === totalRespuestas) {
      onAnswer("pregunta2", respuestas);
    }
  }, [respuestas, onAnswer]);

  return (
    <div className="pregunta-container">
      <h3>Arrastra las palabras correctas a los recuadros</h3>
      {oraciones.map((oracion, indexOracion) => (
        <div key={`oracion-${indexOracion}`} className="oracion-container">
          <div className="oracion-modelo">
            {oracion.textoOriginal.split(" ").map((fragmento, i) => {
              if (fragmento.startsWith("[Img")) {
                const imgIndex = fragmento === "[ImgNadar]" || fragmento === "[ImgMono]" ? 0 : 1;
                return (
                  <img
                    key={i}
                    src={oracion.imagenes[imgIndex]}
                    alt="Referencia"
                    className="imagen-guia"
                  />
                );
              }
              return <span key={i} className="palabra-fija">{fragmento}</span>;
            })}
          </div>

          <div className="oracion-editable">{renderOracion(oracion, indexOracion)}</div>

          <div className="contenedor-opciones">
            {oracion.opciones.map((palabra) => {
              const isUsed = Object.values(respuestas).includes(palabra);
              return (
                <div
                  key={palabra}
                  className={`opcion-arrastrable ${isUsed ? "used" : ""}`}
                  style={{ backgroundColor: oracion.color }}
                  draggable={!isUsed}
                  onDragStart={() => handleDragStart(palabra, indexOracion)}
                >
                  {palabra}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default P2LectoEscritura2;