import React, { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { regions } from "@/data/mockData";
import ImpactCounter from "@/components/ImpactCounter";
import RaizinhoMascot from "@/components/RaizinhoMascot";

const center = [-8.5, -42];

export default function MapPage() {
  const [selected, setSelected] = useState(regions[0]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="flex items-center gap-4">
        <div className="hidden sm:block">
          <RaizinhoMascot size={120} art="explorer" contextMessage="Bora explorar o mapa! 🗺️" />
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-emerald-950">🌎 Mapa do Comércio Justo</h1>
          <p className="text-muted-foreground mt-1">Produtores e cooperativas pelo Brasil. Dados demonstrativos.</p>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-border h-[420px] sm:h-[520px]">
          <MapContainer center={center} zoom={4} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap &copy; CARTO'
            />
            {regions.map((r) => (
              <CircleMarker
                key={r.state}
                center={[r.lat, r.lng]}
                radius={selected?.state === r.state ? 16 : 11}
                pathOptions={{ color: "#2E7D52", fillColor: "#4CAF7B", fillOpacity: 0.8 }}
                eventHandlers={{ click: () => setSelected(r) }}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-bold text-emerald-900">{r.name}</p>
                    <p>{r.produtores} produtores · {r.produtos} produtos</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div>
          {selected && (
            <div className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-6">
              <h2 className="font-display text-2xl font-bold">{selected.name}</h2>
              <p className="text-emerald-100/70 text-sm">Estado: {selected.state}</p>
              <div className="mt-5 space-y-4">
                <Row emoji="👨‍🌾" value={<ImpactCounter value={selected.produtores} />} label="produtores" />
                <Row emoji="🌱" value={<ImpactCounter value={selected.produtos} />} label="produtos" />
                <Row emoji="💰" value={<><ImpactCounter value={selected.movimentado} /></>} label="movimentado (R$)" />
                <Row emoji="🤝" value={<ImpactCounter value={selected.cooperativas} />} label="cooperativas" />
              </div>
              <p className="mt-5 text-xs text-emerald-100/60">* Dados fictícios para demonstração.</p>
            </div>
          )}
          <div className="mt-4 space-y-2">
            {regions.map((r) => (
              <button
                key={r.state}
                onClick={() => setSelected(r)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border text-sm font-medium transition-colors ${
                  selected?.state === r.state ? "bg-emerald-800 text-white border-emerald-800" : "bg-card border-border hover:bg-emerald-800/10"
                }`}
              >
                <span>📍 {r.name}</span>
                <span className="text-xs opacity-70">{r.produtores} produtores</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ emoji, value, label }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl">{emoji}</span>
      <span className="text-2xl font-extrabold">{value}</span>
      <span className="text-sm text-emerald-100/70">{label}</span>
    </div>
  );
}