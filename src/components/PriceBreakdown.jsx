import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#2E7D52", "#A9703E", "#E0A82E", "#4CAF7B"];

export default function PriceBreakdown({ breakdown, price }) {
  const data = [
    { name: "👨‍🌾 Produtor", value: breakdown.produtor, key: "produtor" },
    { name: "🚚 Logística", value: breakdown.logistica, key: "logistica" },
    { name: "📱 Plataforma", value: breakdown.plataforma, key: "plataforma" },
    { name: "🌱 Fundo de desenvolvimento", value: breakdown.fundo, key: "fundo" },
  ];
  const produtorPct = Math.round((breakdown.produtor / price) * 100);

  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div className="relative h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={3} stroke="none">
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `R$ ${Number(v).toFixed(2).replace(".", ",")}`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-extrabold text-emerald-800">{produtorPct}%</span>
          <span className="text-[10px] text-muted-foreground font-medium">para o produtor</span>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((d, i) => {
          const pct = Math.round((d.value / price) * 100);
          return (
            <div key={d.key}>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-emerald-900">{d.name}</span>
                <span className="font-semibold text-emerald-900">R$ {d.value.toFixed(2).replace(".", ",")}</span>
              </div>
              <div className="mt-1 h-2.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: COLORS[i] }}
                />
              </div>
            </div>
          );
        })}
        <div className="pt-2 border-t border-border flex justify-between text-sm font-semibold">
          <span>Preço final</span>
          <span className="text-emerald-800">R$ {price.toFixed(2).replace(".", ",")}</span>
        </div>
      </div>
    </div>
  );
}