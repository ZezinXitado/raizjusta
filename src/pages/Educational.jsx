import React from "react";
import { Handshake, Coins, Leaf, Search, Globe } from "lucide-react";
import RaizinhoMascot from "@/components/RaizinhoMascot";

const cards = [
  { icon: Handshake, title: "🤝 Justiça", desc: "Valorização do trabalho de quem produz." },
  { icon: Coins, title: "💰 Preço justo", desc: "Melhor remuneração para o pequeno produtor." },
  { icon: Leaf, title: "🌱 Sustentabilidade", desc: "Incentivo a práticas responsáveis." },
  { icon: Search, title: "🔎 Transparência", desc: "O consumidor conhece a origem do produto." },
  { icon: Globe, title: "🌎 Mercado global", desc: "Pequenos produtores alcançam novos mercados." },
];

export default function Educational() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <RaizinhoMascot size={130} art="reading" contextMessage="Bora aprender! 📚" />
        </div>
        <h1 className="font-display text-3xl font-bold text-emerald-950">📚 O que é Fair Trade?</h1>
      </div>
      <div className="mt-4 rounded-3xl bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-100 p-6 flex flex-col sm:flex-row items-center gap-5">
        <div className="sm:hidden"><RaizinhoMascot size={130} art="reading" /></div>
        <p className="text-emerald-900/80 leading-relaxed flex-1">
          Comércio justo é uma forma de comercialização que busca melhorar as condições de pequenos produtores e trabalhadores,
          promovendo preços mais justos, transparência, respeito aos direitos e práticas sustentáveis.
        </p>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <div key={c.title} className="rounded-2xl bg-card border border-border p-5 flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <c.icon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-emerald-950">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl bg-emerald-900 text-white p-6 sm:p-8 text-center">
        <p className="font-display text-xl sm:text-2xl font-bold text-balance">
          “Quando você compra um produto, você também escolhe quem você está ajudando.”
        </p>
        <p className="mt-3 text-emerald-100/70 text-sm">
          🤝 apoiando pessoas · 🌱 incentivando sustentabilidade · 💰 valorizando produtores · 🌎 fortalecendo economias locais · 📦 conhecendo a origem
        </p>
      </div>
    </div>
  );
}