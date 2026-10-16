import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, Leaf, Users, Coins, MapPin, Handshake, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/AppContext";
import { getProduct, getProducer } from "@/data/mockData";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import RaizinhoMascot from "@/components/RaizinhoMascot";

export default function Cart() {
  const { carrinho, setQty, removeFromCart, clearCart, recordPurchase, isAuthenticated } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState("cart");
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  const items = carrinho.map((i) => ({ ...i, product: getProduct(i.id) })).filter((i) => i.product);
  const total = items.reduce((a, i) => a + i.product.price * i.qty, 0);
  const pontosGanhos = items.reduce((a, i) => a + (i.product.sustainable ? 150 : 100) * i.qty, 0);

  const producersSupported = new Set(items.map((i) => i.product.producerId)).size;
  const amountToProducers = items.reduce((a, i) => a + i.product.breakdown.produtor * i.qty, 0);
  const sustainablePractices = items.filter((i) => i.product.sustainable).length;
  const cooperativas = Math.max(1, Math.round(producersSupported / 2));
  const distance = Math.max(120, producersSupported * 180);
  const itemCount = items.reduce((a, i) => a + i.qty, 0);

  const handleConfirm = async () => {
    if (!isAuthenticated) {
      navigate("/login?returnTo=/carrinho");
      return;
    }
    setPlacing(true);
    try {
      const order_number = "RJ" + Math.floor(1000 + Math.random() * 9000);
      const created = await base44.entities.Order.create({
        order_number,
        total,
        status: "confirmado",
        items: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          qty: i.qty,
          image: i.product.image,
          producer: getProducer(i.product.producerId)?.name || "",
          producerId: i.product.producerId,
          sustainable: i.product.sustainable,
        })),
        impact: { producersSupported, amountToProducers, sustainablePractices, cooperativas, distance },
      });
      recordPurchase({ itemCount, producersCount: producersSupported, pontosGanhos });
      clearCart();
      setOrder({
        order_number: created?.order_number || order_number,
        id: created?.id,
        impact: { producersSupported, amountToProducers, sustainablePractices, cooperativas, distance },
        total,
        pontosGanhos,
      });
      setStep("done");
    } catch (e) {
      toast({ title: "Erro ao finalizar pedido", description: e.message || "Tente novamente.", variant: "destructive" });
    } finally {
      setPlacing(false);
    }
  };

  // DONE
  if (step === "done" && order) {
    return (
      <div className="mx-auto max-w-lg px-4 sm:px-6 py-10">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 14 }} className="mx-auto">
            <RaizinhoMascot size={180} art="celebrate" trigger={{ name: "purchase", key: order.order_number }} contextMessage="Compra realizada! Você acabou de apoiar pequenos produtores! 💚" />
          </motion.div>
          <h1 className="mt-5 font-display text-2xl font-bold text-emerald-950">Compra realizada! 🎉</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pedido <span className="font-bold text-emerald-700">#{order.order_number}</span> confirmado.</p>
        </motion.div>

        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 rounded-3xl bg-emerald-50 border border-emerald-100 p-6">
          <p className="text-sm font-semibold text-emerald-900 mb-4">Você acabou de contribuir para:</p>
          <div className="grid grid-cols-2 gap-3">
            <Impact emoji="👨‍🌾" value={order.impact.producersSupported} label="produtores apoiados" />
            <Impact emoji="💰" value={`R$ ${order.impact.amountToProducers.toFixed(0)}`} label="para os produtores" />
            <Impact emoji="🌱" value={order.impact.sustainablePractices} label="práticas sustentáveis" />
            <Impact emoji="🤝" value={order.impact.cooperativas} label="cooperativas" />
          </div>
          <p className="mt-4 text-center text-sm text-emerald-800/80 italic">
            “Você não está apenas comprando um produto. Está escolhendo valorizar quem produz.”
          </p>
          <div className="mt-3 text-center text-xs font-semibold text-amber-600">+{order.pontosGanhos} pontos de impacto</div>
        </motion.div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate("/pedidos")} className="px-5 py-3 rounded-full bg-emerald-800 text-white font-semibold text-sm">Ver meus pedidos</button>
          <button onClick={() => navigate("/produtos")} className="px-5 py-3 rounded-full bg-card border border-border font-semibold text-sm">Continuar comprando</button>
        </div>
      </div>
    );
  }

  // EMPTY
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <div className="mx-auto"><RaizinhoMascot size={140} art="thinking" contextMessage="Seu carrinho está vazio... 🌱" /></div>
        <h1 className="mt-5 font-display text-2xl font-bold text-emerald-950">Seu carrinho está vazio</h1>
        <p className="mt-2 text-muted-foreground">Que tal conhecer produtos de comércio justo?</p>
        <Link to="/produtos" className="mt-6 inline-block px-5 py-3 rounded-full bg-emerald-800 text-white font-semibold text-sm">Ver produtos</Link>
      </div>
    );
  }

  // IMPACT STEP (Compra Consciente)
  if (step === "impact") {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8">
        <button onClick={() => setStep("cart")} className="text-sm font-medium text-emerald-700 mb-4">← Voltar ao carrinho</button>
        <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-6 sm:p-8">
          <div className="flex items-center gap-2"><Leaf size={22} className="text-amber-300" /><h1 className="font-display text-2xl font-bold">Sua compra gera impacto</h1></div>
          <p className="mt-1 text-emerald-100/80 text-sm">Veja quem e o que esta compra apoia antes de confirmar.</p>

          <div className="mt-6 space-y-3">
            <Row icon={Users} value={`${producersSupported} pequenos produtores`} />
            <Row icon={Coins} value={`R$ ${amountToProducers.toFixed(2).replace(".", ",")} destinados aos produtores`} />
            <Row icon={Leaf} value={`${sustainablePractices} prática(s) sustentável(is) incentivadas`} />
            <Row icon={MapPin} value={`${distance} km de distância média dos produtores`} />
            <Row icon={Handshake} value={`${cooperativas} cooperativa(s) envolvida(s)`} />
          </div>

          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-emerald-50">
            “Você não está apenas comprando um produto. Está escolhendo valorizar quem produz.”
          </div>

          <div className="mt-5 flex justify-between text-sm"><span>Total do pedido</span><span className="font-bold">R$ {total.toFixed(2).replace(".", ",")}</span></div>
          <button onClick={handleConfirm} disabled={placing} className="mt-4 w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold flex items-center justify-center gap-2">
            {placing ? <><Loader2 size={18} className="animate-spin" /> Confirmando…</> : "Confirmar compra"}
          </button>
          <p className="mt-2 text-center text-xs text-emerald-100/60">Simulação para apresentação — sem pagamento real.</p>
        </div>
      </div>
    );
  }

  // CART REVIEW
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <h1 className="font-display text-3xl font-bold text-emerald-950">🛒 Carrinho</h1>

      <div className="mt-6 space-y-3">
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-4 rounded-2xl bg-card border border-border p-3">
            <img src={i.product.image} alt={i.product.name} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-bold text-emerald-950 text-sm truncate">{i.product.emoji} {i.product.name}</p>
              <p className="text-xs text-muted-foreground">{i.product.city}–{i.product.state}</p>
              <p className="text-sm font-semibold text-emerald-800 mt-0.5">R$ {i.product.price.toFixed(2).replace(".", ",")}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(i.id, i.qty - 1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><Minus size={14} /></button>
              <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
              <button onClick={() => setQty(i.id, i.qty + 1)} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><Plus size={14} /></button>
            </div>
            <div className="text-right hidden sm:block">
              <p className="font-bold text-emerald-950">R$ {(i.product.price * i.qty).toFixed(2).replace(".", ",")}</p>
              <button onClick={() => removeFromCart(i.id)} className="text-xs text-red-500 flex items-center gap-1 ml-auto mt-1"><Trash2 size={12} /> Remover</button>
            </div>
            <button onClick={() => removeFromCart(i.id)} className="sm:hidden text-red-500"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-100 p-5">
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>R$ {total.toFixed(2).replace(".", ",")}</span></div>
        <div className="flex justify-between text-sm text-emerald-700 mt-1"><span>Pontos que você vai ganhar</span><span>+{pontosGanhos} pts</span></div>
        <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-emerald-200"><span>Total</span><span className="text-emerald-800">R$ {total.toFixed(2).replace(".", ",")}</span></div>
        {!isAuthenticated && (
          <p className="mt-3 text-xs text-amber-700 bg-amber-50 rounded-lg p-2 text-center">Você precisa entrar para finalizar a compra.</p>
        )}
        <button onClick={() => setStep("impact")} className="mt-4 w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors active:scale-95">
          Finalizar compra
        </button>
        <p className="mt-2 text-center text-xs text-muted-foreground">Simulação para apresentação — sem pagamento real.</p>
      </div>
    </div>
  );
}

function Row({ icon: Icon, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
      <Icon size={20} className="text-amber-300 shrink-0" />
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function Impact({ emoji, value, label }) {
  return (
    <div className="rounded-2xl bg-white p-4 text-center">
      <div className="text-2xl">{emoji}</div>
      <div className="text-xl font-extrabold text-emerald-800">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}