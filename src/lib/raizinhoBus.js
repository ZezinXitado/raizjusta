// Barramento de eventos do Raizinho (carrinho, compra, pontos...)
const target = new EventTarget();
const recent = [];
let hosts = 0;
const hostSubs = new Set();

export function emitRaizinho(type, data = {}) {
  const evt = { type, ...data, at: Date.now() };
  recent.push(evt);
  while (recent.length > 8) recent.shift();
  target.dispatchEvent(new CustomEvent("rz", { detail: evt }));
}

// Novos ouvintes recebem eventos muito recentes (ex: tela de compra concluída que acabou de abrir)
export function onRaizinho(fn, replayMs = 1200) {
  const now = Date.now();
  recent.filter((e) => now - e.at < replayMs).forEach(fn);
  const h = (e) => fn(e.detail);
  target.addEventListener("rz", h);
  return () => target.removeEventListener("rz", h);
}

// Mascotes "da página" registram-se para o companheiro flutuante não duplicar o personagem
export function registerHost() {
  hosts++;
  hostSubs.forEach((f) => f(hosts));
  return () => {
    hosts--;
    hostSubs.forEach((f) => f(hosts));
  };
}

export function onHostsChange(fn) {
  fn(hosts);
  hostSubs.add(fn);
  return () => {
    hostSubs.delete(fn);
  };
}