import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/sidebar";
import Spinner from "../components/spinner";
import "../App.css";
import Chart from "chart.js/auto";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const doughnutChartInstance = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:9998/api/dashboard${selectedGroupId ? `?groupId=${selectedGroupId}` : ""}`
    )
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData({ error: "Erro ao buscar dados" }))
      .finally(() => setLoading(false));
  }, [selectedGroupId]);

  useEffect(() => {
    if (!data) return;

    // Bar Chart
    if (barChartInstance.current) barChartInstance.current.destroy();
    if (barChartRef.current) {
      barChartInstance.current = new Chart(barChartRef.current, {
        type: "bar",
        data: {
          labels: [
            "Bases Exportadas",
            "Atividades Iniciais",
            "Rotinas Semanais",
            "Atividades Durante o Dia",
          ],
          datasets: [
            {
              label: "Abertos",
              data: data.dataAbertos,
              backgroundColor: "rgba(0, 128, 0, 0.6)",
            },
            {
              label: "Atenção",
              data: data.dataAtecao,
              backgroundColor: "rgba(255, 255, 0, 0.6)",
            },
            {
              label: "Revisar",
              data: data.dataRevisar,
              backgroundColor: "rgba(255, 0, 0, 0.6)",
            },
          ],
        },
        options: {
          responsive: true,
          indexAxis: "y",
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });
    }

    // Doughnut Chart
    if (doughnutChartInstance.current) doughnutChartInstance.current.destroy();
    if (doughnutChartRef.current) {
      doughnutChartInstance.current = new Chart(doughnutChartRef.current, {
        type: "doughnut",
        data: {
          labels: ["Aberto", "Atenção", "Revisar"],
          datasets: [
            {
              data: data.doughnutData,
              backgroundColor: [
                "rgba(0, 128, 0, 0.6)",
                "rgba(255, 255, 0, 0.6)",
                "rgba(255, 0, 0, 0.6)",
              ],
              borderColor: [
                "rgba(0, 128, 0, 1)",
                "rgba(255, 255, 0, 1)",
                "rgba(255, 0, 0, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => window.location.reload(), 120000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) return <Spinner />;

  const groups = data.groups || [];
  const notasLiberadasByLoja = data.notasLiberadasByLoja || {};
  const totalProcesses = data.totalProcesses || 0;

  return (
    <>
      <Sidebar activePage="Dashboard" />
      <div className="dash-body">
        <div>
          <div className="dash-filter">
            <div>
              <label htmlFor="group-select">Filtrar por grupo</label>
              <select
                id="group-select"
                name="groupId"
                className="form-control"
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
              >
                <option value="">Escolha um grupo</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.groupName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <h4 className="text-center">Quantidade de processos: {totalProcesses}</h4>

        <div className="d-flex w-100">
          <div className="chart-panel"></div>
          <div className="chart-panel d-grid-center">
            <div className="chart-container-barchart">
              <canvas ref={barChartRef} width="400" height="200"></canvas>
            </div>
            <div className="chart-container-doughnut">
              <canvas ref={doughnutChartRef} width="250" height="50"></canvas>
            </div>
          </div>
          <div className="chart-panel absolute-top">
            <div className="nf-container">
              <div>
                <h2>NFs liberadas por loja:</h2>
                <div className="container-count">
                  <b>Santa Maria de Jetibá:</b>{" "}
                  {notasLiberadasByLoja.SMJ?.toString() || "0"}
                </div>
                <div className="container-count">
                  <b>Santa Teresa:</b>{" "}
                  {notasLiberadasByLoja.STT?.toString() || "0"}
                </div>
                <div className="container-count">
                  <b>Vitória:</b>{" "}
                  {notasLiberadasByLoja.VIX?.toString() || "0"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;