// Biblioteca de animações do Raizinho (cada uma controla as partes do modelo 3D)
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const bump = (p) => Math.sin(Math.PI * clamp01(p));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const env = (p, a = 0.15, b = 0.15) => clamp01(Math.min(p / a, (1 - p) / b));

const hop = (P, h) => { P.root.position.y += h; };
const squash = (P, a) => P.squash.scale.set(1 + a * 0.5, 1 - a, 1 + a * 0.5);
function armsUp(P, k, wiggle = 0, t = 0) {
  P.armL.rotation.z = -0.2 - 2.5 * k - Math.sin(t * 16) * wiggle * k;
  P.armR.rotation.z = 0.2 + 2.5 * k + Math.sin(t * 16 + 1) * wiggle * k;
}
function waveArm(P, k, t) {
  P.armR.rotation.z = 0.2 + 2.45 * k + Math.sin(t * 13) * 0.35 * k;
  P.armR.rotation.x = -0.25 * k;
}
function walkCycle(P, e, t) {
  const k = t * 9;
  P.legL.rotation.x = Math.sin(k) * 0.55 * e;
  P.legR.rotation.x = -Math.sin(k) * 0.55 * e;
  P.armL.rotation.x = -Math.sin(k) * 0.45 * e;
  P.armR.rotation.x = Math.sin(k) * 0.45 * e;
  hop(P, Math.abs(Math.sin(k)) * 0.07 * e);
}

export const ACTIONS = {
  jump: {
    dur: 0.95, expr: "laugh", say: ["Eita! Você clicou em mim! 😂", "Hop! 🐸"],
    run(P, p) {
      const h = bump(seg(p, 0.18, 0.82));
      hop(P, h * 0.75);
      squash(P, 0.14 * bump(seg(p, 0, 0.18)) + 0.1 * bump(seg(p, 0.82, 1)));
      armsUp(P, h * 0.9);
      P.legL.rotation.x = 0.5 * h;
      P.legR.rotation.x = -0.25 * h;
    },
  },
  wave: {
    dur: 2.0, expr: "happy", say: ["Oi! 👋", "Olá! 👋"],
    run(P, p, c) {
      const k = ease(env(p, 0.15, 0.15));
      waveArm(P, k, c.t);
      P.head.rotation.z -= 0.15 * k;
      P.torso.rotation.z = -0.05 * k;
    },
  },
  thumbs_up: {
    dur: 1.9, expr: "happy", say: ["Boa! 👍", "Tô contigo! 👍", "Comércio justo aprovado! 👍"],
    run(P, p, c) {
      const k = ease(env(p, 0.2, 0.2));
      P.armR.rotation.x = -1.35 * k;
      P.armR.rotation.z = 0.2 + 0.3 * k;
      P.thumb.visible = k > 0.5;
      P.torso.rotation.z = -0.06 * k;
      P.head.rotation.z += 0.12 * k;
      if (k > 0.6) c.wink = "R";
    },
  },
  dance: {
    dur: 2.6, expr: "laugh", say: ["Uhuuul! 💃", "Bora dançar! 🎶", "Viva o comércio justo! 🎉"],
    run(P, p, c) {
      const e = env(p, 0.12, 0.12);
      const k = c.t * 9;
      hop(P, Math.abs(Math.sin(k)) * 0.18 * e);
      P.hips.rotation.z = Math.sin(k) * 0.18 * e;
      P.head.rotation.z = -Math.sin(k) * 0.15 * e;
      P.armL.rotation.z = -0.2 - (0.4 + (Math.sin(k) + 1) * 0.9) * e;
      P.armR.rotation.z = 0.2 + (0.4 + (1 - Math.sin(k)) * 0.9) * e;
      P.legL.rotation.x = Math.sin(k) * 0.35 * e;
      P.legR.rotation.x = -Math.sin(k) * 0.35 * e;
      P.root.rotation.y = Math.sin(k * 0.5) * 0.4 * e;
    },
  },
  spin: {
    dur: 1.2, expr: "laugh", say: ["Girando! 🌀", "Wiii! 🌪️"],
    run(P, p) {
      P.root.rotation.y = ease(p) * Math.PI * 2;
      hop(P, bump(p) * 0.25);
      P.armL.rotation.z = -0.2 - 1.2 * bump(p);
      P.armR.rotation.z = 0.2 + 1.2 * bump(p);
    },
  },
  hat_tip: {
    dur: 2.2, expr: "happy", say: ["Muito prazer! 👒", "Às suas ordens! 👒"],
    run(P, p) {
      const up = ease(env(p, 0.25, 0.25));
      P.armR.rotation.z = 0.2 + 2.7 * up;
      P.armR.rotation.x = -0.35 * up;
      P.hat.position.y += 0.35 * up;
      P.hat.position.x += 0.14 * up;
      P.hat.rotation.z -= 0.4 * up;
      const b = bump(seg(p, 0.35, 0.75));
      P.torso.rotation.x = 0.18 * b;
      P.head.rotation.x += 0.2 * b;
    },
  },
  hat_fix: {
    dur: 2.3, say: ["Opa, meu chapéu! 😅"],
    run(P, p, c) {
      const fall = ease(seg(p, 0, 0.22)) * (1 - ease(seg(p, 0.55, 0.85)));
      P.hat.rotation.z += 0.55 * fall;
      P.hat.position.x -= 0.14 * fall;
      P.hat.position.y -= 0.08 * fall;
      const up = bump(seg(p, 0.4, 0.95));
      P.armR.rotation.z = 0.2 + 2.6 * up;
      P.head.rotation.z += 0.12 * fall;
      c.expr = p < 0.55 ? "surprised" : "happy";
    },
  },
  leaves_toss: {
    dur: 1.9, expr: "laugh", say: ["Folhas pra cima! 🍃", "Vamos fazer o mundo crescer! 🍃"],
    run(P, p, c) {
      armsUp(P, ease(seg(p, 0, 0.3)) * (1 - seg(p, 0.8, 1)), 0.1, c.t);
      hop(P, bump(seg(p, 0.2, 0.5)) * 0.22);
      if (p > 0.3) c.once("b", () => c.burst("leaf", 14, "head"));
    },
  },
  plant: {
    dur: 3.0, expr: "happy", say: ["Vamos plantar uma sementinha! 🌱"],
    run(P, p) {
      const e = ease(env(p, 0.2, 0.15));
      P.hips.position.y -= 0.16 * e;
      P.legL.rotation.x = -0.35 * e;
      P.legR.rotation.x = -0.35 * e;
      P.torso.rotation.x = 0.35 * e;
      P.armL.rotation.x = -0.9 * e;
      P.armR.rotation.x = -1.0 * e;
      P.armR.rotation.z = 0.2 + 0.25 * e;
      P.head.rotation.x += 0.3 * e;
      const g = ease(seg(p, 0.35, 0.75)) * (1 - seg(p, 0.92, 1));
      if (g > 0.01) {
        P.sapling.visible = true;
        P.sapling.scale.setScalar(g * (1 + 0.15 * bump(seg(p, 0.6, 0.85))));
      }
    },
  },
  celebrate: {
    dur: 2.4, expr: "laugh", say: ["Uhuuul! 🎉", "Viva os produtores! 🎉"],
    run(P, p, c) {
      const e = env(p, 0.1, 0.15);
      hop(P, Math.abs(Math.sin(p * Math.PI * 2)) * 0.45 * e);
      armsUp(P, e, 0.2, c.t);
      P.legL.rotation.x = 0.3 * e * Math.abs(Math.sin(p * Math.PI * 2));
      if (p > 0.1) c.once("b", () => c.burst("leaf", 16, "head"));
    },
  },
  surprised: {
    dur: 1.4, expr: "surprised", say: ["Uau! 😮", "Você me encontrou! 😲"],
    run(P, p, c) {
      const e = env(p, 0.1, 0.3);
      const j = bump(seg(p, 0, 0.3));
      hop(P, j * 0.22);
      P.root.position.z -= 0.2 * e;
      P.armL.rotation.z = -0.2 - 1.1 * e;
      P.armR.rotation.z = 0.2 + 1.1 * e;
      P.hat.position.y += 0.18 * j;
      c.perk = e;
    },
  },
  thinking: {
    dur: 2.6, expr: "thinking", say: ["Hmm... deixa eu pensar 🤔"],
    run(P, p, c) {
      const e = ease(env(p, 0.2, 0.2));
      P.armR.rotation.x = -2.05 * e;
      P.armR.rotation.z = 0.2 + 0.35 * e;
      P.head.rotation.z += 0.16 * e;
      c.look = { x: -0.45, y: 0.45 };
    },
  },
  confused: {
    dur: 2.2, expr: "confused", say: ["Hmm? 🤔", "Ué?! 😅"],
    run(P, p) {
      const e = ease(env(p, 0.2, 0.2));
      P.armL.rotation.z = -0.2 - 0.7 * e;
      P.armR.rotation.z = 0.2 + 0.7 * e;
      P.armL.rotation.x = P.armR.rotation.x = -0.5 * e;
      P.head.rotation.z += Math.sin(p * Math.PI * 3) * 0.22 * e;
    },
  },
  sad: {
    dur: 2.4, expr: "sad", say: ["Poxa... 😢"],
    run(P, p, c) {
      const e = ease(env(p, 0.2, 0.2));
      P.head.rotation.x += 0.3 * e;
      P.torso.rotation.x = 0.1 * e;
      P.armL.rotation.z = -0.05;
      P.armR.rotation.z = 0.05;
      c.droop = e;
      c.look = { x: 0, y: -0.4 * e };
    },
  },
  walking: {
    dur: 3.2, expr: "happy", say: ["Bora dar uma volta! 🚶"],
    run(P, p, c) {
      const e = env(p, 0.1, 0.1);
      walkCycle(P, e, c.t);
      P.root.position.x = Math.sin(p * Math.PI * 2) * 0.35;
      P.root.rotation.y = Math.cos(p * Math.PI * 2) * 0.8 * e;
    },
  },
  explorer: {
    dur: 3.6, expr: "happy", prop: "magnifier", say: ["Modo explorador! 🔍 Vamos achar produtores?"],
    run(P, p, c) {
      ACTIONS.walking.run(P, p, c);
      P.armR.rotation.x = -1.2;
      P.armR.rotation.z = 0.3;
      c.look = { x: Math.sin(c.t * 1.5) * 0.8, y: -0.2 };
    },
  },
  pointing: {
    dur: 2.0, expr: "happy", say: ["Olha ali! 👉"],
    run(P, p, c) {
      const k = ease(env(p, 0.2, 0.2));
      if (c.lookX >= 0) { P.armR.rotation.z = 0.2 + 1.3 * k; P.armR.rotation.x = -0.8 * k; }
      else { P.armL.rotation.z = -0.2 - 1.3 * k; P.armL.rotation.x = -0.8 * k; }
    },
  },
  look_cart: {
    dur: 2.8, expr: "happy", lookSelector: 'a[href="/carrinho"]',
    run(P, p, c) { ACTIONS.pointing.run(P, p, c); },
  },
  greeting: {
    dur: 2.8, expr: "happy", say: ["Muito prazer! Eu sou o Raizinho 🌱", "Olá, seja bem-vindo! 🙌"],
    run(P, p, c) {
      const b = bump(seg(p, 0, 0.42));
      P.torso.rotation.x = 0.38 * b;
      P.head.rotation.x += 0.15 * b;
      P.armL.rotation.x = P.armR.rotation.x = -0.3 * b;
      waveArm(P, env(seg(p, 0.4, 1), 0.15, 0.2), c.t);
    },
  },
  shopping: {
    dur: 2.4, expr: "laugh", prop: "basket", say: ["Hora das compras! 🧺"],
    run(P, p, c) {
      const e = env(p, 0.1, 0.1);
      hop(P, Math.abs(Math.sin(c.t * 7)) * 0.1 * e);
      P.armR.rotation.x = -0.75;
      P.armR.rotation.z = 0.3;
      P.armL.rotation.z = -0.5 - Math.sin(c.t * 7) * 0.3 * e;
    },
  },
  happy: {
    dur: 1.8, expr: "laugh", say: ["Boa escolha! 🌱"],
    run(P, p, c) {
      hop(P, Math.abs(Math.sin(p * Math.PI * 2)) * 0.35);
      armsUp(P, bump(p) * 0.7, 0.2, c.t);
      if (p > 0.25) c.once("b", () => c.burst("leaf", 7, "head"));
    },
  },
  present: {
    dur: 1.8, expr: "laugh", prop: "base",
    run(P, p) {
      const k = ease(env(p, 0.25, 0.3));
      P.armR.rotation.x = -0.85 - 0.5 * k;
      P.armR.rotation.z = 0.28;
      hop(P, bump(p) * 0.15);
    },
  },
  sleeping: {
    dur: 1, loop: true, expr: "sleepy", say: ["Zzz... 😴"], sayMs: 5000,
    run(P, p, c) {
      P.head.rotation.x += 0.3 + Math.sin(c.t * 1.3) * 0.05;
      P.torso.scale.y = 1 + Math.sin(c.t * 1.3) * 0.035;
      P.armL.rotation.z = -0.08;
      P.armR.rotation.z = 0.08;
      c.droop = 0.7;
      c.look = { x: 0, y: -0.3 };
    },
  },
  stretch: {
    dur: 2.4, expr: "yawn",
    run(P, p) {
      const k = ease(env(p, 0.3, 0.3));
      armsUp(P, k * 1.05);
      P.torso.scale.y = 1 + 0.04 * k;
      P.head.rotation.x -= 0.2 * k;
    },
  },
  look_around: {
    dur: 2.6, expr: "neutral",
    run(P, p, c) { c.look = { x: Math.sin(p * Math.PI * 2) * 0.9, y: 0.15 }; },
  },
  levelup: {
    dur: 3.4, expr: "laugh", sayMs: 3600,
    run(P, p, c) {
      const s = seg(p, 0, 0.45);
      P.root.rotation.y = ease(s) * Math.PI * 4;
      hop(P, bump(s) * 0.7);
      armsUp(P, bump(s) * 0.6);
      if (p > 0.42) c.once("grow", () => { c.engine.applyPendingLevel(); c.burst("gold", 26, "body"); c.burst("leaf", 10, "head"); });
      P.squash.scale.setScalar(1 + 0.18 * bump(seg(p, 0.42, 0.7)));
      if (p > 0.55) {
        const k = ease(seg(p, 0.55, 0.65)) * (1 - seg(p, 0.92, 1));
        armsUp(P, k, 0.2, c.t);
        hop(P, Math.abs(Math.sin(c.t * 8)) * 0.15 * k);
      }
    },
  },
  turbo: {
    dur: 2.6, expr: "laugh",
    run(P, p, c) {
      const s = seg(p, 0, 0.55);
      P.root.rotation.y = ease(s) * Math.PI * 6;
      hop(P, bump(s) * 0.9);
      squash(P, -0.12 * bump(s));
      armsUp(P, bump(s));
      if (p > 0.5) {
        c.once("b", () => { c.burst("leaf", 18, "head"); c.burst("gold", 14, "body"); });
        ACTIONS.celebrate.run(P, seg(p, 0.5, 1), c);
      }
    },
  },
  // Compra concluída: surpresa → sorriso → pulo → braços pra cima → folhas → dança
  purchase: {
    dur: 5.2, expr: "laugh", sayMs: 5200,
    run(P, p, c) {
      if (p < 0.16) { ACTIONS.surprised.run(P, seg(p, 0, 0.16), c); c.expr = "surprised"; }
      else if (p < 0.24) { c.expr = "happy"; P.armL.rotation.z = -0.5; P.armR.rotation.z = 0.5; }
      else if (p < 0.46) ACTIONS.jump.run(P, seg(p, 0.24, 0.46), c);
      else if (p < 0.6) {
        armsUp(P, ease(seg(p, 0.46, 0.52)), 0.15, c.t);
        if (p > 0.5) c.once("leaves", () => { c.burst("leaf", 20, "head"); c.burst("gold", 10, "body"); });
      } else ACTIONS.dance.run(P, seg(p, 0.6, 1), c);
    },
  },
  // Poses contínuas (modos base)
  carry: {
    dur: 1,
    run(P) { P.armR.rotation.x = -0.85; P.armR.rotation.z = 0.28; },
  },
  read: {
    dur: 1,
    run(P) {
      P.armR.rotation.x = -1.0; P.armR.rotation.z = -0.1;
      P.armL.rotation.x = -1.0; P.armL.rotation.z = 0.35;
      P.head.rotation.x += 0.18;
    },
  },
};

export const CLICK_ACTIONS = ["jump", "wave", "thumbs_up", "dance", "spin", "hat_tip", "leaves_toss", "plant", "celebrate", "surprised", "hat_fix", "greeting"];
export const IDLE_ACTIONS = ["look_around", "stretch", "wave", "thinking", "hat_fix", "walking"];
export const GENERIC_SAY = [
  "Você clicou em mim! 😂", "Oi! 👋", "Vamos apoiar os produtores? 🌱",
  "Hehe, faz cócegas! 🤭", "Cada compra planta um futuro 🌱", "Do campo pra sua mesa! 🧺",
];