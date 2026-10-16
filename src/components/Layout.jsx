import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background bg-grain flex flex-col">
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="hidden md:block border-t border-border/60 bg-emerald-950 text-emerald-100/80 mt-10">
      <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-lg font-bold text-white">RAIZ<span className="text-amber-400">JUSTA</span></div>
          <p className="mt-2 text-emerald-200/60 text-xs">Do produtor ao consumidor, com preço justo.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Plataforma</p>
          <p className="text-xs text-emerald-200/60">Protótipo demonstrativo de projeto escolar sobre Comércio Justo (Fair Trade).</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Dados</p>
          <p className="text-xs text-emerald-200/60">Todos os números, produtores e valores são fictícios, para fins de demonstração.</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2">Mensagem</p>
          <p className="text-xs text-emerald-200/60 italic">“Do campo para o mundo. Do produtor para você. De forma justa.”</p>
        </div>
      </div>
    </footer>
  );
}