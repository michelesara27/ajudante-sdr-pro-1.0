// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../database/supabaseClient";

// Use tipos mais simples para evitar problemas de importação
interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
  empresa_completa: boolean;
  tipo: "gestor" | "usuario";
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica sessão atual
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    };

    checkSession();

    // Escuta mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // Se o perfil não existe, cria um novo
        if (error.code === "PGRST116") {
          await createUserProfile(userId);
          return;
        }
        throw error;
      }

      setUser(profile);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const createUserProfile = async (userId: string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user;

      const { data: newProfile, error } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            email: currentUser?.email,
            name: currentUser?.user_metadata?.full_name || currentUser?.email,
            picture: currentUser?.user_metadata?.avatar_url,
            empresa_completa: false,
            tipo: "usuario",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setUser(newProfile);
    } catch (error) {
      console.error("Erro ao criar perfil:", error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            import.meta.env.VITE_GOOGLE_REDIRECT_URI ||
            `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Erro no login com Google:", error);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error("Erro no logout:", error);
    }
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
