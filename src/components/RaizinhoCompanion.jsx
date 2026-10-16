import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { useApp } from "@/lib/AppContext";
import { onHostsChange } from "@/lib/raizinhoBus";
import RaizinhoMascot from "@/components/RaizinhoMascot";

const CONTEXT = {
  "/": { art: "idle", msg: "Bem-vindo ao RaizJusta! 🌱", trigger: { name: "greeting" } },
  "/produtos": { art: "basket", msg: "Hmm... vamos ver o que encontramos!" },
  "/carrinho": { art: "idle", trigger: { name: "look_cart", say: "Vamos conferir seu carrinho? 🛒" } },
  "/impacto": { art: "idle", msg: "Olha o quanto você já ajudou!", trigger: { name: "plant" } },
  "/produtores": { art: "explorer", msg: "Vamos conhecer quem produz?" },
  "/mapa": { art: "explorer", msg: "Encontramos produtores por aqui!" },
  "/pedidos": { art: "basket", msg: "Seus pedidos estão aqui!" },
  "/educacao": { art: "reading", msg: "Bora aprender sobre Fair Trade!" },
  "/perfil": { art: "wave", msg: "Seu cantinho de impacto." },
  "/dashboard": { art: "thinking", msg: "Olha os números do impacto!" },
  "/painel-produtor": { art: "basket", msg: "Área do produtor!" },
};

const ctxFor = (path) => CONTEXT[path] || { art: "idle", msg: "Vamos apoiar o comércio justo! 🌱" };

// Raizinho flutuante: só aparece quando a página não tem o próprio Raizinho (evita duplicar)
export default function RaizinhoCompanion() {
  const { isAuthenticated } = useApp();
  const location = useLocation();
  const [hosts, setHosts] = useState(0);
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem("raiz_companion_collapsed") === "1");

  useEffect(() => onHostsChange(setHosts), []);

  const ctx = ctxFor(location.pathname);
  const trigger = useMemo(() => (ctx.trigger ? { ...ctx.trigger, key: location.key } : null), [location.key]);

  if (!isAuthenticated || hosts > 0) return null;

  const toggle = (v) => {
    setCollapsed(v);
    localStorage.setItem("raiz_companion_collapsed", v ? "1" : "0");
  };

  if (collapsed) {
    return (
      <button
        onClick={() => toggle(false)}
        className="fixed z-40 bottom-20 md:bottom-6 right-4 w-14 h-14 rounded-full bg-emerald-800 text-white shadow-xl flex items-center justify-center text-2xl hover:scale-105 transition-transform"
        aria-label="Mostrar o Raizinho"
      >
        🌱
      </button>
    );
  }

  return (
    <div className="fixed z-40 bottom-20 md:bottom-4 right-2 sm:right-4 flex flex-col items-end">
      <button
        onClick={() => toggle(true)}
        className="mr-3 -mb-2 relative z-10 w-6 h-6 rounded-full bg-card/90 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground shadow"
        aria-label="Esconder o Raizinho"
      >
        <X size={13} />
      </button>
      <RaizinhoMascot size={150} art={ctx.art} contextMessage={ctx.msg} host={false} trigger={trigger} />
    </div>
  );
}