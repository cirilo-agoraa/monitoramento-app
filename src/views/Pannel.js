import  { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Spinner from "../components/spinner";
import "../App.css";

function Pannel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:9998/api")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData({ error: "Erro ao buscar dados" }))
      .finally(() => setLoading(false));

    // Atualiza a cada 2 minutos
    const interval = setInterval(() => window.location.reload(), 120000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) return <Spinner />;

  const allStatusesCounts = data.allStatusesCounts || {};

  // Status dos serviços simulados (ajuste conforme sua API)
  const {
    isPort4000inUse,
    isPort3000inUse,
    isAutomacao00inUse,
    isAutomacao01inUse,
    isAutomacao02inUse,
    isAutomacao03inUse,
    isAutomacao04inUse,
    isAutomacao05inUse,
    isChatsacChannelOnline,
    isTresmanChannelOnline,
    isMercappChannelOnline,
    isAndreChannelOnline,
    isDeliveryChannelOnline,
  } = data;

  return (
    <>
      <Sidebar activePage="Geral" />
      <div className="main-panel">
        <div className="process-panel">
          {/* Status Panel */}
          <div className="status-panel">
            <div>
              <div className="w-100 d-flex-center" style={{ fontSize: "1rem", fontWeight: 600 }}>
                Normal
              </div>
              <div className="w-100 d-flex-center">
                <div className="green-ballon pointer">
                  {String(allStatusesCounts[1] ?? "0")}
                </div>
              </div>
            </div>
            <div>
              <div className="w-100 d-flex-center" style={{ fontSize: "1rem", fontWeight: 600 }}>
                Atenção
              </div>
              <div className="w-100 d-flex-center">
                <div className="yellow-ballon pointer">
                  {String(allStatusesCounts[2] ?? "0")}
                </div>
              </div>
            </div>
            <div>
              <div className="w-100 d-flex-center" style={{ fontSize: "1rem", fontWeight: 600 }}>
                Revisar
              </div>
              <div className="w-100 d-flex-center">
                <div className="red-ballon pointer">
                  {String(allStatusesCounts[3] ?? "0")}
                </div>
              </div>
            </div>
          </div>
          {/* Cards centralizados */}
          <div className="panel-columns">
            {/* Coluna 1: Portais */}
            <div className="panel-col">
              <div className="process-title">Portais</div>
              <div className="panel-box">
                <div className="fs-16">Chamados:</div>
                <div className="d-flex-center">
                  {isPort4000inUse ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
              <div className="panel-box">
                <div className="fs-16">Novo Portal:</div>
                <div className="d-flex-center">
                  {isPort3000inUse ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
            </div>
            {/* Coluna 2: Bots */}
            <div className="panel-col">
              <div className="process-title">Bots</div>
              <div className="panel-box">
                <div className="fs-16">Automação00:</div>
                <div className="d-flex-center">
                  {isAutomacao00inUse ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
              <div className="panel-box">
                <div className="fs-16">Automação01:</div>
                <div className="d-flex-center">
                  {isAutomacao01inUse ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
              <div className="panel-box">
                <div className="fs-16">Automação02:</div>
                <div className="d-flex-center">
                  {isAutomacao02inUse ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
              <div className="panel-box">
                <div className="fs-16">Automação03:</div>
                <div className="d-flex-center">
                  {isAutomacao03inUse ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
              <div className="panel-box">
                <div className="fs-16">Automação04:</div>
                <div className="d-flex-center">
                  {isAutomacao04inUse ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
              <div className="panel-box">
                <div className="fs-16">Automação05:</div>
                <div className="d-flex-center">
                  {isAutomacao05inUse ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
            </div>
            {/* Coluna 3: Chatsac */}
            <div className="panel-col">
              <div className="process-title">Chatsac</div>
              <div className="panel-box">
                <div className="fs-16">Chatsac:</div>
                <div className="d-flex-center">
                  {isChatsacChannelOnline ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
              <div className="panel-box">
                <div className="fs-16">Tresmann:</div>
                <div className="d-flex-center">
                  {isTresmanChannelOnline ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
              <div className="panel-box">
                <div className="fs-16">Andre Candido Pro (5807):</div>
                <div className="d-flex-center">
                  {isMercappChannelOnline ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
              <div className="panel-box">
                <div className="fs-16">Andre Candido Pro (0244):</div>
                <div className="d-flex-center">
                  {isAndreChannelOnline ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
              <div className="panel-box">
                <div className="fs-16">Delivery:</div>
                <div className="d-flex-center">
                  {isDeliveryChannelOnline ? (
                    <div className="green-circle"></div>
                  ) : (
                    <div className="red-circle"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pannel;