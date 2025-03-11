import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Matematicas2do from "./SegundoBasica/Matematicas/indexMatematicas2do";
import LectoEscritura from "./SegundoBasica/Lecto-Escritura/indexLectoLectura";
import Matematicas3ro from "./TerceroBasica/Matematicas/indexMatematicas3ro";
import Lectura3ro from "./TerceroBasica/Lectura3ro";
import Escritura3ro from "./TerceroBasica/Escritura3ro";
import Matematicas4to from "./CuartoBasica/Matematicas/indexMatematicas4";
import Lectura4to from "./CuartoBasica/Lectura4to";
import Escritura4to from "./CuartoBasica/Escritura4to";

const Evaluacion = () => {
  const { anio, materia } = useParams();
  const location = useLocation();
  const { nombre, apellido } = location.state || { nombre: "", apellido: "" };

  const renderEvaluacion = () => {
    if (anio === "2do") {
      if (materia === "Matematicas") return <Matematicas2do />;
      if (materia === "LectoEscritura") return <LectoEscritura nombreEstudiante={`${nombre} ${apellido}`}/>;
    } else if (anio === "3ro") {
      if (materia === "Matematicas") return <Matematicas3ro/>;
      if (materia === "Lectura") return <Lectura3ro nombreEstudiante={`${nombre} ${apellido}`}/>;
      if (materia === "Escritura") return <Escritura3ro nombreEstudiante={`${nombre} ${apellido}`} />;
    } else if (anio === "4to") {
      if (materia === "Matematicas") return <Matematicas4to />;
      if (materia === "Lectura") return <Lectura4to />;
      if (materia === "Escritura") return <Escritura4to nombreEstudiante={`${nombre} ${apellido}`} />;
    }
    return <p>La evaluación solicitada no está disponible.</p>;
  };

  return <div>{renderEvaluacion()}</div>;
};

export default Evaluacion;
