import React from 'react';
import Card from '../components/Card';

const DashboardAdmin: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard Administrativo</h1>
      <div className="cards-grid">
        <Card 
          title="Total de Usuários" 
          value="156" 
        />
        <Card 
          title="Usuários Ativos" 
          value="128" 
        />
        <Card 
          title="Administradores" 
          value="5" 
        />
        <Card 
          title="Uso de Armazenamento" 
          value="2.4 GB/10 GB" 
        />
        <Card 
          title="Logs do Sistema" 
          value="1.245" 
        />
        <Card 
          title="Tempo de Atividade" 
          value="99.8%" 
        />
      </div>
      
      <div className="dashboard-content">
        <div className="admin-sections">
          <div className="admin-section">
            <h2>Estatísticas do Sistema</h2>
            <div className="stats-list">
              <div className="stat-item">
                <span>CPU Usage:</span>
                <span>45%</span>
              </div>
              <div className="stat-item">
                <span>Memory:</span>
                <span>62%</span>
              </div>
              <div className="stat-item">
                <span>Disk Space:</span>
                <span>24%</span>
              </div>
            </div>
          </div>
          
          <div className="admin-section">
            <h2>Ações Rápidas</h2>
            <div className="action-buttons">
              <button className="btn btn-primary">Backup do Sistema</button>
              <button className="btn btn-secondary">Ver Logs</button>
              <button className="btn btn-warning">Manutenção</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
