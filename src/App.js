import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cursos from './Cursos';
import Materias from './Materias';
import Evaluacion from './Evaluacion';
import Bienvenida from './Bienvenida';
import PuntuacionSegundo from './SegundoBasica/Matematicas/Puntuacion2'; // Renombrado
import PuntuacionTercero from './TerceroBasica/Matematicas/Puntuacion3'; // Renombrado
import PuntuacionCuarto from './CuartoBasica/Matematicas/Puntuacion4'; // Renombrado

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/bienvenida/:anio/:materia" element={<Bienvenida />} />
        <Route path="/materias/:anio" element={<Materias />} />
        <Route path="/Evaluacion/:anio/:materia/:preguntaId" element={<Evaluacion />} />
        
        {/* 🔹 Rutas específicas para la puntuación de cada nivel */}
        <Route path="/puntuacion" element={<PuntuacionSegundo />} />
        <Route path="/puntuacion3" element={<PuntuacionTercero />} />
        <Route path="/puntuacion" element={<PuntuacionCuarto />} />
      </Routes>
    </Router>
  );
}

export default App;
