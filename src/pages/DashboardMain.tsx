import React from 'react';
import Card from '../components/Card';

const DashboardMain: React.FC = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard Principal</h1>
      <div className="cards-grid">
        <Card title="Total Usuários" value="1,245" />
        <Card title="Receita Mensal" value="R$ 54,200" />
        <Card title="Taxa de Conversão" value="23.8%" />
        <Card title="Novos Leads" value="48" />
      </div>
    </div>
  );
};

export default DashboardMain;
