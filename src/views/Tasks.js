import { useEffect, useState, useCallback } from 'react';
import './../App.css';
import Sidebar from './../components/sidebar';
import Spinner from './../components/spinner';
import TableCard from './../components/tablecard';
import './../index.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [currentStatus, setCurrentStatus] = useState(null);

  const buildQueryString = useCallback(() => {
    const params = [];
    if (selectedGroupId) params.push(`groupId=${encodeURIComponent(selectedGroupId)}`);
    if (selectedUserName) params.push(`userName=${encodeURIComponent(selectedUserName)}`);
    if (currentStatus) params.push(`status=${encodeURIComponent(currentStatus)}`);
    return params.length ? `?${params.join('&')}` : '';
  }, [selectedGroupId, selectedUserName, currentStatus]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:9998/api${buildQueryString()}`)
      .then((res) => res.json())
      .then((json) => {
        // Ordena os arrays por status descrescente
        setData({
          ...json,
          exportedBases: [...(json.exportedBases || [])].sort((a, b) => (b.status ?? 0) - (a.status ?? 0)),
          initialRoutines: [...(json.initialRoutines || [])].sort((a, b) => (b.status ?? 0) - (a.status ?? 0)),
          weekRoutines: [...(json.weekRoutines || [])].sort((a, b) => (b.status ?? 0) - (a.status ?? 0)),
          dailyRoutines: [...(json.dailyRoutines || [])].sort((a, b) => (b.status ?? 0) - (a.status ?? 0)),
        });
      })
      .catch(() => setData({ error: 'Erro ao buscar dados' }))
      .finally(() => setLoading(false));
  }, [selectedGroupId, selectedUserName, buildQueryString]);

  const groups = data?.groups || [];
  const usersOptions = [
    { key: "Automação 00", value: "Automação 00" },
    { key: "Automação 01", value: "Automação 01" },
    { key: "Automação 02", value: "Automação 02" },
    { key: "Automação 03", value: "Automação 03" },
    { key: "Automação 04", value: "Automação 04" },
    { key: "Automação 05", value: "Automação 05" },
  ];
  const allStatusesCounts = data?.allStatusesCounts || {};

  function handleFilterChange({ groupId, userName, status }) {
    if (typeof status !== "undefined") {
      setCurrentStatus(status === currentStatus ? null : status);
    }
    if (typeof groupId !== "undefined") setSelectedGroupId(groupId);
    if (typeof userName !== "undefined") setSelectedUserName(userName);
  }

  if (loading) return <Spinner />;

  return (
    <div className="App" style={{ background: '#f3f4f6', minHeight: '100vh' }}>
      <Sidebar activePage="Tarefas" />
      <div className="w-100 d-flex-jc">
        <div className="body-container" style={{ marginLeft: 140, padding: 24, width: '85%' }}>
          <div className="h-container">
            <h1>Monitoramento processos</h1>
            <div className="d-flex-center">
              <div className="panel">
                <div className="status-panel">
                  <div>
                    <div className="w-100 d-flex-center">Normal</div>
                    <div className="w-100 d-flex-center">
                      <div
                        className={
                          Number(currentStatus) === 1
                            ? "green-ballon-selected pointer"
                            : "green-ballon-outline pointer"
                        }
                        onClick={() => handleFilterChange({ status: 1 })}
                      >
                        {String(allStatusesCounts[1] ?? '0')}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="w-100 d-flex-center">Atenção</div>
                    <div className="w-100 d-flex-center">
                      <div
                        className={
                          Number(currentStatus) === 2
                            ? "yellow-ballon-selected pointer"
                            : "yellow-ballon-outline pointer"
                        }
                        onClick={() => handleFilterChange({ status: 2 })}
                      >
                        {String(allStatusesCounts[2] ?? '0')}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="w-100 d-flex-center">Revisar</div>
                    <div className="w-100 d-flex-center">
                      <div
                        className={
                          Number(currentStatus) === 3
                            ? "red-ballon-selected pointer"
                            : "red-ballon-outline pointer"
                        }
                        onClick={() => handleFilterChange({ status: 3 })}
                      >
                        {String(allStatusesCounts[3] ?? '0')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="form-group w-100 m-1">
            <form
              onSubmit={e => e.preventDefault()}
              className="d-flex"
              style={{ width: '100%' }}
            >
              <div className="d-grid m-1">
                <label htmlFor="group-select">Filtrar por grupo</label>
                <select
                  id="group-select"
                  name="groupId"
                  className="form-control"
                  value={selectedGroupId}
                  onChange={e => handleFilterChange({ groupId: e.target.value })}
                >
                  <option value="">Escolha um grupo</option>
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>
                      {group.groupName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-grid m-1">
                <label htmlFor="user-select">Filtrar por usuario</label>
                <select
                  id="user-select"
                  name="userName"
                  className="form-control"
                  value={selectedUserName}
                  onChange={e => handleFilterChange({ userName: e.target.value })}
                >
                  <option value="">Escolha um usuario</option>
                  {usersOptions.map(user => (
                    <option key={user.key} value={user.key}>
                      {user.value}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>

          {/* Tabelas */}
          <div id="table1" className="table1">
            <div className="col">
              <TableCard title="Bases Exportadas" processes={data?.exportedBases || []} />
            </div>
            <div className="col">
              <TableCard title="Rotinas Iniciais" processes={data?.initialRoutines || []} />
            </div>
            <div className="col">
              <TableCard title="Rotinas Semanais" processes={data?.weekRoutines || []} />
            </div>
            <div className="col">
              <TableCard title="Rotinas Diárias" processes={data?.dailyRoutines || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;