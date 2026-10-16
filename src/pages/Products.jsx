import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import RaizinhoMascot from "@/components/RaizinhoMascot";

const filtros = [
  { key: "justo", label: "Comércio justo" },
  { key: "sustentavel", label: "Produção sustentável" },
  { key: "familiar", label: "Agricultura familiar" },
  { key: "direta", label: "Venda direta" },
];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [categoria, setCategoria] = useState(params.get("categoria") || "todas");
  const [estado, setEstado] = useState("todos");
  const [ativos, setAtivos] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setQuery(params.get("q") || "");
    setCategoria(params.get("categoria") || "todas");
  }, [params]);

  const estados = useMemo(() => [...new Set(products.map((p) => p.state))].sort(), []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (categoria !== "todas" && p.category !== categoria) return false;
      if (estado !== "todos" && p.state !== estado) return false;
      if (query) {
        const q = query.toLowerCase();
        const match = p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.state.toLowerCase().includes(q) || p.category.includes(q);
        if (!match) return false;
      }
      if (ativos.includes("justo") && p.fairTradePct < 90) return false;
      if (ativos.includes("sustentavel") && !p.sustainable) return false;
      if (ativos.includes("familiar") && !p.badges.some((b) => b.toLowerCase().includes("familiar"))) return false;
      if (ativos.includes("direta") && !p.badges.some((b) => b.toLowerCase().includes("direta"))) return false;
      return true;
    });
  }, [categoria, estado, query, ativos]);

  const toggleFiltro = (key) =>
    setAtivos((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold text-emerald-950">Produtos de Comércio Justo</h1>
        <p className="text-muted-foreground mt-1">Conheça a origem e o impacto de cada produto.</p>
      </div>

      {/* Search + filters toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl bg-card border border-border">
          <Search size={18} className="text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por produto, cidade ou estado…"
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-800 text-white text-sm font-semibold"
        >
          <SlidersHorizontal size={16} /> Filtros
        </button>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 mb-4">
        <Chip active={categoria === "todas"} onClick={() => setCategoria("todas")}>Todas</Chip>
        {categories.map((c) => (
          <Chip key={c.key} active={categoria === c.key} onClick={() => setCategoria(c.key)}>
            {c.emoji} {c.label}
          </Chip>
        ))}
      </div>

      {showFilters && (
        <div className="mb-5 rounded-2xl bg-card border border-border p-4 space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">ESTADO</p>
            <div className="flex flex-wrap gap-2">
              <Chip active={estado === "todos"} onClick={() => setEstado("todos")}>Todos</Chip>
              {estados.map((e) => (
                <Chip key={e} active={estado === e} onClick={() => setEstado(e)}>{e}</Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">CARACTERÍSTICAS</p>
            <div className="flex flex-wrap gap-2">
              {filtros.map((f) => (
                <Chip key={f.key} active={ativos.includes(f.key)} onClick={() => toggleFiltro(f.key)}>
                  {f.label}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground mb-4">{filtered.length} produto(s) encontrado(s)</p>

      {filtered.length === 0 ? (
        <div className="py-16 flex flex-col items-center text-center gap-4">
          <RaizinhoMascot size={150} art="thinking" contextMessage="Não encontrei nada... vamos tentar outra busca?" />
          <p className="text-muted-foreground max-w-xs">Hmm, não encontrei nada com essa busca. Tente outra palavra ou categoria — o Raizinho está curioso! 🔎</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active ? "bg-emerald-800 text-white" : "bg-card border border-border text-emerald-900/70 hover:bg-emerald-800/10"
      }`}
    >
      {children}
    </button>
  );
}