import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, Sprout, Handshake, Leaf, MapPin, ShieldCheck } from "lucide-react";
import { categories, products, platformImpact } from "@/data/mockData";
import CategoryPill from "@/components/CategoryPill";
import ProductCard from "@/components/ProductCard";
import ImpactCounter from "@/components/ImpactCounter";
import RaizinhoMascot from "@/components/RaizinhoMascot";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/produtos?q=${encodeURIComponent(query)}`);
  };

  const destaques = products.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-amber-50/40 to-transparent" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-amber-200/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-10 sm:pt-20 sm:pb-16">
          <div className="flex items-center justify-between gap-8">
            <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <Sprout size={13} /> Comércio Justo · Fair Trade
            </span>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl font-extrabold leading-[1.05] text-emerald-950 text-balance">
              Do produtor ao consumidor, <span className="text-amber-600">com preço justo.</span>
            </h1>
            <p className="mt-4 text-lg text-emerald-900/70 font-medium">
              Valorize quem produz. Conheça a origem. Compre com propósito.
            </p>

            <form onSubmit={handleSearch} className="mt-7 flex items-center gap-2 max-w-xl">
              <div className="flex-1 flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-white shadow-lg shadow-emerald-900/5 border border-border">
                <Search size={20} className="text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Procure café, mel, cacau, frutas…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
              </div>
              <button className="px-5 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition-colors active:scale-95">
                Buscar
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-2">
              {categories.slice(0, 6).map((c) => (
                <Link key={c.key} to={`/produtos?categoria=${c.key}`} className="px-3 py-1.5 rounded-full bg-white/70 border border-border text-xs font-medium text-emerald-800 hover:bg-emerald-800 hover:text-white transition-colors">
                  {c.emoji} {c.label}
                </Link>
              ))}
            </div>
            </div>
            <div className="flex flex-col items-center gap-3 shrink-0 mx-auto">
              <RaizinhoMascot size={230} art="idle" interactive contextMessage="Oi! Eu sou o Raizinho 🌱" />
              <span className="hidden md:inline text-xs font-semibold text-emerald-800 bg-white/70 border border-emerald-200 rounded-full px-3 py-1">Passe o mouse e clique no Raizinho!</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-display text-2xl font-bold text-emerald-950">Categorias</h2>
          <Link to="/produtos" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
            Ver tudo <ArrowRight size={15} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
          {categories.map((c) => (
            <CategoryPill key={c.key} category={c} />
          ))}
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Handshake, title: "Apoia pessoas", desc: "Cada compra fortalece quem está na origem." },
            { icon: Leaf, title: "Incentiva sustentabilidade", desc: "Práticas responsáveis e preservação." },
            { icon: MapPin, title: "Conhece a origem", desc: "Rastreabilidade do campo à sua mesa." },
            { icon: ShieldCheck, title: "Preço transparente", desc: "Veja para onde vai cada real." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl bg-card border border-border/70 p-5">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <f.icon size={22} />
              </div>
              <h3 className="mt-3 font-bold text-emerald-950">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-emerald-950">Produtos de Comércio Justo</h2>
            <p className="text-sm text-muted-foreground">Selecionados a partir de produtores parceiros.</p>
          </div>
          <Link to="/produtos" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
            Ver todos <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {destaques.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* IMPACTO PLATAFORMA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <div className="rounded-3xl bg-emerald-900 text-white p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-amber-400/20 blur-2xl" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Impacto do RaizJusta</h2>
          <p className="text-emerald-100/70 text-sm mt-1">Dados demonstrativos do protótipo.</p>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat label="Produtores cadastrados" value={<ImpactCounter value={platformImpact.produtores} />} emoji="👨‍🌾" />
            <Stat label="Produtos vendidos" value={<ImpactCounter value={platformImpact.produtosVendidos} />} emoji="🛍️" />
            <Stat label="Movimentado (R$)" value={<><ImpactCounter value={platformImpact.movimentado} /></>} emoji="💰" />
            <Stat label="Cooperativas" value={<ImpactCounter value={platformImpact.cooperativas} />} emoji="🤝" />
          </div>
        </div>
      </section>

      {/* MENSAGEM */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 text-center">
        <p className="font-display text-2xl sm:text-3xl font-bold text-emerald-950 text-balance">
          “Do campo para o mundo. Do produtor para você. De forma justa.”
        </p>
        <p className="mt-3 text-muted-foreground">Quando você compra um produto, você também escolhe quem você está ajudando.</p>
        <Link to="/educacao" className="inline-flex mt-6 items-center gap-2 px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-colors">
          Entenda o Fair Trade <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}

function Stat({ label, value, emoji }) {
  return (
    <div>
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 text-3xl font-extrabold">{value}</div>
      <div className="text-sm text-emerald-100/70">{label}</div>
    </div>
  );
}