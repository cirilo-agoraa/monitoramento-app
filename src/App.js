import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tasks from "./views/Tasks";
import Pannel from "./views/Pannel";
import Detail from "./views/Detail";
// Importe outras views conforme necessário

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tarefas" element={<Tasks />} />
        <Route path="/pannel" element={<Pannel />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/:id" element={<Detail />} />
        {/* Adicione outras rotas aqui */}
        
        <Route path="*" element={<Navigate to="/tarefas" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;