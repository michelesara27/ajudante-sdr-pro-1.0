// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";

// Importações das páginas
import LandingPage from "./pages/LandingPage";
import DashboardMain from "./pages/DashboardMain";
import DashboardProjects from "./pages/DashboardProjects";
import DashboardChat from "./pages/DashboardChat";
import DashboardAdmin from "./pages/DashboardAdmin";
import Register from "./pages/Register";
import AuthCallback from "./pages/AuthCallback";
import CompleteRegistration from "./pages/CompleteRegistration";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navigation />
            <Routes>
              {/* Página Principal */}
              <Route path="/" element={<LandingPage />} />

              {/* Rotas de Autenticação */}
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route
                path="/complete-registration"
                element={<CompleteRegistration />}
              />
              <Route path="/register" element={<Register />} />

              {/* Dashboards */}
              <Route path="/dashboard" element={<DashboardMain />} />
              <Route path="/projects" element={<DashboardProjects />} />
              <Route path="/chat" element={<DashboardChat />} />
              <Route path="/admin" element={<DashboardAdmin />} />

              {/* Rota fallback para página não encontrada */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

// Componente para página não encontrada
const NotFound: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
    </div>
  );
};

export default App;
