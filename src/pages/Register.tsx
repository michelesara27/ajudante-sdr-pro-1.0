import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  
  // Usando o hook de autenticação
  const { register, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validação básica
    if (!formData.name || !formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      setSuccess(true);
      setFormData({ name: '', email: '', password: '' });
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (error) {
      setError('Erro ao registrar usuário. Tente novamente.');
      console.error('Erro no registro:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Limpar erros quando o usuário começar a digitar
    if (error) setError('');
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Criar Conta</h2>
        
        {/* Mensagem de sucesso */}
        {success && (
          <div className="alert alert-success">
            ✅ Registro realizado com sucesso!
          </div>
        )}
        
        {/* Mensagem de erro */}
        {error && (
          <div className="alert alert-error">
            ❌ {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
            minLength={6}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
