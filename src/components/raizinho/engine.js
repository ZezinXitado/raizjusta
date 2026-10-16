import * as THREE from "three";
import { buildRaizinho, applyLevel, resetPose } from "./model";
import { ACTIONS, CLICK_ACTIONS, GENERIC_SAY, IDLE_ACTIONS } from "./actions";
import { applyExpression } from "./expressions";
import { createParticles } from "./particles";
import { levels } from "@/data/mockData";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = THREE.MathUtils.clamp;

// Motor 3D do Raizinho: cena Three.js, loop de animação, olhar, reações e fila de ações.
export default class RaizinhoEngine {
  constructor(container, { level = 2, interactive = true, onSay } = {}) {
    this.container = container;
    this.interactive = interactive;
    this.onSay = onSay;
    this.createdAt = performance.now();

    const r = (this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }));
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.setClearColor(0x000000, 0);
    Object.assign(r.domElement.style, { width: "100%", height: "100%", display: "block" });
    container.appendChild(r.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
    this.camera.position.set(0, 1.9, 7.8);
    this.camera.lookAt(0, 1.45, 0);
    this.scene.add(new THREE.HemisphereLight(0xfff7e6, 0x4a6b3a, 1.25));
    const key = new THREE.DirectionalLight(0xfff1d6, 2.4);
    key.position.set(3, 5, 5);
    const rim = new THREE.DirectionalLight(0xc8f0ff, 1.2);
    rim.position.set(-4, 3, -4);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    fill.position.set(-3, 1, 4);
    this.scene.add(key, rim, fill);

    const built = buildRaizinho();
    this.P = built.parts;
    this.M = built.materials;
    this.scene.add(built.world);
    this.fx = createParticles(this.scene);
    this.level = level;
    applyLevel(this.P, this.M, level);

    const now = performance.now();
    this.state = {
      look: { x: 0, y: 0 }, eye: { x: 0, y: 0 }, pointer: null, action: null, queue: [], base: {},
      hover: false, blinkStart: -1, blinkNext: 1.5, lastActivity: now, lastPointerMove: now,
      nextIdle: 5 + Math.random() * 4, prevY: 0, prevHeadY: 0, leafLag: 0, leafSwing: 0,
      glance: null, lastClick: null, clicks: 0, clickAt: 0, auraT: 0, pendingLevel: null,
    };

    this.clock = new THREE.Clock();
    this.visible = true;
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);
    this.io = new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; });
    this.io.observe(container);
    this.resize();
    this.loop = this.loop.bind(this);
    this.raf = requestAnimationFrame(this.loop);
  }

  resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  // ---------- API ----------
  setBase(mode) {
    this.state.base = mode || {};
    if (mode?.intro) this.play(mode.intro, { priority: 1 });
  }

  setLevel(l) {
    if (l === this.level || l === this.state.pendingLevel) return;
    const settled = performance.now() - this.createdAt > 1500;
    if (l > this.level && settled && this.interactive) {
      this.state.pendingLevel = l;
      this.play("levelup", { priority: 3, say: `Subi de nível! Agora sou Raizinho ${levels[l]?.nome || ""}! ✨` });
    } else {
      this.level = l;
      applyLevel(this.P, this.M, l);
    }
  }

  applyPendingLevel() {
    const l = this.state.pendingLevel;
    if (l == null) return;
    this.state.pendingLevel = null;
    this.level = l;
    applyLevel(this.P, this.M, l);
  }

  play(name, opts = {}) {
    const def = ACTIONS[name];
    if (!def) return;
    const S = this.state;
    const priority = opts.priority ?? 1;
    const item = { name, def, time: 0, priority, say: opts.say, fired: {} };
    const cur = S.action;
    if (!cur || priority > cur.priority || (cur.priority <= 1 && priority >= cur.priority)) this.start(item);
    else if (priority >= 2 && S.queue.length < 4) S.queue.push(item);
  }

  start(item) {
    this.state.action = item;
    const text = item.say === undefined ? (item.def.say ? pick(item.def.say) : null) : item.say;
    if (text) this.onSay?.(text, item.def.sayMs ?? Math.max(2200, item.def.dur * 1000));
  }

  next() {
    const S = this.state;
    if (S.action?.name === "levelup") this.applyPendingLevel();
    const n = S.queue.shift();
    S.action = null;
    if (n) this.start(n);
  }

  click() {
    this.activity();
    const S = this.state;
    const now = performance.now();
    S.clicks = now - S.clickAt < 1800 ? S.clicks + 1 : 1;
    S.clickAt = now;
    if (S.clicks === 5) return this.play("confused", { say: "Você realmente gosta de clicar em mim, hein? 😂" });
    if (S.clicks >= 10) {
      S.clicks = 0;
      return this.play("turbo", { say: "Você descobriu meu segredo! 🌱✨" });
    }
    let name;
    do name = pick(CLICK_ACTIONS); while (name === S.lastClick);
    S.lastClick = name;
    const def = ACTIONS[name];
    this.play(name, { say: def.say && Math.random() < 0.55 ? pick(def.say) : pick(GENERIC_SAY) });
  }

  doubleTap() {
    this.activity();
    this.play("turbo", { say: "VOCÊ DESCOBRIU O MODO TURBO! 🚀🌱" });
  }

  longPress() {
    this.activity();
    this.play("surprised", { say: "Opa! Me apertou! 😮" });
  }

  setHover(v) {
    this.state.hover = v;
  }

  setPointer(x, y) {
    const S = this.state;
    S.pointer = { x, y };
    S.lastPointerMove = performance.now();
    S.glance = null;
    this.activity();
  }

  activity() {
    const S = this.state;
    S.lastActivity = performance.now();
    if (S.action?.name === "sleeping") {
      S.action = null;
      this.play("stretch", { say: "Ah! Eu tava cochilando... 😴" });
    }
  }

  handleEvent(e) {
    if (e.type === "cart_add") this.play("happy", { priority: 2, say: pick(["Boa escolha! 🌱", "Hmm, delícia! 😋", "Mais um produtor apoiado! 💚"]) });
    if (e.type === "purchase") this.play("purchase", { priority: 3, say: "Compra realizada! 🎉 Você acabou de apoiar pequenos produtores." });
    if (e.type === "points") this.play("plant", { priority: 2, say: `+${e.n} pontos! Plantei uma sementinha 🌱` });
  }

  // ---------- Loop ----------
  loop() {
    this.raf = requestAnimationFrame(this.loop);
    const dt = Math.min(this.clock.getDelta(), 0.05);
    if (!this.visible) return;
    this.update(dt, this.clock.elapsedTime);
    this.renderer.render(this.scene, this.camera);
  }

  update(dt, t) {
    const P = this.P;
    const S = this.state;
    resetPose(P);

    // Respiração e balanço natural
    const br = Math.sin(t * 2.2);
    P.torso.scale.set(1 + br * 0.01, 1 + br * 0.02, 1 + br * 0.01);
    P.hips.rotation.z = Math.sin(t * 0.9) * 0.025;
    P.head.rotation.z = Math.sin(t * 0.9 + 0.6) * 0.035;
    P.armL.rotation.z = -0.2 - br * 0.035;
    P.armR.rotation.z = 0.2 + br * 0.035;
    P.armL.rotation.x = Math.sin(t * 1.1) * 0.05;
    P.armR.rotation.x = -Math.sin(t * 1.1) * 0.05;
    if (S.hover) P.torso.rotation.x = 0.07;

    const a = S.action;
    const c = {
      t, dt, look: null, expr: null, wink: null, droop: 0, perk: 0, lookX: S.look.x, engine: this,
      once: (k, fn) => { if (a && !a.fired[k]) { a.fired[k] = 1; fn(); } },
      burst: (kind, n, where) => this.burst(kind, n, where),
    };
    let prop = S.base.prop || null;
    if (a) {
      a.time += dt;
      const p = a.def.loop ? 0.5 : Math.min(1, a.time / a.def.dur);
      a.def.run(P, p, c);
      prop = a.def.prop === "base" ? S.base.prop || null : a.def.prop || null;
      if (!a.def.loop && p >= 1) this.next();
    } else {
      if (S.base.hold) ACTIONS[S.base.hold].run(P, 0.5, c);
      this.idleBrain(t);
    }

    // Objetos na mão (sempre em pé)
    for (const k in P.props) P.props[k].visible = k === prop;
    P.propHolder.rotation.set(-P.armR.rotation.x, -P.armR.rotation.y, -P.armR.rotation.z);

    // Olhar: olhos rápidos, cabeça e corpo suaves
    const tgt = c.look || this.lookTarget();
    const k1 = Math.min(1, dt * 4.5);
    const k2 = Math.min(1, dt * 12);
    S.look.x += (tgt.x - S.look.x) * k1;
    S.look.y += (tgt.y - S.look.y) * k1;
    S.eye.x += (tgt.x - S.eye.x) * k2;
    S.eye.y += (tgt.y - S.eye.y) * k2;
    P.head.rotation.y += S.look.x * 0.55;
    P.head.rotation.x += -S.look.y * 0.3;
    P.torso.rotation.y += S.look.x * 0.14;
    P.hips.rotation.y += S.look.x * 0.05;
    for (const iris of P.irises) iris.position.set(S.eye.x * 0.05, S.eye.y * 0.045, 0.062);

    // Piscar + expressão
    if (t > S.blinkNext) {
      S.blinkStart = t;
      S.blinkNext = t + 2.2 + Math.random() * 3.8;
    }
    const bt = (t - S.blinkStart) / 0.17;
    const blink = bt >= 0 && bt <= 1 ? Math.sin(bt * Math.PI) : 0;
    const expr = c.expr || a?.def.expr || (S.hover ? "happy" : S.base.expr || "neutral");
    applyExpression(P, expr, blink, c.wink);

    // Folhas: vento, inércia do pulo e do giro da cabeça
    const inv = 1 / Math.max(dt, 1e-3);
    const vy = (P.root.position.y - S.prevY) * inv;
    S.prevY = P.root.position.y;
    const hv = (P.head.rotation.y - S.prevHeadY) * inv;
    S.prevHeadY = P.head.rotation.y;
    S.leafLag += (clamp(-vy * 0.12, -0.7, 0.7) - S.leafLag) * Math.min(1, dt * 9);
    S.leafSwing += (clamp(-hv * 0.12, -0.5, 0.5) - S.leafSwing) * Math.min(1, dt * 7);
    const wind = 0.5 + 0.5 * Math.sin(t * 0.37) * Math.sin(t * 0.83 + 1);
    P.leafPivots.forEach((lp, i) => {
      if (!lp.yaw.visible) return;
      const base = lp.tilt.userData.baseZ || 0;
      lp.tilt.rotation.z = base * (1 + c.droop * 0.9 - c.perk * 0.6) + Math.sin(t * 2.4 + i * 1.9) * (0.05 + wind * 0.1) + S.leafSwing * (i % 2 ? -1 : 1);
      lp.tilt.rotation.x = Math.sin(t * 1.8 + i) * 0.05 + S.leafLag + c.droop * 0.35;
    });

    // Sombra
    const h = P.root.position.y;
    P.shadow.scale.setScalar(1 - Math.min(0.5, h * 0.5));
    P.shadow.material.opacity = 1 - Math.min(0.6, h * 0.7);

    // Aura do Guardião
    if (this.level >= 4 && t - S.auraT > 0.45) {
      S.auraT = t;
      this.burst("spark", 1, "body");
    }
    this.fx.update(dt);
  }

  idleBrain(t) {
    const S = this.state;
    if (!this.interactive) return;
    const now = performance.now();
    if (now - S.lastActivity > 45000) return this.play("sleeping", { priority: 0 });
    if (t < S.nextIdle) return;
    S.nextIdle = t + 6 + Math.random() * 7;
    if (now - S.lastPointerMove > 2500 && Math.random() < 0.5 && this.glance()) return;
    this.play(pick(IDLE_ACTIONS), { priority: 0, say: false });
  }

  // Olha para produtos e botões visíveis quando o mouse está parado
  glance() {
    const els = [...document.querySelectorAll('a[href^="/produtos/"], button, [data-rz-look]')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 20 && r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
    });
    if (!els.length) return false;
    this.state.glance = { el: pick(els), until: performance.now() + 1800 };
    return true;
  }

  lookTarget() {
    const S = this.state;
    let pt = S.pointer;
    const sel = S.action?.def.lookSelector;
    const el = sel ? document.querySelector(sel) : S.glance && performance.now() < S.glance.until ? S.glance.el : null;
    if (el) {
      const r = el.getBoundingClientRect();
      pt = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    if (!pt) return { x: 0, y: -0.05 };
    const r = this.container.getBoundingClientRect();
    return {
      x: Math.tanh((pt.x - (r.left + r.width / 2)) / 260),
      y: Math.tanh(-(pt.y - (r.top + r.height * 0.3)) / 260),
    };
  }

  burst(kind, n, where) {
    const v = new THREE.Vector3();
    const src = where === "head" ? this.P.leaves : where === "hands" ? this.P.handR : this.P.torso;
    src.getWorldPosition(v);
    if (where === "body") v.y += 0.3;
    this.fx.burst(kind, v, n);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.io.disconnect();
    this.scene.traverse((o) => {
      o.geometry?.dispose();
      const m = o.material;
      if (m) (Array.isArray(m) ? m : [m]).forEach((x) => { x.map?.dispose(); x.dispose(); });
    });
    Object.values(this.M).forEach((m) => m.dispose());
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
}