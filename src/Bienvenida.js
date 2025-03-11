import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const Bienvenida = () => {
  const { anio, materia } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { nombre, apellido } = location.state || { nombre: '', apellido: '' };

  const handleComenzar = () => {
    navigate(`/evaluacion/${anio}/${materia}/1`, { state: { nombre, apellido } });
  };

  const handleRegresar = () => {
    navigate(-1); // Vuelve a la página anterior
  };

  return (
    <div className="bienvenida">
      <div className="contenedor-tarjetabienvenida">
        {/* Título de bienvenida */}
        <div className="titulo-bienvenida">
          <h2>¡Hola, {nombre} {apellido}!</h2>
        </div>

        {/* Instrucciones simples */}
        <div className="instrucciones">
          <h4 className="titulo-instrucciones">¡Prepárate para jugar y aprender!</h4>
          <div className="lista-instrucciones">
            <div className="instruccion">
              <img src="/image/logoLeer.png" alt="Niño leyendo" className="icono" />
              <p>Escucha o lee las preguntas con atención.</p>
            </div>
            <div className="instruccion">
              <img src="/image/logoPensar.jpg" alt="Niño pensando" className="icono" />
              <p>Piensa en la respuesta correcta.</p>
            </div>
            <div className="instruccion">
              <img src="/image/logoEscibir.jpg" alt="Niño respondiendo" className="icono" />
              <p>Responde lo mejor que puedas. ¡Tú puedes!</p>
            </div>
          </div>
        </div>

        {/* Botones interactivos */}
        <div className="botones">
          <button className="boton-comenzar2" onClick={handleComenzar}>
            <span role="img" aria-label="estrella">
              ⭐
            </span> Comenzar
          </button>
          <button className="boton-regresar2" onClick={handleRegresar}>
            <span role="img" aria-label="flecha hacia atrás">
              🔙
            </span> Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bienvenida;
