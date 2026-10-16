import React from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, DollarSign, Plus, TrendingUp } from "lucide-react";
import { producers, products } from "@/data/mockData";
import ImpactCounter from "@/components/ImpactCounter";

export default function ProducerDashboard() {
  const producer = producers[0];
  const meusProdutos = products.filter((p) => p.producerId === producer.id);
  const vendasMes = 2450;
  const recebido = 2120;
  const pedidos = 32;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={producer.avatar} alt={producer.name} className="w-14 h-14 rounded-2xl object-cover" />
          <div>
            <h1 className="font-display text-2xl font-bold text-emerald-950">Painel do Produtor</h1>
            <p className="text-sm text-muted-foreground">{producer.name} · {producer.city}–{producer.state}</p>
          </div>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm">
          <Plus size={16} /> Cadastrar produto
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card icon={DollarSign} label="Vendas este mês" value={<><ImpactCounter value={vendasMes} prefix="R$ " /></>} tone="emerald" />
        <Card icon={Package} label="Produtos cadastrados" value={<ImpactCounter value={meusProdutos.length} />} tone="amber" />
        <Card icon={ShoppingBag} label="Pedidos" value={<ImpactCounter value={pedidos} />} tone="earth" />
        <Card icon={TrendingUp} label="Valor recebido" value={<><ImpactCounter value={recebido} prefix="R$ " /></>} tone="emerald" />
      </div>

      <div className="mt-6 rounded-3xl bg-card border border-border p-6">
        <h2 className="font-bold text-emerald-950 mb-4">Meus produtos</h2>
        <div className="space-y-3">
          {meusProdutos.map((p) => (
            <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-border p-3">
              <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-emerald-950 text-sm truncate">{p.emoji} {p.name}</p>
                <p className="text-xs text-muted-foreground">Recebo R$ {p.breakdown.produtor.toFixed(2).replace(".", ",")} por unidade</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-800 text-sm">R$ {p.price.toFixed(2).replace(".", ",")}</p>
                <Link to={`/produtos/${p.id}`} className="text-xs text-emerald-600">Ver →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-emerald-50 border border-emerald-100 p-5 text-sm text-emerald-900/80">
        💡 No RaizJusta você define o preço, informa suas práticas sustentáveis e acompanha quanto recebe — sem intermediários. (Painel demonstrativo.)
      </div>
    </div>
  );
}

function Card({ icon: Icon, label, value, tone }) {
  const tones = {
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    earth: "bg-orange-100 text-orange-700",
  };
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tones[tone]}`}><Icon size={20} /></div>
      <div className="mt-3 text-xl font-extrabold text-emerald-950">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}