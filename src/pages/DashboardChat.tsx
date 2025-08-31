import React, { useState } from 'react';
import Card from '../components/Card';

const DashboardChat: React.FC = () => {
  const [messages] = useState([
    { id: 1, user: 'João Silva', message: 'Olá, como vai o projeto?', time: '10:30' },
    { id: 2, user: 'Maria Santos', message: 'Tudo bem! Precisamos conversar sobre os requisitos.', time: '10:32' },
    { id: 3, user: 'Carlos Oliveira', message: 'Podemos marcar uma reunião amanhã?', time: '10:35' }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Mensagem enviada:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard de Conversas</h1>
      <div className="cards-grid">
        <Card 
          title="Conversas Ativas" 
          value="8" 
        />
        <Card 
          title="Mensagens Hoje" 
          value="42" 
        />
        <Card 
          title="Novas Conversas" 
          value="3" 
        />
        <Card 
          title="Taxa de Resposta" 
          value="89%" 
        />
      </div>
      
      <div className="dashboard-content">
        <h2>Últimas Mensagens</h2>
        <div className="chat-container">
          <div className="message-list">
            {messages.map(msg => (
              <div key={msg.id} className="message-item">
                <div className="message-header">
                  <strong>{msg.user}</strong>
                  <span className="message-time">{msg.time}</span>
                </div>
                <p className="message-text">{msg.message}</p>
              </div>
            ))}
          </div>
          
          <div className="message-input">
            <input 
              type="text" 
              placeholder="Digite sua mensagem..." 
              className="input-field"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              className="send-button"
              onClick={handleSendMessage}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChat;
