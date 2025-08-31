import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface para os dados do usuário
interface User {
  id: string;
  name: string;
  email: string;
}

// Interface para o contexto de autenticação
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Criando o contexto com valor padrão undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props para o provedor do contexto
interface AuthProviderProps {
  children: ReactNode;
}

// Provedor do contexto de autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Verifica se o usuário está autenticado
  const isAuthenticated = !!user;

  // Função de login (simulada - integrar com Supabase depois)
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulando uma requisição de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados - substituir por chamada real ao Supabase
      const mockUser: User = {
        id: '1',
        name: 'Usuário Teste',
        email: email
      };
      
      setUser(mockUser);
      console.log('Login realizado com sucesso:', email);
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Falha no login');
    } finally {
      setLoading(false);
    }
  };

  // Função de registro (simulada - integrar com Supabase depois)
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulando uma requisição de registro
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados - substituir por chamada real ao Supabase
      const newUser: User = {
        id: Date.now().toString(),
        name: name,
        email: email
      };
      
      setUser(newUser);
      console.log('Usuário registrado com sucesso:', { name, email });
    } catch (error) {
      console.error('Erro no registro:', error);
      throw new Error('Falha no registro');
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = (): void => {
    setUser(null);
    console.log('Usuário deslogado');
  };

  // Valor do contexto
  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};

export default AuthContext;
