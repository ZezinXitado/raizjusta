import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { platformImpact, regions } from "@/data/mockData";
import ImpactCounter from "@/components/ImpactCounter";

const regiaoData = regions.map((r) => ({ name: r.state, movimentado: r.movimentado / 1000 }));
const sustData = [
  { name: "Sustentáveis", value: platformImpact.sustentaveisPct, fill: "#2E7D52" },
  { name: "Convencionais", value: 100 - platformImpact.sustentaveisPct, fill: "#E0A82E" },
];

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <h1 className="font-display text-3xl font-bold text-emerald-950">📊 Dashboard de Impacto</h1>
      <p className="text-muted-foreground mt-1">Visão geral da plataforma. Dados demonstrativos do protótipo.</p>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card emoji="👨‍🌾" value={<ImpactCounter value={platformImpact.produtores} />} label="produtores cadastrados" />
        <Card emoji="🛍️" value={<ImpactCounter value={platformImpact.produtosVendidos} />} label="produtos vendidos" />
        <Card emoji="💰" value={<><ImpactCounter value={platformImpact.movimentado} /></>} label="movimentado (R$)" />
        <Card emoji="🤝" value={<ImpactCounter value={platformImpact.cooperativas} />} label="cooperativas" />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-card border border-border p-6">
          <h2 className="font-bold text-emerald-950 mb-4">Movimentação por estado (R$ mil)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regiaoData}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => `R$ ${v} mil`} />
                <Bar dataKey="movimentado" radius={[8, 8, 0, 0]} fill="#2E7D52" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl bg-card border border-border p-6">
          <h2 className="font-bold text-emerald-950 mb-4">Produtores sustentáveis</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sustData} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3} stroke="none">
                  {sustData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                </Pie>
                <Legend />
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-muted-foreground">{platformImpact.sustentaveisPct}% dos produtores com práticas sustentáveis</p>
        </div>
      </div>
    </div>
  );
}

function Card({ emoji, value, label }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5">
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 text-2xl font-extrabold text-emerald-800">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}