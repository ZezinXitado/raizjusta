import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Mail, Lock, Loader2 } from "lucide-react";
import Logo from "@/components/Logo";
import GoogleIcon from "@/components/GoogleIcon";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      window.location.href = safeReturnTo();
    } catch (err) {
      setError(err.message || "E-mail ou senha inválidos.");
      setLoading(false);
    }
  };

  const handleGoogle = () => base44.auth.loginWithProvider("google", safeReturnTo());

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="lg:w-1/2 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="relative"><Logo size={44} /></div>
        <div className="relative">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight text-balance">
            Do produtor ao consumidor, <span className="text-amber-300">com preço justo.</span>
          </h1>
          <p className="mt-4 text-emerald-100/80">Valorize quem produz. Conheça a origem. Compre com propósito.</p>
        </div>
        <p className="relative text-emerald-100/50 text-xs">RAIZJUSTA · Comércio justo do campo à sua mesa</p>
      </div>

      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-sm">
          <h2 className="font-display text-2xl font-bold text-emerald-950">Entrar</h2>
          <p className="text-muted-foreground text-sm mt-1">Acesse sua conta RaizJusta.</p>

          <button
            onClick={handleGoogle}
            className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-border bg-card hover:bg-muted/50 text-sm font-medium transition-colors"
          >
            <GoogleIcon className="w-5 h-5" /> Entrar com Google
          </button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-3 text-muted-foreground">ou</span></div>
          </div>

          {error && <div className="mb-4 p-3 rounded-xl bg-destructive/10 text-destructive text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-card border border-border focus-within:border-emerald-600">
              <Mail size={18} className="text-muted-foreground" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Seu e-mail" className="flex-1 bg-transparent outline-none text-sm" />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-card border border-border focus-within:border-emerald-600">
              <Lock size={18} className="text-muted-foreground" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Sua senha" className="flex-1 bg-transparent outline-none text-sm" />
            </div>
            <button disabled={loading} className="w-full py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Entrando…</> : "Entrar"}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-emerald-700 font-medium">Esqueceu a senha?</Link>
            <Link to="/register" className="text-emerald-700 font-medium">Criar conta</Link>
          </div>
        </div>
      </div>
    </div>
  );
}