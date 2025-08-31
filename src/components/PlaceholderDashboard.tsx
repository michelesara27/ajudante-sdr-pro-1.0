import React from 'react';

interface PlaceholderDashboardProps {
  title: string;
  message: string;
}

const PlaceholderDashboard: React.FC<PlaceholderDashboardProps> = ({ 
  title, 
  message 
}) => {
  return (
    <div className="dashboard">
      <h1>{title}</h1>
      <div className="placeholder-content">
        <p>{message}</p>
        <div className="placeholder-cards">
          <div className="placeholder-card"></div>
          <div className="placeholder-card"></div>
          <div className="placeholder-card"></div>
          <div className="placeholder-card"></div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderDashboard;
