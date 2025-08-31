import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
        {icon}
      </div>
      <div className="card-value">{value}</div>
    </div>
  );
};

export default Card;
