// src/pages/CompleteRegistration.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../database/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

interface EmpresaData {
  nome_fantasia: string;
  razao_social: string;
  email: string;
  telefone: string;
  cnpj: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

const CompleteRegistration: React.FC = () => {
  const [formData, setFormData] = useState<EmpresaData>({
    nome_fantasia: "",
    razao_social: "",
    email: "",
    telefone: "",
    cnpj: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user, session } = useAuth();

  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({ ...prev, email: session.user.email! }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!user) throw new Error("Usuário não autenticado");
      if (!session?.user) throw new Error("Sessão não encontrada");

      // Validação básica dos campos obrigatórios
      if (
        !formData.nome_fantasia ||
        !formData.razao_social ||
        !formData.cnpj ||
        !formData.email
      ) {
        throw new Error("Por favor, preencha todos os campos obrigatórios");
      }

      // Validação de CNPJ (formato básico)
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      if (!cnpjRegex.test(formData.cnpj)) {
        throw new Error("CNPJ deve estar no formato 00.000.000/0000-00");
      }

      // 1. Salva os dados da empresa no Supabase
      const { data: empresa, error: empresaError } = await supabase
        .from("empresas")
        .insert([
          {
            nome_fantasia: formData.nome_fantasia,
            razao_social: formData.razao_social,
            email: formData.email,
            telefone: formData.telefone,
            cnpj: formData.cnpj.replace(/\D/g, ""), // Remove caracteres não numéricos
            cep: formData.cep,
            endereco: formData.endereco,
            numero: formData.numero,
            complemento: formData.complemento,
            bairro: formData.bairro,
            cidade: formData.cidade,
            estado: formData.estado,
            usuario_id: user.id,
            tipo: "gestor",
          },
        ])
        .select()
        .single();

      if (empresaError) {
        if (empresaError.code === "23505") {
          // Violação de unique constraint
          throw new Error("CNPJ já cadastrado no sistema");
        }
        throw empresaError;
      }

      // 2. Atualiza o perfil do usuário para gestor
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          empresa_completa: true,
          tipo: "gestor",
          name: formData.nome_fantasia, // Atualiza o nome com o nome fantasia
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // 3. Atualiza o metadata do usuário no Auth
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          empresa_id: empresa.id,
          empresa_nome: formData.nome_fantasia,
          empresa_cnpj: formData.cnpj,
        },
      });

      if (authError) throw authError;

      setSuccess(true);

      // Redireciona após 2 segundos
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao completar cadastro:", error);
      setError(error.message || "Erro ao salvar dados da empresa");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpa erros quando o usuário começa a digitar
    if (error) setError("");
  };

  // Função para formatar CNPJ
  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 14) {
      return numbers
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }
    return value;
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCNPJ(e.target.value);
    setFormData((prev) => ({ ...prev, cnpj: formattedValue }));
    if (error) setError("");
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Complete seu Cadastro Empresarial</h2>
        <p className="form-subtitle">
          Preencha os dados da sua empresa para acessar o dashboard completo
        </p>

        {success && (
          <div className="alert alert-success">
            ✅ Cadastro realizado com sucesso! Redirecionando para o
            dashboard...
          </div>
        )}

        {error && <div className="alert alert-error">❌ {error}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="nome_fantasia">Nome Fantasia *</label>
            <input
              type="text"
              id="nome_fantasia"
              name="nome_fantasia"
              value={formData.nome_fantasia}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Ex: Minha Empresa LTDA"
            />
          </div>

          <div className="form-group">
            <label htmlFor="razao_social">Razão Social *</label>
            <input
              type="text"
              id="razao_social"
              name="razao_social"
              value={formData.razao_social}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Ex: Minha Empresa Comércio e Serviços LTDA"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cnpj">CNPJ *</label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleCNPJChange}
              required
              disabled={loading}
              placeholder="00.000.000/0000-00"
              maxLength={18}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail Corporativo *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="contato@empresa.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone *</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="(11) 99999-9999"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cep">CEP *</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="00000-000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="endereco">Endereço *</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Rua das Flores"
            />
          </div>

          <div className="form-group">
            <label htmlFor="numero">Número *</label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="123"
            />
          </div>

          <div className="form-group">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              id="complemento"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              disabled={loading}
              placeholder="Sala 45, Bloco B"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bairro">Bairro *</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Centro"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cidade">Cidade *</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="São Paulo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado *</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Selecione o estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minha Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={loading ? "loading" : ""}
        >
          {loading ? "🔄 Salvando..." : "✅ Completar Cadastro como Gestor"}
        </button>

        <p className="form-note">
          * Campos obrigatórios. Seus dados serão salvos no banco de dados e
          você será registrado como Gestor.
        </p>
      </form>
    </div>
  );
};

export default CompleteRegistration;
