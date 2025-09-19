// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri =
    import.meta.env.VITE_GOOGLE_REDIRECT_URI ||
    `${window.location.origin}/auth/callback`;

  // Verifica se há usuário salvo no localStorage ao carregar
  useEffect(() => {
    // Verifica se está na página de callback e tem token na URL
    if (
      window.location.pathname === "/auth/callback" &&
      window.location.hash.includes("access_token")
    ) {
      handleGoogleCallback();
    }
  }, []);

  const loginWithGoogle = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?
client_id=${clientId}&
redirect_uri=${encodeURIComponent(redirectUri)}&
response_type=token&
scope=email profile&
include_granted_scopes=true&
state=pass-through-value`;

    window.location.href = authUrl;
  };

  const handleGoogleCallback = async () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      try {
        // Busca informações do usuário na API do Google
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v2/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          const user: User = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            picture: userData.picture,
            accessToken: accessToken,
          };

          setUser(user);
          localStorage.setItem("google_user", JSON.stringify(user));

          // Limpa a URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        logout();
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("google_user");

    // Redireciona para logout do Google opcionalmente
    window.location.href = "https://accounts.google.com/Logout";
  };

  const isAuthenticated = !!user;

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    loginWithGoogle,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
