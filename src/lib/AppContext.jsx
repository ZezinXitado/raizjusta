import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { emitRaizinho } from "@/lib/raizinhoBus";

const AppContext = createContext(null);
const cartKey = (uid) => `raizjusta_cart_${uid || "anon"}`;

export function AppProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [pontos, setPontos] = useState(0);
  const [carrinho, setCarrinho] = useState([]);
  const [produtoresVisitados, setProdutoresVisitados] = useState([]);
  const [produtosScaneados, setProdutosScaneados] = useState([]);
  const [stats, setStats] = useState({ compras: 0, produtoresApoiados: 0, produtosComprados: 0 });
  const [lastOrderAt, setLastOrderAt] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setPontos(0);
      setCarrinho([]);
      setStats({ compras: 0, produtoresApoiados: 0, produtosComprados: 0 });
      setProdutoresVisitados([]);
      setProdutosScaneados([]);
      setReady(true);
      return;
    }
    if (!user) return;
    setPontos(user.pontos ?? 0);
    setStats({
      compras: user.compras ?? 0,
      produtoresApoiados: user.produtoresApoiados ?? 0,
      produtosComprados: user.produtosComprados ?? 0,
    });
    setProdutoresVisitados(user.produtoresVisitados ?? []);
    setProdutosScaneados(user.produtosScaneados ?? []);
    try {
      const raw = localStorage.getItem(cartKey(user.id));
      setCarrinho(raw ? JSON.parse(raw) : []);
    } catch {
      setCarrinho([]);
    }
    setReady(true);
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (user) localStorage.setItem(cartKey(user.id), JSON.stringify(carrinho));
  }, [carrinho, user]);

  const persistUser = useCallback(async (patch) => {
    try {
      await base44.auth.updateMe(patch);
    } catch (e) {
      /* extra data persistência best-effort */
    }
  }, []);

  const addPontos = useCallback((n) => {
    setPontos((p) => {
      const np = p + n;
      persistUser({ pontos: np });
      emitRaizinho("points", { n });
      return np;
    });
  }, [persistUser]);

  const addToCart = useCallback((productId, qty = 1) => {
    setCarrinho((s) => {
      const existing = s.find((i) => i.id === productId);
      return existing
        ? s.map((i) => (i.id === productId ? { ...i, qty: i.qty + qty } : i))
        : [...s, { id: productId, qty }];
    });
    emitRaizinho("cart_add", { productId });
  }, []);

  const setQty = useCallback((productId, qty) => {
    setCarrinho((s) =>
      qty <= 0 ? s.filter((i) => i.id !== productId) : s.map((i) => (i.id === productId ? { ...i, qty } : i))
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCarrinho((s) => s.filter((i) => i.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCarrinho([]), []);

  const recordPurchase = useCallback(({ itemCount, producersCount, pontosGanhos }) => {
    setStats((s) => {
      const ns = {
        compras: s.compras + 1,
        produtoresApoiados: s.produtoresApoiados + producersCount,
        produtosComprados: s.produtosComprados + itemCount,
      };
      persistUser(ns);
      return ns;
    });
    if (pontosGanhos) addPontos(pontosGanhos);
    setLastOrderAt(Date.now());
    emitRaizinho("purchase", { itemCount, pontosGanhos });
  }, [persistUser, addPontos]);

  const visitProducer = useCallback((id) => {
    setProdutoresVisitados((prev) => {
      if (prev.includes(id)) return prev;
      persistUser({ produtoresVisitados: [...prev, id] });
      addPontos(10);
      return [...prev, id];
    });
  }, [persistUser, addPontos]);

  const scanProduct = useCallback((id) => {
    setProdutosScaneados((prev) => {
      if (prev.includes(id)) return prev;
      persistUser({ produtosScaneados: [...prev, id] });
      addPontos(20);
      return [...prev, id];
    });
  }, [persistUser, addPontos]);

  const value = {
    user,
    isAuthenticated,
    ready,
    pontos,
    carrinho,
    stats,
    compras: stats.compras,
    produtoresApoiados: stats.produtoresApoiados,
    produtosComprados: stats.produtosComprados,
    lastOrderAt,
    produtoresVisitados,
    produtosScaneados,
    addPontos,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    recordPurchase,
    visitProducer,
    scanProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp deve ser usado dentro de AppProvider");
  return ctx;
}