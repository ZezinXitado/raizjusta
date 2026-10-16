import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useApp } from "@/lib/AppContext";
import { getLevel } from "@/data/mockData";
import ImpactCounter from "@/components/ImpactCounter";
import MascotPanel from "@/components/MascotPanel";
import { LogOut, Sparkles } from "lucide-react";

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const { pontos, compras, produtoresApoiados, produtosComprados } = useApp();
  const navigate = useNavigate();
  const { atual } = getLevel(pontos);

  if (!isAuthenticated || !user) {
    return (
      <div className="mx-auto max-w-md px-6 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-emerald-950">Entre na sua conta</h1>
        <p className="mt-2 text-muted-foreground">Acesse para ver seu perfil, pontos e pedidos.</p>
        <div className="mt-6 flex flex-col gap-3">
          <button onClick={() => navigate("/login")} className="px-5 py-3 rounded-full bg-emerald-800 text-white font-semibold text-sm">Entrar</button>
          <button onClick={() => navigate("/register")} className="px-5 py-3 rounded-full bg-card border border-border font-semibold text-sm">Criar conta</button>
        </div>
      </div>
    );
  }

  const nome = user.full_name || user.email?.split("@")[0] || "Produtor(a)";

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center text-3xl font-extrabold text-emerald-900 uppercase">
          {nome[0]}
        </div>
        <div className="text-center sm:text-left flex-1">
          <h1 className="font-display text-2xl font-bold">{nome}</h1>
          <p className="text-emerald-100/80 text-sm">{user.email}</p>
          <p className="mt-1 text-sm text-emerald-100/70">🏅 {atual.nome} do Comércio Justo · <ImpactCounter value={pontos} /> pontos</p>
        </div>
        <button onClick={() => logout()} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-sm font-medium">
          <LogOut size={16} /> Sair
        </button>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Stat value={compras} label="Compras realizadas" />
        <Stat value={produtoresApoiados} label="Produtores apoiados" />
        <Stat value={produtosComprados} label="Produtos comprados" />
      </div>

      <MascotPanel
        trigger={
          <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-white p-5 flex items-center gap-4 hover:from-amber-500 hover:to-amber-600 transition-colors text-left">
            <span className="text-3xl">🐾</span>
            <div className="flex-1">
              <p className="font-bold flex items-center gap-2"><Sparkles size={16} /> Interagir com o Raizinho</p>
              <p className="text-sm text-white/80">Converse com o mascote: dicas, seu impacto, conquistas e produtores.</p>
            </div>
            <span className="text-sm font-semibold">Abrir →</span>
          </button>
        }
      />

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Link to="/pedidos" className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5 hover:bg-emerald-100 transition-colors">
          <p className="font-bold text-emerald-800">📦 Meus pedidos</p>
          <p className="text-sm text-emerald-700/80 mt-1">Acompanhe suas compras e o impacto gerado.</p>
        </Link>
        <Link to="/painel-produtor" className="rounded-2xl bg-amber-50 border border-amber-100 p-5 hover:bg-amber-100 transition-colors">
          <p className="font-bold text-amber-800">👨‍🌾 Área do Produtor</p>
          <p className="text-sm text-amber-700/80 mt-1">Painel de gestão (demonstração).</p>
        </Link>
        <Link to="/impacto" className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5 hover:bg-emerald-100 transition-colors">
          <p className="font-bold text-emerald-800">🌱 Meu impacto</p>
          <p className="text-sm text-emerald-700/80 mt-1">Seus pontos, nível e progresso.</p>
        </Link>
        <Link to="/dashboard" className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5 hover:bg-emerald-100 transition-colors">
          <p className="font-bold text-emerald-800">📊 Dashboard de Impacto</p>
          <p className="text-sm text-emerald-700/80 mt-1">Impacto geral da plataforma.</p>
        </Link>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 text-center">
      <div className="text-3xl font-extrabold text-emerald-800"><ImpactCounter value={value} /></div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}