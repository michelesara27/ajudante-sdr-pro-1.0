import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Contexts
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
//Components
import Navigation from "./components/Navigation";
//import PlaceholderDashboard from "./components/PlaceholderDashboard";
//Pages
import DashboardMain from "./pages/DashboardMain";
import DashboardProjects from "./pages/DashboardProjects";
import DashboardChat from "./pages/DashboardChat";
import DashboardAdmin from "./pages/DashboardAdmin";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
//CSS
import "./App.css"; // ← Adicione esta linha se existir

function App() {
  return (
    // ThemeProvider deve envolver TUDO
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Navigation />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DashboardMain />} />
              <Route path="/projects" element={<DashboardProjects />} />
              <Route path="/chat" element={<DashboardChat />} />
              <Route path="/admin" element={<DashboardAdmin />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
