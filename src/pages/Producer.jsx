import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Sprout, Handshake, Package, Home, TrendingUp, Users } from "lucide-react";
import { getProducer, products } from "@/data/mockData";
import { useApp } from "@/lib/AppContext";
import ProductCard from "@/components/ProductCard";
import ImpactCounter from "@/components/ImpactCounter";
import RaizinhoMascot, { productProp } from "@/components/RaizinhoMascot";

export default function Producer() {
  const { id } = useParams();
  const producer = getProducer(id);
  const { visitProducer } = useApp();

  useEffect(() => {
    if (producer) visitProducer(producer.id);
    window.scrollTo(0, 0);
  }, [id]);

  if (!producer) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-muted-foreground">Produtor não encontrado.</p>
        <Link to="/produtores" className="mt-4 inline-block text-emerald-700 font-semibold">Voltar</Link>
      </div>
    );
  }

  const producerProducts = products.filter((p) => p.producerId === producer.id);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
      <Link to="/produtores" className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-900 mb-5">
        <ArrowLeft size={16} /> Todos os produtores
      </Link>

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-amber-400/20 blur-2xl" />
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <img src={producer.avatar} alt={producer.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-white/30 shadow-lg" />
          <div className="text-center sm:text-left">
            <h1 className="font-display text-3xl font-bold">{producer.name}</h1>
            <p className="text-emerald-100/80">{producer.role}</p>
            <p className="mt-1 text-sm flex items-center justify-center sm:justify-start gap-1 text-emerald-100/70">
              <MapPin size={14} /> {producer.city} – {producer.state}
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 justify-center sm:justify-start">
          {producer.badges.map((b) => (
            <span key={b} className="px-2.5 py-1 rounded-full bg-white/15 text-xs font-medium backdrop-blur">{b}</span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
        <RaizinhoMascot size={110} art={productProp(producerProducts[0]) || "wave"} contextMessage={`Olá! Eu sou o Raizinho. Conheça o ${producer.name.split(" ")[0]}!`} />
        <p className="text-sm text-emerald-900/80 leading-relaxed pt-1">
          {producer.bio}
        </p>
      </div>

      {/* IMPACTO */}
      <section className="mt-6">
        <h2 className="font-display text-xl font-bold text-emerald-950 mb-4">Impacto do produtor</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ImpactCard emoji="📈" value={<><ImpactCounter value={producer.impact.rendaPct} suffix="%" /></>} label="de renda obtida na venda direta" tone="emerald" />
          <ImpactCard emoji="📦" value={<ImpactCounter value={producer.impact.produtosVendidos} />} label="produtos vendidos" tone="amber" />
          <ImpactCard emoji="🏡" value={<ImpactCounter value={producer.impact.familias} />} label="famílias beneficiadas" tone="earth" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">* Números fictícios, demonstrativos do protótipo.</p>
      </section>

      {/* PRODUTOS */}
      <section className="mt-8">
        <h2 className="font-display text-xl font-bold text-emerald-950 mb-4">Produtos deste produtor</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {producerProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ImpactCard({ emoji, value, label, tone }) {
  const tones = {
    emerald: "from-emerald-50 to-emerald-100 text-emerald-800",
    amber: "from-amber-50 to-amber-100 text-amber-700",
    earth: "from-orange-50 to-orange-100 text-orange-700",
  };
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${tones[tone]} p-5`}>
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 text-3xl font-extrabold">{value}</div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  );
}