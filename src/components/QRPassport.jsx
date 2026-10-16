import React, { useMemo } from "react";
import { getProduct, getProducer } from "@/data/mockData";

export default function QRPassport({ productId }) {
  const product = getProduct(productId);
  const producer = product ? getProducer(product.producerId) : null;

  const qrSrc = useMemo(() => {
    const url = `${window.location.origin}/passaporte/${productId}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(url)}`;
  }, [productId]);

  if (!product) return null;

  return (
    <div className="rounded-3xl border-2 border-dashed border-emerald-300 bg-gradient-to-br from-emerald-50 to-amber-50 p-6 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-white text-xs font-semibold mb-3">
        🔗 Passaporte do Produto
      </div>
      <img src={qrSrc} alt="QR Code do passaporte do produto" className="mx-auto w-44 h-44 rounded-2xl bg-white p-2 shadow-sm" />
      <p className="mt-3 text-xs text-muted-foreground">Aponte a câmera do celular para ver a origem deste produto.</p>
      <div className="mt-4 text-left space-y-1.5 text-sm">
        <p className="font-bold text-emerald-950">{product.emoji} {product.name}</p>
        <p className="text-muted-foreground">📍 {product.city} – {product.state}</p>
        <p className="text-muted-foreground">👨‍🌾 Produtor: {producer?.name}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {["🌱 Produção sustentável", "🤝 Comércio justo", "💰 Preço justo", "📦 Origem rastreável"].map((b) => (
            <span key={b} className="px-2 py-1 rounded-full bg-white border border-border text-[11px] font-medium text-emerald-800">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}