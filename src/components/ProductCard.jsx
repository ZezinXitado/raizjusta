import React from "react";
import { Link } from "react-router-dom";
import { Star, MapPin, BadgeCheck, ShoppingCart } from "lucide-react";
import { getProducer } from "@/data/mockData";
import { useApp } from "@/lib/AppContext";
import { Image } from "@/components/ui/image";
import { useToast } from "@/components/ui/use-toast";

export default function ProductCard({ product, index = 0 }) {
  const producer = getProducer(product.producerId);
  const { addToCart, addPontos } = useApp();
  const { toast } = useToast();

  const handleBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    addPontos(product.sustainable ? 150 : 100);
    toast({
      title: `${product.name} adicionado ao carrinho`,
      description: `+${product.sustainable ? 150 : 100} pontos de impacto`,
    });
  };

  return (
    <Link
      to={`/produtos/${product.id}`}
      className="group block rounded-3xl bg-card border border-border/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          fittingType="fill"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-700/90 text-white text-xs font-semibold backdrop-blur">
          <BadgeCheck size={13} /> Justo {product.fairTradePct}%
        </div>
        {product.sustainable && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-lime-500/90 text-white text-xs font-semibold">🌱 Sustentável</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-base text-emerald-950 leading-tight">{product.name}</h3>
          <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
            <Star size={14} fill="currentColor" /> <span className="text-xs font-semibold text-emerald-900">{product.rating}</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-muted-foreground flex items-center gap-1">
          <MapPin size={12} /> {producer?.name} · {product.city}–{product.state}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-extrabold text-emerald-800">R$ {product.price.toFixed(2).replace(".", ",")}</span>
          <button
            onClick={handleBuy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-colors active:scale-95"
          >
            <ShoppingCart size={14} /> Comprar
          </button>
        </div>
      </div>
    </Link>
  );
}