import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Main from "./views/Main";
import GestionarFuncionarios from "./views/GestionarFuncionarios";
import Recargos from "./views/Recargos";

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
      </Routes>
    </Router>
  );
}

export default App;
