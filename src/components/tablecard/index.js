import "./styles.css";
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

const statusPanelClass = {
  1: "green-panel",
  2: "yellow-panel",
  3: "red-panel"
};

const TableCard = ({ title, processes = [] }) => (
  <div>
    <div className="card-head">
      <h4 className="title">
        {title} ({processes.length})
      </h4>
    </div>
    <div id="card-container" className="card-container">
      {processes.length === 0 ? (
        <div className="no-records align-center">Sem registros</div>
      ) : (
        processes.map((process) => (
          <div
            className="card clickable"
            key={process.id}
            onClick={() => window.location.href = `/process/${process.id}`}
            style={{ cursor: "pointer" }}
          >
            <div className="card-status">
                <div className={statusPanelClass[process.status] || ""}></div>
            </div>
            <div className="card-content">
              <div className="process-name">{process.processName}</div>
              <p className="user">
                {process.userAutomacao && process.groupName
                  ? `${process.userAutomacao} - ${process.groupName}`
                  : process.userAutomacao
                  ? process.userAutomacao
                  : process.groupName
                  ? process.groupName
                  : ""}
              </p>
            </div>
            <div className="date">
              <p>{process.historyDate ? dateToPtBr(process.historyDate) : "N/A"}</p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default TableCard;