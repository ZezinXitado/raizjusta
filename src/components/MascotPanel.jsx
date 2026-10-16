import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useApp } from "@/lib/AppContext";
import { getLevel, products, producers } from "@/data/mockData";
import RaizinhoMascot, { moodToExpression } from "@/components/RaizinhoMascot";
import { Sparkles, Sprout, Lightbulb, ShoppingBag, Trophy, Users } from "lucide-react";

const TIPS = [
  "No comércio justo, o produtor recebe uma parcela justa do preço final — não só o intermediário.",
  "Comprar direto do pequeno produtor fortalece a economia da sua região.",
  "Produtos sustentáveis preservam o solo, a água e a biodiversidade.",
  "Conhecer a origem do que você consome é o primeiro passo para um consumo consciente.",
  "Cada compra justa ajuda uma família a permanecer no campo com dignidade.",
];

function milestoneMessage(pontos, compras) {
  if (pontos >= 2000) return { mood: "arvore", text: "Uau! Nosso impacto está ficando gigante! 🌳" };
  if (pontos >= 1000) return { mood: "coroa", text: "Você virou Parceiro do Comércio Justo! 🏆" };
  if (pontos >= 500) return { mood: "broto", text: "Olha só como estamos crescendo! 🌿" };
  if (compras > 0) return { mood: "agradecido", text: "Boa! Você já apoiou um pequeno produtor. Vamos continuar? 🎉" };
  return { mood: "feliz", text: "Oi! Eu sou o Raizinho. Vamos começar? 🌱" };
}

export default function MascotPanel({ trigger }) {
  const { pontos, compras, produtoresApoiados, produtosComprados } = useApp();
  const { atual, idx } = getLevel(pontos);
  const [topic, setTopic] = useState("cumprimentar");
  const [tipIdx, setTipIdx] = useState(0);
  const [produtoIdx, setProdutoIdx] = useState(0);
  const [produtorIdx, setProdutorIdx] = useState(0);

  const greeting = useMemo(() => milestoneMessage(pontos, compras), [pontos, compras]);
  const destaque = products[produtoIdx % products.length];
  const produtor = producers[produtorIdx % producers.length];
  const evolution = ["semente", "broto", "arvore"][idx];

  const content = (() => {
    switch (topic) {
      case "cumprimentar":
        return { mood: greeting.mood, title: "Olá!", text: greeting.text };
      case "impacto":
        return { mood: evolution, title: "Seu impacto", text: `Você já apoiou ${produtoresApoiados} produtor(es), comprou ${produtosComprados} produto(s) e acumulou ${pontos.toLocaleString("pt-BR")} pontos. Seu nível é ${atual.nome}. 🌱` };
      case "dica":
        return { mood: "livro", title: "Dica Fair Trade", text: TIPS[tipIdx % TIPS.length] };
      case "produto":
        return { mood: "colhendo", title: "Produto em destaque", text: `${destaque.emoji} ${destaque.name} — ${destaque.description}` };
      case "conquistas":
        return { mood: "coroa", title: "Conquistas", text: `Seu nível atual é ${atual.nome} ${atual.emoji}. Continue comprando produtos justos para evoluir e virar um(a) Embaixador(a) do Comércio Justo! 🏆` };
      case "produtor":
        return { mood: "mapa", title: "Conheça um produtor", text: `${produtor.name} — ${produtor.role} de ${produtor.city}/${produtor.state}. ${produtor.bio}` };
      default:
        return { mood: "feliz", title: "", text: "" };
    }
  })();

  const topics = [
    { key: "cumprimentar", label: "Cumprimentar", icon: Sparkles },
    { key: "impacto", label: "Meu impacto", icon: Sprout },
    { key: "dica", label: "Dica Fair Trade", icon: Lightbulb },
    { key: "produto", label: "Produto", icon: ShoppingBag },
    { key: "conquistas", label: "Conquistas", icon: Trophy },
    { key: "produtor", label: "Produtor", icon: Users },
  ];

  const next = () => {
    if (topic === "dica") setTipIdx((i) => i + 1);
    if (topic === "produto") setProdutoIdx((i) => i + 1);
    if (topic === "produtor") setProdutorIdx((i) => i + 1);
  };
  const canNext = topic === "dica" || topic === "produto" || topic === "produtor";

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-emerald-950">
            <Sprout size={18} className="text-emerald-700" /> Interagir com o Raizinho
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <RaizinhoMascot art={moodToExpression(content.mood)} size={160} interactive />
          <div className="w-full rounded-2xl bg-emerald-50 border border-emerald-100 p-4 relative">
            <span className="absolute -top-2 left-8 w-4 h-4 bg-emerald-50 border-l border-t border-emerald-100 rotate-45" />
            <p className="font-bold text-emerald-900 text-sm">{content.title}</p>
            <p className="text-sm text-emerald-900/80 mt-1 leading-relaxed">{content.text}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full">
            {topics.map((t) => (
              <button
                key={t.key}
                onClick={() => setTopic(t.key)}
                className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs font-medium transition-colors ${topic === t.key ? "bg-emerald-800 text-white" : "bg-card border border-border text-emerald-800 hover:bg-emerald-800/10"}`}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </div>
          {canNext && (
            <button onClick={next} className="text-xs font-semibold text-emerald-700 hover:text-emerald-900">
              Ver outro →
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}