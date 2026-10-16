import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct, getProducer } from "@/data/mockData";
import { useApp } from "@/lib/AppContext";
import { Image } from "@/components/ui/image";

export default function Passport() {
  const { id } = useParams();
  const product = getProduct(id);
  const producer = product ? getProducer(product.producerId) : null;
  const { scanProduct } = useApp();

  useEffect(() => {
    if (product) scanProduct(product.id);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return <div className="mx-auto max-w-2xl px-6 py-20 text-center text-muted-foreground">Produto não encontrado.</div>;
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-8">
      <div className="rounded-3xl overflow-hidden border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-amber-50 shadow-lg">
        <div className="bg-emerald-800 text-white px-5 py-3 flex items-center justify-between">
          <span className="font-display font-bold">🔗 Passaporte do Produto</span>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">RaizJusta</span>
        </div>
        <div className="p-6 text-center">
          <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden">
            <Image src={product.image} alt={product.name} className="w-full h-full object-cover" fittingType="fill" />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold text-emerald-950">{product.emoji} {product.name}</h1>
          <p className="text-sm text-muted-foreground">📍 {product.city} – {product.state}</p>
        </div>

        <div className="px-6 pb-6 space-y-2.5 text-left">
          <Line label="👨‍🌾 Produtor" value={producer?.name} />
          <Line label="🌱 Produção" value="Sustentável" />
          <Line label="🤝 Comércio" value={`Justo (${product.fairTradePct}%)`} />
          <Line label="💰 Preço" value={`R$ ${product.price.toFixed(2).replace(".", ",")}`} />
          <Line label="📦 Origem" value="Rastreável" />
        </div>

        <div className="px-6 pb-6">
          <Link to={`/produtos/${product.id}`} className="block w-full py-3 rounded-2xl bg-emerald-800 text-white text-center font-semibold text-sm">
            Ver produto completo
          </Link>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">Passaporte gerado pelo RaizJusta · dados demonstrativos.</p>
    </div>
  );
}

function Line({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-emerald-950">{value}</span>
    </div>
  );
}