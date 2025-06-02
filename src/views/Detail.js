import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import "../App.css";

function dateToPtBr(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [process, setProcess] = useState(null);
  const [processHistory, setProcessHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:9998/api/process/${id}`)
      .then(res => res.json())
      .then(data => {
        setProcess(data.process);
        setProcessHistory(data.processHistory || []);
      })
      .catch(() => {
        setProcess(null);
        setProcessHistory([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="p-4 d-flex-center">
      <div className="container w-80">
        <div className="header py-4" style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={() => navigate('/tarefas')}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: 16
            }}
            title="Voltar"
          >
            <img src="/images/left-arrow.png" alt="return" height="30" width="30" />
          </button>
          <h1 style={{ margin: 0, textAlign: "center", flex: 1 }}>
            Processo : {process?.processName}
          </h1>
          <a href={`/edit/${process?.id}`}>
            <img src="/images/setting.png" alt="edit" height="30" width="30" />
          </a>
        </div>

        <div className="process-info">
          <p><strong>Hora do Processo:</strong> {process?.processHour}</p>
          <p><strong>Usuário Automação:</strong> {process?.userAutomacao}</p>
          <p><strong>Descrição: </strong> {process?.description}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Estado</th>
              <th>Mensagem</th>
              <th>Data do Registro</th>
            </tr>
          </thead>
          <tbody>
            {processHistory.map((processH, idx) => (
              <tr key={idx}>
                <td>{processH.status}</td>
                <td>{processH.message}</td>
                <td>{dateToPtBr(processH.date)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Total de Processos: {processHistory.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Detail;