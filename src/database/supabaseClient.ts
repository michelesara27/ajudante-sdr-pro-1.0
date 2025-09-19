// src/database/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificação segura das variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Variáveis de ambiente do Supabase:", {
    supabaseUrl: supabaseUrl ? "✅ Configurada" : "❌ Faltando",
    supabaseAnonKey: supabaseAnonKey ? "✅ Configurada" : "❌ Faltando",
  });
  throw new Error(
    "Variáveis de ambiente do Supabase não configuradas. Verifique o arquivo .env"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
