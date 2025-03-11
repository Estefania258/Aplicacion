import { useNavigate } from 'react-router-dom';
import './App.css';


function Cursos() {
  const navigate = useNavigate();

  const manejarClick = (anio) => {
    navigate(`/materias/${anio}`); // Redirige a la página de materias con el año seleccionado
  };

  return (
    <div className='cursos'>
      <div className="contenedor-tarjetaCursos">
    <div className="contenedor" > 
      <h2>Cursos</h2>
      <h2>Seleccionar el curso</h2>
      {/* Contenedor que envuelve los rectángulos en fila horizontal */}
     
        <div className="rectangulocurso" onClick={() => manejarClick('2do')}>
          2do de Básica
        </div>
        <div className="rectangulocurso" onClick={() => manejarClick('3ro')}>
          3ro de Básica
        </div>
        <div className="rectangulocurso" onClick={() => manejarClick('4to')}>
          4to de Básica
        </div>
      
      <button className="boton-regresar" onClick={() => navigate('/')}>
        Regresar
      </button>
    </div>
    </div>
    </div>
  );
}

export default Cursos;
