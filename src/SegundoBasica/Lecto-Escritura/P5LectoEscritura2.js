import React, { useEffect, useRef, useState, useMemo } from "react";
import { jsPlumb } from "jsplumb";
import "./Preguntas.css";

const P5LectoEscritura2 = ({ onAnswer }) => {
  const containerRef = useRef(null);
  const [disabledItems, setDisabledItems] = useState([]);
  const [, setRespuestas] = useState({}); // Removed unused variable
  const instanceRef = useRef(null);

  // Lista de oraciones con respuestas correctas
  const leftItems = useMemo(() => [
    { id: "text1", label: "Vito vende variedad de bebidas.", correct: "imgBebidas" },
    { id: "text2", label: "El pavo es muy bravo.", correct: "imgPavo" },
    { id: "text3", label: "La oveja de Viviana tiene lana verde.", correct: "imgOveja" }
  ], []);

  // Lista de imágenes
  const rightItems = useMemo(() => [
    { id: "imgOveja", src: '/image/logoOveja.jpg' },
    { id: "imgBebidas", src: "/image/logoBebidas.jpg" },
    { id: "imgPavo", src: "/image/logoPavo.jpg" },
  ], []);

  useEffect(() => {
    const instance = jsPlumb.getInstance();
    instanceRef.current = instance;
    instance.setContainer(containerRef.current);

    // Crear endpoints de las preguntas
    leftItems.forEach((item) => {
      instance.addEndpoint(item.id, {
        anchors: "Right",
        isSource: true,
        maxConnections: 1,
        endpoint: "Dot",
        connector: ["Bezier"],
        connectorOverlays: [["Arrow", { width: 10, length: 10, location: 1 }]],
      });
    });

    // Crear endpoints de las imágenes
    rightItems.forEach((item) => {
      instance.addEndpoint(item.id, {
        anchors: "Left",
        isTarget: true,
        maxConnections: 1,
        endpoint: "Dot",
      });
    });

    // Manejar las conexiones
    instance.bind("connection", (info) => {
      const { sourceId, targetId } = info.connection;


      setRespuestas((prev) => {
        const nuevasRespuestas = { ...prev, [sourceId]: targetId };

        if (typeof onAnswer === "function") {
          onAnswer("pregunta5", nuevasRespuestas);
        }

        return nuevasRespuestas;
      });

      setDisabledItems((prev) => [...prev, sourceId, targetId]);

      //  Repaint después de 50ms para asegurar persistencia visual
      setTimeout(() => {
        instance.repaintEverything();
      }, 50);
    });

    // Repaint después de montar la vista
    setTimeout(() => {
      instance.repaintEverything();
    }, 100);

    return () => {
      instance.reset();
      instance.unbind("connection");
    };

  }, [leftItems, rightItems, onAnswer]);

  const clearLines = () => {
    instanceRef.current.deleteEveryConnection();
    setDisabledItems([]);
    setRespuestas({});
    if (typeof onAnswer === "function") onAnswer("pregunta5", {});

    setTimeout(() => {
      instanceRef.current.repaintEverything();
    }, 50);
  };


  //  Repaint al cambiar disabledItems
  useEffect(() => {
    if (instanceRef.current) {
      setTimeout(() => {
        instanceRef.current.repaintEverything();
      }, 50);
    }
  }, [disabledItems]);

  return (
    <div ref={containerRef} className="p5-container">
      <h3>🎨 Une las oraciones con la imagen correcta 🎨</h3>

      <div className="p5-columns">
        <div className="p5-column p5-left">
          {leftItems.map(({ id, label }) => (
            <div id={id} key={id} className={`p5-item ${disabledItems.includes(id) ? "disabled" : ""}`}>
              {label}
            </div>
          ))}
        </div>

        <div className="p5-column p5-right">
          {rightItems.map(({ id, src }) => (
            <div id={id} key={id} className={`p5-image-container ${disabledItems.includes(id) ? "disabled" : ""}`}>
              <img src={src} alt="" className="p5-item-image" />
            </div>
          ))}
        </div>
      </div>

      <button className="p5-clear-button" onClick={clearLines}>🗑️ Borrar Líneas</button>
    </div>
  );
};


export default P5LectoEscritura2;