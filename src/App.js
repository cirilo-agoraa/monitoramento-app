import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tasks from "./views/Tasks";
import Pannel from "./views/Pannel";
import Detail from "./views/Detail";
import Dashboard from "./views/Dashboard";
import Edit from "./views/Edit";
// Importe outras views conforme necessário

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tarefas" element={<Tasks />} />
        <Route path="/pannel" element={<Pannel />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/process/:id" element={<Detail />} />
        <Route path="/edit/:id" element={<Edit />} />
        {/* Adicione outras rotas aqui */}
        
        <Route path="*" element={<Navigate to="/tarefas" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;