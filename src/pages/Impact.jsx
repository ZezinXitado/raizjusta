import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "@/lib/AppContext";
import { getLevel } from "@/data/mockData";
import ImpactCounter from "@/components/ImpactCounter";
import RaizinhoMascot from "@/components/RaizinhoMascot";
import { levels } from "@/data/mockData";

export default function Impact() {
  const { pontos, compras, produtoresApoiados, produtosComprados } = useApp();
  const { atual, proximo, idx } = getLevel(pontos);
  const progress = proximo ? Math.min(100, Math.round(((pontos - atual.min) / (proximo.min - atual.min)) * 100)) : 100;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <h1 className="font-display text-3xl font-bold text-emerald-950">🌱 Meu Impacto</h1>
      <p className="text-muted-foreground mt-1">Veja como suas compras ajudam quem produz.</p>

      {/* Card de pontos */}
      <div className="mt-6 rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-amber-400/20 blur-2xl" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100/70 text-sm">Seu impacto</p>
            <p className="text-4xl font-extrabold mt-1"><ImpactCounter value={pontos} /> pontos</p>
            <p className="mt-2 text-sm">🏅 {atual.nome} do Comércio Justo</p>
          </div>
          <RaizinhoMascot size={120} level={idx} />
        </div>

        {proximo && (
          <div className="mt-6">
            <div className="flex justify-between text-xs text-emerald-100/70 mb-1.5">
              <span>Próximo nível: {proximo.nome} {proximo.emoji}</span>
              <span>{pontos}/{proximo.min} pts</span>
            </div>
            <div className="h-3 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-amber-400 transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* Ajudou */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <Mini emoji="👨‍🌾" value={produtoresApoiados} label="produtores ajudados" />
        <Mini emoji="🌱" value={12} label="negócios locais" />
        <Mini emoji="📦" value={produtosComprados} label="produtos" />
      </div>

      {/* Como ganhar pontos */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-emerald-950 mb-3">Como ganhar pontos</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { emoji: "🛍️", label: "Comprar produtos", pts: "+100" },
            { emoji: "👨‍🌾", label: "Conhecer a história de um produtor", pts: "+10" },
            { emoji: "🔗", label: "Escanear um produto", pts: "+20" },
            { emoji: "⭐", label: "Avaliar uma compra", pts: "+15" },
            { emoji: "🌱", label: "Comprar produtos sustentáveis", pts: "+50" },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between rounded-2xl bg-card border border-border p-4">
              <span className="text-sm font-medium text-emerald-900">{r.emoji} {r.label}</span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">{r.pts}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Níveis */}
      <div className="mt-8">
        <h2 className="font-display text-xl font-bold text-emerald-950 mb-3">Níveis</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {levels.map((l, i) => {
            const reached = pontos >= l.min;
            return (
              <div key={l.nome} className={`rounded-2xl p-4 text-center border ${reached ? "bg-emerald-50 border-emerald-200" : "bg-card border-border opacity-60"}`}>
                <RaizinhoMascot size={84} level={i} interactive={false} host={false} />
                <p className="mt-1 font-bold text-emerald-950 text-sm">{l.emoji} {l.nome}</p>
                <p className="text-xs text-muted-foreground">{l.min} pts</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/produtos" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm">
          Comprar e gerar mais impacto
        </Link>
      </div>
    </div>
  );
}

function Mini({ emoji, value, label }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 text-center">
      <div className="text-2xl">{emoji}</div>
      <div className="text-2xl font-extrabold text-emerald-800"><ImpactCounter value={value} /></div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}