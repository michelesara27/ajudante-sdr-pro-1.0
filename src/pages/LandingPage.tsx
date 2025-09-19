// src/pages/LaandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Bem-vindo ao
            <span className="gradient-text"> Dashboard Pro</span>
          </h1>
          <p className="hero-subtitle">
            A plataforma completa para gerenciar seus projetos, equipes e
            métricas com visualizações intuitivas e poderosas.
          </p>

          <div className="hero-buttons">
            <GoogleLoginButton />
            <Link to="/register" className="btn btn-secondary btn-large">
              📝 Criar Conta com E-mail
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="preview-card"></div>
            <div className="preview-card"></div>
            <div className="preview-card"></div>
            <div className="preview-card"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Recursos Incríveis</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Dashboards Interativas</h3>
              <p>
                Visualize dados importantes com gráficos e métricas em tempo
                real.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Gestão de Projetos</h3>
              <p>Organize e acompanhe todos os seus projetos em um só lugar.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Chat Integrado</h3>
              <p>Comunique-se com sua equipe através do chat em tempo real.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Temas Personalizáveis</h3>
              <p>Escolha entre tema claro ou escuro para melhor experiência.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Segurança</h3>
              <p>
                Seus dados protegidos com criptografia e autenticação segura.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsivo</h3>
              <p>Funciona perfeitamente em desktop, tablet e mobile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Usuários Ativos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1.2K</div>
              <div className="stat-label">Projetos Concluídos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99.8%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Suporte</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">
            Pronto para transformar sua produtividade?
          </h2>
          <p className="cta-subtitle">
            Junte-se a milhares de usuários que já estão usando nossa
            plataforma.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-xlarge">
              💫 Começar Gratuitamente
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2024 Dashboard Pro. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
