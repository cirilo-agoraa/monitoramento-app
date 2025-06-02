import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [process, setProcess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    processName: "",
    processHour: "",
    userAutomacao: "",
    description: "",
  });

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:9998/api/process/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProcess(data.process);
        setForm({
          processName: data.process.processName || "",
          processHour: data.process.processHour || "",
          userAutomacao: data.process.userAutomacao || "",
          description: data.process.description || "",
          isLoop: data.process.isLoop ?? true, // isLoop recebe isActive

        });
      })
      .catch(() => alert("Erro ao carregar processo"))
      .finally(() => setLoading(false));
  }, [id]);

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:9998/process/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert("Processo atualizado com sucesso!");
        navigate(`/process/${id}`);
      } else {
        alert("Erro ao atualizar o processo. Tente novamente.");
      }
    } catch (error) {
      alert("Erro ao atualizar o processo. Tente novamente.");
    }
  }

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-4 d-flex-center">
      <div className="container w-50">
        <div className="edit-header">
          <button
            onClick={() => navigate(`/process/${id}`)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: 16,
            }}
            title="Voltar"
          >
            <img src="/images/left-arrow.png" alt="return" height="30" width="30" />
          </button>
          <h1 style={{ margin: 0, textAlign: "center", flex: 1 }}>
            Editar: {process?.processName}
          </h1>
        </div>
        <form className="p-4" onSubmit={handleSave}>
          <div className="form-group mb-2">
            <label htmlFor="processName" className="process-title">
              Nome do Processo:
            </label>
            <input
              type="text"
              id="processName"
              name="processName"
              value={form.processName}
              onChange={handleChange}
              required
              className="w-100 p-2"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="processHour" className="process-title">
              Hora do Processo:
            </label>
            <input
              type="time"
              id="processHour"
              name="processHour"
              value={form.processHour}
              onChange={handleChange}
              required
              className="w-100 p-2"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="userAutomacao" className="process-title">
              Usuário Automação:
            </label>
            <input
              type="text"
              id="userAutomacao"
              name="userAutomacao"
              value={form.userAutomacao}
              onChange={handleChange}
              required
              className="w-100 p-2"
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="description" className="process-title">
              Descrição:
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              className="w-100 p-2"
            />
          </div>

          <div className="form-group mb-2 d-flex align-items-center">
            <label htmlFor="isActive" className="process-title" style={{ marginRight: 8 }}>
              Ativo:
            </label>
            <input
              type="checkbox"
              id="isLoop"
              name="isLoop"
              checked={form.isLoop}
              onChange={handleChange}
              style={{ width: 20, height: 20 }}
            />
          </div>

          <div className="form-group d-flex-end justify-content-between mt-2">
            <button type="submit" className="p-4">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;