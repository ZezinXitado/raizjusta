import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { producers } from "@/data/mockData";

export default function Producers() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <h1 className="font-display text-3xl font-bold text-emerald-950">Conheça os Produtores</h1>
      <p className="text-muted-foreground mt-1">Pessoas reais por trás de cada produto. Histórias do campo brasileiro.</p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {producers.map((p) => (
          <Link key={p.id} to={`/produtores/${p.id}`} className="group rounded-3xl bg-card border border-border/70 overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="relative h-44 overflow-hidden">
              <img src={p.avatar} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-bold text-lg leading-tight">{p.name}</p>
                <p className="text-xs text-emerald-100/80 flex items-center gap-1"><MapPin size={12} /> {p.city} – {p.state}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{p.bio}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.badges.slice(0, 3).map((b) => (
                  <span key={b} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-medium">{b}</span>
                ))}
              </div>
              <p className="mt-3 text-sm font-semibold text-emerald-700">Conhecer história →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}