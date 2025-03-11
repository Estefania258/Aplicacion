import { useNavigate } from 'react-router-dom';
import './App.css';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="App">
      {/* Cabecera con el logo */}
      <header className="header-container">
        <img src='/image/logoUDIPSAI.jpg' alt="Logo UDIPSAI" className="logo-header" />
      </header>

      <div className="titulo-cuadrado">
        <h1>Exploradores del Conocimiento ¡Recupera lo perdido!</h1>
        <button
          className="boton-comenzar"
          onClick={() => navigate('/cursos')}
        >
          ¡Comenzar!
        </button>
      </div>
    </div>
  );
}

export default Home;
