import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Main from "./views/Main";
import GestionarFuncionarios from "./views/GestionarFuncionarios";
import Recargos from "./views/Recargos";
import Novedades from "./views/Novedades";
import Deducciones from "./views/Deducciones";
import Bonificaciones from "./views/Bonificaciones";
import Primas from "./views/Primas";
import Subsidios from "./views/Subsidios";
import Liquidaciones from "./views/Liquidaciones";
import Nominas from "./views/Nominas";
import Historico from "./views/Historico";
import Desprendible from "./views/Desprendible";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route
          path="/gestion-funcionarios"
          element={<GestionarFuncionarios />}
        />
        <Route path="/recargos" element={<Recargos />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/deducciones" element={<Deducciones />} />
        <Route path="/bonificaciones" element={<Bonificaciones />} />
        <Route path="/primas" element={<Primas />} />
        <Route path="/subsidios" element={<Subsidios />} />
        <Route path="/liquidaciones" element={<Liquidaciones />} />
        <Route path="/nomina" element={<Nominas />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/desprendible" element={<Desprendible />} />
      </Routes>
    </Router>
  );
}

export default App;
