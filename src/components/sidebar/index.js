import React from 'react';
import reactLogo from '../../logo.png';
import './styles.css';

function Sidebar({ activePage = 'Geral' }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={reactLogo} alt="Logo React" width="80" height="80" />
      </div>
      <nav style={{ width: '100%' }}>
        <ul>
          <li>
            <a
              href="/pannel"
              className={activePage === 'Geral' ? 'active' : ''}
            >
              <span className="icon">🏠</span>
              <span className="label">Geral</span>
            </a>
          </li>
          <li>
            <a
              href="/"
              className={activePage === 'Tarefas' ? 'active' : ''}
            >
              <span className="icon">📝</span>
              <span className="label">Tarefas</span>
            </a>
          </li>
          <li>
            <a
              href="/dashboard"
              className={activePage === 'Dashboard' ? 'active' : ''}
            >
              <span className="icon">📊</span>
              <span className="label">Dashboard</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;