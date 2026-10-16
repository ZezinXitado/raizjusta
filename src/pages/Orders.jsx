import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";
import RaizinhoMascot from "@/components/RaizinhoMascot";

const statusMap = {
  confirmado: { label: "Confirmado", cls: "bg-emerald-100 text-emerald-700" },
  preparando: { label: "Preparando", cls: "bg-amber-100 text-amber-700" },
  enviado: { label: "Enviado", cls: "bg-blue-100 text-blue-700" },
  entregue: { label: "Entregue", cls: "bg-emerald-700 text-white" },
};

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (!user) return;
    base44.entities.Order.filter({ created_by_id: user.id }, "-created_date", 50)
      .then(setOrders)
      .catch(() => setOrders([]));
  }, [user]);

  if (!orders) {
    return <div className="flex justify-center py-24"><Loader2 className="animate-spin text-emerald-700" /></div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
      <h1 className="font-display text-3xl font-bold text-emerald-950">📦 Meus Pedidos</h1>
      <p className="text-muted-foreground mt-1">Histórico das suas compras de comércio justo.</p>

      {orders.length === 0 ? (
        <div className="mt-10 text-center py-16 rounded-3xl bg-card border border-border">
          <div className="mx-auto"><RaizinhoMascot size={140} art="thinking" contextMessage="Você ainda não tem pedidos. Que tal apoiar um produtor? 🌱" /></div>
          <p className="mt-4 text-muted-foreground">Você ainda não fez pedidos.</p>
          <Link to="/produtos" className="mt-5 inline-block px-5 py-3 rounded-full bg-emerald-800 text-white font-semibold text-sm">Explorar produtos</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => {
            const st = statusMap[o.status] || statusMap.confirmado;
            const date = new Date(o.created_date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
            return (
              <div key={o.id} className="rounded-3xl bg-card border border-border p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-bold text-emerald-950">Pedido #{o.order_number}</p>
                    <p className="text-xs text-muted-foreground">{date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${st.cls}`}>{st.label}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {(o.items || []).map((it, idx) => (
                    <div key={idx} className="flex items-center gap-2 rounded-xl bg-muted/40 px-2 py-1.5">
                      <img src={it.image} alt={it.name} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="text-xs font-medium text-emerald-900">{it.qty}× {it.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <Mini emoji="👨‍🌾" value={o.impact?.producersSupported} label="produtores" />
                  <Mini emoji="💰" value={`R$ ${(o.impact?.amountToProducers || 0).toFixed(0)}`} label="ao produtor" />
                  <Mini emoji="🌱" value={o.impact?.sustainablePractices} label="sustentáveis" />
                  <Mini emoji="🤝" value={o.impact?.cooperativas} label="cooperativas" />
                </div>

                <div className="mt-4 flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-bold text-emerald-800">R$ {Number(o.total).toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Mini({ emoji, value, label }) {
  return (
    <div className="rounded-xl bg-emerald-50 py-2">
      <div className="text-lg">{emoji}</div>
      <div className="text-sm font-bold text-emerald-800">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}