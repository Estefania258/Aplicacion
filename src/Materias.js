import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

const Materias = () => {
  const { anio } = useParams();
  const navigate = useNavigate();
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [apellidoEstudiante, setApellidoEstudiante] = useState('');

  const manejarMateriaClick = (materia) => {
    setSelectedMateria(materia);
  };

  const manejarNombreSubmit = (e) => {
    e.preventDefault();

    if (nombreEstudiante.trim() === '' || apellidoEstudiante.trim() === '') {
      alert('Por favor, ingrese su nombre y apellido.');
      return;
    }

     // Guardar los datos del usuario en sessionStorage
     sessionStorage.setItem('nombre', nombreEstudiante);
     sessionStorage.setItem('apellido', apellidoEstudiante);
 
    navigate(`/bienvenida/${anio}/${selectedMateria}`, {
      state: { nombre: nombreEstudiante, apellido: apellidoEstudiante },
    });
  };
  return (
    <div className="contenedor-principal">
      <h2 className="titulo">Materias de {anio} de Básica</h2>
      <div className="contenedor-rectangulosMaterias">
        {/* Mostrar materias según el año */}
        {anio === '2do' && (
          <>
            <div className="rectangulo" onClick={() => manejarMateriaClick('Matematicas')}>
              <h2>Matemáticas</h2>
            </div>
            <div className="rectangulo" onClick={() => manejarMateriaClick('LectoEscritura')}>
              <h2>Lecto-Escritura</h2>  
            </div>
          </>
        )}
        {anio !== '2do' && (
          <>
            <div className="rectangulo" onClick={() => manejarMateriaClick('Matematicas')}>
            <h2>Matemáticas</h2>            </div>
            <div className="rectangulo" onClick={() => manejarMateriaClick('Lectura')}>
              <h2>Lectura</h2>  
            </div>
            <div className="rectangulo" onClick={() => manejarMateriaClick('Escritura')}>
              <h2>Escritura</h2>  
            </div>
          </>
        )}
      </div>

      {selectedMateria && (
        <div className="mensaje-bienvenida">
<h1
  style={{
    fontSize: "2.5em",
    color: "#212121", // Color negro
    fontFamily: "'Livvic', sans-serif",
    fontWeight: "bold", // Texto en negrita
    textShadow: "0 0 30px white, 0 0 50px white, 0 0 70px white, 0 0 100px white, 0 0 150px white" // Más capas de iluminación
  }}
>
  Bienvenido a {selectedMateria}
</h1>



          <form onSubmit={manejarNombreSubmit}>
            <input
              className="input-lindo"
              type="text"
              placeholder="Ingresa tu nombre"
              value={nombreEstudiante}
              onChange={(e) => setNombreEstudiante(e.target.value)}
              required
            />
            <input
              className="input-lindo"
              type="text"
              placeholder="Ingresa tu apellido"
              value={apellidoEstudiante}
              onChange={(e) => setApellidoEstudiante(e.target.value)}
              required
            />
          </form>
        </div>
      )}

      {/* Contenedor para botones Ingresar y Regresar */}
      <div className="contenedor-botones">
        {selectedMateria && (
          <button className="boton-ingresar" onClick={manejarNombreSubmit}>
            Ingresar
          </button>
        )}
        <button className="boton-regresar" onClick={() => navigate('/cursos')}>
          Regresar
        </button>
      </div>
    </div>
  );
};

export default Materias;
