import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, BadgeCheck, ShoppingCart, QrCode, Sprout, User, Truck, Coins } from "lucide-react";
import { getProduct, getProducer } from "@/data/mockData";
import { useApp } from "@/lib/AppContext";
import { useToast } from "@/components/ui/use-toast";
import { Image } from "@/components/ui/image";
import PriceBreakdown from "@/components/PriceBreakdown";
import QRPassport from "@/components/QRPassport";
import RaizinhoMascot, { productProp } from "@/components/RaizinhoMascot";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(id);
  const { addToCart, addPontos, scanProduct } = useApp();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-muted-foreground">Produto não encontrado.</p>
        <Link to="/produtos" className="mt-4 inline-block text-emerald-700 font-semibold">Voltar aos produtos</Link>
      </div>
    );
  }

  const producer = getProducer(product.producerId);

  const handleBuy = () => {
    addToCart(product.id);
    addPontos(product.sustainable ? 150 : 100);
    toast({ title: `${product.name} adicionado ao carrinho`, description: `+${product.sustainable ? 150 : 100} pontos` });
  };

  const handleScan = () => {
    scanProduct(product.id);
    navigate(`/passaporte/${product.id}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-900 mb-5">
        <ArrowLeft size={16} /> Voltar
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-3xl overflow-hidden border border-border bg-card">
          <div className="relative aspect-[4/3]">
            <Image src={product.image} alt={product.name} className="w-full h-full object-cover" fittingType="fill" />
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-700/90 text-white text-xs font-semibold">
              <BadgeCheck size={14} /> Comércio Justo {product.fairTradePct}%
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold text-emerald-950">{product.emoji} {product.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-amber-500 font-semibold"><Star size={15} fill="currentColor" /> {product.rating}</span>
            <span className="flex items-center gap-1 text-muted-foreground"><MapPin size={15} /> {product.city} – {product.state}</span>
          </div>

          <Link to={`/produtores/${producer.id}`} className="mt-4 flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors">
            <img src={producer.avatar} alt={producer.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Produtor</p>
              <p className="font-bold text-emerald-950">{producer.name}</p>
              <p className="text-xs text-muted-foreground">{producer.role}</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700">Conhecer →</span>
          </Link>

          <p className="mt-4 text-emerald-900/80 leading-relaxed">{product.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.badges.map((b) => (
              <span key={b} className="px-2.5 py-1 rounded-full bg-white border border-border text-xs font-medium text-emerald-800">{b}</span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-100">
            <RaizinhoMascot size={96} art={productProp(product)} eyeTrack contextMessage={`Olha esse ${product.name}!`} />
            <p className="text-xs text-amber-900/80 leading-relaxed">
              O Raizinho diz: ao comprar este produto, a maior parte do valor vai direto para {producer.name.split(" ")[0]} — sem atravessador. 🌱
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-emerald-800">R$ {product.price.toFixed(2).replace(".", ",")}</span>
            <button onClick={handleBuy} className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors active:scale-95">
              <ShoppingCart size={18} /> Adicionar ao carrinho
            </button>
            <button onClick={handleScan} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold transition-colors" title="Ver Passaporte do Produto">
              <QrCode size={18} /> <span className="hidden sm:inline">Passaporte</span>
            </button>
          </div>
        </div>
      </div>

      {/* PRICE BREAKDOWN */}
      <section className="mt-10 rounded-3xl bg-card border border-border p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">💰</span>
          <h2 className="font-display text-2xl font-bold text-emerald-950">Para onde vai o seu dinheiro?</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Veja a distribuição do preço final — valores de exemplo demonstrativos do projeto.</p>
        <PriceBreakdown breakdown={product.breakdown} price={product.price} />
        <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-100 text-sm text-amber-900/80">
          No comércio tradicional, o pequeno produtor pode receber uma parcela pequena do valor final. O RaizJusta busca tornar essa distribuição mais transparente e valorizar quem está na origem da produção.
          <span className="block mt-1 text-xs text-amber-700/70">* Valores ilustrativos para fins de demonstração escolar.</span>
        </div>
      </section>

      {/* INFO GRID */}
      <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Sprout, title: "Produção sustentável", desc: "Práticas responsáveis no cultivo." },
          { icon: User, title: "Pequeno produtor", desc: "Agricultura familiar e local." },
          { icon: BadgeCheck, title: "Comércio justo", desc: `Certificado ${product.fairTradePct}%.` },
          { icon: Truck, title: "Origem rastreável", desc: "Do campo à sua mesa." },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl bg-card border border-border p-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center"><f.icon size={20} /></div>
            <h3 className="mt-3 font-bold text-emerald-950 text-sm">{f.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* PASSAPORTE */}
      <section className="mt-6 max-w-md">
        <QRPassport productId={product.id} />
      </section>
    </div>
  );
}