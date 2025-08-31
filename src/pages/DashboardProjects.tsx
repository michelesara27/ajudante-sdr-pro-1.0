import React from 'react';
import Card from '../components/Card';

const DashboardProjects: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard de Projetos</h1>
      <div className="cards-grid">
        <Card 
          title="Projetos Ativos" 
          value="12" 
        />
        <Card 
          title="Projetos Concluídos" 
          value="8" 
        />
        <Card 
          title="Projetos Atrasados" 
          value="3" 
        />
        <Card 
          title="Novos Esta Semana" 
          value="2" 
        />
        <Card 
          title="Orçamento Total" 
          value="R$ 245.000" 
        />
        <Card 
          title="Média de Prazo" 
          value="45 dias" 
        />
      </div>
      
      <div className="dashboard-content">
        <h2>Projetos em Destaque</h2>
        <div className="project-list">
          <div className="project-item">
            <h3>Website Corporativo</h3>
            <p>Status: Em andamento • Prazo: 15 dias</p>
          </div>
          <div className="project-item">
            <h3>App Mobile</h3>
            <p>Status: Planejamento • Prazo: 30 dias</p>
          </div>
          <div className="project-item">
            <h3>Sistema de CRM</h3>
            <p>Status: Concluído • Prazo: 60 dias</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProjects;
